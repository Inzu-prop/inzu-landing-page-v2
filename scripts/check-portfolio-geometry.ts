import assert from 'node:assert/strict';
import {
  buildPortfolioGeometry,
  ribbonPath,
  outlineSelfIntersects,
  toHostBox,
  snapPointToHost,
  type Box,
  type Point,
  type PortfolioGeometry,
  type PortfolioLayout,
  type PortfolioSnapshot,
} from '../src/components/portfolio-diagram-geometry.ts';
import type { PortfolioCardId } from '../src/components/portfolio-diagram-content.ts';

const ids: PortfolioCardId[] = ['tenants', 'payments', 'portfolio', 'connections', 'import', 'maintenance'];
const box = (left: number, top: number, width: number, height: number): Box => ({ left, top, right: left + width, bottom: top + height });
const near = (a: number, b: number, tolerance = 1e-5) => assert.ok(Math.abs(a - b) <= tolerance, `${a} differs from ${b} by more than ${tolerance}`);

type FixtureOptions = { dpr?: number; origin?: Point; rowHeights?: number[]; hubSize?: number; stacked?: boolean; unequal?: boolean; targetShift?: number; captionHeight?: number; rowGap?: number };

/** Independent CSS-layout fixtures; no geometry helper is used to position boxes. */
function fixture(layout: PortfolioLayout, frameWidth: number, options: FixtureOptions = {}): PortfolioSnapshot {
  const origin = options.origin ?? { x: 37.37, y: -171.11 };
  const dpr = options.dpr ?? 1;
  const inset = layout === 'phone' ? 26 : layout === 'tablet' ? 48 : 80;
  const hostWidth = frameWidth + inset * 2;
  const stageTop = 280, rows = options.rowHeights ?? [224, 224, 224];
  const hubSize = options.hubSize ?? (layout === 'phone' ? 144 : layout === 'tablet' ? 160 : Math.min(192, frameWidth * .16));
  const hubX = hostWidth / 2 - hubSize / 2;
  const cards = {} as Record<PortfolioCardId, Box>;
  let hub: Box, stageBottom: number;
  if (layout === 'desktop') {
    const gap = Math.min(136, frameWidth * 136 / 1200);
    const cardWidth = (frameWidth - 48 - hubSize - gap * 2) / 2;
    let y = stageTop + 24;
    const starts: number[] = [];
    for (let row = 0; row < 3; row++) {
      starts.push(y);
      cards[ids[row * 2]] = box(inset + 24, y, cardWidth, rows[row] - (options.unequal ? 10 : 0));
      cards[ids[row * 2 + 1]] = box(inset + frameWidth - 24 - cardWidth, y, cardWidth, rows[row]);
      y += rows[row] + (row < 2 ? (options.rowGap ?? 56) : 0);
    }
    stageBottom = y + 24;
    hub = box(hubX, starts[1] + rows[1] / 2 - hubSize / 2, hubSize, hubSize);
  } else if (layout === 'tablet') {
    hub = box(hubX, stageTop + 24, hubSize, hubSize);
    let y = hub.bottom + 40;
    const cardWidth = (frameWidth - 64) / 2;
    for (let row = 0; row < 3; row++) {
      cards[ids[row * 2]] = box(inset, y, cardWidth, rows[row] - (options.unequal ? 12 : 0));
      cards[ids[row * 2 + 1]] = box(inset + cardWidth + 64, y, cardWidth, rows[row]);
      y += rows[row] + (row < 2 ? 32 : 0);
    }
    stageBottom = y + 24;
  } else {
    hub = box(hubX, stageTop + 24, hubSize, hubSize);
    let y = hub.bottom + 40;
    ids.forEach((id, i) => { const h = rows[i % 3]; cards[id] = box(inset + 48, y, frameWidth - 48, h); y += h + (i < 5 ? 24 : 0); });
    stageBottom = y + 24;
  }
  const captionHeight = options.captionHeight ?? (layout === 'desktop' ? 42 : 61);
  const caption = box(inset + (layout === 'phone' ? 48 : layout === 'desktop' ? 24 : 0), stageBottom + 4,
    layout === 'desktop' ? frameWidth * .34 : layout === 'tablet' ? frameWidth / 2 - 32 : frameWidth - 48, captionHeight);
  const overviewBottom = caption.bottom + (layout === 'phone' ? 128 : 96);
  const stacked = options.stacked ?? layout !== 'desktop';
  const corner = layout === 'phone' ? 40 : stacked ? 42 : 72;
  const padding = layout === 'phone' ? 22 : stacked ? 35 : 72;
  const intro = stacked ? box(padding, overviewBottom + corner + 48, hostWidth - padding * 2, 240) : box(72, overviewBottom + 80, hostWidth * .28, 230);
  const targetWidth = layout === 'phone' ? 94 : 250;
  const target = stacked ? box(padding + (options.targetShift ?? 0), intro.bottom + 72, targetWidth, 170)
    : box(hostWidth / 2 + 80 + (options.targetShift ?? 0), overviewBottom + 100, targetWidth, 180);
  const copy = box(target.right + 18, target.top, Math.max(40, hostWidth - padding - target.right - 18), 170);
  const hostHeight = target.bottom + 700;
  const viewport = (b: Box): Box => ({ left: b.left + origin.x, top: b.top + origin.y, right: b.right + origin.x, bottom: b.bottom + origin.y });
  return {
    layout, storyLayout: stacked ? 'stacked' : 'split', dpr,
    host: box(origin.x, origin.y, hostWidth, hostHeight),
    frame: viewport(box(inset, stageTop, frameWidth, overviewBottom - stageTop)),
    stage: viewport(box(inset, stageTop, frameWidth, stageBottom - stageTop)), hub: viewport(hub),
    cards: Object.fromEntries(ids.map(id => [id, viewport(cards[id])])) as Record<PortfolioCardId, Box>,
    overview: viewport(box(0, 0, hostWidth, overviewBottom)), caption: viewport(caption),
    stories: viewport(box(0, overviewBottom, hostWidth, hostHeight - overviewBottom)),
    storyIntro: viewport(intro), firstFeatureCopy: viewport(copy), target: viewport(target),
    storyPadding: { top: stacked ? corner + 48 : 80, right: padding, left: padding, bottom: 80 },
    cornerExtent: corner, targetRadius: layout === 'phone' ? 19 : 23,
  };
}

