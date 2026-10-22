import React from 'react';
import { ClockIcon, LayersIcon, ShieldCheckIcon, UserIcon, ZapIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';
import './WhyChooseUsSection.css';

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Clock': return ClockIcon;
    case 'Layers': return LayersIcon;
    case 'ShieldCheck': return ShieldCheckIcon;
    case 'User': return UserIcon;
    default: return ZapIcon;
  }
};

export const WhyChooseUsSection = () => {
  const { data } = useApp();
  const { services } = data;

  return (
    <section id="why-us" className="wu" aria-labelledby="why-us-title">
      <div className="wu__wrap">
        <header className="wu__head">
          <p className="wu__eyebrow"><span>03</span> Why ProtoLabs</p>
          <h2 id="why-us-title">Built to be <em>manufactured,</em> not just demonstrated.</h2>
          <p className="wu__lede">
            We combine rigorous academic hardware theory with practical, manufacturable Gerber files and tested firmware.
          </p>
        </header>

        <ol className="wu__list">
          {(services || []).map((item, i) => {
            const IconComp = getServiceIcon(item.icon);
            return (
              <li key={item.id} className="wu__item">
                <span className="wu__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="wu__icon" aria-hidden="true"><IconComp size={24} /></span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
