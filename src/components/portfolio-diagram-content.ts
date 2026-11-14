/**
 * Approved copy and graphic briefs: docs/plans/2026-11-14-portfolio-perspective-diagram.md,
 * sections 3.2–3.3. Graphics are original, fictional illustrations of the cited
 * product fields; they never request app data or imply a completed transaction.
 */
export type PortfolioCardId =
  | 'tenants'
  | 'payments'
  | 'portfolio'
  | 'connections'
  | 'import'
  | 'maintenance';

export type PortfolioGraphicKind =
  | 'tenant-space'
  | 'payment-records'
  | 'property-tiles'
  | 'channel-map'
  | 'portfolio-sheet'
  | 'maintenance-tickets';

export type PortfolioCard = {
  readonly id: PortfolioCardId;
  readonly title: string;
  readonly body: string;
  readonly planned: boolean;
  readonly graphic: PortfolioGraphicKind;
  readonly channels?: readonly string[];
};

/** Row-major desktop/tablet order and the same reading order on phones. */
export const portfolioCards = [
  {
    id: 'tenants',
    title: 'A place for your tenants.',
    body: 'Tenants can sign in to view their unit, recent invoices, payments and maintenance updates.',
    planned: false,
    graphic: 'tenant-space',
  },
  {
    id: 'payments',
    title: 'Your payments, in one place.',
    body: 'Keep recorded payments, references and balances together.',
    planned: false,
    graphic: 'payment-records',
  },
  {
    id: 'portfolio',
    title: 'Your portfolio in one view.',
    body: 'See properties, occupancy, expected rent and outstanding balances together.',
    planned: false,
    graphic: 'property-tiles',
  },
  {
    id: 'connections',
    title: 'Messages and payments, connected.',
    body: 'Planned connections for tenant messages and payment updates.',
    planned: true,
    graphic: 'channel-map',
    channels: ['WhatsApp', 'M-Pesa', 'Bank payments'],
  },
  {
    id: 'import',
    title: 'Import your portfolio.',
    body: 'A planned way to bring existing property and unit records into Inzu.',
    planned: true,
    graphic: 'portfolio-sheet',
  },
  {
    id: 'maintenance',
    title: 'Maintenance, kept in view.',
    body: 'Track requests, status and costs alongside your portfolio.',
    planned: false,
    graphic: 'maintenance-tickets',
  },
] as const satisfies readonly PortfolioCard[];

