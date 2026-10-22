import React, { useEffect, useRef } from 'react';
import { ArrowRightIcon } from '../common/Icons';
import './HeroSection.css';

const SCENE_CENTERS = [0, 0.5, 1];
const SCENE_MAX_OPACITY = 0.85;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  useEffect(() => {
    const root = sectionRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const reset = () => {
      root.style.removeProperty('--p');
      SCENE_CENTERS.forEach((_, i) => root.style.removeProperty(`--o${i}`));
    };

    const update = () => {
      frame = 0;
      if (reduced.matches) { reset(); return; }
      const hdr = parseFloat(getComputedStyle(root).getPropertyValue('--hdr')) || 0;
      const rect = track.getBoundingClientRect();
      const travel = Math.max(1, rect.height - stage.offsetHeight);
      const p = clamp((hdr - rect.top) / travel, 0, 1);
      root.style.setProperty('--p', p.toFixed(4));
      SCENE_CENTERS.forEach((c, i) => {
        const o = clamp((0.5 - Math.abs(p - c)) * 3, 0, 1) * SCENE_MAX_OPACITY;
        root.style.setProperty(`--o${i}`, o.toFixed(3));
      });
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    update();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="forma-home" id="hero" ref={sectionRef} aria-label="ProtoLabs product engineering">
      <div className="forma-home__track" ref={trackRef}>
        <div className="forma-home__stage" ref={stageRef}>
          <div className="forma-home__visuals" aria-hidden="true">
            <div className="forma-home__visual forma-home__visual--circuit" />
            <div className="forma-home__visual forma-home__visual--workbench" />
            <div className="forma-home__visual forma-home__visual--robotics" />
          </div>
          <div className="forma-home__vignette" aria-hidden="true" />
          <div className="forma-home__grain" aria-hidden="true" />

          <div className="forma-home__top">
            <span className="forma-home__index"><i /> PROTOLABS <span>/</span> ENGINEERING STUDIO</span>
            <span className="forma-home__discipline">ELECTRONICS&nbsp; ·&nbsp; EMBEDDED&nbsp; ·&nbsp; PROTOTYPING</span>
          </div>

          <div className="forma-home__copy">
            <p className="forma-home__kicker"><span>01</span> THINK IT. BUILD IT. MAKE IT REAL.</p>
            <h1>Curiosity<br /><em>in motion.</em></h1>
            <p className="forma-home__summary">We turn bold ideas into working things — blending electronics, embedded intelligence and hands-on making to bring tomorrow a little closer.</p>
            <div className="forma-home__actions">
              <button className="forma-home__primary" onClick={() => goTo('catalog')}>Explore projects <ArrowRightIcon size={16} /></button>
              <button className="forma-home__text-link" onClick={() => goTo('contact')}>Bring us a challenge <span aria-hidden="true">↗</span></button>
            </div>
          </div>

          <div className="forma-home__progress" aria-hidden="true" />
          <div className="forma-home__baseline">
            <span className="forma-home__scenes" aria-hidden="true">
              <span><b>01</b>CIRCUITS</span>
              <span><b>02</b>THE WORKBENCH</span>
              <span><b>03</b>ROBOTICS</span>
            </span>
            <span className="forma-home__scroll">SCROLL TO EXPLORE <i /></span>
            <span>INDEPENDENT PRODUCT ENGINEERING <b>©</b></span>
          </div>
        </div>
      </div>

      <div className="forma-home__manifesto">
        <div className="forma-home__manifesto-heading">
          <span className="forma-home__section-tag">THE BEAUTY IS IN THE BUILD</span>
          <h2>Imagine more.<br /><em>Make something real.</em></h2>
        </div>
        <p>Ideas get interesting when you can hold them, test them, break them, and make them better. We bring hardware, software and imagination to the same workbench.</p>
        <button onClick={() => goTo('catalog')}>Explore the work <ArrowRightIcon size={16} /></button>
      </div>

      <div className="forma-home__capabilities" aria-label="ProtoLabs capabilities">
        <div><span>01</span><strong>Shape the hardware</strong><i aria-hidden="true">↗</i></div>
        <div><span>02</span><strong>Give it intelligence</strong><i aria-hidden="true">↗</i></div>
        <div><span>03</span><strong>Prototype the possible</strong><i aria-hidden="true">↗</i></div>
        <div><span>04</span><strong>Build what’s next</strong><i aria-hidden="true">↗</i></div>
      </div>
    </section>
  );
};
