import scaliaEngine from "sub3d";
import Noise from "./noise.js";
import TreePool from "./TreePool.js";
import RockPool from "./RockPool.js";
import TerrainPool from "./TerrainPool.js";
import TileGroup from "./TileGroup.js";
import CameraController from "./CameraController.js";

// Initialize the Scalia game engine instance
var myGame = new scaliaEngine.Game();

// Tile and world scaling parameters
const TILE_SIZE = 45.255;
const TILE_WORLD_SIZE = TILE_SIZE;
const GROUP_TILES = 64;

// Instantiate the pools to prevent GC overhead during panning
const treePool = new TreePool();
const rockPool = new RockPool();
const terrainPool = new TerrainPool(GROUP_TILES);

// Noise generator initialization (with identical seed table to original demo)
const noise = new Noise([
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
]);

// Map of active 30x30 TileGroups keyed by "gx,gz"
const activeGroups = new Map();

// Queue of chunks waiting to be generated (throttled to 1 chunk per frame)
const generationQueue = [];

/**
 * Helper to check if a chunk key is already in the loading queue.
 */
function isKeyInQueue(key) {
  for (let i = 0; i < generationQueue.length; i++) {
    if (generationQueue[i].key === key) return true;
  }
  return false;
}

/**
 * Dynamically computes heights for height queries (camera clamping, tree heights, etc.).
 * Queries the active chunks' vertex buffers to include water clamping and midpoints.
 */
function getTerrainHeight(worldX, worldZ) {
  // Translate world X/Z to global tile X/Z (re-centered by +50 tiles)
  const fcol = worldX / TILE_WORLD_SIZE;
  const frow = worldZ / TILE_WORLD_SIZE;
  const col = Math.floor(fcol);
  const row = Math.floor(frow);

  // Identify which chunk the coordinates belong to
  const gx = Math.floor(col / GROUP_TILES);
  const gz = Math.floor(row / GROUP_TILES);
  const key = `${gx},${gz}`;
  const group = activeGroups.get(key);
  if (!group) return null; // Fallback height if chunk not loaded yet

  // Get local tile indices inside the chunk
  const localCol = col - gx * GROUP_TILES;
  const localRow = row - gz * GROUP_TILES;

  // Retrieve barycentric offsets within the tile
  const u = fcol - col;
  const v = frow - row;

  const verts = group.terrain.meshRenderer.vertices;
  const rowStride = (GROUP_TILES + 1) * 3;
  
  // Calculate vertex indices
  const a = localRow * rowStride + localCol * 3;
  const ay = a + 1; // Top-Left Y
  const by = a + 4; // Top-Right Y
  const cy = a + rowStride + 4; // Bottom-Right Y
  const dy = cy - 3; // Bottom-Left Y

  // Midpoint vertex index
  const e = (GROUP_TILES + 1) * (GROUP_TILES + 1) * 3 + (localRow * GROUP_TILES + localCol) * 3;
  const ey = e + 1;

  // Interpolate height inside the triangular layout
  return TileGroup.prototype.terrain ? 0 : getInterpolatedHeight(
    u,
    v,
    verts[ay],
    verts[dy],
    verts[cy],
    verts[by],
    verts[ey]
  );
}

// Local duplicate of height interpolation for optimization
function getInterpolatedHeight(u, v, h00, h01, h11, h10, hmid) {
  if (u + v < 1) {
    if (u > v) {
      return (1 - u - v) * h00 + (u - v) * h10 + 2 * v * hmid;
    } else {
      return (1 - v - u) * h00 + (v - u) * h01 + 2 * u * hmid;
    }
  } else {
    if (u > v) {
      return (u - v) * h10 + (u + v - 1) * h11 + 2 * (1 - u) * hmid;
    } else {
      return (v - u) * h01 + (u + v - 1) * h11 + 2 * (1 - v) * hmid;
    }
  }
}

// Read starting coordinates from query string to support permalinks/restoration
const params = new URLSearchParams(window.location.search);
const initX = params.has("x") ? parseFloat(params.get("x")) : -2793.4;
const initZ = params.has("z") ? parseFloat(params.get("z")) : -3334.1;

