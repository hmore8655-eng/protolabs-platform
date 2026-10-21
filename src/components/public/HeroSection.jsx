import React from 'react';
import { ArrowRightIcon } from '../common/Icons';
import { Hero3DStructure } from './Hero3DStructure';

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

        <div className="forma-home__product" aria-label="Three-dimensional electronics development board">
          <div className="forma-home__product-halo" />
          <Hero3DStructure />
          <div className="forma-home__product-note"><span>PL / 001</span><span>COMPUTE MODULE<br />ENGINEERING STUDY</span></div>
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
        #hero.forma-home{display:block!important;position:relative!important;padding:0!important;margin:0!important;overflow:hidden!important;background:#171916!important;color:#f4eedf!important;border:0!important;isolation:isolate}
        #hero.forma-home:before,#hero.forma-home:after{content:none!important}
        .forma-home{--fh-paper:#f4eedf;--fh-ink:#292b28;--fh-orange:#d96c36;--fh-line:rgba(244,238,223,.19)}
        .forma-home__stage{height:calc(100svh - 76px);min-height:720px;max-height:1000px;position:relative;overflow:hidden;isolation:isolate;background:radial-gradient(ellipse at 72% 48%,#343632 0%,#232522 34%,#171816 72%)}
        .forma-home__grain{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.12;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E")}
        .forma-home__top{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:23px clamp(24px,5.3vw,86px);border-bottom:1px solid var(--fh-line);font-size:9px;letter-spacing:.16em;font-weight:750;color:rgba(244,238,223,.68)}
        .forma-home__index{display:flex;align-items:center;gap:10px}.forma-home__index i{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--fh-orange)}.forma-home__index span{color:var(--fh-orange)}
        .forma-home__discipline{text-align:right}
        .forma-home__copy{position:absolute;z-index:4;left:clamp(28px,8.2vw,132px);top:47%;transform:translateY(-48%);width:min(43%,590px)}
        .forma-home__kicker{display:flex;align-items:center;gap:12px;margin:0 0 clamp(24px,3.5vh,38px);font-size:9px;letter-spacing:.2em;font-weight:800;color:rgba(244,238,223,.65)}
        .forma-home__kicker span{color:var(--fh-orange)}
        .forma-home__copy h1{font-size:clamp(88px,10.4vw,166px)!important;line-height:.79!important;letter-spacing:-.095em!important;font-weight:500!important;margin:0!important;color:var(--fh-paper)!important;text-wrap:balance}
        .forma-home__copy h1 em{font-style:normal;color:var(--fh-orange)}
        .forma-home__summary{max-width:400px;margin:32px 0 0;font-size:clamp(14px,1.1vw,17px);line-height:1.75;color:rgba(244,238,223,.72)}
        .forma-home__actions{display:flex;align-items:center;flex-wrap:wrap;gap:25px;margin-top:31px}
        .forma-home__primary{display:inline-flex;align-items:center;gap:25px;min-height:50px;padding:0 18px;background:var(--fh-orange);color:#fff7ed;font-size:11px;font-weight:800;transition:background .2s,transform .2s}
        .forma-home__primary:hover{background:#b95127;transform:translateY(-2px)}
        .forma-home__text-link{display:flex;align-items:center;gap:11px;color:var(--fh-paper);font-size:11px;font-weight:750}
        .forma-home__text-link span{font-size:17px;color:var(--fh-orange)}
        .forma-home__product{position:absolute;z-index:2;top:8%;right:1.5%;bottom:6%;width:62%;pointer-events:none}
        .forma-home__product-halo{position:absolute;inset:11% 5% 9%;border-radius:50%;background:radial-gradient(ellipse,rgba(244,238,223,.12),rgba(244,238,223,.025) 42%,transparent 70%);filter:blur(15px)}
        .forma-home__product .pl3d-stage{position:absolute;inset:0;overflow:visible!important}
        .forma-home__product .pl3d-webgl-mount{position:absolute;inset:0}
        .forma-home__product .pl3d-webgl-canvas{width:100%!important;height:100%!important;display:block}
        .forma-home__product .pl3d-caption,.forma-home__product .pl3d-axis{display:none!important}
        .forma-home__product .pl3d-fallback{inset:14% 6%!important}
        .forma-home__product-note{position:absolute;z-index:4;right:6%;bottom:10%;display:flex;gap:16px;align-items:flex-start;padding-top:12px;border-top:1px solid rgba(244,238,223,.25);color:rgba(244,238,223,.6);font-size:8px;line-height:1.7;letter-spacing:.13em}
        .forma-home__product-note span:first-child{color:var(--fh-orange);font-weight:800}
        .forma-home__baseline{position:absolute;z-index:5;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;padding:18px clamp(24px,5.3vw,86px);border-top:1px solid var(--fh-line);font-size:8px;letter-spacing:.15em;font-weight:750;color:rgba(244,238,223,.48)}
        .forma-home__baseline>span:last-child{text-align:right}.forma-home__baseline b{color:var(--fh-orange)}
        .forma-home__scroll{display:flex;align-items:center;gap:12px;color:rgba(244,238,223,.72)}.forma-home__scroll i{width:26px;height:1px;background:var(--fh-orange)}
        .forma-home__manifesto{display:grid;grid-template-columns:1.1fr .8fr auto;align-items:end;gap:clamp(24px,4vw,70px);padding:clamp(78px,9vw,132px) clamp(28px,8.2vw,132px);background:var(--fh-paper);color:var(--fh-ink)}
        .forma-home__section-tag{font-size:9px;letter-spacing:.17em;font-weight:850;color:#b95127}
        .forma-home__manifesto h2{font-size:clamp(40px,5vw,74px);line-height:.96;letter-spacing:-.075em;font-weight:500;margin:20px 0 0;color:var(--fh-ink)}
        .forma-home__manifesto h2 em{font-style:normal;color:#b95127}
        .forma-home__manifesto>p{max-width:400px;margin:0;color:#656158;font-size:14px;line-height:1.85}
        .forma-home__manifesto>button{display:flex;align-items:center;gap:16px;white-space:nowrap;padding:0 0 12px;border-bottom:1px solid #b95127;color:var(--fh-ink);font-size:11px;font-weight:800}
        .forma-home__capabilities{display:grid;grid-template-columns:repeat(4,1fr);background:#e9e1d2;color:var(--fh-ink);border-top:1px solid #d9d0c0}
        .forma-home__capabilities>div{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:13px;padding:27px clamp(16px,2.6vw,42px);border-right:1px solid #d9d0c0;transition:background .2s ease}.forma-home__capabilities>div:hover{background:#f4eedf}
        .forma-home__capabilities>div:last-child{border-right:0}.forma-home__capabilities span{font-size:9px;color:#b95127;font-weight:800}.forma-home__capabilities strong{font-size:11px;font-weight:750}.forma-home__capabilities i{font-style:normal;color:#b95127}
        @media(min-width:1600px){.forma-home__copy{left:max(9vw,calc((100vw - 1440px)/2))}.forma-home__product{right:3%;width:59%}}
        @media(max-width:1000px){.forma-home__copy{width:48%;left:5%}.forma-home__copy h1{font-size:clamp(78px,10vw,120px)!important}.forma-home__product{right:-6%;width:65%}.forma-home__summary{max-width:340px}}
        @media(max-width:760px){.forma-home__stage{height:calc(100svh - 68px);min-height:780px;max-height:980px}.forma-home__top{padding:17px 18px;font-size:7px;letter-spacing:.09em}.forma-home__discipline{max-width:118px}.forma-home__copy{left:22px;top:14%;transform:none;width:calc(100% - 44px)}.forma-home__kicker{font-size:8px;margin-bottom:18px}.forma-home__copy h1{font-size:clamp(72px,17vw,116px)!important}.forma-home__summary{max-width:330px;margin-top:20px;font-size:13px}.forma-home__actions{gap:17px;margin-top:21px}.forma-home__primary{min-height:46px;padding:0 14px;gap:15px}.forma-home__text-link{font-size:10px}.forma-home__product{top:52%;right:-3%;bottom:7%;width:100%;opacity:.92}.forma-home__product-halo{inset:12% 3% 8%}.forma-home__product-note{right:9%;bottom:11%;font-size:7px}.forma-home__baseline{grid-template-columns:1fr auto;padding:15px 18px;font-size:7px;letter-spacing:.08em}.forma-home__baseline>span:last-child{display:none}.forma-home__manifesto{grid-template-columns:1fr;gap:23px;padding:58px 24px}.forma-home__manifesto h2{font-size:clamp(40px,10vw,60px)}.forma-home__manifesto>button{justify-self:start}.forma-home__capabilities{grid-template-columns:1fr 1fr}.forma-home__capabilities>div{padding:17px 14px;border-bottom:1px solid #d9d0c0}.forma-home__capabilities>div:nth-child(2){border-right:0}.forma-home__capabilities strong{font-size:10px}}
        @media(max-height:760px) and (min-width:761px){.forma-home__stage{min-height:620px}.forma-home__copy h1{font-size:clamp(76px,8.7vw,128px)!important}.forma-home__summary{margin-top:22px}.forma-home__actions{margin-top:22px}.forma-home__product{top:4%;bottom:2%}}
        @media(prefers-reduced-motion:reduce){.forma-home__primary{transition:none}.forma-home__primary:hover{transform:none}}
      `}</style>
    </section>
  );
};