function verify(snapshot: PortfolioSnapshot, name: string): PortfolioGeometry {
  const geometry = buildPortfolioGeometry(snapshot);
  assert.equal(geometry.valid, true, `${name}: ${JSON.stringify(geometry.diagnostics)}`);
  assert.equal(geometry.paths.length, 7, `${name}: all six relationships and the exit are required`);
  assert.deepEqual(geometry.paths.map(p => p.id).sort(), [...ids, 'exit'].sort());
  assert.equal(geometry.attachments.filter(a => ids.includes(a.surfaceId as PortfolioCardId)).length, 6);
  assert.equal(geometry.attachments.filter(a => a.routeId === 'exit' && a.surfaceId === 'hub').length, 1);
  assert.equal(geometry.attachments.filter(a => a.surfaceId === 'target').length, 1);
  const dpr = snapshot.dpr > 0 ? snapshot.dpr : 1;
  for (const a of geometry.attachments) {
    const source = a.surfaceId === 'hub' ? snapshot.hub : a.surfaceId === 'target' ? snapshot.target : snapshot.cards[a.surfaceId];
    const expectedEdge = a.side === 'left' ? source.left : a.side === 'right' ? source.right : a.side === 'top' ? source.top : source.bottom;
    const actualEdge = a.side === 'left' || a.side === 'right' ? a.point.x + snapshot.host.left : a.point.y + snapshot.host.top;
    near(actualEdge, Math.round(expectedEdge * dpr) / dpr);
    assert.equal(a.penetration, 1);
    const alongRaw = a.side === 'left' || a.side === 'right' ? a.point.y + snapshot.host.top : a.point.x + snapshot.host.left;
    const rawStart = a.side === 'left' || a.side === 'right' ? source.top : source.left;
    const rawEnd = a.side === 'left' || a.side === 'right' ? source.bottom : source.right;
    const radius = a.surfaceId === 'target' ? snapshot.targetRadius ?? 23 : 24;
    assert.ok(Math.min(alongRaw - rawStart - radius, rawEnd - radius - alongRaw) >= a.flare.halfWidth + 4 - 1 / dpr - 1e-5, `${name}: whole flare stays on flat edge`);
  }
  for (const path of geometry.paths) {
    assert.match(path.d, /^M /);
    assert.match(path.d, / Z$/);
    assert.doesNotMatch(path.d, /NaN|Infinity/);
    assert.ok(path.centerline.length >= 2 && path.outline.length >= 4);
    assert.ok(path.envelope.left >= 0 && path.envelope.right <= geometry.width);
    assert.ok(path.envelope.top >= 0 && path.envelope.bottom <= geometry.height);
    assert.ok(path.outline.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)));
  }
  return geometry;
}

