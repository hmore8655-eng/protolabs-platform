import React from 'react';
import { ArrowRightIcon, CheckCircleIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

const capabilities = [
  { number: '01', title: 'Custom electronics', detail: 'From circuit architecture to production-ready hardware.' },
  { number: '02', title: 'Rapid prototyping', detail: 'Turn a promising idea into a testable physical product.' },
  { number: '03', title: 'Embedded intelligence', detail: 'Hardware and software designed to work as one.' },
];

export const HeroSection = () => {
  const { data } = useApp();
  const { hero } = data;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="pl-hero">
      <div className="pl-hero__image" aria-hidden="true" />
      <div className="pl-hero__shade" aria-hidden="true" />
      <div className="pl-hero__grid" aria-hidden="true" />
      <div className="container pl-hero__inner">
        <div className="pl-hero__copy">
          <div className="pl-hero__eyebrow"><span /> INDUSTRIAL ELECTRONICS &amp; PRODUCT DEVELOPMENT</div>
          <h1>Precision hardware.<br />Real-world <em>impact.</em></h1>
          <p className="pl-hero__lead">{hero.subheading || 'We design and develop intelligent electronics, embedded systems and physical products built to solve real problems.'}</p>
          <div className="pl-hero__actions">
            <button onClick={() => scrollToSection('catalog')} className="pl-button pl-button--primary">
              <span>{hero.primaryCta || 'Explore our work'}</span><ArrowRightIcon size={18} />
            </button>
            <button onClick={() => scrollToSection('why-us')} className="pl-button pl-button--quiet">
              <span>Our capabilities</span><span className="pl-button__arrow">↗</span>
            </button>
          </div>
          <div className="pl-hero__proof">
            <span><CheckCircleIcon size={16} /> Engineering-led</span>
            <span><CheckCircleIcon size={16} /> Prototype to product</span>
            <span><CheckCircleIcon size={16} /> Built for the real world</span>
          </div>
        </div>
        <div className="pl-hero__visual">
          <div className="pl-hero__visual-label"><span className="pl-live-dot" /> HARDWARE STUDY / 001</div>
          <div className="pl-hero__callout pl-hero__callout--top"><span>01</span> PRECISION ENGINEERING</div>
          <div className="pl-hero__callout pl-hero__callout--bottom">DESIGNED FOR PERFORMANCE <span>↗</span></div>
          <div className="pl-hero__visual-index">01 <i /> 03</div>
        </div>
      </div>
      <div className="pl-hero__capabilities">
        <div className="container pl-hero__capabilities-inner">
          {capabilities.map((item) => (
            <button className="pl-capability" key={item.number} onClick={() => scrollToSection('why-us')}>
              <span className="pl-capability__number">{item.number}</span>
              <span className="pl-capability__text"><strong>{item.title}</strong><small>{item.detail}</small></span>
              <span className="pl-capability__arrow">↗</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .pl-hero{--pl-ink:#f4f1eb;--pl-orange:#f06b3d;position:relative;isolation:isolate;overflow:hidden;background:#151714;color:var(--pl-ink);min-height:760px;padding:clamp(6rem,10vw,9.5rem) 0 0}
        .pl-hero__image,.pl-hero__shade,.pl-hero__grid{position:absolute;inset:0;pointer-events:none}
        .pl-hero__image{z-index:-3;left:28%;background-image:url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=90');background-position:center;background-size:cover;opacity:.76;transform:scale(1.035);animation:pl-hero-drift 22s ease-in-out infinite alternate}
        .pl-hero__shade{z-index:-2;background:linear-gradient(90deg,#151714 0%,rgba(21,23,20,.98) 19%,rgba(21,23,20,.84) 39%,rgba(21,23,20,.28) 72%,rgba(21,23,20,.24) 100%),linear-gradient(0deg,rgba(21,23,20,.94) 0%,transparent 28%,rgba(21,23,20,.18) 100%)}
        .pl-hero__grid{z-index:-1;opacity:.18;background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(90deg,black,transparent 85%)}
        .pl-hero__inner{position:relative;display:grid;grid-template-columns:minmax(0,.98fr) minmax(0,1.02fr);align-items:center;gap:2rem;min-height:480px}
        .pl-hero__copy{position:relative;z-index:2;max-width:720px;padding:1rem 0 4.5rem}
        .pl-hero__eyebrow{display:flex;align-items:center;gap:.7rem;margin-bottom:1.8rem;color:#f3a17f;font-size:.7rem;font-weight:750;letter-spacing:.2em;line-height:1.6}
        .pl-hero__eyebrow span{display:block;width:34px;height:1px;background:var(--pl-orange);flex-shrink:0}
        .pl-hero h1{max-width:800px;margin:0;color:#f5f2ed;font-size:clamp(3.4rem,6.4vw,6.6rem);font-weight:550;letter-spacing:-.075em;line-height:.94}
        .pl-hero h1 em{font-style:normal;color:var(--pl-orange)}
        .pl-hero__lead{max-width:470px;margin:1.8rem 0 0;color:rgba(245,242,237,.72);font-size:clamp(1rem,1.25vw,1.12rem);line-height:1.85}
        .pl-hero__actions{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-top:2rem}
        .pl-button{min-height:50px;display:inline-flex;align-items:center;justify-content:center;gap:1.4rem;padding:.9rem 1.25rem;border:1px solid transparent;border-radius:2px;font-size:.9rem;font-weight:700;cursor:pointer;transition:transform .25s,background .25s,border-color .25s}
        .pl-button:hover{transform:translateY(-2px)}
        .pl-button--primary{background:var(--pl-orange);color:#171815}
        .pl-button--primary:hover{background:#ff875b}
        .pl-button--quiet{background:rgba(20,22,19,.2);border-color:rgba(245,242,237,.36);color:#f5f2ed}
        .pl-button--quiet:hover{border-color:var(--pl-orange)}
        .pl-button__arrow{font-size:1.1rem;color:var(--pl-orange)}
        .pl-hero__proof{display:flex;flex-wrap:wrap;gap:1.2rem;margin-top:2.8rem;padding-top:1.25rem;border-top:1px solid rgba(245,242,237,.2);color:rgba(245,242,237,.67);font-size:.74rem}
        .pl-hero__proof span{display:inline-flex;align-items:center;gap:.45rem}
        .pl-hero__proof svg{color:var(--pl-orange)}
        .pl-hero__visual{position:relative;min-height:440px;align-self:stretch}
        .pl-hero__visual-label{position:absolute;right:0;top:1rem;display:flex;align-items:center;gap:.55rem;color:rgba(245,242,237,.72);font-size:.62rem;letter-spacing:.18em}
        .pl-live-dot{width:7px;height:7px;border-radius:50%;background:var(--pl-orange);box-shadow:0 0 18px rgba(240,107,61,.8)}
        .pl-hero__callout{position:absolute;display:flex;align-items:center;gap:.7rem;color:rgba(245,242,237,.7);font-size:.6rem;letter-spacing:.16em}
        .pl-hero__callout:before{content:'';display:block;width:42px;height:1px;background:var(--pl-orange)}
        .pl-hero__callout--top{top:22%;right:2%}
        .pl-hero__callout--top span{color:var(--pl-orange);font-size:.85rem}
        .pl-hero__callout--bottom{bottom:18%;right:0}
        .pl-hero__callout--bottom span{color:var(--pl-orange);font-size:1rem}
        .pl-hero__visual-index{position:absolute;right:0;top:48%;display:flex;align-items:center;gap:.5rem;color:var(--pl-orange);font-size:.75rem}
        .pl-hero__visual-index i{width:28px;height:1px;background:rgba(245,242,237,.65)}
        .pl-hero__capabilities{border-top:1px solid rgba(245,242,237,.17);background:rgba(12,14,12,.42);backdrop-filter:blur(10px)}
        .pl-hero__capabilities-inner{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
        .pl-capability{display:flex;align-items:flex-start;gap:1rem;min-width:0;padding:1.6rem 1.4rem 1.8rem 0;text-align:left;border:0;border-right:1px solid rgba(245,242,237,.15);background:transparent;color:var(--pl-ink);cursor:pointer}
        .pl-capability+.pl-capability{padding-left:1.4rem}
        .pl-capability:last-child{border-right:0}
        .pl-capability__number{padding-top:.15rem;color:var(--pl-orange);font-size:.68rem;letter-spacing:.15em}
        .pl-capability__text{display:flex;flex-direction:column;gap:.45rem}
        .pl-capability__text strong{font-size:.9rem;font-weight:650}
        .pl-capability__text small{max-width:230px;color:rgba(245,242,237,.57);font-size:.74rem;line-height:1.6}
        .pl-capability__arrow{margin-left:auto;color:rgba(245,242,237,.45);transition:color .2s,transform .2s}
        .pl-capability:hover .pl-capability__arrow{color:var(--pl-orange);transform:translate(2px,-2px)}
        @keyframes pl-hero-drift{from{transform:scale(1.035) translate3d(0,0,0)}to{transform:scale(1.09) translate3d(-1.2%,.6%,0)}}
        @media(max-width:900px){.pl-hero{padding-top:5rem;min-height:unset}.pl-hero__inner{grid-template-columns:1fr;min-height:unset}.pl-hero__copy{padding:1rem 0 2rem}.pl-hero__visual{position:absolute;inset:0 0 auto 25%;min-height:540px;opacity:.58;z-index:-1}.pl-hero__image{left:0;background-position:58% center}.pl-hero__shade{background:linear-gradient(90deg,#151714 0%,rgba(21,23,20,.91) 48%,rgba(21,23,20,.45) 100%),linear-gradient(0deg,#151714 0%,transparent 60%)}.pl-hero__proof{gap:.8rem}.pl-hero__capabilities-inner{grid-template-columns:1fr}.pl-capability,.pl-capability+.pl-capability{padding:1.15rem 0;border-right:0;border-bottom:1px solid rgba(245,242,237,.14)}.pl-capability:last-child{border-bottom:0}.pl-capability__text small{max-width:unset}}
        @media(max-width:560px){.pl-hero h1{font-size:clamp(3rem,13vw,4.5rem)}.pl-hero__eyebrow{font-size:.58rem;letter-spacing:.14em}.pl-hero__proof{display:grid;grid-template-columns:1fr 1fr;font-size:.68rem}.pl-hero__visual-label{right:0;top:0}.pl-hero__callout--top{top:30%;right:0}.pl-hero__callout--bottom{bottom:25%;right:0}.pl-hero__visual-index{display:none}}
        @media(prefers-reduced-motion:reduce){.pl-hero__image{animation:none}.pl-button{transition:none}}
      `}</style>
    </section>
  );
};
