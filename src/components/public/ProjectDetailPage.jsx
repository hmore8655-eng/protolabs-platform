import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';
import { Hero3DStructure } from './Hero3DStructure';

const sceneFor = (project) => {
  const title = (project?.title || '').toLowerCase();
  if (/antenna|5g|rf|telecom|beamforming/.test(title)) return 'photo-1519389950473-47ba0277781c';
  if (/robot|car|dustbin|agriculture|sensor|automation|water|street light|door lock/.test(title)) return 'photo-1518770660439-4636190af475';
  if (/pcb|circuit|ecu|hardware|fpga|ethernet|stm32|dsp/.test(title)) return 'photo-1518770660439-4636190af475';
  return 'photo-1581091226825-a6a2a5aee158';
};

export const ProjectDetailPage = ({ projectId }) => {
  const { data } = useApp();
  const project = (data.projects || []).find((item) => String(item.id) === String(projectId));

  if (!project || !project.published) {
    return <main style={{minHeight:'100vh',background:'#f4eedf',padding:'3rem 7vw',color:'#292b29'}}>
      <a href="/#catalog" style={{color:'#b95127',fontWeight:700}}>← Back to project catalog</a>
      <h1 style={{fontSize:'clamp(2rem,5vw,4rem)',marginTop:'3rem'}}>Project not found</h1>
      <p style={{marginTop:'1rem'}}>This project may have been unpublished or the link may be incorrect.</p>
    </main>;
  }

  const hasPrice = (typeof project.price === 'number' && Number.isFinite(project.price)) || (typeof project.price === 'string' && project.price.trim().length > 0);
  const price = typeof project.price === 'number' ? '₹' + project.price.toLocaleString('en-IN') : (hasPrice ? project.price : 'Request a quote');
  const useConceptModel = /pcb|circuit|embedded|electronics|hardware|microcontroller|iot|sensor|robot|automation|raspberry|arduino|fpga|controller/i.test([project.title, project.category, project.description].filter(Boolean).join(' '));
  const image = project.image || project.imageUrl || project.coverImage || `https://images.unsplash.com/${sceneFor(project)}?auto=format&fit=crop&w=2400&q=90`;
  const inquiryUrl = '/?project=' + encodeURIComponent(project.title) + '#contact';

  return (
    <div className="pl-product">
      <style>{`
        .pl-product{--paper:#f4eedf;--ink:#292b29;--muted:#c9c6bb;--orange:#d96c36;background:var(--paper);color:var(--ink);min-height:100vh}
        .pl-product *{box-sizing:border-box}
        .pl-product__nav{height:76px;padding:0 clamp(1rem,5vw,5rem);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #d9d0c0;position:relative;z-index:5;background:rgba(244,238,223,.94);backdrop-filter:blur(16px)}
        .pl-product__back{font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;font-weight:700}
        .pl-product__hero{min-height:min(760px,calc(100vh - 76px));position:relative;display:flex;align-items:flex-end;overflow:hidden;background:#1f2421;color:#f4eedf;padding:clamp(2rem,7vw,7rem) clamp(1rem,7vw,7rem)}
        .pl-product__image{position:absolute;inset:-4%;background-image:linear-gradient(90deg,rgba(19,23,20,.9) 0%,rgba(19,23,20,.62) 48%,rgba(19,23,20,.12) 100%),linear-gradient(0deg,rgba(19,23,20,.8),transparent 55%),url('${image}');background-position:center;background-size:cover;animation:plSceneDrift 24s ease-in-out infinite alternate;transform:scale(1.04)}
        .pl-product__model{position:absolute;inset:0;opacity:.9;pointer-events:none;background:radial-gradient(ellipse at 65% 42%,rgba(57,89,66,.32),transparent 56%),linear-gradient(90deg,rgba(19,23,20,.97) 0%,rgba(19,23,20,.8) 42%,rgba(19,23,20,.16) 100%)}\n        .pl-product__model .pl3d-stage{inset:0 0 0 36%;}\n        .pl-product__model .pl3d-caption,.pl-product__model .pl3d-axis{display:none}\n        .pl-product__grid{position:absolute;inset:0;opacity:.17;background-image:linear-gradient(rgba(244,238,223,.14) 1px,transparent 1px),linear-gradient(90deg,rgba(244,238,223,.14) 1px,transparent 1px);background-size:70px 70px;mask-image:linear-gradient(90deg,black,transparent 85%);pointer-events:none}
        .pl-product__heroContent{position:relative;z-index:2;max-width:940px;animation:plRise .9s cubic-bezier(.16,1,.3,1) both}
        .pl-product__eyebrow{display:flex;gap:.7rem;align-items:center;color:#f2a47d;text-transform:uppercase;font-size:.68rem;letter-spacing:.2em;font-weight:800}
        .pl-product__eyebrow:before{content:'';width:30px;height:1px;background:var(--orange)}
        .pl-product__hero h1{color:#f4eedf;font-size:clamp(2.8rem,7.4vw,7.5rem);line-height:.91;letter-spacing:-.075em;font-weight:500;margin:1.6rem 0;max-width:1000px}
        .pl-product__desc{max-width:680px;color:rgba(244,238,223,.8);font-size:clamp(1rem,1.4vw,1.2rem);line-height:1.8}
        .pl-product__heroMeta{display:flex;flex-wrap:wrap;gap:1.6rem;margin-top:2rem;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,238,223,.7)}
        .pl-product__heroMeta strong{color:#fff;font-weight:700}
        .pl-product__details{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(290px,.65fr);gap:clamp(2rem,6vw,6rem);width:min(1300px,calc(100% - 10vw));margin:0 auto;padding:clamp(4rem,8vw,7rem) 0}
        .pl-product__sectionLabel{font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:#b95127;font-weight:800;margin-bottom:1rem}
        .pl-product__details h2{font-size:clamp(2rem,4vw,3.8rem);font-weight:500;line-height:1;letter-spacing:-.06em;margin-bottom:1.5rem}
        .pl-product__features{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-top:2rem}
        .pl-product__features li{background:#fffaf0;border:1px solid #ded4c5;padding:1.1rem;display:flex;gap:.8rem;align-items:flex-start;line-height:1.5;font-size:.9rem}
        .pl-product__check{color:var(--orange);font-size:1.15rem;font-weight:900}
        .pl-product__buy{position:sticky;top:1.5rem;align-self:start;background:#fffaf0;border:1px solid #d9d0c0;padding:clamp(1.4rem,3vw,2.2rem);box-shadow:0 24px 60px rgba(41,43,41,.08)}
        .pl-product__price{font-size:clamp(2.7rem,5vw,4.3rem);font-weight:600;letter-spacing:-.07em;line-height:1.1;margin:.7rem 0}
        .pl-product__buy p{color:#686960;line-height:1.7;font-size:.9rem}
        .pl-product__cta{display:flex;align-items:center;justify-content:space-between;gap:1rem;background:var(--orange);color:#fff;padding:1rem 1.15rem;margin-top:1.6rem;font-weight:800;font-size:.85rem;transition:transform .25s,background .25s}
        .pl-product__cta:hover{background:#b95127;transform:translateY(-3px)}
        .pl-product__fine{border-top:1px solid #ded4c5;margin-top:1.5rem;padding-top:1rem;font-size:.76rem!important}
        .pl-product__bottom{background:#292b29;color:#f4eedf;padding:clamp(3rem,7vw,6rem) 7vw;display:flex;justify-content:space-between;align-items:end;gap:2rem}
        .pl-product__bottom h2{font-size:clamp(2.2rem,5vw,5rem);font-weight:500;letter-spacing:-.07em;line-height:.98;color:#f4eedf;max-width:720px}
        .pl-product__bottom a{color:#f2a47d;border-bottom:1px solid #d96c36;padding-bottom:.6rem;white-space:nowrap;font-weight:700}
        @keyframes plSceneDrift{0%{transform:scale(1.04) translate3d(-1%,0,0)}100%{transform:scale(1.15) translate3d(1%,-1%,0)}}
        @keyframes plRise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:760px){.pl-product__model .pl3d-stage{inset:0 0 0 10%;opacity:.72}.pl-product__hero{min-height:670px}.pl-product__details{grid-template-columns:1fr;width:calc(100% - 2rem)}.pl-product__features{grid-template-columns:1fr}.pl-product__buy{position:static}.pl-product__bottom{align-items:flex-start;flex-direction:column}.pl-product__nav{height:68px}.pl-product__nav svg{max-width:145px}}
        @media(prefers-reduced-motion:reduce){.pl-product__image,.pl-product__heroContent{animation:none}.pl-product__cta{transition:none}}
      `}</style>
      <nav className="pl-product__nav">
        <a href="/" aria-label="ProtoLabs home"><ProtoLabsLogoHorizontal size={34} showTagline={false} /></a>
        <a className="pl-product__back" href="/#catalog">← All projects</a>
      </nav>
      <section className="pl-product__hero">
        <div className="pl-product__image" role="img" aria-label={`Engineering visual for ${project.title}`} />
        <div className="pl-product__grid" />
        <div className="pl-product__heroContent">
          <div className="pl-product__eyebrow">{project.category} / ProtoLabs Project</div>
          <h1>{project.title}</h1>
          <p className="pl-product__desc">{project.description}</p>
          <div className="pl-product__heroMeta">
            <span>Estimated delivery <strong>{project.duration || 'Discuss scope'}</strong></span>
            <span>Format <strong>Engineering solution</strong></span>
            {project.featured && <span><strong>Featured project</strong></span>}
          </div>
        </div>
      </section>
      <section className="pl-product__details">
        <div>
          <div className="pl-product__sectionLabel">01 / Project overview</div>
          <h2>Built with purpose.<br/>Documented for use.</h2>
          <p style={{color:'#62635b',lineHeight:1.85,maxWidth:700}}>{project.description} The scope below reflects the currently listed project deliverables. Final requirements, revisions, and hardware supply can be confirmed before work begins.</p>
          <div className="pl-product__sectionLabel" style={{marginTop:'3rem'}}>02 / What's included</div>
          <ul className="pl-product__features">
            {(project.features || []).map((feature,index)=><li key={index}><span className="pl-product__check">↗</span><span>{feature}</span></li>)}
          </ul>
        </div>
        <aside className="pl-product__buy">
          <div className="pl-product__sectionLabel">Project package</div>
          <h3 style={{fontSize:'1.25rem',lineHeight:1.35}}>{project.title}</h3>
          <div className="pl-product__price">{price}</div>
          <p>{hasPrice ? 'Listed project price' : 'Pricing depends on final scope, components, and deliverables'} · estimated completion {project.duration || 'to be confirmed'}.</p>
          <a className="pl-product__cta" href={inquiryUrl}><span>Enquire about this project</span><span aria-hidden="true">↗</span></a>
          <p className="pl-product__fine">This is a project/service listing, not an instant checkout. Confirm scope, availability, physical hardware, and final quotation with ProtoLabs before ordering.</p>
        </aside>
      </section>
      <section className="pl-product__bottom">
        <div><div className="pl-product__sectionLabel">Next step / Make it real</div><h2>Have a variation in mind?</h2></div>
        <a href={inquiryUrl}>Discuss a custom version ↗</a>
      </section>
    </div>
  );
};