let cases = 0;
for (const dpr of [1, 1.25, 1.5, 2, 3]) {
  for (const [layout, width] of [['phone', 268], ['phone', 599], ['tablet', 600], ['tablet', 601], ['tablet', 999], ['desktop', 1000], ['desktop', 1001], ['desktop', 1200]] as const) {
    verify(fixture(layout, width, { dpr }), `${layout}/${width}/dpr${dpr}`); cases++;
  }
}
for (const hubSize of [160, 183, 184, 192]) {
  const geometry = verify(fixture('desktop', Math.max(1000, hubSize / .16), { hubSize }), `hub${hubSize}`);
  const sidePorts = geometry.attachments.filter(a => a.surfaceId === 'hub' && a.routeId !== 'exit');
  assert.ok(sidePorts.every(a => a.flare.halfWidth === (hubSize < 184 ? 14 : 18)));
  if (hubSize === 160) {
    const snapHubTop = Math.round(fixture('desktop', 1000, { hubSize }).hub.top);
    const offsets = sidePorts.filter(a => a.side === 'left').map(a => Math.round(a.point.y + fixture('desktop', 1000, { hubSize }).host.top - snapHubTop));
    assert.deepEqual(offsets, [42, 42, 118]);
  }
  cases++;
}
for (const layout of ['phone', 'tablet', 'desktop'] as const) {
  verify(fixture(layout, layout === 'phone' ? 338 : layout === 'tablet' ? 800 : 1200,
    { rowHeights: [310, 360, 280], captionHeight: 86, unequal: true, dpr: 1.25 }), `${layout}/text-growth`); cases++;
}
// CSS's story breakpoint is independent of the diagram's own container mode.
verify(fixture('tablet', 800, { stacked: false }), 'tablet/split-stories'); cases++;
verify(fixture('desktop', 1200, { stacked: true }), 'desktop/stacked-stories'); cases++;

const compact = fixture('desktop', 1200, { rowHeights: [170, 192, 160], rowGap: 18, unequal: true });
compact.cardRadius = 30;
verify(compact, 'desktop/compact-staggered'); cases++;
const smallerCards = fixture('desktop', 1200, { rowHeights: [140, 192, 140], rowGap: 18, unequal: true });
smallerCards.cardRadius = 30;
verify(smallerCards, 'desktop/smaller-cards'); cases++;

// Translation and ordinary page scroll cancel: compare the same DPR-grid-aligned origin shift.
const translatedA = fixture('desktop', 1200, { origin: { x: 20.25, y: -101.75 }, dpr: 2 });
const translatedB = fixture('desktop', 1200, { origin: { x: 120.25, y: -501.75 }, dpr: 2 });
const ga = verify(translatedA, 'origin-A'), gb = verify(translatedB, 'origin-B');
assert.deepEqual(ga.paths.map(p => p.d), gb.paths.map(p => p.d)); cases += 2;
const host = box(10.37, -99.23, 500, 500);
const raw = box(23.18, -80.61, 123.77, 201.53);
const local = toHostBox(raw, host, 1.25);
near(local.left + host.left, Math.round(raw.left * 1.25) / 1.25);
near(local.right - local.left, (Math.round(raw.right * 1.25) - Math.round(raw.left * 1.25)) / 1.25);
const point = snapPointToHost({ x: 333.17, y: -22.61 }, host, 1.25);
near(point.x, Math.round(333.17 * 1.25) / 1.25 - host.left); cases++;

