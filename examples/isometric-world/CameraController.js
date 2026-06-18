import scaliaEngine from "sub3d";

/**
 * CameraController manages the viewport, camera positioning, panning/zooming controls,
 * and day/night environmental lighting cycles.
 */
export default class CameraController {
  /**
   * @param {HTMLCanvasElement} canvas - The rendering canvas
   * @param {object} game - The Scalia game instance
   * @param {function} getTerrainHeightCallback - Function to get terrain height at (x, z)
   */
  constructor(canvas, game, getTerrainHeightCallback) {
    this.canvas = canvas;
    this.game = game;
    this.getTerrainHeight = getTerrainHeightCallback;

    // Create camera GameObject
    this.cameraObject = new scaliaEngine.Camera();
    this.cameraObject.camera.farClippingPane = 2500;
    this.cameraObject.camera.nearClippingPane = -2500;
    this.cameraObject.camera.fogType = scaliaEngine.CameraComponent.FogType.RADIAL;
    this.cameraObject.camera.fogFarPane = 2500;
    this.cameraObject.camera.fogNearPane = 1500;
    this.cameraObject.camera.fogColor = 0x8CB4C8;
    this.cameraObject.camera.bgColor = 0x8CB4C8;
    this.cameraObject.camera.ambientLight = 0x202020;
    
    // Position and angle the camera in isometric view
    this.cameraObject.transform.rotate(30, 45, 0);
    this.cameraObject.transform.translate(0, 0, 0);
    this.cameraObject.camera.zoom = 1.0;

    this.game.world.scene.addGameObject(this.cameraObject);

    // Create the viewport
    const dpr = window.devicePixelRatio || 1;
    this.viewport = new scaliaEngine.Canvas2dViewport(this.cameraObject.camera, canvas);
    this.viewport.scale = dpr;
    this.viewport.start();

    // Create environment sun light
    this.sun = new scaliaEngine.Light();
    this.game.world.scene.addGameObject(this.sun);
    this.sun.transform.rotate(45, 0, 0);

    // Configuration / state variables
    this.SCALE_FACTOR = 1.6;
    this.mousepressed = false;
    this.x0 = 0;
    this.y0 = 0;
    this.isWireframe = false;
    this.isSmooth = false;
    this.autoCycleEnabled = true;
    this.speedMultiplier = 1.0;
    this.autoFlyEnabled = false;
    this.autoFlySpeed = 2000.0; // units per second

    // Start cycle at 12:00 (which corresponds to angle 90.0)
    this.currentAngle = 90.0;

    this.CYCLE_SPEED = 360 / 86400; // base speed in degrees per second (1:1 with real-world time: 360° / 24 hours)
    this.cameraYaw = 45;    // Default camera rotation angle (45 degrees yaw)

    // Setup input listeners
    this.setupPointerListeners();

    // Register camera update in the tick loop
    this.game.world.tickRegister({
      tick: (time) => this.onTick(time),
    });

    // Environmental daylight cycle keyframes
    this.keyframes = [
      { angle: 0, sunColor: [160, 70, 60], ambientColor: [35, 30, 38], fogColor: [140, 100, 120], fogNear: 800, fogFar: 1800 },
      { angle: 15, sunColor: [150, 150, 140], ambientColor: [55, 65, 80], fogColor: [140, 180, 200], fogNear: 1500, fogFar: 2500 },
      { angle: 90, sunColor: [140, 150, 175], ambientColor: [55, 70, 95], fogColor: [140, 180, 200], fogNear: 1500, fogFar: 2500 },
      { angle: 165, sunColor: [150, 150, 140], ambientColor: [55, 65, 80], fogColor: [140, 180, 200], fogNear: 1500, fogFar: 2500 },
      { angle: 180, sunColor: [150, 65, 50], ambientColor: [35, 28, 35], fogColor: [100, 70, 100], fogNear: 800, fogFar: 1800 },
      { angle: 210, sunColor: [0, 0, 0], ambientColor: [28, 35, 52], fogColor: [20, 25, 38], fogNear: 500, fogFar: 1500 },
      { angle: 270, sunColor: [0, 0, 0], ambientColor: [28, 35, 52], fogColor: [20, 25, 38], fogNear: 500, fogFar: 1500 },
      { angle: 330, sunColor: [0, 0, 0], ambientColor: [28, 35, 52], fogColor: [20, 25, 38], fogNear: 500, fogFar: 1500 },
      { angle: 360, sunColor: [160, 70, 60], ambientColor: [35, 30, 38], fogColor: [140, 100, 120], fogNear: 800, fogFar: 1800 }
    ];

    // Synchronize initial daylight state
    this.updateDaylightCycle(this.currentAngle);

    // Start rendering frame loop for smooth camera updates (movement & height tracking)
    let lastTime = performance.now();
    const updateFrame = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      this.onFrameUpdate(dt);

      requestAnimationFrame(updateFrame);
    };
    requestAnimationFrame(updateFrame);
  }

  /**
   * Pointer listeners for desktop/mobile panning and mouse wheel rotation.
   */
  setupPointerListeners() {
    document.onpointerdown = (e) => {
      if (e.cancelable) e.preventDefault();
      this.mousepressed = true;
      this.x0 = e.pageX;
      this.y0 = e.pageY;
    };

    document.onpointerup = (e) => {
      if (e.cancelable) e.preventDefault();
      this.mousepressed = false;
    };

    document.onpointermove = (e) => {
      if (e.cancelable) e.preventDefault();
      if (!this.mousepressed) return;

      const x = e.pageX;
      const y = e.pageY;
      const dx = x - this.x0;
      const dy = y - this.y0;

      this.x0 = x;
      this.y0 = y;

      const mat = this.cameraObject.transform.getLocalToWorld();

      // Right direction vector (first column)
      const rx = mat[0];
      const rz = mat[2];
      const rLen = Math.sqrt(rx * rx + rz * rz);
      const rightX = rx / rLen;
      const rightZ = rz / rLen;

      // Forward direction vector (negative third column)
      const fx = -mat[8];
      const fz = -mat[10];
      const fLen = Math.sqrt(fx * fx + fz * fz);
      const forwardX = fx / fLen;
      const forwardZ = fz / fLen;

      // Move camera along horizontal local directions
      const sensitivity = 0.5 * this.SCALE_FACTOR;
      const moveX = rightX * (-dx * sensitivity) + forwardX * (-dy * sensitivity);
      const moveZ = rightZ * (-dx * sensitivity) + forwardZ * (-dy * sensitivity);

      this.cameraObject.transform.translate(moveX, 0, moveZ, "world");
      this.snapHeightToTerrain();
    };

    document.onwheel = (e) => {
      this.cameraObject.transform.rotate(e.deltaY / 102, 0, 0);
    };
  }

  /**
   * Snaps the camera's height to the terrain under it.
   */
  snapHeightToTerrain(dt) {
    const pos = this.cameraObject.transform.getPosition();
    const terrainH = this.getTerrainHeight(pos[0], pos[2]);
    if (terrainH !== null && terrainH !== undefined) {
      if (this.autoFlyEnabled && dt !== undefined) {
        // Smoothly glide over terrain heights using a frame-rate independent lerp
        const lerpFactor = Math.min(1.0, 4.0 * dt);
        const targetY = pos[1] + (terrainH - pos[1]) * lerpFactor;
        this.cameraObject.transform.setPosition(pos[0], targetY, pos[2]);
      } else {
        // Instant snap for user panning/dragging
        this.cameraObject.transform.setPosition(pos[0], terrainH, pos[2]);
      }
    }
  }

  /**
   * Sets the camera's absolute rotation (yaw) and rebuilds its local matrix.
   * @param {number} angle - Rotation angle in degrees
   */
  setYaw(angle) {
    this.cameraYaw = angle;
    this.updateCameraTransform();
  }

  /**
   * Rebuilds the camera local transform matrix with the updated yaw angle
   * while preserving its current world position.
   */
  updateCameraTransform() {
    const pos = this.cameraObject.transform.getPosition();
    scaliaEngine.glMatrix.mat4.identity(this.cameraObject.transform.local);
    this.cameraObject.transform.rotate(30, this.cameraYaw, 0);
    this.cameraObject.transform.setPosition(pos[0], pos[1], pos[2]);
  }

  /**
   * Smooth updates per rendering frame (running in requestAnimationFrame).
   * Translates the camera if auto-fly is active and keeps the camera snapped to the ground.
   * @param {number} dt - Frame delta time in seconds
   */
  onFrameUpdate(dt) {
    if (this.autoFlyEnabled) {
      const mat = this.cameraObject.transform.getLocalToWorld();
      const fx = mat[8];
      const fz = mat[10];
      const fLen = Math.sqrt(fx * fx + fz * fz);
      if (fLen > 0.001) {
        const forwardX = fx / fLen;
        const forwardZ = fz / fLen;
        const dist = this.autoFlySpeed * dt;
        this.cameraObject.transform.translate(forwardX * dist, 0, forwardZ * dist, "world");
      }
    }

    this.snapHeightToTerrain(dt);
  }

  /**
   * Main game loop update. Handles auto day/night cycle.
   */
  onTick(time) {
    if (this.autoCycleEnabled) {
      const d = time.dt; // exactly 60ms (simulation step size)
      this.currentAngle = (this.currentAngle + (this.CYCLE_SPEED * this.speedMultiplier * d) / 1000) % 360;
      this.updateDaylightCycle(this.currentAngle);
    }
  }

  /**
   * Sets the day/night cycle speed multiplier.
   * Maps UI slider values (1 to 10) to non-linear multipliers.
   * @param {number} val - Speed slider value (1 to 10)
   */
  setSpeed(val) {
    const table = [
      1,      // 1: 1 day = 24 hours (real world time)
      12,     // 2: 1 day = 2 hours
      60,     // 3: 1 day = 24 minutes
      180,    // 4: 1 day = 8 minutes
      360,    // 5: 1 day = 4 minutes
      720,    // 6: 1 day = 2 minutes
      1440,   // 7: 1 day = 1 minute (60 seconds)
      2880,   // 8: 1 day = 30 seconds
      5760,   // 9: 1 day = 15 seconds
      14400   // 10: 1 day = 6 seconds (fast for testing)
    ];
    const idx = Math.max(1, Math.min(10, Math.round(val))) - 1;
    this.speedMultiplier = table[idx];
  }

  /**
   * Interpolates daylight parameters (colors, fog near/far) for a given sun angle.
   */
  getInterpolatedCycle(angle) {
    angle = ((angle % 360) + 360) % 360;

    let lower = this.keyframes[0];
    let upper = this.keyframes[this.keyframes.length - 1];
    
    for (let i = 0; i < this.keyframes.length - 1; i++) {
      if (angle >= this.keyframes[i].angle && angle <= this.keyframes[i + 1].angle) {
        lower = this.keyframes[i];
        upper = this.keyframes[i + 1];
        break;
      }
    }

    const range = upper.angle - lower.angle;
    const t = range === 0 ? 0 : (angle - lower.angle) / range;

    const lerp = (a, b, t) => a + (b - a) * t;
    const lerpColor = (c1, c2, t) => [
      Math.round(lerp(c1[0], c2[0], t)),
      Math.round(lerp(c1[1], c2[1], t)),
      Math.round(lerp(c1[2], c2[2], t))
    ];

    const sunColor = lerpColor(lower.sunColor, upper.sunColor, t);
    const ambientColor = lerpColor(lower.ambientColor, upper.ambientColor, t);
    const fogColor = lerpColor(lower.fogColor, upper.fogColor, t);
    const fogNear = Math.round(lerp(lower.fogNear, upper.fogNear, t));
    const fogFar = Math.round(lerp(lower.fogFar, upper.fogFar, t));

    return {
      sunColor: (sunColor[0] << 16) | (sunColor[1] << 8) | sunColor[2],
      ambientColor: (ambientColor[0] << 16) | (ambientColor[1] << 8) | ambientColor[2],
      fogColor: (fogColor[0] << 16) | (fogColor[1] << 8) | fogColor[2],
      fogNear,
      fogFar
    };
  }

  /**
   * Updates the daylight cycle, setting sun angle, engine lighting, and syncs UI inputs.
   */
  updateDaylightCycle(angle) {
    this.currentAngle = angle;
    const state = this.getInterpolatedCycle(angle);

    // Update sun light transform rotation using a continuous triangle wave
    let lightAngle;
    if (angle <= 180) {
      lightAngle = 20 + (angle / 180) * 140;
    } else {
      lightAngle = 160 - ((angle - 180) / 180) * 140;
    }
    scaliaEngine.glMatrix.mat4.identity(this.sun.transform.local);
    this.sun.transform.rotate(lightAngle, 0, 0);

    // Apply lighting states to engine
    this.sun.light.color = state.sunColor;
    this.cameraObject.camera.ambientLight = state.ambientColor;
    this.cameraObject.camera.fogColor = state.fogColor;
    this.cameraObject.camera.bgColor = state.fogColor;
    this.cameraObject.camera.fogNearPane = state.fogNear;
    this.cameraObject.camera.fogFarPane = state.fogFar;
    this.cameraObject.camera.farClippingPane = state.fogFar;

    // Sync UI elements if they exist in DOM
    const sliderSunAngleEl = document.getElementById("slider_sun_angle");
    const sunAngleValueEl = document.getElementById("sunAngleValue");
    if (sliderSunAngleEl) {
      sliderSunAngleEl.value = Math.round(angle);
    }
    if (sunAngleValueEl) {
      sunAngleValueEl.innerText = Math.round(angle);
    }

    const colorSunEl = document.getElementById("color_sun");
    if (colorSunEl) {
      colorSunEl.value = "#" + state.sunColor.toString(16).padStart(6, "0");
    }

    const colorAmbientEl = document.getElementById("color_ambient");
    if (colorAmbientEl) {
      colorAmbientEl.value = "#" + state.ambientColor.toString(16).padStart(6, "0");
    }

    const colorFogEl = document.getElementById("color_fog");
    if (colorFogEl) {
      colorFogEl.value = "#" + state.fogColor.toString(16).padStart(6, "0");
    }

    const sliderFogNearEl = document.getElementById("slider_fog_near");
    const fogNearValueEl = document.getElementById("fogNearValue");
    if (sliderFogNearEl) {
      sliderFogNearEl.value = state.fogNear;
    }
    if (fogNearValueEl) {
      fogNearValueEl.innerText = state.fogNear;
    }

    const sliderFogFarEl = document.getElementById("slider_fog_far");
    const fogFarValueEl = document.getElementById("fogFarValue");
    if (sliderFogFarEl) {
      sliderFogFarEl.value = state.fogFar;
    }
    if (fogFarValueEl) {
      fogFarValueEl.innerText = state.fogFar;
    }

    // Convert sun angle to 24-hour time (0 degrees is 06:00 Sunrise, 90 degrees is 12:00 Noon)
    let timeInHours = (angle / 360) * 24 + 6;
    timeInHours = (timeInHours + 24) % 24;
    const hour = Math.floor(timeInHours);
    const minute = Math.floor((timeInHours - hour) * 60);
    const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    const dockTimeValEl = document.getElementById("dock_time_val");
    if (dockTimeValEl) {
      dockTimeValEl.innerText = timeStr;
    }
  }

  /**
   * Sets viewport scale/DPR and triggers resize.
   */
  setScale(val) {
    this.viewport.scale = val;
    this.viewport.setSize(this.viewport.canvas.offsetWidth, this.viewport.canvas.offsetHeight);
  }

  /**
   * Sets camera zoom level.
   */
  setZoom(val) {
    this.cameraObject.camera.zoom = val;
    this.viewport.setSize(this.viewport.canvas.offsetWidth, this.viewport.canvas.offsetHeight);
  }

  setFogLimits(nearVal, farVal) {
    this.cameraObject.camera.fogNearPane = nearVal;
    this.cameraObject.camera.fogFarPane = farVal;
    
    // Sync far clipping plane with fog far limit by default
    this.setClippingPlanes(this.cameraObject.camera.nearClippingPane, farVal);

    const fogNearValueEl = document.getElementById("fogNearValue");
    const fogFarValueEl = document.getElementById("fogFarValue");
    if (fogNearValueEl) fogNearValueEl.innerText = nearVal;
    if (fogFarValueEl) fogFarValueEl.innerText = farVal;
  }

  /**
   * Direct manual update of near/far camera clipping plane limits.
   */
  setClippingPlanes(nearVal, farVal) {
    this.cameraObject.camera.nearClippingPane = nearVal;
    this.cameraObject.camera.farClippingPane = farVal;

    const clipNearValueEl = document.getElementById("clipNearValue");
    const clipFarValueEl = document.getElementById("clipFarValue");
    const sliderClipNearEl = document.getElementById("slider_clip_near");
    const sliderClipFarEl = document.getElementById("slider_clip_far");

    if (clipNearValueEl) clipNearValueEl.innerText = nearVal;
    if (clipFarValueEl) clipFarValueEl.innerText = farVal;
    if (sliderClipNearEl) sliderClipNearEl.value = nearVal;
    if (sliderClipFarEl) sliderClipFarEl.value = farVal;
  }
}
