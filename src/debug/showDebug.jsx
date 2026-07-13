import React from 'react';
import { createRoot } from 'react-dom/client';
import DebugPanel from './DebugPanel.jsx';
import "./debug.css"; // Regular CSS import to compile style.css for external reference

export function showDebug(viewport) {
  if (!viewport || !viewport.canvas) {
    console.error("showDebug: Invalid viewport parameter passed.");
    return;
  }

  const canvas = viewport.canvas;
  const parent = canvas.parentElement || document.body;

  // Ensure parent container is positioned relatively so the absolute debug panel coordinates with it
  if (parent && getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }

  // Prevent duplicate mounts on same parent
  let mountPoint = parent.querySelector('#s3d-debug-root');
  if (mountPoint) {
    return;
  }

  mountPoint = document.createElement('div');
  mountPoint.id = 's3d-debug-root';
  mountPoint.className = 's3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]';
  parent.appendChild(mountPoint);

  const root = createRoot(mountPoint);
  root.render(<DebugPanel viewport={viewport} />);
}
