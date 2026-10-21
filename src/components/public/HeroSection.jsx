import React from 'react';
import { ArrowRightIcon } from '../common/Icons';

export const HeroSection = () => {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="forma-home" id="hero" aria-label="ProtoLabs product engineering">
      <div className="forma-home__stage">
        <div className="forma-home__grain" aria-hidden="true" />
        <div className="forma-home__top">
          <span className="forma-home__index"><i /> PROTOLABS <span>/</span> ENGINEERING STUDIO</span>
          <span className="forma-home__discipline">ELECTRONICS&nbsp; · &nbsp;EMBEDDED&nbsp; · &nbsp;PROTOTYPING</span>
        </div>

        <div className="forma-home__copy">
          <p className="forma-home__kicker"><span>01</span> IDEAS, BUILT INTO REALITY</p>
          <h1>Make it<br /><em>matter.</em></h1>
          <p className="forma-home__summary">From a first sketch to a working system. We bring electronics, embedded software and product thinking together to make ambitious ideas tangible.</p>
          <div className="forma-home__actions">
            <button className="forma-home__primary" onClick={() => goTo('catalog')}>Explore projects <ArrowRightIcon size={16} /></button>
            <button className="forma-home__text-link" onClick={() => goTo('contact')}>Bring us a challenge <span>↗</span></button>
          </div>
        </div>

        <div className="forma-home__baseline">
          <span>DESIGN WITH INTENT. BUILD WITH PRECISION.</span>
          <span className="forma-home__scroll">SCROLL TO EXPLORE <i /></span>
          <span>INDEPENDENT PRODUCT ENGINEERING <b>©</b></span>
        </div>
      </div>

      <div className="forma-home__manifesto">
        <div className="forma-home__manifesto-heading">
          <span className="forma-home__section-tag">A PRACTICAL KIND OF INNOVATION</span>
          <h2>Good ideas deserve<br />to <em>leave the page.</em></h2>
        </div>
        <p>We work across hardware and software to turn complex concepts into clear, testable, buildable products. No theatre. Just thoughtful engineering and real progress.</p>
        <button onClick={() => goTo('catalog')}>See what we make <ArrowRightIcon size={16} /></button>
      </div>

      <div className="forma-home__capabilities" aria-label="ProtoLabs capabilities">
        <div><span>01</span><strong>Electronics design</strong><i>↗</i></div>
        <div><span>02</span><strong>Embedded systems</strong><i>↗</i></div>
        <div><span>03</span><strong>Rapid prototyping</strong><i>↗</i></div>
        <div><span>04</span><strong>Product development</strong><i>↗</i></div>
      </div>

      <style>{`
        /* FORMA-INSPIRED ART DIRECTION: full-bleed product editorial */
        #hero.forma-home {
          --stage:#090a09; --paper:#f4eedf; --ink:#171816; --muted:#a9aaa2;
          --orange:#e36e36; --rule:rgba(244,238,223,.2);
          display:block!important;position:relative!important;margin:0!important;padding:0!important;
          overflow:clip!important;background:var(--stage)!important;color:var(--paper)!important;
          border:0!important;isolation:isolate;
        }
        #hero.forma-home::before,#hero.forma-home::after{content:none!important}
        #hero.forma-home *{box-sizing:border-box}
        .forma-home__stage{
          position:relative;display:block;width:100%;height:calc(100svh - 76px);
          min-height:680px;max-height:1100px;overflow:hidden;isolation:isolate;
          background:radial-gradient(ellipse at 72% 47%,#242622 0%,#111210 43%,#080908 78%);
          color:var(--paper);
        }
        .forma-home__grain{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.1;mix-blend-mode:screen;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E")}
        .forma-home__top{position:absolute;z-index:6;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;gap:20px;min-height:68px;padding:0 clamp(22px,3vw,48px);border-bottom:1px solid var(--rule);background:linear-gradient(180deg,rgba(8,9,8,.42),transparent);font-size:9px;letter-spacing:.16em;font-weight:750;color:rgba(244,238,223,.74)}
        .forma-home__index{display:flex;align-items:center;gap:10px;white-space:nowrap}.forma-home__index i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--orange)}.forma-home__index span{color:var(--orange)}
        .forma-home__discipline{text-align:right;color:rgba(244,238,223,.55)}
        .forma-home__product{position:absolute;z-index:2;inset:0 0 0 19%;overflow:hidden;pointer-events:none;background:transparent;border:0}
        .forma-home__product-halo{position:absolute;inset:4% 0 4%;background:radial-gradient(ellipse at 56% 48%,rgba(185,151,104,.2),rgba(244,238,223,.045) 36%,transparent 67%);filter:blur(22px)}
        .forma-home__product .pl3d-stage{position:absolute;inset:0;overflow:hidden!important}
        .forma-home__product .pl3d-stage:before{display:none!important}
        .forma-home__product .pl3d-webgl-mount{position:absolute;inset:0}
        .forma-home__product .pl3d-webgl-canvas{display:block;width:100%!important;height:100%!important}
        .forma-home__product .pl3d-caption,.forma-home__product .pl3d-axis{display:none!important}
        .forma-home__product .pl3d-fallback{inset:12% 8%!important}
        .forma-home__copy{position:absolute;z-index:4;left:50%;top:50%;bottom:auto;transform:translate(-50%,-50%);width:min(820px,calc(100% - 48px));padding:0;text-align:center;display:flex;flex-direction:column;align-items:center}
        .forma-home__kicker{display:flex;align-items:center;justify-content:center;gap:12px;margin:0 0 22px;font-size:9px;letter-spacing:.19em;font-weight:800;color:rgba(244,238,223,.7)}
        .forma-home__kicker span{color:var(--orange)}
        .forma-home__copy h1{margin:0!important;color:#f4f1e9!important;font-size:clamp(82px,11.5vw,176px)!important;line-height:.78!important;letter-spacing:-.09em!important;font-weight:400!important;text-wrap:balance;max-width:none}
        .forma-home__copy h1 em{font-style:normal;color:#e36e36}
        .forma-home__summary{max-width:520px;margin:25px auto 0;color:rgba(244,238,223,.74);font-size:clamp(13px,1vw,15px);line-height:1.7}
        .forma-home__actions{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:22px;margin-top:28px}
        .forma-home__primary{display:inline-flex;align-items:center;justify-content:center;gap:22px;min-height:46px;padding:0 16px;border:1px solid rgba(244,238,223,.7);background:#f4eedf;color:#171816;font-size:10px;font-weight:800;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
        .forma-home__primary:hover{background:var(--orange);border-color:var(--orange);color:#fff}
        .forma-home__text-link{display:inline-flex;align-items:center;gap:10px;padding:8px 0;border:0;background:transparent;color:#f4eedf;font-size:10px;font-weight:750;cursor:pointer}
        .forma-home__text-link span{font-size:16px;color:var(--orange)}
        .forma-home__product-note{position:absolute;z-index:4;right:clamp(24px,4vw,64px);bottom:clamp(76px,9vh,110px);display:flex;gap:14px;align-items:flex-start;width:220px;padding-top:10px;border-top:1px solid rgba(244,238,223,.42);color:rgba(244,238,223,.64);font-size:8px;line-height:1.7;letter-spacing:.13em}
        .forma-home__product-note span:first-child{color:var(--orange);font-weight:800;white-space:nowrap}
        .forma-home__baseline{position:absolute;z-index:6;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;min-height:50px;padding:0 clamp(22px,3vw,48px);border-top:1px solid var(--rule);background:rgba(8,9,8,.48);color:rgba(244,238,223,.56);font-size:8px;letter-spacing:.14em;font-weight:750}
        .forma-home__baseline>span:last-child{text-align:right}.forma-home__baseline b{color:var(--orange)}
        .forma-home__scroll{display:flex;align-items:center;gap:12px;white-space:nowrap;color:rgba(244,238,223,.8)}.forma-home__scroll i{width:26px;height:1px;background:var(--orange)}
        .forma-home__manifesto{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(240px,.8fr) auto;align-items:end;gap:clamp(24px,4vw,70px);padding:clamp(76px,8.5vw,128px) clamp(28px,8.2vw,132px);background:#f4eedf;color:#292b28;border-top:1px solid #d9d0c0}
        .forma-home__section-tag{font-size:9px;letter-spacing:.17em;font-weight:850;color:#b95127}
        .forma-home__manifesto h2{margin:20px 0 0;color:#292b28;font-size:clamp(40px,5vw,74px);line-height:.96;letter-spacing:-.075em;font-weight:500}
        .forma-home__manifesto h2 em{color:#b95127;font-style:normal}
        .forma-home__manifesto>p{max-width:400px;margin:0;color:#656158;font-size:14px;line-height:1.85}
        .forma-home__manifesto>button{display:flex;align-items:center;gap:16px;padding:0 0 12px;white-space:nowrap;border:0;border-bottom:1px solid #b95127;background:transparent;color:#292b28;font-size:11px;font-weight:800;cursor:pointer}
        .forma-home__capabilities{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));background:#e8dfce;color:#292b28;border-top:1px solid #d9d0c0}
        .forma-home__capabilities>div{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:13px;min-width:0;padding:27px clamp(14px,2.3vw,36px);border-right:1px solid #d9d0c0;transition:background .18s}
        .forma-home__capabilities>div:hover{background:#f4eedf}.forma-home__capabilities>div:last-child{border-right:0}
        .forma-home__capabilities span{color:#b95127;font-size:9px;font-weight:800}.forma-home__capabilities strong{font-size:11px;font-weight:750}.forma-home__capabilities i{color:#b95127;font-style:normal}
        @media(min-width:1600px){.forma-home__copy{left:7vw}.forma-home__product{left:16%}}
        @media(max-width:1050px) and (min-width:761px){.forma-home__stage{min-height:660px}.forma-home__product{left:17%;opacity:.88}.forma-home__copy{left:50%;top:50%;bottom:auto;transform:translate(-50%,-50%);width:calc(100% - 64px)}.forma-home__copy h1{font-size:clamp(78px,10vw,120px)!important}.forma-home__summary{max-width:460px}.forma-home__product-note{right:4vw;width:190px}.forma-home__baseline{font-size:7px;padding-inline:4vw}}
        @media(max-width:760px){
          .forma-home__stage{height:auto;min-height:0;max-height:none;padding-top:64px;display:flex;flex-direction:column;overflow:hidden}
          .forma-home__top{position:absolute;top:0;left:0;right:0;min-height:58px;padding:0 17px;font-size:7px;letter-spacing:.08em}
          .forma-home__index{gap:7px}.forma-home__discipline{max-width:120px;line-height:1.6}
          .forma-home__copy{position:relative;left:auto;top:auto;bottom:auto;inset:auto;order:1;transform:none;width:auto;margin:34px 21px 20px;padding:0;text-align:center;align-items:center}
          .forma-home__kicker{font-size:8px;margin-bottom:18px}
          .forma-home__copy h1{font-size:clamp(74px,17vw,118px)!important;line-height:.82!important;max-width:7ch}
          .forma-home__summary{max-width:360px;margin:19px auto 0;font-size:13px}
          .forma-home__actions{justify-content:center;gap:16px;margin-top:20px}
          .forma-home__primary{min-height:44px;padding:0 13px;gap:15px}
          .forma-home__product{position:relative;inset:auto;order:2;flex:none;width:100%;height:clamp(330px,94vw,490px);margin:0;overflow:hidden}
          .forma-home__product-halo{inset:0}
          .forma-home__product-note{right:20px;bottom:12px;width:190px;font-size:7px}
          .forma-home__baseline{position:relative;inset:auto;order:3;grid-template-columns:1fr auto;gap:10px;min-height:46px;padding:12px 17px;font-size:7px;letter-spacing:.06em}
          .forma-home__baseline>span:last-child{display:none}
          .forma-home__manifesto{grid-template-columns:minmax(0,1fr);gap:23px;padding:58px 24px}
          .forma-home__manifesto h2{font-size:clamp(40px,10vw,60px)}
          .forma-home__manifesto>button{justify-self:start}
          .forma-home__capabilities{grid-template-columns:repeat(2,minmax(0,1fr))}
          .forma-home__capabilities>div{padding:17px 14px;border-bottom:1px solid #d9d0c0}
          .forma-home__capabilities>div:nth-child(2){border-right:0}
          .forma-home__capabilities strong{font-size:10px}
        }
        @media(max-width:380px){.forma-home__top{padding-inline:11px;font-size:6px}.forma-home__copy{margin-inline:18px}.forma-home__copy h1{font-size:68px!important}.forma-home__actions{align-items:center;flex-direction:column;gap:8px}.forma-home__baseline{padding-inline:11px}.forma-home__capabilities>div{grid-template-columns:auto 1fr;gap:8px}.forma-home__capabilities i{display:none}}
        @media(prefers-reduced-motion:reduce){.forma-home__primary,.forma-home__capabilities>div{transition:none}}
      `}</style>
    </section>
  );
};