// Native outline primitive handles straight, tiny displacement and reversed axes.
for (const points of [
  [{ x: 10, y: 0 }, { x: 10, y: 200 }],
  [{ x: 10, y: 0 }, { x: 10, y: 100 }, { x: 12, y: 100 }, { x: 12, y: 200 }],
  [{ x: 200, y: 10 }, { x: 100, y: 10 }, { x: 100, y: 13 }, { x: 0, y: 13 }],
]) {
  const path = ribbonPath('primitive', points, { startFlare: { depth: 16, halfWidth: 14 }, endFlare: { depth: 16, halfWidth: 14 } });
  assert.doesNotMatch(path.d, /NaN|Infinity/);
  assert.ok(path.d.endsWith(' Z'));
  assert.ok(path.outline.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)));
  cases++;
}
assert.throws(() => ribbonPath('too-short', [{ x: 0, y: 0 }, { x: 10, y: 0 }], { startFlare: { depth: 16, halfWidth: 14 } })); cases++;
// Check actual filled-neck width and symmetry around every sampled circular turn.
const neck = ribbonPath('neck-width', [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 200, y: 100 }], { radius: 12 });
assert.equal(neck.outline.length, neck.centerline.length * 2);
neck.centerline.forEach((center, i) => {
  const a = neck.outline[i], b = neck.outline[neck.outline.length - 1 - i];
  near(Math.hypot(a.x - b.x, a.y - b.y), 2);
  near((a.x + b.x) / 2, center.x);
  near((a.y + b.y) / 2, center.y);
}); cases++;

function invalid(name: string, edit: (s: PortfolioSnapshot) => void, expectedCode: string, layout: PortfolioLayout = 'phone') {
  const snapshot = fixture(layout, layout === 'phone' ? 268 : 1200);
  edit(snapshot);
  const geometry = buildPortfolioGeometry(snapshot);
  assert.equal(geometry.valid, false, name);
  assert.equal(geometry.paths.length, 0, `${name}: never emit partial/malformed networks`);
  assert.ok(geometry.diagnostics.some(d => d.code === expectedCode), `${name}: ${JSON.stringify(geometry.diagnostics)}`);
  cases++;
}
invalid('zero target', s => { s.target.right = s.target.left; }, 'invalid-box');
invalid('missing card', s => { delete s.cards.maintenance; }, 'invalid-box');
invalid('nonfinite point', s => { s.hub.left = NaN; }, 'invalid-box');
invalid('incorrect layout', s => { s.layout = 'unknown' as PortfolioLayout; }, 'invalid-layout');
invalid('notch has no crossing', s => { s.cornerExtent = 200; }, 'boundary-clearance');
invalid('upper band too short', s => { s.storyIntro.top = s.stories.top + 35; }, 'upper-band');
invalid('lower band too short', s => { s.target.top = s.storyIntro.bottom + 40; }, 'lower-band');
invalid('right padding too small', s => { s.storyPadding.right = 4; }, 'escape-lane');
invalid('caption consumes dark corridor', s => { s.caption.bottom = s.stories.top - 10; }, 'dark-corridor');
invalid('tiny hub corner footprint', s => { s.hub.bottom = s.hub.top + 80; }, 'flare-clearance', 'desktop');
invalid('neighboring hub ports overlap', s => { s.hub.bottom = s.hub.top + 100; }, 'hub-port-overlap', 'desktop');
invalid('card overlaps hub and leaves wrong-facing edge', s => { s.cards.tenants.right = s.hub.left + 146; }, 'port-direction', 'desktop');
invalid('card placed in exit', s => { s.cards.maintenance.left = (s.hub.left + s.hub.right) / 2 - 20; }, 'card-collision', 'desktop');
invalid('text obstacle placed in branch', s => {
  const c = s.cards.tenants;
  s.textObstacles = [{ id: 'unexpected-label', box: box(c.right + 8, (c.top + c.bottom) / 2 - 10, 20, 20) }];
}, 'text-collision', 'desktop');

// The FAQ entrance joins the previous surface to the separate question panel.
for (const route of [
  [{ x: 600, y: 0 }, { x: 600, y: 55 }, { x: 900, y: 55 }, { x: 900, y: 160 }],
  [{ x: 187, y: 0 }, { x: 187, y: 42 }, { x: 363, y: 42 }, { x: 363, y: 278 }, { x: 187, y: 278 }, { x: 187, y: 320 }],
  [{ x: 200, y: 0 }, { x: 200, y: 160 }],
]) {
  const path = ribbonPath('faq-entrance', route, { startFlare: { depth: 24, halfWidth: 24 }, endFlare: { depth: 24, halfWidth: 24 }, radius: 14 });
  assert.ok(path.d.endsWith(' Z') && !outlineSelfIntersects(path.outline));
  cases++;
}

console.log(`Portfolio geometry: ${cases} layout, DPR, attachment, stress and invalid-state cases passed.`);