// Create the Camera and Environmental controller
const canvasEl = document.getElementById("canvas");
const cameraController = new CameraController(canvasEl, myGame, getTerrainHeight);

// Position the camera at the initial coordinates
cameraController.cameraObject.transform.setPosition(initX, 0, initZ);

// Find the chunk coordinates containing this world position
const startTileX = initX / TILE_WORLD_SIZE;
const startTileZ = initZ / TILE_WORLD_SIZE;
const startGroupX = Math.floor(startTileX / GROUP_TILES);
const startGroupZ = Math.floor(startTileZ / GROUP_TILES);

// Instantly generate the starting chunk so the startup area is immediately loaded
const centerKey = `${startGroupX},${startGroupZ}`;
const centerGroup = new TileGroup(
  startGroupX,
  startGroupZ,
  myGame,
  noise,
  terrainPool,
  treePool,
  rockPool,
  TILE_SIZE,
  cameraController.isWireframe,
  cameraController.isSmooth,
  GROUP_TILES
);
activeGroups.set(centerKey, centerGroup);

// Snap the camera to the center group height immediately
cameraController.snapHeightToTerrain();

// State for throttling URL history replacements (prevents Safari security limits)
const tickState = {
  lastUrlUpdateTime: 0,
  lastUrlX: initX,
  lastUrlZ: initZ
};

// Immediate URL update when user lifts pointer
document.addEventListener("pointerup", () => {
  const camPos = cameraController.cameraObject.transform.getPosition();
  const camX = camPos[0];
  const camZ = camPos[2];
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("x", camX.toFixed(1));
  urlParams.set("z", camZ.toFixed(1));
  const newSearch = urlParams.toString();
  const newUrl = `${window.location.pathname}?${newSearch}${window.location.hash}`;
  window.history.replaceState(null, "", newUrl);
  tickState.lastUrlX = camX;
  tickState.lastUrlZ = camZ;
  tickState.lastUrlUpdateTime = Date.now();
});

/**
 * Update tick registered in the engine.
 * Computes camera chunk range, manages chunk loading queue, and loads at most 1 chunk per frame.
 */
myGame.world.tickRegister({
  tick: () => {
    const camPos = cameraController.cameraObject.transform.getPosition();
    const camX = camPos[0];
    const camZ = camPos[2];

    // Update coordinates display inside control dock
    const dockCoordsEl = document.getElementById("dock_coords_val");
    if (dockCoordsEl) {
      dockCoordsEl.innerText = `${camX.toFixed(1)}, ${camZ.toFixed(1)}`;
    }

    // Throttle address bar query string updates to once per second while dragging
    const now = Date.now();
    if (now - tickState.lastUrlUpdateTime > 1000) {
      const lastX = tickState.lastUrlX;
      const lastZ = tickState.lastUrlZ;
      if (Math.abs(lastX - camX) > 0.5 || Math.abs(lastZ - camZ) > 0.5) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("x", camX.toFixed(1));
        urlParams.set("z", camZ.toFixed(1));
        const newSearch = urlParams.toString();
        const newUrl = `${window.location.pathname}?${newSearch}${window.location.hash}`;
        window.history.replaceState(null, "", newUrl);
        tickState.lastUrlX = camX;
        tickState.lastUrlZ = camZ;
        tickState.lastUrlUpdateTime = now;
      }
    }

    // Compute camera's global tile position (shifted by +50 offset)
    const camTileX = camX / TILE_WORLD_SIZE;
    const camTileZ = camZ / TILE_WORLD_SIZE;

    // Identify camera's current chunk coordinates using floor to partition tile space
    const camGroupX = Math.floor(camTileX / GROUP_TILES);
    const camGroupZ = Math.floor(camTileZ / GROUP_TILES);

    // Compute the 9 visible chunks around the camera (3x3 grid)
    const visibleKeys = new Set();
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const gx = camGroupX + dx;
        const gz = camGroupZ + dz;
        const key = `${gx},${gz}`;
        visibleKeys.add(key);
      }
    }

    // 1. Unload out-of-range chunks (return elements to pools to free memory)
    for (const [key, group] of activeGroups.entries()) {
      if (!visibleKeys.has(key)) {
        group.destroy();
        activeGroups.delete(key);
      }
    }

    // 2. Add missing chunks to the loading queue
    for (const key of visibleKeys) {
      if (!activeGroups.has(key) && !isKeyInQueue(key)) {
        const [gx, gz] = key.split(",").map(Number);
        generationQueue.push({ key, gx, gz });
      }
    }

    // 3. Prune loading queue: remove chunks that are no longer visible
    for (let i = generationQueue.length - 1; i >= 0; i--) {
      if (!visibleKeys.has(generationQueue[i].key)) {
        generationQueue.splice(i, 1);
      }
    }

    // 4. Generate at most ONE chunk in this frame (Budget-throttled async generation)
    if (generationQueue.length > 0) {
      const nextChunk = generationQueue.shift();
      const group = new TileGroup(
        nextChunk.gx,
        nextChunk.gz,
        myGame,
        noise,
        terrainPool,
        treePool,
        rockPool,
        TILE_SIZE,
        cameraController.isWireframe,
        cameraController.isSmooth,
        GROUP_TILES
      );
      activeGroups.set(nextChunk.key, group);
    }
  },
});

