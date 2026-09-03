import React, { useState, useEffect } from "react";

const formatSortTime = (val) => {
  if (typeof val !== "number") return "N/A";
  return `${Math.round(val)} ms`;
};

export default function DebugPanel({ viewport }) {
  const [stats, setStats] = useState({
    fps: 0,
    maxFps: 0,
    totalObjects: 0,
    visibleObjects: 0,
    faces: 0,
    sortTime: 0,
    cullTime: 0,
    groupTime: 0,
    processTime: 0,
    updateTime: 0,
    retrieveTime: 0,
    frameTime: 0,
    drawCalls: 0,
    dt: 0,
    fillDrawCalls: 0,
    fogDrawCalls: 0,
    shadeDrawCalls: 0,
    drawCallsTotal: 0,
    fillRasterTime: 0,
    shadeRasterTime: 0,
    fogSortTime: 0,
    fogRasterTime: 0,
  });
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("s3d-debug-open") === "true";
  });
  const [wireframe, setWireframe] = useState(() => {
    return localStorage.getItem("s3d-wireframe") === "true";
  });
  const [debugNormals, setDebugNormals] = useState(() => {
    return localStorage.getItem("s3d-debug-normals") === "true";
  });
  const [debugAxis, setDebugAxis] = useState(() => {
    return localStorage.getItem("s3d-debug-axis") === "true";
  });
  // Pipeline stage toggles default ON (unlike the debug overlays above, which default OFF) - a
  // missing/unset localStorage key must resolve to true, so this checks for the explicit 'false'
  // rather than mirroring the `=== 'true'` pattern used above.
  const [fillEnabled, setFillEnabled] = useState(() => {
    return localStorage.getItem("s3d-fill-enabled") !== "false";
  });
  const [shadeEnabled, setShadeEnabled] = useState(() => {
    return localStorage.getItem("s3d-shade-enabled") !== "false";
  });
  const [fogEnabled, setFogEnabled] = useState(() => {
    return localStorage.getItem("s3d-fog-enabled") !== "false";
  });

  // Push the persisted (or default) toggle state onto the viewport once it's available - the
  // polling effect below only reads the viewport's current value, it never restores one, so
  // without this a reload would always come back up with every toggle off regardless of what
  // was saved.
  useEffect(() => {
    if (viewport) {
      viewport.wireframe = wireframe;
      viewport.debugNormals = debugNormals;
      viewport.debugAxis = debugAxis;
      viewport.fillEnabled = fillEnabled;
      viewport.shadeEnabled = shadeEnabled;
      viewport.fogEnabled = fogEnabled;
    }
    // Intentionally only re-runs when viewport itself changes - this is a one-time restore, not
    // a sync (that's what the polling effect below is for).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport]);

  // Sync wireframe/debugNormals/debugAxis/fillEnabled/shadeEnabled/fogEnabled from the viewport
  // on load and when they change (e.g. toggled by something other than these buttons)
  useEffect(() => {
    const checkFlags = () => {
      if (viewport) {
        setWireframe(!!viewport.wireframe);
        setDebugNormals(!!viewport.debugNormals);
        setDebugAxis(!!viewport.debugAxis);
        setFillEnabled(!!viewport.fillEnabled);
        setShadeEnabled(!!viewport.shadeEnabled);
        setFogEnabled(!!viewport.fogEnabled);
      }
    };
    checkFlags();
    const interval = setInterval(checkFlags, 500);
    return () => clearInterval(interval);
  }, [viewport]);

  // Update open/closed state persistence
  useEffect(() => {
    localStorage.setItem("s3d-debug-open", isOpen);
  }, [isOpen]);

  // Persist toggle state so each survives a reload, same as the panel's open/closed state above
  useEffect(() => {
    localStorage.setItem("s3d-wireframe", wireframe);
  }, [wireframe]);
  useEffect(() => {
    localStorage.setItem("s3d-debug-normals", debugNormals);
  }, [debugNormals]);
  useEffect(() => {
    localStorage.setItem("s3d-debug-axis", debugAxis);
  }, [debugAxis]);
  useEffect(() => {
    localStorage.setItem("s3d-fill-enabled", fillEnabled);
  }, [fillEnabled]);
  useEffect(() => {
    localStorage.setItem("s3d-shade-enabled", shadeEnabled);
  }, [shadeEnabled]);
  useEffect(() => {
    localStorage.setItem("s3d-fog-enabled", fogEnabled);
  }, [fogEnabled]);

  // Pull stats periodically
  useEffect(() => {
    let maxFps = 0;
    const interval = setInterval(() => {
      if (viewport) {
        const renderStats = viewport.lastRenderStats || {};
        maxFps = Math.max(maxFps, renderStats.fps || 0);
        setStats({
          fps: renderStats.fps || 0,
          maxFps: maxFps,
          totalObjects: renderStats.totalObjects || 0,
          visibleObjects: renderStats.visibleObjects || 0,
          faces: renderStats.faces || 0,
          sortTime: renderStats.sortTime || 0,
          cullTime: renderStats.cullTime || 0,
          groupTime: renderStats.groupTime || 0,
          processTime: renderStats.processTime || 0,
          updateTime: renderStats.updateTime || 0,
          retrieveTime: renderStats.retrieveTime || 0,
          frameTime: renderStats.frameTime || 0,
          drawCalls: renderStats.drawCalls || 0,
          dt: renderStats.dt || 0,
          fillDrawCalls: renderStats.fillDrawCalls || 0,
          fogDrawCalls: renderStats.fogDrawCalls || 0,
          shadeDrawCalls: renderStats.shadeDrawCalls || 0,
          drawCallsTotal: renderStats.drawCallsTotal || 0,
          fillRasterTime: renderStats.fillRasterTime || 0,
          shadeRasterTime: renderStats.shadeRasterTime || 0,
          fogSortTime: renderStats.fogSortTime || 0,
          fogRasterTime: renderStats.fogRasterTime || 0,
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [viewport]);

  const handleWireframeToggle = () => {
    const nextWireframe = !wireframe;
    setWireframe(nextWireframe);

    // 1. Update the viewport - a renderer-wide flag, not a per-mesh setting
    if (viewport) {
      viewport.wireframe = nextWireframe;
    }

    // 2. Dispatch custom event for custom integrations (like terrain chunks in isometric-world)
    window.dispatchEvent(
      new CustomEvent("s3d-wireframe-change", {
        detail: { enabled: nextWireframe },
      }),
    );
  };

  const handleDebugNormalsToggle = () => {
    const next = !debugNormals;
    setDebugNormals(next);
    if (viewport) {
      viewport.debugNormals = next;
    }
  };

  const handleDebugAxisToggle = () => {
    const next = !debugAxis;
    setDebugAxis(next);
    if (viewport) {
      viewport.debugAxis = next;
    }
  };

  const handleFillToggle = () => {
    const next = !fillEnabled;
    setFillEnabled(next);
    if (viewport) {
      viewport.fillEnabled = next;
    }
  };

  const handleShadeToggle = () => {
    const next = !shadeEnabled;
    setShadeEnabled(next);
    if (viewport) {
      viewport.shadeEnabled = next;
    }
  };

  const handleFogToggle = () => {
    const next = !fogEnabled;
    setFogEnabled(next);
    if (viewport) {
      viewport.fogEnabled = next;
    }
  };

  return (
    <div className="s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans">
      {/* Row of buttons */}
      <div className="s3d-flex s3d-gap-2">
        {/* Wireframe Button */}
        <button
          onClick={handleWireframeToggle}
          title="Toggle Wireframe"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            wireframe
              ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white"
              : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Isometric wireframe cube SVG icon */}
          <svg
            className="s3d-w-5 s3d-h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25M12 12.75v9"
            />
          </svg>
        </button>

        {/* Debug Normals Button */}
        <button
          onClick={handleDebugNormalsToggle}
          title="Toggle Debug Normals"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            debugNormals
              ? "s3d-bg-amber-600/80 s3d-border-amber-400 s3d-text-white"
              : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Face with a perpendicular normal line SVG icon */}
          <svg
            className="s3d-w-5 s3d-h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 17l8-10 8 10H4z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 13V3" />
          </svg>
        </button>

        {/* Debug Axis Button */}
        <button
          onClick={handleDebugAxisToggle}
          title="Toggle Debug Axis"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            debugAxis
              ? "s3d-bg-purple-600/80 s3d-border-purple-400 s3d-text-white"
              : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* 3-axis gizmo SVG icon */}
          <svg
            className="s3d-w-5 s3d-h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12L20 12M12 12L12 4M12 12L6 18"
            />
          </svg>
        </button>

        {/* Fill Pass Toggle Button */}
        <button
          onClick={handleFillToggle}
          title="Toggle Fill Pass"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            fillEnabled
              ? "s3d-bg-cyan-600/80 s3d-border-cyan-400 s3d-text-white"
              : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Solid filled square SVG icon */}
          <svg className="s3d-w-5 s3d-h-5" viewBox="0 0 24 24">
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Shade Pass Toggle Button */}
        <button
          onClick={handleShadeToggle}
          title="Toggle Shade Pass"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            shadeEnabled
              ? "s3d-bg-orange-600/80 s3d-border-orange-400 s3d-text-white"
              : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Half-shaded circle (contrast) SVG icon */}
          <svg
            className="s3d-w-5 s3d-h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 000 18z" fill="currentColor" stroke="none" />
          </svg>
        </button>

        {/* Fog Pass Toggle Button */}
        <button
          onClick={handleFogToggle}
          title="Toggle Fog Pass"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            fogEnabled
              ? "s3d-bg-sky-600/80 s3d-border-sky-400 s3d-text-white"
              : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Horizontal haze/fog lines SVG icon */}
          <svg
            className="s3d-w-5 s3d-h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" d="M3 8h13M3 12h17M3 16h10" />
          </svg>
        </button>

        {/* Debug Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle Diagnostics"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            isOpen
              ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white"
              : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Speedometer/Gauge icon */}
          <svg
            className="s3d-w-5 s3d-h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm0 0v3m-6.36 1.36l2.12 2.12M12 12l3.54-3.54"
            />
          </svg>
        </button>
      </div>

      {/* Diagnostics Panel */}
      {isOpen && (
        <div className="s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col">
          <div className="s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5">
            <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold">
              FPS / FPS (max)
            </span>
            <span className="s3d-font-mono s3d-text-sm s3d-font-semibold">
              <span className="s3d-text-emerald-400">{stats.fps}</span>
              <span className="s3d-text-slate-500"> / </span>
              <span className="s3d-text-slate-200">{stats.maxFps}</span>
            </span>
          </div>

          <div className="s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]">
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Device DPR
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {(window.devicePixelRatio || 1).toFixed(2)}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Objects (Scene)
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {stats.totalObjects}
              </span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Objects (Screen)
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {stats.visibleObjects}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Faces (screen)
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {stats.faces}
              </span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Scene Update
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.updateTime)}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Scene Retrieval
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.retrieveTime)}
              </span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Object Culling
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.cullTime)}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Layer Grouping
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.groupTime)}
              </span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Process Meshes
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.processTime)}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Sort Faces
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.sortTime)}
              </span>
            </div>

            <div className="s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5"></div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Fill Draw Calls
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {stats.fillDrawCalls}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Fill Render
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.fillRasterTime)}
              </span>
            </div>

            <div className="s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5"></div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Shade Draw Calls
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {stats.shadeDrawCalls}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Shade Render
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.shadeRasterTime)}
              </span>
            </div>

            <div className="s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5"></div>

            <div className="s3d-flex s3d-flex-col s3d-col-span-2">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Fog Sort
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.fogSortTime)}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Fog Draw Calls
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {stats.fogDrawCalls}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Fog Render
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.fogRasterTime)}
              </span>
            </div>

            <div className="s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5"></div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Draw Calls
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">
                {stats.drawCallsTotal}
              </span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">
                Frame Time
              </span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">
                {formatSortTime(stats.frameTime)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
