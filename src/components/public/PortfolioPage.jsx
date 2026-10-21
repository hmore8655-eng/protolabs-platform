import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';

const categories = ['All work', 'Telecom & RF', 'IoT & Automation', 'FPGA & DSP', 'Embedded Systems'];

export const PortfolioPage = () => {
  const { data } = useApp();
  const { portfolio = [], testimonials = [] } = data;
  const [activeCategory, setActiveCategory] = useState('All work');

  const visibleProjects = useMemo(() => portfolio.filter((item) => (
    activeCategory === 'All work' || item.category === activeCategory
  )), [portfolio, activeCategory]);

  return (
    <div className="portfolio-page">
      <style>{`
        .portfolio-page{--pp-paper:#f4eedf;--pp-ink:#292b29;--pp-muted:#77786f;--pp-orange:#d96c36;--pp-line:#d9d0c0;background:var(--pp-paper);color:var(--pp-ink);min-height:100vh}
        .pp-wrap{width:min(1440px,100% - 9vw);margin-inline:auto}
        .pp-nav{height:78px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--pp-line)}
        .pp-nav__links{display:flex;align-items:center;gap:clamp(1rem,2.5vw,2.6rem);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase}
        .pp-nav__links a{transition:color .2s}.pp-nav__links a:hover,.pp-nav__links a[aria-current="page"]{color:var(--pp-orange)}
        .pp-nav__cta{border:1px solid var(--pp-ink);padding:.8rem 1rem;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase}
        .pp-nav__cta:hover{background:var(--pp-ink);color:var(--pp-paper)}
        .pp-hero{position:relative;overflow:hidden;background:#242722;color:#f4eedf;padding:clamp(4.5rem,9vw,8.5rem) 0 0}
        .pp-hero__photo{position:absolute;inset:0 0 0 27%;background:url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=90') center 46%/cover no-repeat;opacity:.42;filter:saturate(.7)}
        .pp-hero__shade{position:absolute;inset:0;background:linear-gradient(90deg,#242722 0%,rgba(36,39,34,.98) 28%,rgba(36,39,34,.7) 59%,rgba(36,39,34,.2) 100%),linear-gradient(0deg,#242722 0%,transparent 50%)}
        .pp-hero__content{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(220px,.45fr);gap:3rem;align-items:end;padding-bottom:clamp(4rem,8vw,7rem)}
        .pp-kicker{display:flex;align-items:center;gap:.75rem;color:#e9a17d;font-size:.68rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
        .pp-kicker:before{content:'';width:32px;height:1px;background:var(--pp-orange)}
        .pp-hero h1{font-size:clamp(4rem,9vw,9.4rem);font-weight:500;line-height:.86;letter-spacing:-.09em;color:#f4eedf;margin:2rem 0}
        .pp-hero h1 em{font-style:normal;color:var(--pp-orange)}
        .pp-hero__intro{max-width:580px;font-size:clamp(1rem,1.25vw,1.15rem);line-height:1.8;color:rgba(244,238,223,.73)}
        .pp-hero__aside{align-self:end;border-left:1px solid rgba(244,238,223,.35);padding:0 0 .2rem 1.5rem;margin-bottom:.5rem}
        .pp-hero__aside strong{display:block;font-size:2.6rem;letter-spacing:-.07em;font-weight:500}
        .pp-hero__aside span{display:block;margin-top:.35rem;color:rgba(244,238,223,.65);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;line-height:1.6}
        .pp-meta{display:flex;justify-content:space-between;gap:1rem;border-top:1px solid rgba(244,238,223,.2);padding:1rem 0;color:rgba(244,238,223,.58);font-size:.65rem;letter-spacing:.14em;text-transform:uppercase}
        .pp-work{padding:clamp(3.5rem,7vw,6.5rem) 0}
        .pp-section-head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.3rem}
        .pp-section-head h2{font-size:clamp(2.5rem,5vw,5rem);font-weight:550;letter-spacing:-.075em;line-height:.98;max-width:700px}
        .pp-section-head p{max-width:330px;color:#6e6f67;font-size:.9rem;line-height:1.7}
        .pp-filters{display:flex;gap:.5rem;flex-wrap:wrap;border-bottom:1px solid var(--pp-line);padding-bottom:1.2rem;margin-bottom:2rem}
        .pp-filter{padding:.7rem .9rem;border:1px solid transparent;color:#62635b;font-size:.72rem;letter-spacing:.04em;transition:all .2s}
        .pp-filter:hover{border-color:var(--pp-line)}.pp-filter[aria-pressed="true"]{background:var(--pp-ink);color:var(--pp-paper);border-color:var(--pp-ink)}
        .pp-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:clamp(1.2rem,2.3vw,2.2rem)}
        .pp-card{grid-column:span 6;min-width:0;animation:pp-rise .45s both}
        .pp-card:nth-child(3n+1){grid-column:span 7}.pp-card:nth-child(3n+2){grid-column:span 5}
        .pp-card__image{position:relative;overflow:hidden;background:#ded8ca;aspect-ratio:1.4/1}
        .pp-card__image img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .5s;filter:saturate(.82)}
        .pp-card:hover .pp-card__image img{transform:scale(1.045);filter:saturate(1)}
        .pp-card__number{position:absolute;left:1rem;top:1rem;padding:.5rem .65rem;background:rgba(244,238,223,.9);font-size:.65rem;letter-spacing:.12em}
        .pp-card__category{position:absolute;right:1rem;bottom:1rem;background:var(--pp-orange);color:#fffaf0;padding:.55rem .7rem;font-size:.63rem;letter-spacing:.08em;text-transform:uppercase}
        .pp-card__body{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1rem;padding:1rem 0 1.5rem;border-bottom:1px solid var(--pp-line)}
        .pp-card h3{font-size:clamp(1.25rem,2vw,1.8rem);font-weight:550;letter-spacing:-.055em;line-height:1.1;margin-bottom:.5rem}
        .pp-card p{font-size:.82rem;line-height:1.65;color:#6b6d64;max-width:540px}
        .pp-card__arrow{display:grid;place-items:center;width:42px;height:42px;border:1px solid var(--pp-line);font-size:1.1rem;transition:all .25s}
        .pp-card:hover .pp-card__arrow{background:var(--pp-orange);border-color:var(--pp-orange);color:white;transform:translate(2px,-2px)}
        .pp-empty{padding:4rem 1rem;text-align:center;color:#6b6d64;border:1px dashed var(--pp-line)}
        .pp-proof{background:#e9e2d3;padding:clamp(3rem,6vw,5rem) 0;border-block:1px solid var(--pp-line)}
        .pp-proof__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
        .pp-quote{padding:1.5rem;border-top:2px solid var(--pp-orange);background:rgba(255,250,240,.55)}
        .pp-stars{color:var(--pp-orange);letter-spacing:.16em;font-size:.9rem;margin-bottom:1rem}
        .pp-quote blockquote{font-size:1rem;line-height:1.75;letter-spacing:-.015em}
        .pp-quote__person{margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--pp-line)}
        .pp-quote__person strong{display:block;font-size:.82rem}.pp-quote__person span{display:block;color:#73746c;font-size:.72rem;margin-top:.25rem}
        .pp-bottom{background:#292b29;color:var(--pp-paper);padding:clamp(3rem,6vw,5rem) 0}
        .pp-bottom__inner{display:flex;justify-content:space-between;align-items:end;gap:2rem}
        .pp-bottom h2{max-width:740px;font-size:clamp(2.8rem,6vw,6rem);font-weight:500;line-height:.94;letter-spacing:-.075em;color:var(--pp-paper)}
        .pp-bottom h2 em{font-style:normal;color:var(--pp-orange)}
        .pp-bottom p{color:rgba(244,238,223,.66);max-width:360px;line-height:1.7;font-size:.9rem;margin-top:1.2rem}
        .pp-bottom__button{display:inline-flex;align-items:center;gap:1.4rem;background:var(--pp-orange);color:#211f1b;padding:1rem 1.2rem;font-size:.75rem;font-weight:750;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
        .pp-footer{background:#292b29;color:rgba(244,238,223,.5);padding:1.2rem 0;border-top:1px solid rgba(244,238,223,.17);font-size:.68rem}
        @keyframes pp-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:760px){.pp-wrap{width:calc(100% - 2.2rem)}.pp-nav{height:68px}.pp-nav__links{gap:.8rem;font-size:.6rem}.pp-nav__links a:nth-child(2),.pp-nav__links a:nth-child(3){display:none}.pp-nav__cta{display:none}.pp-hero__content{grid-template-columns:1fr;gap:2rem}.pp-hero__aside{display:none}.pp-hero h1{font-size:clamp(3.7rem,15vw,6rem)}.pp-hero__photo{inset:0 0 0 5%;opacity:.3}.pp-section-head{display:block}.pp-section-head p{margin-top:1rem}.pp-card,.pp-card:nth-child(3n+1),.pp-card:nth-child(3n+2){grid-column:span 12}.pp-card__image{aspect-ratio:1.25/1}.pp-proof__grid{grid-template-columns:1fr}.pp-bottom__inner{display:block}.pp-bottom__button{margin-top:1.5rem}}
        @media(prefers-reduced-motion:reduce){.pp-card,.pp-card__image img,.pp-card__arrow{animation:none;transition:none}}
      `}</style>

      <header className="pp-wrap pp-nav">
        <a href="/" aria-label="ProtoLabs home"><ProtoLabsLogoHorizontal size={34} showTagline={false} /></a>
        <nav className="pp-nav__links" aria-label="Main navigation">
          <a href="/">Home</a><a href="/#catalog">Solutions</a><a href="/portfolio" aria-current="page">Portfolio</a>
        </nav>
        <a className="pp-nav__cta" href="/#contact">Start a project ↗</a>
      </header>

      <section className="pp-hero">
        <div className="pp-hero__photo" aria-hidden="true" /><div className="pp-hero__shade" aria-hidden="true" />
        <div className="pp-wrap pp-hero__content">
          <div>
            <div className="pp-kicker">Selected engineering work / 2026</div>
            <h1>Built to<br />solve <em>real.</em></h1>
            <p className="pp-hero__intro">A closer look at hardware, embedded systems and engineering work from concept through implementation. Explore the disciplines, decisions and outcomes behind each project.</p>
          </div>
          <div className="pp-hero__aside"><strong>{String(portfolio.length).padStart(2, '0')}</strong><span>Projects in the current showcase</span></div>
        </div>
        <div className="pp-wrap pp-meta"><span>PROTO LABS / ENGINEERING STUDIO</span><span>SELECTED WORK · 01—{String(portfolio.length).padStart(2, '0')}</span></div>
      </section>

      <main className="pp-work">
        <div className="pp-wrap">
          <div className="pp-section-head"><h2>Engineering, made tangible.</h2><p>Filter by discipline to explore the work. Each project is presented with its category and reported outcome.</p></div>
          <div className="pp-filters" role="group" aria-label="Filter portfolio projects">
            {categories.map(category => <button className="pp-filter" key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          {visibleProjects.length ? <div className="pp-grid">
            {visibleProjects.map((item, index) => <article className="pp-card" key={item.id}>
              <div className="pp-card__image">
                <img src={item.image} alt={item.title} loading={index > 1 ? 'lazy' : 'eager'} />
                <span className="pp-card__number">PL / {String(index + 1).padStart(2, '0')}</span>
                <span className="pp-card__category">{item.category}</span>
              </div>
              <div className="pp-card__body">
                <div><h3>{item.title}</h3><p>{item.outcome}</p></div>
                <span className="pp-card__arrow" aria-hidden="true">↗</span>
              </div>
            </article>)}
          </div> : <div className="pp-empty">No projects in this discipline yet. Choose another category to explore the showcase.</div>}
        </div>
      </main>

      {testimonials.length > 0 && <section className="pp-proof">
        <div className="pp-wrap">
          <div className="pp-section-head"><h2>Trust is built into the process.</h2><p>Feedback currently recorded in the ProtoLabs platform.</p></div>
          <div className="pp-proof__grid">{testimonials.slice(0, 3).map(item => <article className="pp-quote" key={item.id}>
            <div className="pp-stars" aria-label={`${item.rating} out of 5 stars`}>{'★'.repeat(Math.max(0, Math.min(5, Number(item.rating) || 0)))}</div>
            <blockquote>“{item.quote}”</blockquote>
            <div className="pp-quote__person"><strong>{item.name}</strong><span>{item.title}</span></div>
          </article>)}</div>
        </div>
      </section>}

      <section className="pp-bottom">
        <div className="pp-wrap pp-bottom__inner">
          <div><h2>Have a problem worth <em>solving?</em></h2><p>Tell us what you’re building. We’ll help map the next step from engineering challenge to workable prototype.</p></div>
          <a className="pp-bottom__button" href="/#contact">Discuss your project <span>↗</span></a>
        </div>
      </section>
      <footer className="pp-footer"><div className="pp-wrap" style={{display:'flex',justifyContent:'space-between',gap:'1rem',flexWrap:'wrap'}}><span>© {new Date().getFullYear()} ProtoLabs Engineering</span><a href="/">Back to home ↑</a></div></footer>
    </div>
  );
};