// Run the engine
myGame.run();

// --- Setup UI Handlers and sync them with CameraController ---
window.myGame = myGame;
const viewport = cameraController.viewport;
var renderer = viewport.renderer;
var fps,
  avgDt,
  maxFps = 0;
var fpsEl = document.getElementById("fps");
var maxFpsEl = document.getElementById("maxFps");
var drawCallsEl = document.getElementById("drawCalls");
var objectsEl = document.getElementById("objects");
var visibleObjectsEl = document.getElementById("visibleObjects");
var facesCountEl = document.getElementById("facesCount");
var sortTimeEl = document.getElementById("sortTime");
var scaleValEl = document.getElementById("scale_val");
var zoomValEl = document.getElementById("zoom_val");
var systemDprEl = document.getElementById("system_dpr");

let isDebug = window.location.pathname.includes('/debug') || window.location.search.includes('debug');

const debugEl = document.getElementById("debug");
if (debugEl) {
  debugEl.addEventListener("pointerdown", (e) => e.stopPropagation());
  debugEl.addEventListener("pointermove", (e) => e.stopPropagation());
  debugEl.addEventListener("pointerup", (e) => e.stopPropagation());
}

function updateDebugState() {
  if (debugEl) {
    debugEl.style.display = isDebug ? "block" : "none";
  }
  const toggleBtn = document.getElementById("toggle_debug_btn");
  if (toggleBtn) {
    toggleBtn.innerText = isDebug ? "Close Debug" : "Open Debug";
  }
  if (isDebug && systemDprEl) {
    systemDprEl.innerText = (window.devicePixelRatio || 1).toFixed(2);
  }
}

updateDebugState();

const toggleBtn = document.getElementById("toggle_debug_btn");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    isDebug = !isDebug;

    const urlParams = new URLSearchParams(window.location.search);
    if (isDebug) {
      urlParams.set("debug", "");
    } else {
      urlParams.delete("debug");
    }
    const newSearch = urlParams.toString();
    const cleanSearch = newSearch ? `?${newSearch}` : "";
    const newUrl = `${window.location.pathname}${cleanSearch}${window.location.hash}`;
    window.history.replaceState(null, "", newUrl);

    updateDebugState();
  });
}

// Wireframe Checkbox (Debug menu only)
const chkbx1El = document.getElementById("chkbx_1");
if (chkbx1El) {
  chkbx1El.addEventListener("change", (e) => {
    const checked = chkbx1El.checked;
    renderer.wireframe = checked;
    cameraController.isWireframe = checked;
    // Apply wireframe to all currently active chunks
    for (const group of activeGroups.values()) {
      group.setWireframe(checked);
    }
  });
}

