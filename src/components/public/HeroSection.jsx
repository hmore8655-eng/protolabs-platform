import React, { useEffect } from 'react';
import { ArrowRightIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const HeroSection = () => {
  const { data } = useApp();
  const { hero } = data;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const root = document.querySelector('.forma-home');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let animationInstance;
    const animateIn = () => {
      if (cancelled || !window.anime) return;
      const anime = window.anime;
      animationInstance = anime.timeline({ easing: 'easeOutExpo' })
        .add({ targets: root.querySelectorAll('[data-intro]'), opacity: [0, 1], translateY: [26, 0], delay: anime.stagger(90), duration: 850 })
        .add({ targets: root.querySelectorAll('[data-part]'), opacity: [0, 1], translateY: [22, 0], delay: anime.stagger(55), duration: 950 }, '-=500');
      anime({
        targets: root.querySelectorAll('[data-float]'),
        translateY: (el, i) => i % 2 ? [0, -9] : [0, 8],
        rotate: (el, i) => i % 2 ? [0, 1.2] : [0, -1],
        duration: 2600,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: anime.stagger(110),
      });
      anime({ targets: root.querySelector('.forma-art__orbit'), rotate: 360, duration: 32000, loop: true, easing: 'linear' });
    };

    if (window.anime) {
      animateIn();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js';
      script.async = true;
      script.onload = animateIn;
      script.onerror = () => root.classList.add('motion-fallback');
      document.head.appendChild(script);
    }
    return () => {
      cancelled = true;
      if (animationInstance?.pause) animationInstance.pause();
    };
  }, []);

  return (
    <section id="hero" className="forma-home">
      <div className="forma-home__grain" aria-hidden="true" />
      <div className="forma-home__topline">
        <span data-intro>INDEPENDENT HARDWARE &amp; PRODUCT ENGINEERING</span>
        <span data-intro>DESIGN / DEVELOP / DELIVER <i>↘</i></span>
      </div>

      <div className="forma-home__headline">
        <p className="forma-home__eyebrow" data-intro><span /> IDEAS, MADE TANGIBLE</p>
        <h1 data-intro>We turn ambitious ideas<br /><em>into working hardware.</em></h1>
        <div className="forma-home__intro-row">
          <p data-intro>{hero.subheading || 'From the first circuit to a field-ready product, ProtoLabs brings electronics, embedded software and rapid prototyping together under one roof.'}</p>
          <div className="forma-home__actions" data-intro>
            <button className="forma-home__button forma-home__button--primary" onClick={() => scrollToSection('catalog')}>
              Explore projects <ArrowRightIcon size={17} />
            </button>
            <button className="forma-home__text-link" onClick={() => scrollToSection('why-us')}>How we work <span>↗</span></button>
          </div>
        </div>
      </div>

      <div className="forma-art" aria-label="Illustrated exploded engineering assembly">
        <div className="forma-art__meta forma-art__meta--left" data-intro><span>FIG. 001</span><b>CONCEPT TO PROTOTYPE</b></div>
        <div className="forma-art__meta forma-art__meta--right" data-intro><span className="forma-art__status" /> SYSTEM STUDY / 2026</div>
        <svg className="forma-art__drawing" viewBox="0 0 1320 500" role="img" aria-labelledby="forma-art-title">
          <title id="forma-art-title">Exploded assembly of a compact electronic product with enclosure, circuit board, components and precision fasteners</title>
          <defs>
            <linearGradient id="forma-shell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f7f1e5" /><stop offset="1" stopColor="#d7cdbb" /></linearGradient>
            <linearGradient id="forma-pcb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#607a62" /><stop offset="1" stopColor="#263f35" /></linearGradient>
            <linearGradient id="forma-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e7a16d" /><stop offset="1" stopColor="#a64f2e" /></linearGradient>
            <filter id="forma-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="15" stdDeviation="12" floodColor="#393a30" floodOpacity=".16" /></filter>
          </defs>
          <g className="forma-art__orbit" opacity=".72" transform="translate(675 270)">
            <ellipse rx="475" ry="145" fill="none" stroke="#bdb3a2" strokeWidth="1" strokeDasharray="3 8" />
            <ellipse rx="420" ry="116" fill="none" stroke="#d96c36" strokeWidth="1" strokeDasharray="2 11" transform="rotate(-12)" />
            <circle cx="474" cy="0" r="4" fill="#d96c36" />
          </g>
          <g className="forma-art__leader" fill="none" stroke="#a59b8b" strokeWidth="1">
            <path d="M330 118 L420 118 L462 160" /><path d="M925 88 L862 88 L822 142" />
            <path d="M1010 355 L950 355 L910 320" /><path d="M245 348 L318 348 L368 320" />
          </g>
          <g data-part data-float transform="translate(0 0)" filter="url(#forma-shadow)">
            <path d="M470 80 L790 30 L1005 128 L681 181 Z" fill="url(#forma-shell)" stroke="#b6ab98" strokeWidth="1.5" />
            <path d="M470 80 L681 181 L681 208 L470 106 Z" fill="#c6bba8" />
            <path d="M681 181 L1005 128 L1005 153 L681 208 Z" fill="#b5a995" />
            <path d="M525 86 L788 46 L944 118 L680 159 Z" fill="#eae2d3" stroke="#d0c5b3" />
            <path d="M560 93 L780 59 L901 115 L682 148 Z" fill="#f7f2e8" stroke="#d2c8b8" />
            <circle cx="500" cy="91" r="5" fill="#d96c36" /><circle cx="971" cy="133" r="5" fill="#d96c36" />
          </g>
          <g data-part data-float filter="url(#forma-shadow)">
            <path d="M423 155 L765 101 L1028 224 L684 282 Z" fill="#c4b8a5" stroke="#a99d8b" strokeWidth="1.5" />
            <path d="M423 155 L684 282 L684 300 L423 173 Z" fill="#9d927f" />
            <path d="M684 282 L1028 224 L1028 243 L684 300 Z" fill="#8d8271" />
            <path d="M453 158 L765 112 L997 222 L684 270 Z" fill="url(#forma-pcb)" stroke="#1e392e" strokeWidth="2" />
            <g fill="none" stroke="#d9a56e" strokeWidth="2" opacity=".9"><path d="M500 180 L604 161 L650 183 L740 168 L812 204 L935 184" /><path d="M510 218 L597 201 L640 224 L731 207 L782 232 L893 214" /><path d="M630 145 L651 184 L651 226" /><path d="M824 153 L804 203 L804 227" /></g>
            <g fill="#d9a56e"><circle cx="500" cy="180" r="3" /><circle cx="935" cy="184" r="3" /><circle cx="510" cy="218" r="3" /><circle cx="893" cy="214" r="3" /></g>
            <path d="M619 162 L723 146 L789 177 L684 194 Z" fill="#202923" stroke="#a7afa1" strokeWidth="5" />
            <path d="M631 163 L721 150 L776 176 L685 189 Z" fill="#303a31" />
            <path d="M550 202 L591 195 L616 207 L575 214 Z" fill="#e4d7bf" stroke="#9a8d78" />
            <path d="M825 203 L867 196 L894 209 L851 216 Z" fill="#d96c36" stroke="#9f4d2c" />
            <path d="M704 228 L750 220 L778 234 L732 242 Z" fill="#d7d0bc" stroke="#948b79" />
            {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`translate(${486 + i * 27} ${240 - i * 4.1})`}><rect x="0" y="0" width="15" height="7" rx="1" fill="#d9a56e" /><rect x="2" y="1" width="11" height="5" fill="#f0c38d" /></g>)}
          </g>
          <g data-part data-float filter="url(#forma-shadow)">
            <path d="M525 258 L751 221 L918 300 L690 339 Z" fill="#e5d8c5" stroke="#c6b9a6" strokeWidth="1.5" />
            <path d="M525 258 L690 339 L690 356 L525 275 Z" fill="#c4b49e" />
            <path d="M690 339 L918 300 L918 317 L690 356 Z" fill="#b0a18b" />
            <path d="M567 260 L750 230 L876 291 L692 322 Z" fill="#f4eee2" stroke="#cfc3b1" />
            <path d="M605 267 L678 255 L722 277 L649 289 Z" fill="#d96c36" opacity=".9" />
            <path d="M735 285 L790 276 L823 292 L767 302 Z" fill="#596e58" />
          </g>
          <g data-part>
            {[[395,150],[1016,194],[473,321],[929,358]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><ellipse cx="0" cy="0" rx="12" ry="5" fill="#c5b9a6" stroke="#8f8576" /><ellipse cx="0" cy="-2" rx="5" ry="2.3" fill="#d96c36" /><path d="M-3 2 L-3 24 L3 24 L3 2" fill="#b6a994" /><ellipse cx="0" cy="24" rx="3" ry="1.5" fill="#8f8576" /></g>)}
          </g>
          <g fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="2" fill="#777264">
            <text x="250" y="110">01 / ENCLOSURE</text><text x="930" y="78">02 / PCB ASSEMBLY</text>
            <text x="1025" y="354">03 / BASE PLATE</text><text x="145" y="343">04 / FASTENERS</text>
          </g>
          <g fill="#d96c36"><circle cx="420" cy="118" r="3" /><circle cx="862" cy="88" r="3" /><circle cx="950" cy="355" r="3" /><circle cx="318" cy="348" r="3" /></g>
        </svg>
        <div className="forma-art__caption" data-intro><span>HARDWARE IS ONLY THE BEGINNING.</span><i>SCROLL TO EXPLORE ↓</i></div>
      </div>

      <div className="forma-home__bottomline">
        <span data-intro><b>01</b> / ELECTRONICS</span>
        <span data-intro><b>02</b> / EMBEDDED SYSTEMS</span>
        <span data-intro><b>03</b> / PRODUCT DEVELOPMENT</span>
        <span className="forma-home__bottomline-note" data-intro>BUILT TO MOVE FROM BENCH TO REAL WORLD.</span>
      </div>

      <style>{`
        #hero.forma-home{--paper:#f4eedf;--ink:#292b29;--muted:#747065;--line:#d8cfbf;--orange:#d96c36;position:relative;isolation:isolate;overflow:hidden;display:flex;flex-direction:column;min-height:calc(100svh - 84px);padding:clamp(1.2rem,2.6vw,2.4rem) clamp(1rem,5.1vw,5.5rem) 0!important;background:var(--paper)!important;color:var(--ink);border:0!important}
        #hero.forma-home:before,#hero.forma-home:after{content:none!important}
        #hero.forma-home .forma-home__grain{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.16;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.15'/%3E%3C/svg%3E")}
        #hero.forma-home .forma-home__topline{display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--line);padding:0 0 1rem;color:var(--muted);font-size:.62rem;font-weight:700;letter-spacing:.15em}
        #hero.forma-home .forma-home__topline i{font-style:normal;color:var(--orange);font-size:1rem;margin-left:.4rem}
        #hero.forma-home .forma-home__headline{position:relative;z-index:2;padding-top:clamp(2rem,4.3vw,4.1rem)}
        #hero.forma-home .forma-home__eyebrow{display:flex;align-items:center;gap:.6rem;color:var(--orange);font-size:.67rem;font-weight:800;letter-spacing:.18em;margin-bottom:1.1rem}
        #hero.forma-home .forma-home__eyebrow span{width:28px;height:1px;background:var(--orange)}
        #hero.forma-home h1{max-width:none!important;margin:0!important;color:var(--ink)!important;font-size:clamp(3.5rem,8.1vw,8.4rem)!important;line-height:.88!important;letter-spacing:-.085em!important;font-weight:600!important;text-wrap:balance}
        #hero.forma-home h1 em{font-style:normal;color:var(--orange)}
        #hero.forma-home .forma-home__intro-row{display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;margin-top:1.6rem}
        #hero.forma-home .forma-home__intro-row>p{max-width:460px;margin:0;color:#69665d;font-size:clamp(.94rem,1.1vw,1.08rem);line-height:1.75}
        #hero.forma-home .forma-home__actions{display:flex;align-items:center;gap:1.6rem;flex-shrink:0}
        #hero.forma-home .forma-home__button{display:inline-flex;align-items:center;gap:1.4rem;min-height:50px;padding:.85rem 1.15rem;border:1px solid var(--orange);background:var(--orange);color:#fff8ee;font-size:.78rem;font-weight:750;letter-spacing:.02em;transition:background .2s,transform .2s}
        #hero.forma-home .forma-home__button:hover{background:var(--ink);border-color:var(--ink);transform:translateY(-2px)}
        #hero.forma-home .forma-home__text-link{display:flex;align-items:center;gap:.8rem;color:var(--ink);font-size:.78rem;font-weight:750}
        #hero.forma-home .forma-home__text-link span{color:var(--orange);font-size:1.1rem}
        #hero.forma-home .forma-art{position:relative;flex:1;min-height:310px;margin:1.15rem -2.5vw 0;overflow:hidden}
        #hero.forma-home .forma-art__drawing{position:absolute;width:min(100%,1320px);height:100%;left:50%;top:0;transform:translateX(-50%);overflow:visible}
        #hero.forma-home .forma-art__meta{position:absolute;z-index:2;display:flex;align-items:center;gap:.75rem;font-size:.58rem;letter-spacing:.14em;color:var(--muted)}
        #hero.forma-home .forma-art__meta span{color:var(--orange);font-weight:800}
        #hero.forma-home .forma-art__meta b{font-weight:700}
        #hero.forma-home .forma-art__meta--left{left:3%;top:12%}
        #hero.forma-home .forma-art__meta--right{right:3%;top:12%}
        #hero.forma-home .forma-art__status{width:6px;height:6px;background:var(--orange);border-radius:50%}
        #hero.forma-home .forma-art__caption{position:absolute;left:3%;right:3%;bottom:1rem;display:flex;justify-content:space-between;gap:1rem;color:var(--muted);font-size:.56rem;font-weight:750;letter-spacing:.15em}
        #hero.forma-home .forma-art__caption i{font-style:normal;color:var(--orange)}
        #hero.forma-home .forma-home__bottomline{display:grid;grid-template-columns:repeat(3,max-content) 1fr;align-items:center;gap:clamp(1rem,3vw,3rem);border-top:1px solid var(--line);padding:1rem 0 1.1rem;color:var(--muted);font-size:.59rem;font-weight:750;letter-spacing:.12em}
        #hero.forma-home .forma-home__bottomline b{color:var(--orange);margin-right:.35rem}
        #hero.forma-home .forma-home__bottomline-note{text-align:right}
        #hero.forma-home [data-intro],#hero.forma-home [data-part]{opacity:1}
        #hero.forma-home.motion-fallback [data-intro]{animation:forma-rise .7s both}
        #hero.forma-home.motion-fallback [data-intro]:nth-child(2){animation-delay:.1s}
        #hero.forma-home.motion-fallback [data-part]{animation:forma-rise .9s both}
        @keyframes forma-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:900px){#hero.forma-home{min-height:unset;padding-top:1.3rem!important}#hero.forma-home .forma-home__headline{padding-top:2.6rem}#hero.forma-home h1{font-size:clamp(3.5rem,10.3vw,6.5rem)!important}#hero.forma-home .forma-home__intro-row{align-items:flex-start;flex-direction:column;gap:1.2rem}#hero.forma-home .forma-art{min-height:340px;margin-inline:-3vw}#hero.forma-home .forma-art__drawing{width:125%;max-width:none}#hero.forma-home .forma-home__bottomline{grid-template-columns:repeat(2,1fr);gap:.8rem}#hero.forma-home .forma-home__bottomline-note{text-align:left}}
        @media(max-width:560px){#hero.forma-home{padding-inline:1rem!important}#hero.forma-home .forma-home__topline{font-size:.5rem;letter-spacing:.09em}#hero.forma-home .forma-home__topline span:last-child{max-width:100px;text-align:right}#hero.forma-home h1{font-size:clamp(2.85rem,12vw,4.4rem)!important;line-height:.94!important}#hero.forma-home .forma-home__actions{width:100%;gap:1.2rem;flex-wrap:wrap}#hero.forma-home .forma-home__button{min-height:46px}#hero.forma-home .forma-art{min-height:265px;margin:1.5rem -1rem 0}#hero.forma-home .forma-art__drawing{width:175%;max-width:none;left:49%}#hero.forma-home .forma-art__meta{font-size:.45rem;letter-spacing:.08em}#hero.forma-home .forma-art__meta--left{left:1%;top:3%}#hero.forma-home .forma-art__meta--right{right:1%;top:3%;max-width:115px}#hero.forma-home .forma-art__caption{font-size:.45rem;letter-spacing:.08em;bottom:.5rem}#hero.forma-home .forma-home__bottomline{font-size:.49rem;letter-spacing:.06em;grid-template-columns:1fr 1fr}}
        @media(prefers-reduced-motion:reduce){#hero.forma-home *{animation:none!important;transition:none!important}}
      `}</style>
    </section>
  );
};
