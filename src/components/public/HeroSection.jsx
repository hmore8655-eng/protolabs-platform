import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '../common/Icons';

const scenes = [
  {
    number: '01',
    kicker: 'THE FIRST SPARK',
    title: <>Ideas start<br /><em>as questions.</em></>,
    note: 'A problem worth solving. A sketch on paper. A circuit that might change everything.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=88',
    alt: 'Macro photograph of a detailed electronic circuit board',
    mode: 'dark'
  },
  {
    number: '02',
    kicker: 'ENGINEERED INTO REALITY',
    title: <>Every detail<br /><em>has a purpose.</em></>,
    note: 'Electronics, embedded software and mechanical thinking—developed as one system.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2200&q=88',
    alt: 'Engineer carefully working on a technical prototype',
    mode: 'light'
  },
  {
    number: '03',
    kicker: 'BUILT TO DO MORE',
    title: <>From prototype<br /><em>to possibility.</em></>,
    note: 'Tested, refined and ready to leave the workbench. This is where your idea goes next.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=88',
    alt: 'Precision engineering and product development workspace',
    mode: 'dark'
  }
];

export const HeroSection = () => {
  const rootRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect();
        const travel = Math.max(1, root.offsetHeight - window.innerHeight);
        const next = Math.max(0, Math.min(1, -rect.top / travel));
        setProgress(next);
        setActiveScene(Math.min(2, Math.floor(next * 3)));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="pl-cinema" id="hero" ref={rootRef} aria-label="ProtoLabs engineering story">
      <div className="pl-cinema__stage">
        <div className="pl-cinema__progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
        <div className="pl-cinema__top">
          <span><i /> INDEPENDENT PRODUCT ENGINEERING</span>
          <span className="pl-cinema__top-right">DESIGN / DEVELOP / DELIVER <b>↘</b></span>
        </div>
        {scenes.map((scene, i) => {
          const local = Math.max(0, Math.min(1, progress * 3 - i));
          const active = i === activeScene;
          return (
            <article key={scene.number} className={`pl-scene pl-scene--${scene.mode} ${active ? 'is-active' : ''}`} style={{ '--scene-progress': local, '--scene-index': i }}>
              <img className="pl-scene__image" src={scene.image} alt={scene.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              <div className="pl-scene__shade" />
              <div className="pl-scene__content">
                <div className="pl-scene__kicker"><span>{scene.number}</span> / {scene.kicker}</div>
                <h1>{scene.title}</h1>
                <p>{scene.note}</p>
                {i === 0 && <div className="pl-scene__actions">
                  <button className="pl-cinema__cta" onClick={() => goTo('catalog')}>Explore the work <ArrowRightIcon size={17} /></button>
                  <button className="pl-cinema__link" onClick={() => goTo('contact')}>Start a project <span>↗</span></button>
                </div>}
              </div>
              <div className="pl-scene__annotation"><span>PROTO LABS</span><span>HARDWARE, MADE HUMAN.</span></div>
              <div className="pl-scene__counter">{scene.number}<span> / 03</span></div>
            </article>
          );
        })}
        <div className="pl-cinema__bottom">
          <span>SCROLL TO EXPLORE <i>↓</i></span>
          <div className="pl-cinema__ticks">{scenes.map((scene, i) => <button key={scene.number} aria-label={`Show scene ${i + 1}`} aria-current={activeScene === i ? 'step' : undefined} onClick={() => { const root = rootRef.current; if (root) window.scrollTo({ top: root.offsetTop + (root.offsetHeight - window.innerHeight) * (i / 3 + 0.02), behavior: 'smooth' }); }} />)}</div>
          <span>BUILT AROUND YOUR IDEA <i>↗</i></span>
        </div>
      </div>
      <div className="pl-cinema__after">
        <div><span className="pl-after-label">THE PROTOLABS APPROACH</span><h2>Not just a concept.<br /><em>A thing that works.</em></h2></div>
        <p>We bring electronics, embedded systems and rapid prototyping together to move ambitious ideas from the first sketch to a working product.</p>
        <button onClick={() => goTo('catalog')}>Discover what we build <ArrowRightIcon size={16} /></button>
      </div>
      <style>{`
        #hero.pl-cinema{display:block!important;position:relative!important;padding:0!important;background:#11120f!important;color:#f7f3eb!important;border:0!important;overflow:visible!important}
        #hero.pl-cinema:before,#hero.pl-cinema:after{content:none!important}
        .pl-cinema{--pc-ink:#f5f0e6;--pc-orange:#d96c36;--pc-dark:#11120f;--pc-paper:#f4eedf}
        .pl-cinema__stage{height:300vh;position:relative;background:var(--pc-dark)}
        .pl-cinema__progress{position:absolute;top:0;left:0;right:0;height:2px;z-index:20;background:rgba(255,255,255,.14)}
        .pl-cinema__progress span{display:block;width:100%;height:100%;background:var(--pc-orange);transform-origin:left center}
        .pl-cinema__top{position:absolute;z-index:20;top:0;left:0;right:0;padding:24px clamp(20px,5vw,76px);display:flex;justify-content:space-between;align-items:center;color:rgba(245,240,230,.72);font-size:10px;letter-spacing:.16em;font-weight:700}
        .pl-cinema__top span:first-child{display:flex;align-items:center;gap:10px}.pl-cinema__top span:first-child i{width:7px;height:7px;border-radius:50%;background:var(--pc-orange);display:inline-block}
        .pl-cinema__top-right b{font-size:16px;color:var(--pc-orange);margin-left:8px}
        .pl-scene{position:absolute;inset:0;overflow:hidden;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .7s ease,visibility .7s}
        .pl-scene.is-active{opacity:1;visibility:visible;pointer-events:auto;z-index:2}
        .pl-scene__image{position:absolute;inset:-5%;width:110%;height:110%;object-fit:cover;object-position:center;filter:grayscale(1) contrast(1.08) brightness(.7);transform:scale(calc(1.08 - var(--scene-progress)*.1));transition:filter .8s ease;will-change:transform}
        .pl-scene--light .pl-scene__image{filter:grayscale(.65) contrast(1.02) brightness(.76)}
        .pl-scene__shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,9,8,.87) 0%,rgba(8,9,8,.57) 40%,rgba(8,9,8,.08) 100%),linear-gradient(0deg,rgba(8,9,8,.52),transparent 35%,rgba(8,9,8,.2));}
        .pl-scene--light .pl-scene__shade{background:linear-gradient(90deg,rgba(14,15,13,.82),rgba(14,15,13,.44) 43%,rgba(14,15,13,.05)),linear-gradient(0deg,rgba(14,15,13,.45),transparent 38%)}
        .pl-scene__content{position:absolute;left:clamp(22px,9vw,145px);top:48%;transform:translateY(calc(-50% + (1 - var(--scene-progress))*18px));max-width:min(850px,78vw);transition:transform .5s ease}
        .pl-scene__kicker{font-size:11px;letter-spacing:.2em;font-weight:700;color:rgba(245,240,230,.72);margin-bottom:clamp(20px,3.4vh,38px)}
        .pl-scene__kicker span{color:var(--pc-orange);margin-right:10px}
        .pl-scene h1{font-weight:500!important;font-size:clamp(56px,9.6vw,150px)!important;line-height:.88!important;letter-spacing:-.085em!important;color:#f7f3eb!important;margin:0!important;text-wrap:balance}
        .pl-scene h1 em{font-style:normal;color:#d96c36}
        .pl-scene__content>p{font-size:clamp(14px,1.3vw,18px);line-height:1.7;max-width:420px;color:rgba(245,240,230,.76);margin:28px 0 0}
        .pl-scene__actions{display:flex;align-items:center;gap:28px;margin-top:32px}
        .pl-cinema__cta{display:inline-flex;align-items:center;gap:25px;background:var(--pc-orange);color:#fff7ed;padding:16px 20px;font-size:12px;font-weight:750;transition:transform .2s,background .2s}
        .pl-cinema__cta:hover{transform:translateY(-3px);background:#b95127}
        .pl-cinema__link{font-size:12px;color:#f7f3eb;font-weight:700;display:flex;gap:10px;align-items:center}.pl-cinema__link span{color:var(--pc-orange);font-size:18px}
        .pl-scene__annotation{position:absolute;right:clamp(20px,5vw,76px);bottom:105px;display:flex;flex-direction:column;gap:7px;align-items:flex-end;color:rgba(245,240,230,.58);font-size:9px;letter-spacing:.17em}
        .pl-scene__annotation span:first-child{color:var(--pc-orange)}
        .pl-scene__counter{position:absolute;right:clamp(20px,5vw,76px);top:48%;font-size:12px;letter-spacing:.1em;color:#f7f3eb}
        .pl-scene__counter span{color:rgba(245,240,230,.45)}
        .pl-cinema__bottom{position:absolute;z-index:15;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:23px clamp(20px,5vw,76px);border-top:1px solid rgba(245,240,230,.2);color:rgba(245,240,230,.72);font-size:9px;font-weight:750;letter-spacing:.15em}
        .pl-cinema__bottom i{font-style:normal;color:var(--pc-orange);font-size:15px;margin-left:9px}
        .pl-cinema__ticks{display:flex;gap:7px}.pl-cinema__ticks button{width:34px;height:3px;background:rgba(245,240,230,.25);transition:background .25s,transform .25s}.pl-cinema__ticks button[aria-current=step]{background:var(--pc-orange);transform:scaleY(1.5)}
        .pl-cinema__after{display:grid;grid-template-columns:1.2fr .8fr auto;align-items:end;gap:clamp(24px,4vw,70px);padding:clamp(64px,9vw,130px) clamp(22px,9vw,145px);background:var(--pc-paper);color:#292a27}
        .pl-after-label{font-size:10px;letter-spacing:.18em;font-weight:800;color:#b95127}
        .pl-cinema__after h2{font-size:clamp(34px,4.6vw,65px);font-weight:500;line-height:.98;letter-spacing:-.065em;margin-top:20px;color:#292a27}
        .pl-cinema__after h2 em{font-style:normal;color:#b95127}
        .pl-cinema__after>p{font-size:15px;line-height:1.8;color:#66635b;max-width:400px}
        .pl-cinema__after>button{display:flex;align-items:center;gap:18px;white-space:nowrap;border-bottom:1px solid #b95127;padding:0 0 12px;color:#292a27;font-size:12px;font-weight:750}
        @media(max-width:760px){.pl-cinema__stage{height:260vh}.pl-cinema__top{padding:18px 18px;font-size:8px;letter-spacing:.1em}.pl-cinema__top-right{max-width:120px;text-align:right}.pl-scene__content{left:23px;top:45%;max-width:calc(100% - 44px)}.pl-scene h1{font-size:clamp(54px,13.5vw,92px)!important}.pl-scene__content>p{max-width:320px;margin-top:22px}.pl-scene__counter{top:auto;bottom:85px;font-size:10px}.pl-scene__annotation{left:23px;right:auto;align-items:flex-start;bottom:88px;font-size:7px}.pl-cinema__bottom{padding:17px 18px;font-size:7px;letter-spacing:.09em}.pl-cinema__ticks{gap:4px}.pl-cinema__ticks button{width:17px}.pl-cinema__after{grid-template-columns:1fr;gap:24px;padding:58px 24px}.pl-cinema__after>button{justify-self:start}.pl-scene__actions{gap:18px;flex-wrap:wrap}.pl-cinema__cta{padding:14px 15px;gap:15px}}
        @media(prefers-reduced-motion:reduce){.pl-scene,.pl-scene__image,.pl-scene__content,.pl-cinema__ticks button{transition:none!important}}
      `}</style>
    </section>
  );
};
