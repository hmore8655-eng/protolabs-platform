import React, { useRef } from 'react';

/**
 * Lightweight CSS 3D hero object.
 * This is constructed from actual DOM geometry rather than a background image,
 * so it renders locally without a 3D service, external model or WebGL dependency.
 */
export const Hero3DStructure = () => {
  const stageRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!stageRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    stageRef.current.style.setProperty('--pl3d-pointer-x', (x * 3.5).toFixed(2) + 'deg');
    stageRef.current.style.setProperty('--pl3d-pointer-y', (y * -3).toFixed(2) + 'deg');
  };

  const resetPointer = () => {
    if (!stageRef.current) return;
    stageRef.current.style.setProperty('--pl3d-pointer-x', '0deg');
    stageRef.current.style.setProperty('--pl3d-pointer-y', '0deg');
  };

  return (
  <div ref={stageRef} className="pl3d-stage" onPointerMove={handlePointerMove} onPointerLeave={resetPointer} role="img" aria-label="Three-dimensional conceptual electronics development board with processor, components, connectors and circuit traces">
    <div className="pl3d-orbit pl3d-orbit--one" />
    <div className="pl3d-orbit pl3d-orbit--two" />
    <div className="pl3d-board-wrap">
      <div className="pl3d-board">
        <div className="pl3d-board-edge" />
        <div className="pl3d-trace pl3d-trace--a" />
        <div className="pl3d-trace pl3d-trace--b" />
        <div className="pl3d-trace pl3d-trace--c" />
        <div className="pl3d-trace pl3d-trace--d" />
        <div className="pl3d-trace pl3d-trace--e" />
        <div className="pl3d-trace pl3d-trace--f" />
        <div className="pl3d-contact pl3d-contact--left" />
        <div className="pl3d-contact pl3d-contact--right" />
        <div className="pl3d-mount pl3d-mount--tl"><i /></div>
        <div className="pl3d-mount pl3d-mount--tr"><i /></div>
        <div className="pl3d-mount pl3d-mount--bl"><i /></div>
        <div className="pl3d-mount pl3d-mount--br"><i /></div>
        <div className="pl3d-pin-header"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="pl3d-antenna"><i /><i /><i /></div>
        <div className="pl3d-chip pl3d-chip--main"><span>PL</span><i /><b /></div>
        <div className="pl3d-chip pl3d-chip--memory"><i /><i /><i /><i /></div>
        <div className="pl3d-chip pl3d-chip--radio"><span>RF</span></div>
        <div className="pl3d-chip pl3d-chip--small" />
        <div className="pl3d-port pl3d-port--one"><i /><i /><i /><i /><i /><i /></div>
        <div className="pl3d-port pl3d-port--two"><i /><i /><i /><i /></div>
        <div className="pl3d-capacitors"><i /><i /><i /><i /><i /></div>
        <div className="pl3d-led pl3d-led--one" />
        <div className="pl3d-led pl3d-led--two" />
        <div className="pl3d-board-mark">PROTO / LABS <span>REV. 01</span></div>
      </div>
    </div>
    <div className="pl3d-caption pl3d-caption--top"><span className="pl3d-caption__line" /><span>01 / COMPUTE MODULE</span></div>
    <div className="pl3d-caption pl3d-caption--bottom"><span>ENGINEERED FROM THE BOARD UP</span><span className="pl3d-caption__line" /></div>
    <div className="pl3d-axis"><span>X</span><span>Y</span><span>Z</span><i /></div>
    <style>{`
      .pl3d-stage{--pl3d-pointer-x:0deg;--pl3d-pointer-y:0deg;position:absolute;inset:0;overflow:hidden;perspective:1100px;isolation:isolate;touch-action:pan-y}
      .pl3d-stage:before{content:"";position:absolute;width:74%;aspect-ratio:1;left:14%;top:7%;border-radius:50%;background:radial-gradient(circle,rgba(217,108,54,.16),rgba(217,108,54,.035) 40%,transparent 70%);filter:blur(12px)}
      .pl3d-orbit{position:absolute;width:74%;height:52%;left:13%;top:24%;border:1px solid rgba(244,238,223,.12);border-radius:50%;transform:rotate(-28deg) rotateX(64deg)}
      .pl3d-orbit--two{width:91%;height:66%;left:4%;top:17%;border-color:rgba(217,108,54,.2);transform:rotate(23deg) rotateX(66deg)}
      .pl3d-board-wrap{position:absolute;inset:8% 0 7%;display:grid;place-items:center;perspective:1200px;animation:pl3d-float 7s ease-in-out infinite}
      .pl3d-board{position:relative;width:min(76%,440px);aspect-ratio:1.22;transform:rotateX(calc(58deg + var(--pl3d-pointer-y))) rotateY(var(--pl3d-pointer-x)) rotateZ(-31deg);transform-style:preserve-3d;transition:transform .25s ease-out;border:1px solid #69816b;border-radius:9px;background:linear-gradient(135deg,#244b3c 0%,#153528 58%,#10271f 100%);box-shadow:0 22px 0 #10251d,0 26px 0 #0a1914,0 46px 55px rgba(0,0,0,.55),inset 0 0 0 8px rgba(8,24,17,.35),inset 0 0 0 10px rgba(154,179,132,.12)}
      .pl3d-board:before{content:"";position:absolute;inset:5%;border:1px solid rgba(209,185,116,.3);border-radius:4px;background-image:radial-gradient(circle,rgba(220,188,110,.6) 1px,transparent 1.8px);background-size:18px 18px;opacity:.65}
      .pl3d-board:after{content:"";position:absolute;inset:0;border-radius:9px;background:linear-gradient(130deg,rgba(255,255,255,.12),transparent 28%,transparent 68%,rgba(0,0,0,.15));pointer-events:none}
      .pl3d-board-edge{position:absolute;inset:0;transform:translateZ(-12px);border-radius:9px;background:#0b2118;box-shadow:0 12px 0 #08170f}
      .pl3d-trace{position:absolute;height:3px;background:linear-gradient(90deg,transparent,#c39a51 12%,#e3bd72 52%,#b88a45 88%,transparent);opacity:.9;transform:translateZ(3px);border-radius:2px}
      .pl3d-trace:after{content:"";position:absolute;right:-2px;top:-3px;width:8px;height:8px;border-radius:50%;background:#e8c77e;box-shadow:0 0 9px rgba(232,199,126,.6)}
      .pl3d-trace--a{left:12%;top:27%;width:34%;transform:translateZ(3px) rotate(0deg)}
      .pl3d-trace--b{left:40%;top:18%;width:37%;transform:translateZ(3px) rotate(90deg);transform-origin:left}
      .pl3d-trace--c{left:47%;top:68%;width:37%;transform:translateZ(3px) rotate(-90deg);transform-origin:left}
      .pl3d-trace--d{left:15%;top:73%;width:28%;transform:translateZ(3px)}
      .pl3d-trace--e{left:72%;top:42%;width:19%;transform:translateZ(3px)}
      .pl3d-trace--f{left:25%;top:48%;width:26%;transform:translateZ(3px) rotate(90deg);transform-origin:left}
      .pl3d-chip{position:absolute;transform-style:preserve-3d;background:#1b1e1b;border:1px solid #7b8174;box-shadow:0 5px 0 #0b110e,0 7px 0 #080d0a,0 10px 12px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.22)}
      .pl3d-chip:before,.pl3d-chip:after{content:"";position:absolute;inset:0;pointer-events:none}
      .pl3d-chip:before{transform:translateZ(-5px);background:#111713}
      .pl3d-chip--main{width:30%;height:34%;left:34%;top:32%;transform:translateZ(13px);display:grid;place-items:center;background:linear-gradient(145deg,#323832,#101411);border:2px solid #8d917e;box-shadow:0 6px 0 #0c1510,0 10px 0 #08110c,0 16px 22px rgba(0,0,0,.5),inset 0 0 0 5px #202720}
      .pl3d-chip--main span{font-size:clamp(12px,1.4vw,19px);font-weight:800;letter-spacing:.18em;color:#d5b46d;text-shadow:0 1px 0 #000}
      .pl3d-chip--main i{position:absolute;inset:-6px 8px;border-left:2px solid #b7b6a0;border-right:2px solid #b7b6a0}
      .pl3d-chip--main b{position:absolute;inset:8px -6px;border-top:2px solid #b7b6a0;border-bottom:2px solid #b7b6a0}
      .pl3d-chip--memory{width:18%;height:18%;left:12%;top:19%;transform:translateZ(8px);display:grid;grid-template-columns:repeat(2,1fr);gap:5px;padding:8px;background:#252925}
      .pl3d-chip--memory i{background:#3c443c;border:1px solid #697060;box-shadow:0 2px 0 #0b110d}
      .pl3d-chip--radio{width:20%;height:17%;right:10%;top:20%;transform:translateZ(8px);display:grid;place-items:center;background:linear-gradient(135deg,#55584e,#242822)}
      .pl3d-chip--radio span{font-size:clamp(9px,1vw,13px);font-weight:800;letter-spacing:.1em;color:#d9d1b9}
      .pl3d-chip--small{width:15%;height:13%;left:16%;bottom:15%;transform:translateZ(6px);background:linear-gradient(145deg,#41473d,#171d17)}
      .pl3d-port{position:absolute;display:flex;gap:4px;padding:5px;background:#141a15;border:1px solid #a8a58b;box-shadow:0 5px 0 #09110c,0 7px 8px rgba(0,0,0,.4);transform:translateZ(9px)}
      .pl3d-port i{display:block;width:7px;height:12px;background:linear-gradient(90deg,#8c8c79,#d4c79c,#686d5e);box-shadow:0 1px 0 #111}
      .pl3d-port--one{right:5%;top:53%;transform:translateZ(9px) rotate(90deg);transform-origin:center}
      .pl3d-port--two{left:9%;top:51%;transform:translateZ(9px) rotate(90deg)}
      .pl3d-capacitors{position:absolute;right:17%;bottom:13%;display:flex;gap:7px;transform:translateZ(8px)}
      .pl3d-capacitors i{width:10px;height:18px;border-radius:2px;background:linear-gradient(90deg,#8d8e7d,#d2c8a2,#646858);box-shadow:0 4px 0 #141914,0 6px 5px #07110b}
      .pl3d-led{position:absolute;width:7px;height:7px;border-radius:50%;background:#f06b3d;box-shadow:0 0 9px 3px rgba(240,107,61,.3);transform:translateZ(10px)}
      .pl3d-led--one{left:26%;top:25%}.pl3d-led--two{right:26%;bottom:23%;background:#e2c06e;box-shadow:0 0 8px 2px rgba(226,192,110,.28)}
      .pl3d-contact{position:absolute;top:8%;bottom:8%;width:7px;background:repeating-linear-gradient(180deg,#d8b66b 0 7px,transparent 7px 13px);opacity:.8;transform:translateZ(2px)}
      .pl3d-contact--left{left:3%}.pl3d-contact--right{right:3%}
      .pl3d-mount{position:absolute;width:18px;height:18px;border-radius:50%;background:linear-gradient(145deg,#d9c995,#7e806b 55%,#373e32);border:2px solid #7f876d;box-shadow:0 3px 0 #0a1b12,0 5px 6px rgba(0,0,0,.35);transform:translateZ(5px);display:grid;place-items:center;z-index:2}
      .pl3d-mount i{display:block;width:7px;height:7px;border-radius:50%;background:#17271c;border:1px solid rgba(235,219,166,.5);box-shadow:inset 0 1px 2px #050b07}
      .pl3d-mount--tl{left:6%;top:7%}.pl3d-mount--tr{right:6%;top:7%}.pl3d-mount--bl{left:6%;bottom:7%}.pl3d-mount--br{right:6%;bottom:7%}
      .pl3d-pin-header{position:absolute;left:48%;top:7%;display:flex;gap:5px;transform:translateZ(7px)}
      .pl3d-pin-header i{width:4px;height:19px;background:linear-gradient(90deg,#7e806f,#d7cda7,#737b68);box-shadow:0 3px 0 #0b1710}
      .pl3d-antenna{position:absolute;right:14%;top:41%;display:flex;gap:5px;transform:translateZ(6px) rotate(90deg);transform-origin:center}
      .pl3d-antenna i{display:block;width:5px;height:23px;background:linear-gradient(90deg,#888b79,#e0d4b0,#777b68);box-shadow:0 2px 0 #0b1710}
      .pl3d-board-mark{position:absolute;left:9%;bottom:5%;font-size:clamp(6px,.65vw,9px);letter-spacing:.2em;color:rgba(230,222,184,.7);transform:translateZ(4px)}
      .pl3d-board-mark span{margin-left:12px;color:rgba(230,222,184,.42)}
      .pl3d-caption{position:absolute;z-index:2;display:flex;align-items:center;gap:.7rem;color:rgba(244,238,223,.65);font-size:.58rem;letter-spacing:.16em}
      .pl3d-caption__line{display:block;width:42px;height:1px;background:#d96c36}
      .pl3d-caption--top{right:1%;top:22%}.pl3d-caption--bottom{left:4%;bottom:14%}
      .pl3d-axis{position:absolute;right:7%;bottom:15%;display:flex;gap:8px;color:rgba(244,238,223,.4);font-size:.58rem}
      .pl3d-axis i{position:absolute;width:22px;height:22px;border:1px solid rgba(217,108,54,.45);border-radius:50%;right:-9px;top:-8px}
      @keyframes pl3d-float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(1deg)}}
      @media(max-width:900px){.pl3d-board{width:min(72%,390px)}.pl3d-caption--top{top:18%;right:0}.pl3d-caption--bottom{bottom:12%;left:0}.pl3d-axis{display:none}}
      @media(max-width:560px){.pl3d-stage{opacity:.65}.pl3d-board-wrap{inset:15% -14% 9% 8%}.pl3d-board{width:88%}.pl3d-caption{font-size:.48rem}.pl3d-caption--top{top:22%}.pl3d-caption--bottom{bottom:10%}.pl3d-orbit{width:100%;left:0}}
      @media(prefers-reduced-motion:reduce){.pl3d-board-wrap{animation:none}.pl3d-board{transition:none}}
    `}</style>
  </div>
  );
};
