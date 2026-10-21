import React from 'react';
import { ArrowRightIcon } from '../common/Icons';

export const HeroSection = () => {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="pl-film" id="hero" aria-label="ProtoLabs product engineering">
      <div className="pl-film__frame">
        <img
          className="pl-film__image"
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=90"
          alt="Close-up of precision electronics and circuit board components"
          fetchPriority="high"
        />
        <div className="pl-film__veil" />
        <div className="pl-film__topline">
          <span><i /> PROTOLABS / PRODUCT ENGINEERING</span>
          <span>DESIGN&nbsp; — &nbsp;DEVELOP&nbsp; — &nbsp;DELIVER</span>
        </div>
        <div className="pl-film__copy">
          <p className="pl-film__eyebrow">FROM FIRST PRINCIPLES TO FINISHED PROTOTYPE</p>
          <h1>Make the<br />idea <em>real.</em></h1>
          <p className="pl-film__description">Electronics, embedded systems and thoughtful engineering—turned into hardware that works.</p>
          <div className="pl-film__actions">
            <button className="pl-film__primary" onClick={() => goTo('catalog')}>Explore our work <ArrowRightIcon size={17} /></button>
            <button className="pl-film__secondary" onClick={() => goTo('contact')}>Have a project? <span>↗</span></button>
          </div>
        </div>
        <div className="pl-film__image-label"><span>01 / ENGINEERING IN DETAIL</span><span>HARDWARE, MADE HUMAN.</span></div>
        <div className="pl-film__scroll"><span>SCROLL TO EXPLORE</span><i /></div>
      </div>
      <div className="pl-film__intro">
        <div><span className="pl-film__label">THE PROTOLABS APPROACH</span><h2>Not just a concept.<br /><em>A thing that works.</em></h2></div>
        <p>We bring electronics, embedded software and rapid prototyping together to move ambitious ideas from the first sketch to a working product.</p>
        <button onClick={() => goTo('catalog')}>Discover what we build <ArrowRightIcon size={16} /></button>
      </div>
      <style>{`
        #hero.pl-film{display:block!important;position:relative!important;padding:0!important;border:0!important;overflow:hidden!important;background:#11120f!important;color:#f6f1e7!important}
        #hero.pl-film:before,#hero.pl-film:after{content:none!important}
        .pl-film{--film-orange:#d96c36;--film-paper:#f4eedf}
        .pl-film__frame{height:clamp(620px,calc(100svh - 76px),1000px);min-height:620px;position:relative;isolation:isolate;overflow:hidden;background:#151613}
        .pl-film__image{position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:center 52%;filter:grayscale(1) brightness(.61) contrast(1.12);transform:none!important;animation:none!important}
        .pl-film__veil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,10,9,.86) 0%,rgba(9,10,9,.61) 34%,rgba(9,10,9,.13) 74%,rgba(9,10,9,.12) 100%),linear-gradient(0deg,rgba(9,10,9,.52),transparent 24%,rgba(9,10,9,.2));z-index:1}
        .pl-film__topline{position:absolute;z-index:2;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:23px clamp(24px,5.2vw,84px);border-bottom:1px solid rgba(255,255,255,.22);font-size:10px;font-weight:700;letter-spacing:.16em;color:rgba(246,241,231,.78)}
        .pl-film__topline span:first-child{display:flex;align-items:center;gap:10px}.pl-film__topline i{width:7px;height:7px;background:var(--film-orange);border-radius:50%;display:inline-block}
        .pl-film__copy{position:absolute;z-index:2;left:clamp(24px,9.2vw,150px);top:50%;transform:translateY(-48%);width:min(780px,70%);padding:0}
        .pl-film__eyebrow{font-size:10px;letter-spacing:.2em;font-weight:750;color:rgba(246,241,231,.72);margin:0 0 clamp(22px,3vh,34px)}
        .pl-film__copy h1{font-size:clamp(76px,10.8vw,164px)!important;line-height:.82!important;letter-spacing:-.09em!important;font-weight:500!important;color:#f6f1e7!important;margin:0!important;text-wrap:balance}
        .pl-film__copy h1 em{font-style:normal;color:var(--film-orange)}
        .pl-film__description{max-width:420px;margin:30px 0 0;font-size:clamp(14px,1.25vw,18px);line-height:1.75;color:rgba(246,241,231,.78)}
        .pl-film__actions{display:flex;align-items:center;gap:28px;margin-top:32px}
        .pl-film__primary{display:inline-flex;align-items:center;gap:25px;background:var(--film-orange);color:#fff7ed;padding:16px 20px;font-size:12px;font-weight:750;transition:background .2s,transform .2s}
        .pl-film__primary:hover{background:#b95127;transform:translateY(-2px)}
        .pl-film__secondary{display:flex;align-items:center;gap:10px;color:#f6f1e7;font-size:12px;font-weight:700}.pl-film__secondary span{font-size:18px;color:var(--film-orange)}
        .pl-film__image-label{position:absolute;z-index:2;left:clamp(24px,5.2vw,84px);right:clamp(24px,5.2vw,84px);bottom:70px;display:flex;justify-content:space-between;gap:18px;font-size:9px;font-weight:700;letter-spacing:.16em;color:rgba(246,241,231,.62)}
        .pl-film__image-label span:first-child{color:var(--film-orange)}
        .pl-film__scroll{position:absolute;z-index:2;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:13px;padding:18px;border-top:1px solid rgba(246,241,231,.2);font-size:9px;letter-spacing:.18em;font-weight:750;color:rgba(246,241,231,.68)}
        .pl-film__scroll i{width:28px;height:1px;background:var(--film-orange);display:inline-block}
        .pl-film__intro{display:grid;grid-template-columns:1.1fr .8fr auto;align-items:end;gap:clamp(24px,4vw,70px);padding:clamp(62px,8vw,118px) clamp(24px,9.2vw,150px);background:var(--film-paper);color:#292a27}
        .pl-film__label{font-size:10px;letter-spacing:.18em;font-weight:800;color:#b95127}
        .pl-film__intro h2{font-size:clamp(36px,4.4vw,66px);font-weight:500;line-height:.98;letter-spacing:-.065em;margin:20px 0 0;color:#292a27}
        .pl-film__intro h2 em{font-style:normal;color:#b95127}
        .pl-film__intro>p{font-size:15px;line-height:1.8;color:#66635b;max-width:400px;margin:0}
        .pl-film__intro>button{display:flex;align-items:center;gap:16px;white-space:nowrap;border-bottom:1px solid #b95127;padding:0 0 12px;color:#292a27;font-size:12px;font-weight:750}
        @media(min-width:1600px){.pl-film__copy{left:max(9.2vw,calc((100vw - 1440px)/2))}.pl-film__frame{height:calc(100svh - 88px);max-height:1050px}}
        @media(max-width:760px){.pl-film__frame{height:calc(100svh - 64px);min-height:600px;max-height:860px}.pl-film__image{object-position:58% center}.pl-film__veil{background:linear-gradient(90deg,rgba(9,10,9,.78),rgba(9,10,9,.38) 80%),linear-gradient(0deg,rgba(9,10,9,.6),transparent 40%)}.pl-film__topline{padding:17px 18px;font-size:8px;letter-spacing:.09em}.pl-film__topline span:last-child{max-width:110px;text-align:right}.pl-film__copy{left:23px;top:47%;width:calc(100% - 46px);transform:translateY(-42%)}.pl-film__copy h1{font-size:clamp(70px,15vw,112px)!important}.pl-film__description{max-width:340px;margin-top:23px}.pl-film__actions{gap:18px;flex-wrap:wrap;margin-top:25px}.pl-film__primary{padding:14px 15px;gap:15px}.pl-film__image-label{left:22px;right:22px;bottom:65px;font-size:7px;letter-spacing:.09em}.pl-film__intro{grid-template-columns:1fr;gap:23px;padding:58px 24px}.pl-film__intro>button{justify-self:start}}
        @media(max-height:700px) and (min-width:761px){.pl-film__frame{height:calc(100svh - 70px);min-height:540px}.pl-film__copy h1{font-size:clamp(66px,8.5vw,118px)!important}.pl-film__description{margin-top:20px}.pl-film__actions{margin-top:22px}}
        @media(prefers-reduced-motion:reduce){.pl-film *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
      `}</style>
    </section>
  );
};
