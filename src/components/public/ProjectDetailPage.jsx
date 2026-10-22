import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';
import './ProjectDetailPage.css';

// Fallback photography when a project has no image of its own.
const sceneFor = (project) => {
  const title = (project?.title || '').toLowerCase();
  if (/antenna|5g|rf|telecom|beamforming/.test(title)) return 'photo-1519389950473-47ba0277781c';
  if (/robot|car|dustbin|agriculture|sensor|automation|water|street light|door lock|pcb|circuit|ecu|hardware|fpga|ethernet|stm32|dsp/.test(title)) return 'photo-1518770660439-4636190af475';
  return 'photo-1581091226825-a6a2a5aee158';
};

export const ProjectDetailPage = ({ projectId }) => {
  const { data } = useApp();
  const project = (data.projects || []).find((item) => String(item.id) === String(projectId));
  const isVisible = Boolean(project && project.published);

  // Per-project document title; restores the previous title on leave.
  useEffect(() => {
    if (!isVisible) return undefined;
    const previous = document.title;
    document.title = `${project.title} | ProtoLabs Engineering`;
    return () => { document.title = previous; };
  }, [isVisible, project]);

  if (!isVisible) {
    return (
      <main className="pd pd--missing">
        <a className="pd__back" href="/#catalog">← Back to project catalog</a>
        <h1>Project not found</h1>
        <p>This project may be unpublished or the link may be incorrect.</p>
      </main>
    );
  }

  const hasPrice = (typeof project.price === 'number' && Number.isFinite(project.price)) || (typeof project.price === 'string' && project.price.trim().length > 0);
  const price = typeof project.price === "number" ? "₭) + project.price.toLocaleString('en-In') : (hasPrice ? project.price : 'Request a quote');
  const image = project.image || project.imageUrl || project.coverImage || `https://images.unsplash.com/${sceneFor(project)}?auto=format&fit=crop&w=1800&q=75``;
  const inquiryUrl = '/?project=' + encodeURIComponent(project.title) + '#contact';
  const features = project.features || [];

  return (
    <div className="pd">
      <header className="pd__nav">
        <a href="/" aria-label="ProtoLabs home"><ProtoLabsLogoHorizontal size={34} showTagline={false} /></a>
        <a className="pd__back" href="/#catalog">← All projects</a>
      </header>

      <main>
        <section className="pd__hero" aria-labelledby="pd-title">
          <img src={image} alt="" fetchPriority="high" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="pd__heroContent">
            <p className="pd__eyebrow">{project.category} / ProtoLabs project</p>
            <h1 id="pd-title">{project.title}</h1>
            <p className="pd__desc">{project.description}</p>
            <p className="pd__meta">
              <span>Estimated delivery <strong>{project.duration || 'Discuss scope'}</strong></span>
              <span>Format <strong>Engineering solution</strong></span>
              {project.featured && <span><strong>Featured project</strong></span>}
            </p>
          </div>
        </section>

        <section className="pd__body">
          <div>
            <p className="pd__label">01 / Project overview</p>
            <h2>Built with purpose.<br />Documented for use.</h2>
            <p className="pd__lead">{project.description} The scope below reflects the currently listed project deliverables. Final requirements, revisions, and hardware supply can be confirmed before work begins.</p>

            {features.length > 0 && (
              <>
                <p className="pd__label pd__label--spaced">02 / What’s included</p>
                <ul className="pd__features">
                  {features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
              </>
            )}
          </div>

          <aside className="pd__buy" aria-label="Project package">
            <p className="pd__label">Project package</p>
            <h3>{project.title}</h3>
            <p className="pd__price">{price}</p>
            <p className="pd__buyText">{hasPrice ? 'Listed project price' : 'Pricing depends on final scope, components, and deliverables'} · estimated completion {project.duration || 'to be confirmed'}.</p>
            <a className="pd__cta" href={inquiryUrl}><span>Enquire about this project</span><span aria-hidden="true">↗</span></a>
            <p className="pd__fine">This is a project/service listing, not an instant checkout. Confirm scope, availability, physical hardware, and final quotation with ProtoLabs before ordering.</p>
          </aside>
        </section>

        <section className="pd__bottom">
          <div>
            <p className="pd__label pd__label--light">Next step / Make it real</p>
            <h2>Have a variation in mind?</h2>
          </div>
          <a href={inquiryUrl}>Discuss a custom version ↗</a>
        </section>
      </main>
    </div>
  );
};