// Fog inputs (Debug menu)
const sliderFogNearEl = document.getElementById("slider_fog_near");
const sliderFogFarEl = document.getElementById("slider_fog_far");

if (sliderFogNearEl && sliderFogFarEl) {
  sliderFogNearEl.addEventListener("input", (e) => {
    cameraController.autoCycleEnabled = false;
    let nearVal = parseInt(e.target.value, 10);
    let farVal = parseInt(sliderFogFarEl.value, 10);
    if (nearVal > farVal) {
      farVal = nearVal;
    }
    cameraController.setFogLimits(nearVal, farVal);
  });

  sliderFogFarEl.addEventListener("input", (e) => {
    cameraController.autoCycleEnabled = false;
    let farVal = parseInt(e.target.value, 10);
    let nearVal = parseInt(sliderFogNearEl.value, 10);
    if (farVal < nearVal) {
      nearVal = farVal;
    }
    cameraController.setFogLimits(nearVal, farVal);
  });
}

// Clipping pane inputs (Debug menu)
const sliderClipNearEl = document.getElementById("slider_clip_near");
const sliderClipFarEl = document.getElementById("slider_clip_far");

if (sliderClipNearEl && sliderClipFarEl) {
  // Sync initial slider values
  sliderClipNearEl.value = cameraController.cameraObject.camera.nearClippingPane;
  sliderClipFarEl.value = cameraController.cameraObject.camera.farClippingPane;
  
  const clipNearValueEl = document.getElementById("clipNearValue");
  const clipFarValueEl = document.getElementById("clipFarValue");
  if (clipNearValueEl) clipNearValueEl.innerText = cameraController.cameraObject.camera.nearClippingPane;
  if (clipFarValueEl) clipFarValueEl.innerText = cameraController.cameraObject.camera.farClippingPane;

  sliderClipNearEl.addEventListener("input", (e) => {
    let nearVal = parseInt(e.target.value, 10);
    let farVal = parseInt(sliderClipFarEl.value, 10);
    if (nearVal > farVal) {
      farVal = nearVal;
    }
    cameraController.setClippingPlanes(nearVal, farVal);
  });

  sliderClipFarEl.addEventListener("input", (e) => {
    let farVal = parseInt(e.target.value, 10);
    let nearVal = parseInt(sliderClipNearEl.value, 10);
    if (farVal < nearVal) {
      nearVal = farVal;
    }
    cameraController.setClippingPlanes(nearVal, farVal);
  });
}

// Sun, Fog, Ambient Color controls (Debug menu)
const colorSunEl = document.getElementById("color_sun");
if (colorSunEl) {
  colorSunEl.addEventListener("input", (e) => {
    cameraController.autoCycleEnabled = false;
    const hex = e.target.value;
    const colorInt = parseInt(hex.substring(1), 16);
    cameraController.sun.light.color = colorInt;
  });
}

const colorFogEl = document.getElementById("color_fog");
if (colorFogEl) {
  colorFogEl.addEventListener("input", (e) => {
    cameraController.autoCycleEnabled = false;
    const hex = e.target.value;
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const colorInt = (r << 16) | (g << 8) | b;
    cameraController.cameraObject.camera.fogColor = colorInt;
    cameraController.cameraObject.camera.bgColor = colorInt;
  });
}

const colorAmbientEl = document.getElementById("color_ambient");
if (colorAmbientEl) {
  colorAmbientEl.addEventListener("input", (e) => {
    cameraController.autoCycleEnabled = false;
    const hex = e.target.value;
    const colorInt = parseInt(hex.substring(1), 16);
    cameraController.cameraObject.camera.ambientLight = colorInt;
  });
}

// Resolution scale and Zoom inputs (Debug menu)
const sliderScaleEl = document.getElementById("slider_scale");
if (sliderScaleEl) {
  sliderScaleEl.value = viewport.scale;
  if (scaleValEl) scaleValEl.innerText = viewport.scale.toFixed(2);
  sliderScaleEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    cameraController.setScale(val);
    if (scaleValEl) scaleValEl.innerText = val.toFixed(2);
  });
}

