import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';

const capabilityVisuals = [
  { label: 'HARDWARE DESIGN', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=90', number: '01' },
  { label: 'EMBEDDED SYSTEMS', image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1400&q=90', number: '02' },
  { label: 'RF & CONNECTIVITY', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=90', number: '03' },
];

export const CapabilitiesPage = () => {
  const { data } = useApp();
  const services = data.services || [];

  return (
    <div className="capabilities-page">
      <style>{`
        .cp-page{--cp-paper:#f4eedf;--cp-ink:#292b29;--cp-muted:#77786f;--cp-orange:#d96c36;--cp-line:#d9d0c0;background:var(--cp-paper);color:var(--cp-ink);min-height:100vh}
        .capabilities-page{--cp-paper:#f4eedf;--cp-ink:#292b29;--cp-muted:#77786f;--cp-orange:#d96c36;--cp-line:#d9d0c0;background:var(--cp-paper);color:var(--cp-ink);min-height:100vh}
        .cp-wrap{width:min(1440px,calc(100% - 9vw));margin-inline:auto}
        .cp-nav{height:78px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--cp-line)}
        .cp-links{display:flex;align-items:center;gap:clamp(1rem,2.5vw,2.6rem);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase}
        .cp-links a{transition:color .2s}.cp-links a:hover,.cp-links a[aria-current="page"]{color:var(--cp-orange)}
        .cp-nav-cta{border:1px solid var(--cp-ink);padding:.8rem 1rem;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase}.cp-nav-cta:hover{background:var(--cp-ink);color:var(--cp-paper)}
        .cp-hero{position:relative;isolation:isolate;overflow:hidden;background:#242722;color:var(--cp-paper);padding:clamp(4.5rem,9vw,8.5rem) 0 0}
        .cp-hero-photo{position:absolute;z-index:-2;inset:0 0 0 25%;background:url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2200&q=90') center 43%/cover no-repeat;opacity:.48;filter:saturate(.72)}
        .cp-hero-shade{position:absolute;z-index:-1;inset:0;background:linear-gradient(90deg,#242722 0%,rgba(36,39,34,.97) 24%,rgba(36,39,34,.72) 56%,rgba(36,39,34,.18) 100%),linear-gradient(0deg,#242722 0%,transparent 48%)}
        .cp-hero-content{display:grid;grid-template-columns:minmax(0,1fr) minmax(220px,.38fr);align-items:end;gap:3rem;padding-bottom:clamp(4rem,8vw,7rem)}
        .cp-kicker{display:flex;align-items:center;gap:.75rem;color:#e9a17d;font-size:.68rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}.cp-kicker:before{content:'';width:32px;height:1px;background:var(--cp-orange)}
        .cp-hero h1{font-size:clamp(4rem,9vw,9.2rem);font-weight:500;line-height:.86;letter-spacing:-.09em;margin:2rem 0;color:var(--cp-paper)}
        .cp-hero h1 em{font-style:normal;color:var(--cp-orange)}
        .cp-intro{max-width:590px;font-size:clamp(1rem,1.25vw,1.15rem);line-height:1.8;color:rgba(244,238,223,.73)}
        .cp-hero-aside{border-left:1px solid rgba(244,238,223,.35);padding:.2rem 0 .2rem 1.5rem;margin-bottom:.5rem}.cp-hero-aside strong{display:block;font-size:2.4rem;font-weight:500;letter-spacing:-.07em}.cp-hero-aside span{display:block;margin-top:.4rem;color:rgba(244,238,223,.63);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;line-height:1.7}
        .cp-meta{display:flex;justify-content:space-between;gap:1rem;border-top:1px solid rgba(244,238,223,.2);padding:1rem 0;color:rgba(244,238,223,.58);font-size:.65rem;letter-spacing:.14em;text-transform:uppercase}
        .cp-intro-section{padding:clamp(4rem,8vw,7rem) 0}.cp-intro-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(2rem,7vw,7rem);align-items:start}
        .cp-overline{color:var(--cp-orange);font-size:.68rem;font-weight:750;letter-spacing:.18em;text-transform:uppercase}
        .cp-intro-section h2{font-size:clamp(2.5rem,5vw,5rem);font-weight:550;line-height:.96;letter-spacing:-.075em;margin-top:1.3rem}
        .cp-intro-copy{max-width:680px;color:#65665e;font-size:clamp(1rem,1.35vw,1.2rem);line-height:1.9}.cp-intro-copy p+p{margin-top:1.2rem}
        .cp-feature-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:clamp(1rem,2vw,2rem);padding-bottom:clamp(4rem,8vw,7rem)}
        .cp-feature{grid-column:span 4;min-width:0}.cp-feature:nth-child(2){margin-top:3rem}.cp-feature:nth-child(3){margin-top:6rem}
        .cp-feature-photo{position:relative;overflow:hidden;aspect-ratio:.84;background:#d9d2c4}.cp-feature-photo img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.78);transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .4s}.cp-feature:hover img{transform:scale(1.045);filter:saturate(1)}
        .cp-feature-num{position:absolute;top:1rem;left:1rem;background:var(--cp-paper);padding:.55rem .7rem;font-size:.65rem;letter-spacing:.12em}.cp-feature-label{position:absolute;bottom:1rem;left:1rem;color:white;background:rgba(35,37,32,.88);padding:.6rem .7rem;font-size:.62rem;letter-spacing:.13em}
        .cp-feature-body{padding:1.3rem 0 1.5rem;border-bottom:1px solid var(--cp-line)}.cp-feature h3{font-size:clamp(1.3rem,2vw,2rem);font-weight:550;letter-spacing:-.055em;line-height:1.1;margin-bottom:.65rem}.cp-feature p{color:#6d6e65;font-size:.85rem;line-height:1.75}
        .cp-service-list{background:#e9e2d3;border-block:1px solid var(--cp-line);padding:clamp(4rem,8vw,7rem) 0}
        .cp-service-head{display:flex;align-items:end;justify-content:space-between;gap:2rem;margin-bottom:2.8rem}.cp-service-head h2{font-size:clamp(2.5rem,5vw,5rem);font-weight:550;letter-spacing:-.075em;line-height:.96;max-width:650px}.cp-service-head p{max-width:320px;color:#6b6d64;font-size:.88rem;line-height:1.75}
        .cp-service-row{display:grid;grid-template-columns:70px minmax(180px,.75fr) minmax(0,1.25fr) 36px;gap:1.5rem;align-items:start;padding:1.7rem 0;border-top:1px solid #cfc6b6}.cp-service-row:last-child{border-bottom:1px solid #cfc6b6}
        .cp-service-number{font-size:.72rem;color:var(--cp-orange);letter-spacing:.12em;padding-top:.25rem}.cp-service-row h3{font-size:1.35rem;font-weight:600;letter-spacing:-.04em}.cp-service-row p{color:#686a61;font-size:.9rem;line-height:1.8;max-width:620px}.cp-service-arrow{font-size:1.2rem;color:var(--cp-orange)}
        .cp-process{padding:clamp(4rem,8vw,7rem) 0}.cp-process-head{display:grid;grid-template-columns:1fr .8fr;gap:3rem;align-items:end;margin-bottom:3rem}.cp-process h2{font-size:clamp(2.5rem,5vw,5rem);font-weight:550;letter-spacing:-.075em;line-height:.96}.cp-process-head p{color:#6b6d64;line-height:1.8;max-width:470px}
        .cp-steps{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--cp-line)}.cp-step{padding:1.4rem 1.3rem 1.5rem 0;border-right:1px solid var(--cp-line)}.cp-step+.cp-step{padding-left:1.3rem}.cp-step:last-child{border-right:0}.cp-step span{color:var(--cp-orange);font-size:.7rem;letter-spacing:.12em}.cp-step h3{margin:1.5rem 0 .6rem;font-size:1.1rem;letter-spacing:-.03em}.cp-step p{color:#707168;font-size:.82rem;line-height:1.7}
        .cp-cta{background:#292b29;color:var(--cp-paper);padding:clamp(3.5rem,7vw,6rem) 0}.cp-cta-inner{display:flex;align-items:end;justify-content:space-between;gap:2rem}.cp-cta h2{max-width:760px;font-size:clamp(2.8rem,6vw,6rem);font-weight:500;line-height:.94;letter-spacing:-.075em}.cp-cta h2 em{font-style:normal;color:var(--cp-orange)}.cp-cta p{max-width:450px;margin-top:1.2rem;color:rgba(244,238,223,.66);font-size:.9rem;line-height:1.75}
        .cp-cta-button{display:inline-flex;align-items:center;gap:1.5rem;background:var(--cp-orange);color:#211f1b;padding:1rem 1.2rem;font-size:.75rem;font-weight:750;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;transition:background .2s,transform .2s}.cp-cta-button:hover{background:#ee8755;transform:translateY(-2px)}
        .cp-footer{background:#292b29;color:rgba(244,238,223,.5);padding:1.2rem 0;border-top:1px solid rgba(244,238,223,.17);font-size:.68rem}
        @media(max-width:760px){.cp-wrap{width:calc(100% - 2.2rem)}.cp-nav{height:68px}.cp-links{gap:.8rem;font-size:.6rem}.cp-links a:nth-child(2){display:none}.cp-nav-cta{display:none}.cp-hero-content,.cp-intro-grid,.cp-process-head{grid-template-columns:1fr;gap:1.5rem}.cp-hero h1{font-size:clamp(3.7rem,15vw,6rem)}.cp-hero-photo{inset:0;opacity:.32}.cp-hero-aside{display:none}.cp-intro-copy{font-size:1rem}.cp-feature{grid-column:span 12}.cp-feature:nth-child(2),.cp-feature:nth-child(3){margin-top:0}.cp-feature-photo{aspect-ratio:1.15}.cp-service-head{display:block}.cp-service-head p{margin-top:1rem}.cp-service-row{grid-template-columns:34px 1fr 24px;gap:.8rem}.cp-service-row p{grid-column:2/4}.cp-steps{grid-template-columns:1fr 1fr}.cp-step{padding:1.2rem .8rem 1.4rem 0;border-bottom:1px solid var(--cp-line)}.cp-step+.cp-step{padding-left:.8rem}.cp-step:nth-child(2){border-right:0}.cp-cta-inner{display:block}.cp-cta-button{margin-top:1.5rem}}
        @media(prefers-reduced-motion:reduce){.cp-feature-photo img,.cp-cta-button{transition:none}}
      `}</style>
      <header className="cp-wrap cp-nav">
        <a href="/" aria-label="ProtoLabs home"><ProtoLabsLogoHorizontal size={34} showTagline={false} /></a>
        <nav className="cp-links" aria-label="Main navigation"><a href="/">Home</a><a href="/capabilities" aria-current="page">Capabilities</a><a href="/portfolio">Portfolio</a></nav>
        <a className="cp-nav-cta" href="/#contact">Start a project ↗</a>
      </header>
      <section className="cp-hero">
        <div className="cp-hero-photo" aria-hidden="true" /><div className="cp-hero-shade" aria-hidden="true" />
        <div className="cp-wrap cp-hero-content">
          <div><div className="cp-kicker">What we engineer / capabilities</div><h1>Ideas into<br /><em>instruments.</em></h1><p className="cp-intro">From circuit architecture to embedded intelligence, we connect engineering disciplines to move physical products from early questions toward testable solutions.</p></div>
          <div className="cp-hero-aside"><strong>{String(services.length || 5).padStart(2, '0')}</strong><span>Engineering disciplines<br />one connected process</span></div>
        </div>
        <div className="cp-wrap cp-meta"><span>PROTO LABS / ENGINEERING STUDIO</span><span>CAPABILITIES · 01—03</span></div>
      </section>
      <main>
        <section className="cp-intro-section"><div className="cp-wrap cp-intro-grid"><div><div className="cp-overline">Engineering with intent</div><h2>One partner.<br />Connected thinking.</h2></div><div className="cp-intro-copy"><p>Good hardware is more than a schematic or a polished enclosure. It is the result of electrical design, firmware, system integration and thoughtful testing working together.</p><p>Our approach brings those layers into the same conversation early—so technical choices support the product, not just the prototype.</p></div></div></section>
        <section className="cp-wrap cp-feature-grid" aria-label="Featured engineering disciplines">
          {capabilityVisuals.map(item => <article className="cp-feature" key={item.number}><div className="cp-feature-photo"><img src={item.image} alt={item.label.toLowerCase()} loading="lazy" /><span className="cp-feature-num">{item.number}</span><span className="cp-feature-label">{item.label}</span></div><div className="cp-feature-body"><h3>{item.label === 'HARDWARE DESIGN' ? 'From circuit to board.' : item.label === 'EMBEDDED SYSTEMS' ? 'Intelligence at the edge.' : 'Connected by design.'}</h3><p>{item.label === 'HARDWARE DESIGN' ? 'Circuit architecture, PCB layout and practical design decisions shaped around the intended application.' : item.label === 'EMBEDDED SYSTEMS' ? 'Firmware and software integration that helps physical devices sense, respond and communicate.' : 'RF concepts, wireless connectivity and system-level thinking for devices that need to talk.'}</p></div></article>)}
        </section>
        <section className="cp-service-list"><div className="cp-wrap"><div className="cp-service-head"><h2>Technical depth.<br />Practical outcomes.</h2><p>Explore the services currently listed in the ProtoLabs platform. Scope and deliverables are confirmed for each project.</p></div>
          {services.length ? services.map((item, index) => <article className="cp-service-row" key={item.id || item.title}><span className="cp-service-number">{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p><span className="cp-service-arrow" aria-hidden="true">↗</span></article>) : <article className="cp-service-row"><span className="cp-service-number">01</span><h3>Electronics &amp; PCB Design</h3><p>Board-level design and hardware development, scoped around the project’s requirements.</p><span className="cp-service-arrow" aria-hidden="true">↗</span></article>}
        </div></section>
        <section className="cp-process"><div className="cp-wrap"><div className="cp-process-head"><h2>Built through<br />clear decisions.</h2><p>A focused process makes complex engineering more manageable—from understanding the problem to validating the implementation.</p></div><div className="cp-steps">
          {[['01','Discover','Clarify the application, constraints, interfaces and intended outcome.'],['02','Architect','Choose the system approach, components and integration boundaries.'],['03','Prototype','Build the hardware and firmware needed to test the important assumptions.'],['04','Validate','Review results, document trade-offs and define the next iteration.']].map(step => <article className="cp-step" key={step[0]}><span>{step[0]} / PROCESS</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}
        </div></div></section>
      </main>
      <section className="cp-cta"><div className="cp-wrap cp-cta-inner"><div><h2>Let’s engineer what<br /><em>comes next.</em></h2><p>Share your requirements and we can identify a sensible next step, from initial architecture to a working prototype.</p></div><a className="cp-cta-button" href="/#contact">Discuss your project <span>↗</span></a></div></section>
      <footer className="cp-footer"><div className="cp-wrap" style={{display:'flex',justifyContent:'space-between',gap:'1rem',flexWrap:'wrap'}}><span>© {new Date().getFullYear()} ProtoLabs Engineering</span><a href="/">Back to home ↑</a></div></footer>
    </div>
  );
};
