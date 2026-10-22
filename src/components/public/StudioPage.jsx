import React from 'react';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

const studioImages = {
  bench: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=90',
  board: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=90',
  team: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=90'
};

export const StudioPage = () => {
  const { data } = useApp();
  const projectCount = (data.projects || []).filter(project => project.published !== false).length;

  return (
    <div className="studio-page">
      <style>{`
        .studio-page{--st-paper:#f4eedf;--st-ink:#292b29;--st-muted:#77786f;--st-orange:#d96c36;--st-line:#d8cfbf;background:var(--st-paper);color:var(--st-ink);min-height:100vh}
        .st-wrap{width:min(1440px,calc(100% - 9vw));margin-inline:auto}
        .st-nav{height:78px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--st-line)}
        .st-nav-links{display:flex;align-items:center;gap:clamp(1rem,2.5vw,2.6rem);font-size:.68rem;letter-spacing:.13em;text-transform:uppercase}.st-nav-links a:hover{color:var(--st-orange)}
        .st-nav-cta{padding:.8rem 1rem;border:1px solid var(--st-ink);font-size:.68rem;letter-spacing:.12em;text-transform:uppercase}.st-nav-cta:hover{background:var(--st-ink);color:var(--st-paper)}
        .st-hero{padding:clamp(3rem,6vw,6rem) 0 2rem}.st-eyebrow{display:flex;align-items:center;gap:.75rem;color:var(--st-orange);font-size:.68rem;font-weight:750;letter-spacing:.19em;text-transform:uppercase}.st-eyebrow:before{content:'';height:1px;width:28px;background:currentColor}
        .st-hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(2rem,6vw,6rem);align-items:end;margin-top:2rem}
        .st-hero h1{font-size:clamp(4rem,10vw,10rem);line-height:.82;letter-spacing:-.095em;font-weight:500;margin:0}.st-hero h1 em{font-style:normal;color:var(--st-orange)}
        .st-lead{font-size:clamp(1rem,1.45vw,1.3rem);line-height:1.85;color:#65665e;max-width:530px;margin:2rem 0 1.8rem}
        .st-underlink{display:inline-flex;gap:1.5rem;align-items:center;border-bottom:1px solid var(--st-orange);padding-bottom:.6rem;font-size:.75rem;font-weight:750;letter-spacing:.1em;text-transform:uppercase}.st-underlink span{color:var(--st-orange);font-size:1.1rem}
        .st-hero-image{position:relative;min-height:clamp(350px,49vw,650px);overflow:hidden;background:#343832}.st-hero-image img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.72);display:block}.st-image-caption{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-between;gap:1rem;padding:1rem 1.2rem;background:linear-gradient(0deg,rgba(20,22,19,.9),transparent);color:#f4eedf;font-size:.65rem;letter-spacing:.14em;text-transform:uppercase}
        .st-index{display:flex;justify-content:space-between;gap:1rem;margin-top:2rem;border-top:1px solid var(--st-line);padding-top:1rem;color:#77786f;font-size:.65rem;letter-spacing:.14em;text-transform:uppercase}
        .st-statement{background:#292b29;color:var(--st-paper);padding:clamp(4rem,9vw,8rem) 0;margin-top:clamp(3rem,7vw,7rem)}
        .st-statement-grid{display:grid;grid-template-columns:.65fr 1.35fr;gap:clamp(2rem,7vw,7rem)}
        .st-label{color:#e9a17d;font-size:.67rem;letter-spacing:.17em;text-transform:uppercase}.st-statement h2{font-size:clamp(2.8rem,6vw,6.5rem);font-weight:500;letter-spacing:-.08em;line-height:.92;margin:0}.st-statement h2 em{color:var(--st-orange);font-style:normal}.st-statement-copy{color:rgba(244,238,223,.67);font-size:1rem;line-height:1.9;max-width:620px;margin-top:1.5rem}
        .st-pillars{display:grid;grid-template-columns:repeat(3,1fr);margin-top:4rem;border-top:1px solid rgba(244,238,223,.22)}.st-pillar{padding:1.4rem 1.2rem 0 0;border-right:1px solid rgba(244,238,223,.22)}.st-pillar+.st-pillar{padding-left:1.2rem}.st-pillar:last-child{border:0}.st-pillar span{font-size:.68rem;color:var(--st-orange);letter-spacing:.12em}.st-pillar h3{font-size:1.15rem;font-weight:600;margin:1.5rem 0 .7rem}.st-pillar p{color:rgba(244,238,223,.58);font-size:.84rem;line-height:1.75}
        .st-method{padding:clamp(4rem,8vw,7rem) 0}.st-method-heading{display:grid;grid-template-columns:1fr .8fr;gap:3rem;align-items:end;margin-bottom:3rem}.st-method h2{font-size:clamp(2.8rem,6vw,6rem);line-height:.9;letter-spacing:-.08em;font-weight:500}.st-method-heading p{max-width:470px;color:#6c6d65;line-height:1.85}
        .st-method-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1.5rem,4vw,4rem);align-items:center}.st-method-photo{position:relative;aspect-ratio:1.12;overflow:hidden;background:#d8d0c1}.st-method-photo img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.75)}.st-method-copy{padding:1rem 0}.st-method-copy h3{font-size:clamp(2rem,3.3vw,3.5rem);letter-spacing:-.065em;line-height:1.02;font-weight:550;margin:1rem 0}.st-method-copy p{color:#686960;line-height:1.9;max-width:490px}.st-method-list{margin-top:2rem;border-top:1px solid var(--st-line)}.st-method-list div{display:flex;justify-content:space-between;gap:1rem;padding:.9rem 0;border-bottom:1px solid var(--st-line);font-size:.83rem}.st-method-list span{color:var(--st-orange)}
        .st-numbers{background:#e9e2d3;border-block:1px solid var(--st-line);padding:3rem 0}.st-number-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}.st-number strong{display:block;font-size:clamp(2.5rem,5vw,5rem);font-weight:500;letter-spacing:-.08em}.st-number span{display:block;margin-top:.5rem;color:#77786f;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase}
        .st-cta{background:var(--st-orange);padding:clamp(3.5rem,7vw,6.5rem) 0}.st-cta-inner{display:flex;justify-content:space-between;align-items:end;gap:2rem}.st-cta h2{font-size:clamp(3rem,7vw,7rem);line-height:.88;letter-spacing:-.09em;font-weight:500;max-width:800px}.st-cta p{margin-top:1rem;max-width:450px;line-height:1.75;color:rgba(35,33,29,.75);font-size:.92rem}.st-cta-button{display:inline-flex;align-items:center;gap:1.4rem;background:var(--st-ink);color:var(--st-paper);padding:1.05rem 1.2rem;font-size:.72rem;font-weight:750;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}.st-cta-button:hover{background:#41443e}
        .st-footer{background:#292b29;color:rgba(244,238,223,.55);padding:1.2rem 0;font-size:.68rem}.st-footer-inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
        @media(max-width:760px){.st-wrap{width:calc(100% - 2.2rem)}.st-nav{height:68px}.st-nav-links{gap:.8rem;font-size:.59rem}.st-nav-links a:nth-child(2){display:none}.st-nav-cta{display:none}.st-hero-grid,.st-statement-grid,.st-method-heading,.st-method-grid{grid-template-columns:1fr;gap:2rem}.st-hero h1{font-size:clamp(4rem,17vw,7rem)}.st-hero-image{min-height:420px}.st-pillars{grid-template-columns:1fr;gap:1rem}.st-pillar,.st-pillar+.st-pillar{padding:1.2rem 0;border-right:0;border-bottom:1px solid rgba(244,238,223,.22)}.st-pillar:last-child{border:0}.st-number-grid{grid-template-columns:1fr;gap:1.8rem}.st-number{border-bottom:1px solid var(--st-line);padding-bottom:1rem}.st-cta-inner{display:block}.st-cta-button{margin-top:1.5rem}}
        @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
      `}</style>
      <header className="st-wrap st-nav">
        <a href="/" aria-label="ProtoLabs home"><ProtoLabsLogoHorizontal size={34} showTagline={false} /></a>
        <nav className="st-nav-links" aria-label="Main navigation"><a href="/">Home</a><a href="/capabilities">Capabilities</a><a href="/portfolio">Portfolio</a><a href="/studio" aria-current="page">Studio</a></nav>
        <a className="st-nav-cta" href="/#contact">Start a project ↗</a>
      </header>
      <main>
        <section className="st-wrap st-hero">
          <div className="st-eyebrow">The studio / how we think</div>
          <div className="st-hero-grid">
            <div><h1>Made to<br />make <em>real.</em></h1><p className="st-lead">A hands-on engineering practice for turning complex technical ideas into clear, testable hardware and connected systems.</p><a className="st-underlink" href="/capabilities">Explore our capabilities <span>↗</span></a></div>
            <div className="st-hero-image"><img src={studioImages.bench} alt="Engineering workstation with hardware development equipment" fetchPriority="high" /><div className="st-image-caption"><span>ProtoLabs / Engineering studio</span><span>01 — 03</span></div></div>
          </div>
          <div className="st-index"><span>Independent thinking · Integrated engineering</span><span>Studio notes / 2026</span></div>
        </section>
        <section className="st-statement"><div className="st-wrap">
          <div className="st-statement-grid"><div className="st-label">Our point of view / 01</div><div><h2>Engineering is not a hand-off. It’s a <em>conversation.</em></h2><p className="st-statement-copy">Hardware, firmware and the physical world all have to work together. We bring those pieces into the same process early, using prototypes and clear technical decisions to reduce guesswork.</p></div></div>
          <div className="st-pillars">{[['01','Stay curious','Question assumptions before they become expensive design decisions.'],['02','Build to learn','Use working prototypes to test ideas against real constraints.'],['03','Make it usable','Keep documentation, integration and practical outcomes in view.']].map(item=><article className="st-pillar" key={item[0]}><span>{item[0]} / PRINCIPLE</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
        </div></section>
        <section className="st-method"><div className="st-wrap">
          <div className="st-method-heading"><h2>From the first<br />sketch onward.</h2><p>We work across the messy middle between an idea and a functioning system—where interfaces, power budgets, firmware and physical constraints meet.</p></div>
          <div className="st-method-grid"><div className="st-method-photo"><img src={studioImages.board} alt="Close-up of electronic circuit board components" loading="lazy" /></div><div className="st-method-copy"><div className="st-eyebrow">The way we work / 02</div><h3>Test assumptions.<br />Keep what works.</h3><p>We aim to make progress visible. Define the problem, choose a workable architecture, prototype the critical path, and document what the test actually taught us.</p><div className="st-method-list"><div><b>System thinking</b><span>↗</span></div><div><b>Hardware + firmware</b><span>↗</span></div><div><b>Prototype-led validation</b><span>↗</span></div></div></div></div>
        </div></section>
        <section className="st-numbers"><div className="st-wrap st-number-grid"><div className="st-number"><strong>{String(projectCount).padStart(2,'0')}</strong><span>Projects listed in platform</span></div><div className="st-number"><strong>01—04</strong><span>Discover to validate</span></div><div className="st-number"><strong>Build.</strong><span>Experiment. Innovate.</span></div></div></section>
      </main>
      <section className="st-cta"><div className="st-wrap st-cta-inner"><div><h2>Have a hard<br />problem?</h2><p>Tell us what you are trying to build. We can start with the constraints, map the unknowns and work toward a practical next step.</p></div><a className="st-cta-button" href="/#contact">Start a conversation <span>↗</span></a></div></section>
      <footer className="st-footer"><div className="st-wrap st-footer-inner"><span>© {new Date().getFullYear()} ProtoLabs Engineering</span><a href="/">Back to home ↑</a></div></footer>
    </div>
  );
};