const sliderZoomEl = document.getElementById("slider_zoom");
if (sliderZoomEl) {
  sliderZoomEl.value = cameraController.cameraObject.camera.zoom;
  if (zoomValEl) zoomValEl.innerText = cameraController.cameraObject.camera.zoom.toFixed(2);
  sliderZoomEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    cameraController.setZoom(val);
    if (zoomValEl) zoomValEl.innerText = val.toFixed(2);
    
    // Sync with Dock Zoom UI
    const dockZoom = document.getElementById("dock_zoom");
    const dockZoomVal = document.getElementById("dock_zoom_val");
    if (dockZoom) dockZoom.value = val;
    if (dockZoomVal) dockZoomVal.innerText = val.toFixed(2);
  });
}

// --- macOS Dock UI Listeners & Sync ---
const dockRotationEl = document.getElementById("dock_rotation");
const dockRotValEl = document.getElementById("dock_rot_val");
if (dockRotationEl) {
  dockRotationEl.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    cameraController.setYaw(val);
    if (dockRotValEl) dockRotValEl.innerText = val;
  });
}

const dockZoomEl = document.getElementById("dock_zoom");
const dockZoomValEl = document.getElementById("dock_zoom_val");
if (dockZoomEl) {
  dockZoomEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    cameraController.setZoom(val);
    if (dockZoomValEl) dockZoomValEl.innerText = val.toFixed(2);
    if (sliderZoomEl) {
      sliderZoomEl.value = val;
      if (zoomValEl) zoomValEl.innerText = val.toFixed(2);
    }
  });
}

const dockSpeedEl = document.getElementById("dock_speed");
const dockSpeedValEl = document.getElementById("dock_speed_val");
if (dockSpeedEl) {
  // Initialize speed on cameraController
  const initSpeed = parseFloat(dockSpeedEl.value);
  cameraController.setSpeed(initSpeed);
  if (dockSpeedValEl) dockSpeedValEl.innerText = initSpeed;

  dockSpeedEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (dockSpeedValEl) dockSpeedValEl.innerText = val;
    cameraController.setSpeed(val);
  });
}

const dockSmoothEl = document.getElementById("dock_smooth");
if (dockSmoothEl) {
  dockSmoothEl.addEventListener("change", (e) => {
    const checked = e.target.checked;
    cameraController.isSmooth = checked;
    for (const group of activeGroups.values()) {
      group.setSmooth(checked);
    }
  });
}

const dockFlyEl = document.getElementById("dock_fly");
if (dockFlyEl) {
  dockFlyEl.addEventListener("change", (e) => {
    cameraController.autoFlyEnabled = e.target.checked;
  });
}

// Prevent map panning when interacting with control dock inputs
const controlDockEl = document.getElementById("control-dock");
if (controlDockEl) {
  controlDockEl.addEventListener("pointerdown", (e) => e.stopPropagation());
  controlDockEl.addEventListener("pointermove", (e) => e.stopPropagation());
  controlDockEl.addEventListener("pointerup", (e) => e.stopPropagation());
}

// Debug panel updates
setInterval(() => {
  if (!isDebug) return;
  const dt = viewport.lastRenderStats.dt;
  fps = viewport.lastRenderStats.fps;
  avgDt = avgDt === undefined ? dt : (avgDt + dt) / 2;
  maxFps = Math.max(maxFps, fps);
  if (fpsEl) fpsEl.innerText = fps;
  if (maxFpsEl) maxFpsEl.innerText = maxFps;
  if (drawCallsEl) drawCallsEl.innerText = viewport.lastRenderStats.drawCalls;
  if (objectsEl) objectsEl.innerText = viewport.lastRenderStats.totalObjects;
  if (visibleObjectsEl) visibleObjectsEl.innerText = viewport.lastRenderStats.visibleObjects;
  if (facesCountEl) facesCountEl.innerText = viewport.lastRenderStats.faces;
  if (sortTimeEl) sortTimeEl.innerText = viewport.lastRenderStats.sortTime;
}, 100);
