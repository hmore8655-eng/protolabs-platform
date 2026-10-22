import React, { useEffect, useRef, useState } from 'react';

/**
 * Interactive WebGL electronics board. Three.js is loaded on demand so it does
 * not increase the initial JavaScript bundle; a CSS fallback is shown if WebGL
 * or the CDN is unavailable.
 */
export const Hero3DStructure = () => {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let renderer;
    let frameId;
    let observer;
    let cleanup = () => {};

    const boot = async () => {
      try {
        const THREE = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
        if (disposed || !mountRef.current) return;

        const mount = mountRef.current;
        const scene = new THREE.Scene();
        scene.background = null;
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(7.8, 7.2, 9.5);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.setSize(mount.clientWidth || 600, mount.clientHeight || 520);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.domElement.className = 'pl3d-webgl-canvas';
        renderer.domElement.setAttribute('aria-hidden', 'true');
        mount.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xc5d8c4, 1.7));
        const key = new THREE.DirectionalLight(0xffe0b5, 3.2);
        key.position.set(5, 8, 4);
        scene.add(key);
        const rim = new THREE.PointLight(0xe86e42, 16, 18);
        rim.position.set(-5, 3, -3);
        scene.add(rim);
        const fill = new THREE.PointLight(0x6e9d78, 9, 16);
        fill.position.set(2, 1, 6);
        scene.add(fill);

        const board = new THREE.Group();
        scene.add(board);
        const mat = (color, roughness = 0.55, metalness = 0.15) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
        const pcb = mat(0x214b39, 0.42, 0.32);
        const edge = mat(0x10291e, 0.5, 0.18);
        const copper = mat(0xc99c52, 0.34, 0.72);
        const dark = mat(0x101512, 0.34, 0.48);
        const chipTop = mat(0x242925, 0.3, 0.3);
        const silver = mat(0x9ba397, 0.26, 0.72);
        const white = mat(0xd4d0b9, 0.4, 0.25);
        const orange = mat(0xe86e42, 0.3, 0.35);

        const addBox = (parent, size, position, material, bevel = false) => {
          const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(...position);
          mesh.castShadow = false;
          mesh.receiveShadow = true;
          parent.add(mesh);
          return mesh;
        };

        // Layered PCB core and fine copper perimeter.
        addBox(board, [6.2, 0.24, 4.65], [0, 0, 0], edge);
        addBox(board, [6.15, 0.12, 4.6], [0, 0.17, 0], pcb);
        const perimeter = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.018, 4.45), copper);
        perimeter.position.y = 0.235;
        board.add(perimeter);
        addBox(board, [5.94, 0.025, 4.39], [0, 0.252, 0], pcb);

        // Circuit traces are raised metallic tracks with deliberate right angles.
        const trace = (points, radius = 0.025) => {
          const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p[0], 0.278, p[1])));
          const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, points.length * 8, radius, 5, false), copper);
          board.add(mesh);
        };
        trace([[-2.6, -1.45], [-1.8, -1.45], [-1.8, -0.8], [-0.7, -0.8]]);
        trace([[2.75, -1.25], [1.9, -1.25], [1.9, -0.72], [1.25, -0.72]]);
        trace([[-2.7, 1.15], [-1.75, 1.15], [-1.75, 0.72], [-1.1, 0.72]]);
        trace([[2.65, 1.5], [2.1, 1.5], [2.1, 0.95], [1.35, 0.95]]);
        trace([[-2.75, 0.05], [-2.15, 0.05], [-2.15, -0.35], [-1.65, -0.35]]);
        trace([[0.1, -2.0], [0.1, -1.5], [0.75, -1.5], [0.75, -1.1]]);
        trace([[-0.8, 2.0], [-0.8, 1.45], [-0.2, 1.45]]);

        // Main processor package with pins around all four sides.
        addBox(board, [1.72, 0.16, 1.55], [-0.05, 0.36, 0.05], silver);
        addBox(board, [1.53, 0.23, 1.36], [-0.05, 0.53, 0.05], dark);
        addBox(board, [1.35, 0.045, 1.18], [-0.05, 0.67, 0.05], chipTop);
        addBox(board, [0.72, 0.012, 0.34], [-0.05, 0.701, 0.05], mat(0x353d35, 0.4, 0.2));
        for (let i = 0; i < 9; i++) {
          const p = -0.58 + i * 0.145;
          addBox(board, [0.065, 0.06, 0.09], [p, 0.49, -0.79], silver);
          addBox(board, [0.065, 0.06, 0.09], [p, 0.49, 0.89], silver);
          addBox(board, [0.09, 0.06, 0.065], [-0.94, 0.49, p], silver);
          addBox(board, [0.09, 0.06, 0.065], [0.84, 0.49, p], silver);
        }

        // Memory and RF modules.
        addBox(board, [0.9, 0.13, 0.65], [-1.85, 0.36, -0.8], silver);
        addBox(board, [0.78, 0.16, 0.53], [-1.85, 0.48, -0.8], dark);
        for (let i = 0; i < 4; i++) addBox(board, [0.12, 0.02, 0.36], [-2.12 + i * 0.18, 0.57, -0.8], mat(0x454b43, 0.35, 0.45));
        addBox(board, [0.95, 0.14, 0.72], [1.85, 0.35, 0.85], silver);
        addBox(board, [0.82, 0.18, 0.58], [1.85, 0.49, 0.85], dark);
        addBox(board, [0.58, 0.02, 0.28], [1.85, 0.59, 0.85], mat(0x303a31, 0.35, 0.4));

        // Port housings and metal contact blades along the board edge.
        for (let i = 0; i < 3; i++) {
          const x = -2.15 + i * 0.78;
          addBox(board, [0.57, 0.38, 0.68], [x, 0.43, -1.73], silver);
          addBox(board, [0.46, 0.24, 0.51], [x, 0.46, -1.7], dark);
          addBox(board, [0.32, 0.1, 0.035], [x, 0.46, -1.43], mat(0x080b09, 0.25, 0.2));
        }
        for (let i = 0; i < 12; i++) {
          const x = -2.5 + i * 0.455;
          addBox(board, [0.19, 0.055, 0.12], [x, 0.34, 2.12], copper);
          addBox(board, [0.1, 0.055, 0.16], [x, 0.34, 2.18], silver);
        }

        // Capacitors, resistors, indicator LEDs and mounting holes.
        for (let i = 0; i < 6; i++) {
          const x = -2.3 + i * 0.34;
          addBox(board, [0.19, 0.16, 0.22], [x, 0.39, 1.45], dark);
          addBox(board, [0.2, 0.035, 0.23], [x, 0.48, 1.45], silver);
        }
        const ledGeometry = new THREE.SphereGeometry(0.075, 14, 10);
        [[-2.45, 0.62, 0.72], [-2.1, 0.62, 0.72], [2.52, 0.62, -0.25]].forEach((p, i) => {
          const led = new THREE.Mesh(ledGeometry, i === 2 ? orange : mat(0x9ccf8b, 0.2, 0.1));
          led.position.set(...p);
          board.add(led);
        });
        const holeMat = mat(0x0b1811, 0.65, 0.1);
        const ringGeo = new THREE.TorusGeometry(0.16, 0.035, 8, 24);
        [[-2.78, -2.0], [2.78, -2.0], [-2.78, 2.0], [2.78, 2.0]].forEach(([x, z]) => {
          const ring = new THREE.Mesh(ringGeo, copper);
          ring.rotation.x = Math.PI / 2;
          ring.position.set(x, 0.27, z);
          board.add(ring);
          const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.025, 24), holeMat);
          hole.position.set(x, 0.29, z);
          board.add(hole);
        });

        // Keep the product itself as the hero: no orbit ring or floor grid.
        // Those decorative overlays competed with the hardware and made it
        // feel like a generic tech demo rather than a photographed prototype.
        board.rotation.set(-0.07, 0.08, 0);
        board.position.set(0, 0, 0);

        const resize = () => {
          if (!mount.clientWidth || !mount.clientHeight) return;
          camera.aspect = mount.clientWidth / mount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
          renderer.render(scene, camera);
        };
        observer = new ResizeObserver(resize);
        observer.observe(mount);
        renderer.render(scene, camera);

        cleanup = () => {
          observer?.disconnect();
          if (frameId) cancelAnimationFrame(frameId);
          scene.traverse(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach(material => material.dispose());
            }
          });
          renderer?.dispose();
          renderer?.domElement?.remove();
        };
      } catch (error) {
        console.warn('Interactive 3D hero unavailable; showing the CSS fallback.', error);
        if (!disposed) setFailed(true);
      }
    };

    boot();
    return () => {
      disposed = true;
      cleanup();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pl3d-stage" role="img" aria-label="Interactive three-dimensional electronics development board with processor, memory modules, connectors and circuit traces">
      <div ref={mountRef} className="pl3d-webgl-mount" />
      {failed && <div className="pl3d-fallback" aria-hidden="true">
        <div className="pl3d-fallback-board"><span>PL</span><i /><b /><small>PROTO / LABS · REV 01</small></div>
      </div>}
      <div className="pl3d-caption pl3d-caption--top"><span className="pl3d-caption__line" /><span>01 / COMPUTE MODULE</span></div>
      <div className="pl3d-caption pl3d-caption--bottom"><span>ENGINEERED FROM THE BOARD UP</span><span className="pl3d-caption__line" /></div>
      <div className="pl3d-axis"><span>X</span><span>Y</span><span>Z</span><i /></div>
      <style>{`
        .pl3d-stage{position:absolute;inset:0;overflow:hidden;perspective:1100px;isolation:isolate;touch-action:pan-y}
        .pl3d-stage:before{content:"";position:absolute;width:76%;aspect-ratio:1;left:12%;top:5%;border-radius:50%;background:radial-gradient(circle,rgba(217,108,54,.17),rgba(217,108,54,.035) 43%,transparent 70%);filter:blur(15px);pointer-events:none}
        .pl3d-webgl-mount{position:absolute;inset:4% 0 3%;z-index:1}
        .pl3d-webgl-canvas{display:block;width:100%;height:100%;outline:none}
        .pl3d-caption{position:absolute;z-index:3;display:flex;align-items:center;gap:.65rem;color:rgba(244,241,235,.58);font-size:.58rem;font-weight:700;letter-spacing:.18em}
        .pl3d-caption__line{display:block;width:28px;height:1px;background:#d96c36}
        .pl3d-caption--top{top:14%;left:2%}
        .pl3d-caption--bottom{bottom:12%;right:2%}
        .pl3d-axis{position:absolute;z-index:3;left:5%;bottom:13%;display:flex;align-items:center;gap:.35rem;color:rgba(244,241,235,.52);font-size:.55rem;letter-spacing:.1em}
        .pl3d-axis span{border:1px solid rgba(244,241,235,.2);padding:.22rem .3rem}
        .pl3d-axis i{display:block;width:26px;height:1px;background:#d96c36;margin-left:.3rem}
        .pl3d-fallback{position:absolute;inset:18% 12%;display:grid;place-items:center;perspective:900px}
        .pl3d-fallback-board{position:relative;width:70%;aspect-ratio:1.3;display:grid;place-items:center;border:1px solid #728d6b;border-radius:8px;background:linear-gradient(135deg,#244b3c,#10271f);box-shadow:0 18px 0 #0b1c13,0 35px 45px #0007;transform:rotateX(58deg) rotateZ(-28deg);color:#e9c57c;font-size:3rem;font-weight:800}
        .pl3d-fallback-board i,.pl3d-fallback-board b{position:absolute;width:24%;height:24%;border:5px solid #899186;background:#181d18;box-shadow:0 6px 0 #0a110d}
        .pl3d-fallback-board b{width:15%;height:18%;right:12%;top:15%}
        .pl3d-fallback-board small{position:absolute;bottom:10%;font-size:.35rem;letter-spacing:.18em;color:#c4c8b9}
        @media(max-width:700px){.pl3d-caption{font-size:.48rem}.pl3d-caption--top{top:9%}.pl3d-caption--bottom{bottom:8%}.pl3d-axis{bottom:8%}}
        @media(prefers-reduced-motion:reduce){.pl3d-stage *{animation:none!important;transition:none!important}}
      `}</style>
    </div>
  );
};
