import React, { useState, useEffect } from 'react';

const formatSortTime = (val) => {
  if (typeof val !== 'number') return 'N/A';
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
    drawTime: 0,
    updateTime: 0,
    retrieveTime: 0,
    frameTime: 0,
    drawCalls: 0,
    dt: 0,
  });
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('s3d-debug-open') === 'true';
  });
  const [wireframe, setWireframe] = useState(false);

  // Sync wireframe from the viewport on load and when it changes
  useEffect(() => {
    const checkWireframe = () => {
      if (viewport) {
        setWireframe(!!viewport.wireframe);
      }
    };
    checkWireframe();
    const interval = setInterval(checkWireframe, 500);
    return () => clearInterval(interval);
  }, [viewport]);

  // Update open/closed state persistence
  useEffect(() => {
    localStorage.setItem('s3d-debug-open', isOpen);
  }, [isOpen]);

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
          drawTime: renderStats.drawTime || 0,
          updateTime: renderStats.updateTime || 0,
          retrieveTime: renderStats.retrieveTime || 0,
          frameTime: renderStats.frameTime || 0,
          drawCalls: renderStats.drawCalls || 0,
          dt: renderStats.dt || 0,
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
    window.dispatchEvent(new CustomEvent('s3d-wireframe-change', {
      detail: { enabled: nextWireframe }
    }));
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
              ? 's3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white'
              : 's3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80'
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Isometric wireframe cube SVG icon */}
          <svg className="s3d-w-5 s3d-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25M12 12.75v9" />
          </svg>
        </button>

        {/* Debug Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle Diagnostics"
          className={`s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${
            isOpen
              ? 's3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white'
              : 's3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80'
          } s3d-backdrop-blur-md s3d-shadow-lg`}
        >
          {/* Speedometer/Gauge icon */}
          <svg className="s3d-w-5 s3d-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm0 0v3m-6.36 1.36l2.12 2.12M12 12l3.54-3.54" />
          </svg>
        </button>
      </div>

      {/* Diagnostics Panel */}
      {isOpen && (
        <div className="s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col">
          <div className="s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5">
            <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold">FPS / FPS (max)</span>
            <span className="s3d-font-mono s3d-text-sm s3d-font-semibold">
              <span className="s3d-text-emerald-400">{stats.fps}</span>
              <span className="s3d-text-slate-500"> / </span>
              <span className="s3d-text-slate-200">{stats.maxFps}</span>
            </span>
          </div>

          <div className="s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]">
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Device DPR</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">{(window.devicePixelRatio || 1).toFixed(2)}</span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Objects (Scene)</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">{stats.totalObjects}</span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Objects (Screen)</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">{stats.visibleObjects}</span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Faces (screen)</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200">{stats.faces}</span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Scene Update</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.updateTime)}</span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Scene Retrieval</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.retrieveTime)}</span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Object Culling</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.cullTime)}</span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Layer Grouping</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.groupTime)}</span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Process Meshes</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.processTime)}</span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Sort Faces</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.sortTime)}</span>
            </div>

            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Rasterize Faces</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.drawTime)}</span>
            </div>
            <div className="s3d-flex s3d-flex-col">
              <span className="s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide">Render (total)</span>
              <span className="s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200">{formatSortTime(stats.dt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
