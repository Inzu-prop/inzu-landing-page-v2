import type { RefObject } from 'react';
import inzuMark from '../assets/inzu-mark.svg';
import {
  portfolioCards,
  type PortfolioCard,
  type PortfolioCardId,
} from './portfolio-diagram-content';

/** The outer FeatureFlow owns these anchors and the single connector overlay. */
export type PortfolioDiagramRefs = {
  frame: RefObject<HTMLDivElement | null>;
  stage: RefObject<HTMLDivElement | null>;
  hub: RefObject<HTMLDivElement | null>;
  caption: RefObject<HTMLElement | null>;
  cards: RefObject<Record<PortfolioCardId, HTMLElement | null>>;
};

function BuildingGlyph({ small = false }: { small?: boolean }) {
  return <svg viewBox="0 0 48 48" className={small ? 'lp-portfolio-building is-small' : 'lp-portfolio-building'} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 40V12l18-5v33M28 18h10v22M6 40h36M17 17h4m-4 7h4m-4 7h4m12-6h1m-1 7h1M18 40v-4h4v4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function TenantGraphic() {
  return <div className="lp-portfolio-tenant-space">
    <div className="lp-portfolio-tenant-heading"><BuildingGlyph small /><span>Your space</span><i /></div>
    <div className="lp-portfolio-mini-row"><span className="lp-portfolio-mini-symbol">≡</span><span>Invoices</span><i /></div>
    <div className="lp-portfolio-mini-row"><span className="lp-portfolio-mini-symbol">·</span><span>Updates</span><i /></div>
  </div>;
}

function PaymentsGraphic() {
  return <div className="lp-portfolio-ledger">
    {[0, 1, 2].map(row => <div className="lp-portfolio-ledger-row" key={row}>
      <span className="lp-portfolio-ledger-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 2.5h7l3 3v12H5zM12 2.5V6h3M8 9h4m-4 3h4" /></svg></span>
      <span className="lp-portfolio-ledger-lines"><i /><i /></span><span className="lp-portfolio-recorded">Recorded</span>
    </div>)}
  </div>;
}

function PortfolioGraphic() {
  return <div className="lp-portfolio-property-tiles">
    <div className="lp-portfolio-property-tile"><BuildingGlyph /><span /><i /></div>
    <div className="lp-portfolio-property-tile"><BuildingGlyph /><span /><i /></div>
    <div className="lp-portfolio-property-tile"><BuildingGlyph /><span /><i /></div>
  </div>;
}

function ConnectionsGraphic({ channels }: { channels: readonly string[] }) {
  return <div className="lp-portfolio-channels">
    <div className="lp-portfolio-message"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M22 17.5a10 10 0 1 0-7.7 6.5l7.7 1-1.7-5.2M9 10h8m-8 4h6" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Tenant messages</span></div>
    <div className="lp-portfolio-channel-chips">{channels.map(channel => <span key={channel}>{channel}</span>)}</div>
  </div>;
}

function ImportGraphic() {
  return <div className="lp-portfolio-import-map">
    <div className="lp-portfolio-sheet"><div><span>Property</span><span>Unit</span></div><div><i /><i /></div><div><i /><i /></div></div>
    <svg className="lp-portfolio-import-link" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 10h24m-6-5 6 5-6 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <div className="lp-portfolio-import-property"><BuildingGlyph /></div>
  </div>;
}

function MaintenanceGraphic() {
  return <div className="lp-portfolio-tickets">
    <div><span className="lp-portfolio-ticket-dot" /><span>Leaking tap</span><small>Open</small></div>
    <div><span className="lp-portfolio-ticket-dot is-progress" /><span>Light fitting</span><small>In progress</small></div>
  </div>;
}

function CardGraphic({ card }: { card: PortfolioCard }) {
  switch (card.graphic) {
    case 'tenant-space': return <TenantGraphic />;
    case 'payment-records': return <PaymentsGraphic />;
    case 'property-tiles': return <PortfolioGraphic />;
    case 'channel-map': return <ConnectionsGraphic channels={card.channels ?? []} />;
    case 'portfolio-sheet': return <ImportGraphic />;
    case 'maintenance-tickets': return <MaintenanceGraphic />;
  }
}

// Existing property artwork is illustrative and stays inside the card artwork,
// leaving the solid card edge available for the measured connector flares.
const cardImages: Record<PortfolioCardId, string> = {
  tenants: '/images/hero-balcony.webp',
  payments: '/images/hero-building.webp',
  portfolio: '/images/inzu-architecture.webp',
  connections: '/images/hero-chosen-soul-preview.jpg',
  import: '/images/hero-building.webp',
  maintenance: '/images/hero-balcony.webp',
};

export default function PortfolioDiagram({ anchors }: { anchors: PortfolioDiagramRefs }) {
  return <div className="lp-portfolio-frame" ref={anchors.frame}>
    <figure className="lp-portfolio-figure" aria-label="Inzu portfolio features">
      <div className="lp-portfolio-stage" ref={anchors.stage}>
        <div className="lp-portfolio-hub" ref={anchors.hub} role="img" aria-label="Inzu">
          <svg className="lp-portfolio-hub-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M 22 0 H 78 Q 84 0 84 6 Q 84 11 90 11 Q 100 11 100 14 V 86 Q 100 89 90 89 Q 84 89 84 94 Q 84 100 78 100 H 22 Q 16 100 16 94 Q 16 89 10 89 Q 0 89 0 82 V 18 Q 0 11 10 11 Q 16 11 16 6 Q 16 0 22 0 Z" /></svg>
          <img src={inzuMark} alt="" width="112" height="112" />
        </div>
        {portfolioCards.map(card => <article
          className={`lp-portfolio-card lp-portfolio-card--${card.id}`}
          key={card.id}
          data-portfolio-card={card.id}
          ref={element => { anchors.cards.current[card.id] = element; }}
          aria-labelledby={`portfolio-card-${card.id}`}
        >
          <div className="lp-portfolio-card-copy"><div className="lp-portfolio-card-heading">
            <h3 id={`portfolio-card-${card.id}`}>{card.title}</h3>
          </div>
          {card.id === 'connections' && <span className="lp-portfolio-sr-only">Channels under consideration: {card.channels.join(', ')}.</span>}
          </div>
          <div className="lp-portfolio-art" aria-hidden="true">
            <img className="lp-portfolio-art-photo" src={cardImages[card.id]} alt="" loading="lazy" />
            <div className="lp-portfolio-art-detail"><CardGraphic card={card} /></div>
          </div>
        </article>)}
      </div>
      <span className="lp-portfolio-route-anchor" ref={anchors.caption} aria-hidden="true" />
    </figure>
  </div>;
}
