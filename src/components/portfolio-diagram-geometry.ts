import type { PortfolioCardId } from './portfolio-diagram-content';

export type PortfolioLayout = 'desktop' | 'tablet' | 'phone';
export type PortfolioStoryLayout = 'split' | 'stacked';
export type Point = { x: number; y: number };
export type Box = { left: number; top: number; right: number; bottom: number };
export type Side = 'left' | 'right' | 'top' | 'bottom';
export type Padding = { top: number; right: number; bottom: number; left: number };
export type Flare = { depth: number; halfWidth: number };
export type PortfolioObstacle = { id: string; box: Box };

/** Every rectangle is RAW viewport geometry; only scalar sizes are CSS pixels. */
export type PortfolioSnapshot = {
  layout: PortfolioLayout;
  storyLayout: PortfolioStoryLayout;
  dpr: number;
  host: Box;
  frame: Box;
  stage: Box;
  hub: Box;
  cards: Record<PortfolioCardId, Box>;
  overview: Box;
  caption: Box;
  stories: Box;
  storyIntro: Box;
  firstFeatureCopy: Box;
  target: Box;
  storyPadding: Padding;
  cornerExtent: number;
  hubRadius?: number;
  cardRadius?: number;
  targetRadius?: number;
  textObstacles?: readonly PortfolioObstacle[];
};

export type PortfolioAttachment = {
  routeId: string;
  surfaceId: PortfolioCardId | 'hub' | 'target';
  point: Point;
  side: Side;
  flare: Flare;
  penetration: number;
};

export type PortfolioPath = {
  id: string;
  d: string;
  /** Samples include exact straight spans and subpixel-accurate circular turns. */
  centerline: Point[];
  outline: Point[];
  envelope: Box;
};

export type PortfolioDiagnostic = { routeId: string; code: string; message: string };
export type PortfolioGeometry = {
  valid: boolean;
  width: number;
  height: number;
  paths: PortfolioPath[];
  attachments: PortfolioAttachment[];
  diagnostics: PortfolioDiagnostic[];
};

const CARD_IDS: readonly PortfolioCardId[] = ['tenants', 'payments', 'portfolio', 'connections', 'import', 'maintenance'];
const DESKTOP_FLARE: Flare = { depth: 28, halfWidth: 18 };
const COMPACT_FLARE: Flare = { depth: 16, halfWidth: 14 };
const HALF_NECK = 1;
const PENETRATION = 1;
const EPSILON = 1e-6;

export const normalizedDpr = (dpr: number) => Number.isFinite(dpr) && dpr > 0 ? dpr : 1;
export const snap = (value: number, dpr: number) => Math.round(value * normalizedDpr(dpr)) / normalizedDpr(dpr);

/** Snap viewport edges once, then subtract the UNSNAPPED host origin (plan §5.1). */
export function toHostBox(box: Box, host: Box, dpr: number): Box {
  return {
    left: snap(box.left, dpr) - host.left,
    top: snap(box.top, dpr) - host.top,
    right: snap(box.right, dpr) - host.left,
    bottom: snap(box.bottom, dpr) - host.top,
  };
}

export function snapPointToHost(point: Point, host: Box, dpr: number): Point {
  return { x: snap(point.x, dpr) - host.left, y: snap(point.y, dpr) - host.top };
}

const add = (a: Point, b: Point, scale = 1): Point => ({ x: a.x + b.x * scale, y: a.y + b.y * scale });
const sub = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
const length = (p: Point) => Math.hypot(p.x, p.y);
const unit = (p: Point): Point => { const size = length(p); return { x: p.x / size, y: p.y / size }; };
const normal = (p: Point): Point => ({ x: -p.y, y: p.x });
const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
const same = (a: Point, b: Point) => length(sub(a, b)) < EPSILON;
const centerX = (b: Box) => (b.left + b.right) / 2;
const centerY = (b: Box) => (b.top + b.bottom) / 2;
const width = (b: Box) => b.right - b.left;
const height = (b: Box) => b.bottom - b.top;
const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(n, high));
const validBox = (box: Box) => box && Object.values(box).every(Number.isFinite) && width(box) > 0 && height(box) > 0;
const rounded = (n: number) => Math.round(n * 100000) / 100000;
const xy = (p: Point) => `${rounded(p.x)} ${rounded(p.y)}`;

type Sample = { point: Point; tangent: Point };
type RibbonOptions = { startFlare?: Flare; endFlare?: Flare; radius?: number };

function cubicPoint(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  const q = 1 - t;
  return { x: q ** 3 * a.x + 3 * q ** 2 * t * b.x + 3 * q * t ** 2 * c.x + t ** 3 * d.x,
    y: q ** 3 * a.y + 3 * q ** 2 * t * b.y + 3 * q * t ** 2 * c.y + t ** 3 * d.y };
}

function cleanPoints(points: readonly Point[]): Point[] {
  const clean: Point[] = [];
  for (const p of points) {
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) throw new Error('Nonfinite route point.');
    if (clean.length && same(clean[clean.length - 1], p)) continue;
    if (clean.length >= 2) {
      const a = sub(clean[clean.length - 1], clean[clean.length - 2]);
      const b = sub(p, clean[clean.length - 1]);
      if (Math.abs(cross(a, b)) < EPSILON && dot(a, b) > 0) clean.pop();
    }
    clean.push(p);
  }
  return clean;
}

function roundedSamples(points: Point[], desiredRadius: number): Sample[] {
  const firstDirection = unit(sub(points[1], points[0]));
  const lastDirection = unit(sub(points[points.length - 1], points[points.length - 2]));
  // A tiny displacement needs a gentle S, not two subpixel-radius elbows.
  const displacement = sub(points[points.length - 1], points[0]);
  if (points.length <= 4 && dot(firstDirection, lastDirection) > .999 &&
      Math.abs(cross(firstDirection, displacement)) < 8 && dot(firstDirection, displacement) > 0) {
    const a = points[0], d = points[points.length - 1];
    const main = dot(firstDirection, displacement);
    if (Math.abs(cross(firstDirection, displacement)) < EPSILON) return [{ point: a, tangent: firstDirection }, { point: d, tangent: lastDirection }];
    const b = add(a, firstDirection, main / 3), c = add(d, lastDirection, -main / 3);
    return Array.from({ length: 25 }, (_, i) => {
      const t = i / 24, q = 1 - t;
      const tangent = unit({ x: 3 * q * q * (b.x - a.x) + 6 * q * t * (c.x - b.x) + 3 * t * t * (d.x - c.x),
        y: 3 * q * q * (b.y - a.y) + 6 * q * t * (c.y - b.y) + 3 * t * t * (d.y - c.y) });
      return { point: cubicPoint(a, b, c, d, t), tangent };
    });
  }
  const samples: Sample[] = [{ point: points[0], tangent: firstDirection }];
  for (let i = 1; i < points.length - 1; i++) {
    const previous = sub(points[i], points[i - 1]), next = sub(points[i + 1], points[i]);
    const before = unit(previous), after = unit(next), turn = cross(before, after);
    if (Math.abs(dot(before, after)) > EPSILON || Math.abs(turn) < .999) throw new Error('Route must have orthogonal, nonreversing turns.');
    const radius = Math.min(desiredRadius, length(previous) / (i === 1 ? 1 : 2), length(next) / (i === points.length - 2 ? 1 : 2));
    if (radius <= HALF_NECK + .25) throw new Error('Insufficient bend runway; a corner would fold the ribbon.');
    const start = add(points[i], before, -radius), end = add(points[i], after, radius);
    const arcCenter = add(start, after, radius);
    samples.push({ point: start, tangent: before });
    const angle = Math.atan2(start.y - arcCenter.y, start.x - arcCenter.x);
    // <=1.5px chord spacing has under .03px sagitta at the compact 12px radius.
    const steps = Math.max(12, Math.ceil(Math.PI * radius / 3));
    for (let step = 1; step <= steps; step++) {
      const theta = angle + turn * Math.PI / 2 * step / steps;
      samples.push({ point: step === steps ? end : { x: arcCenter.x + Math.cos(theta) * radius, y: arcCenter.y + Math.sin(theta) * radius },
        tangent: step === steps ? after : { x: -Math.sin(theta) * turn, y: Math.cos(theta) * turn } });
    }
  }
  samples.push({ point: points[points.length - 1], tangent: lastDirection });
  return samples.filter((sample, index) => !index || !same(sample.point, samples[index - 1].point));
}

function appendCubicSamples(outline: Point[], a: Point, b: Point, c: Point, d: Point) {
  for (let i = 1; i <= 16; i++) outline.push(cubicPoint(a, b, c, d, i / 16));
}

/** Original single filled contour; normals keep the neck 2px wide around turns. */
export function ribbonPath(id: string, route: readonly Point[], options: RibbonOptions = {}): PortfolioPath {
  const points = cleanPoints(route);
  if (points.length < 2) throw new Error('Route requires two distinct endpoints.');
  const source = points[0], target = points[points.length - 1];
  const fromDirection = unit(sub(points[1], source));
  const toDirection = unit(sub(target, points[points.length - 2]));
  const startDepth = options.startFlare?.depth ?? 0, endDepth = options.endFlare?.depth ?? 0;
  const startNeck = add(source, fromDirection, startDepth), endNeck = add(target, toDirection, -endDepth);
  if (points.length === 2 && length(sub(target, source)) < startDepth + endDepth + 2) throw new Error('Insufficient straight flare runway.');
  if (points.length > 2 && (length(sub(points[1], source)) < startDepth + 2 || length(sub(target, points[points.length - 2])) < endDepth + 2)) throw new Error('Flare extends beyond its endpoint segment.');
  const neckRoute = cleanPoints([startNeck, ...points.slice(1, -1), endNeck]);
  const samples = roundedSamples(neckRoute, options.radius ?? 12);
  const left = samples.map(s => add(s.point, normal(s.tangent), HALF_NECK));
  const right = samples.map(s => add(s.point, normal(s.tangent), -HALF_NECK));
  const startNormal = normal(fromDirection), endNormal = normal(toDirection);
  const startBase = add(source, fromDirection, options.startFlare ? -PENETRATION : 0);
  const endBase = add(target, toDirection, options.endFlare ? PENETRATION : 0);
  const startHalf = options.startFlare?.halfWidth ?? HALF_NECK, endHalf = options.endFlare?.halfWidth ?? HALF_NECK;
  const startLeft = add(startBase, startNormal, startHalf), startRight = add(startBase, startNormal, -startHalf);
  const endLeft = add(endBase, endNormal, endHalf), endRight = add(endBase, endNormal, -endHalf);
  const outline: Point[] = [startLeft];
  let d = `M ${xy(startLeft)}`;
  if (options.startFlare) {
    const c1 = add(startBase, startNormal, HALF_NECK), c2 = add(add(source, fromDirection, startDepth * .55), startNormal, HALF_NECK);
    d += ` C ${xy(c1)} ${xy(c2)} ${xy(left[0])}`;
    appendCubicSamples(outline, startLeft, c1, c2, left[0]);
  } else { d += ` L ${xy(left[0])}`; outline.push(left[0]); }
  left.slice(1).forEach(p => { d += ` L ${xy(p)}`; outline.push(p); });
  if (options.endFlare) {
    const c1 = add(add(target, toDirection, -endDepth * .55), endNormal, HALF_NECK), c2 = add(endBase, endNormal, HALF_NECK);
    d += ` C ${xy(c1)} ${xy(c2)} ${xy(endLeft)}`;
    appendCubicSamples(outline, left[left.length - 1], c1, c2, endLeft);
  } else { d += ` L ${xy(endLeft)}`; outline.push(endLeft); }
  d += ` L ${xy(endRight)}`; outline.push(endRight);
  if (options.endFlare) {
    const c1 = add(endBase, endNormal, -HALF_NECK), c2 = add(add(target, toDirection, -endDepth * .55), endNormal, -HALF_NECK);
    d += ` C ${xy(c1)} ${xy(c2)} ${xy(right[right.length - 1])}`;
    appendCubicSamples(outline, endRight, c1, c2, right[right.length - 1]);
  } else { d += ` L ${xy(right[right.length - 1])}`; outline.push(right[right.length - 1]); }
  [...right].reverse().slice(1).forEach(p => { d += ` L ${xy(p)}`; outline.push(p); });
  if (options.startFlare) {
    const c1 = add(add(source, fromDirection, startDepth * .55), startNormal, -HALF_NECK), c2 = add(startBase, startNormal, -HALF_NECK);
    d += ` C ${xy(c1)} ${xy(c2)} ${xy(startRight)}`;
    appendCubicSamples(outline, right[0], c1, c2, startRight);
  } else { d += ` L ${xy(startRight)}`; outline.push(startRight); }
  d += ' Z';
  const cleanOutline = outline.filter((p, i) => !i || !same(p, outline[i - 1]));
  if (same(cleanOutline[0], cleanOutline[cleanOutline.length - 1])) cleanOutline.pop();
  return { id, d, centerline: samples.map(s => s.point), outline: cleanOutline,
    envelope: { left: Math.min(...cleanOutline.map(p => p.x)), right: Math.max(...cleanOutline.map(p => p.x)), top: Math.min(...cleanOutline.map(p => p.y)), bottom: Math.max(...cleanOutline.map(p => p.y)) } };
}

function segmentCrosses(a: Point, b: Point, c: Point, d: Point) {
  const abx = b.x - a.x, aby = b.y - a.y, cdx = d.x - c.x, cdy = d.y - c.y;
  return (abx * (c.y - a.y) - aby * (c.x - a.x)) * (abx * (d.y - a.y) - aby * (d.x - a.x)) < -EPSILON &&
    (cdx * (a.y - c.y) - cdy * (a.x - c.x)) * (cdx * (b.y - c.y) - cdy * (b.x - c.x)) < -EPSILON;
}

export function outlineSelfIntersects(points: readonly Point[]): boolean {
  for (let i = 0; i < points.length; i++) for (let j = i + 2; j < points.length; j++) {
    if (i === 0 && j === points.length - 1) continue;
    if (segmentCrosses(points[i], points[(i + 1) % points.length], points[j], points[(j + 1) % points.length])) return true;
  }
  return false;
}

function segmentHitsBox(a: Point, b: Point, box: Box): boolean {
  const delta = sub(b, a);
  let low = 0, high = 1;
  for (const [p, q] of [[-delta.x, a.x - box.left], [delta.x, box.right - a.x], [-delta.y, a.y - box.top], [delta.y, box.bottom - a.y]]) {
    if (Math.abs(p) < EPSILON) { if (q < 0) return false; }
    else if (p < 0) low = Math.max(low, q / p);
    else high = Math.min(high, q / p);
  }
  return low <= high;
}

export function outlineHitsBox(outline: readonly Point[], box: Box): boolean {
  if (outline.some((p, i) => segmentHitsBox(p, outline[(i + 1) % outline.length], box))) return true;
  // Also catch a small obstacle completely enclosed by a wide flare.
  return pointInsideOutline({ x: centerX(box), y: centerY(box) }, outline);
}

function pointInsideOutline(point: Point, outline: readonly Point[]): boolean {
  let inside = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const a = outline[i], b = outline[j];
    if ((a.y > point.y) !== (b.y > point.y) && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

function outlinesCross(a: readonly Point[], b: readonly Point[]): boolean {
  if (a.some((p, i) => b.some((q, j) => segmentCrosses(p, a[(i + 1) % a.length], q, b[(j + 1) % b.length])))) return true;
  return a.some(p => pointInsideOutline(p, b)) || b.some(p => pointInsideOutline(p, a));
}

const inflated = (b: Box, padding: number): Box => ({ left: b.left - padding, top: b.top - padding, right: b.right + padding, bottom: b.bottom + padding });

export function buildPortfolioGeometry(snapshot: PortfolioSnapshot): PortfolioGeometry {
  const diagnostics: PortfolioDiagnostic[] = [];
  const paths: PortfolioPath[] = [], attachments: PortfolioAttachment[] = [];
  const warn = (routeId: string, code: string, message: string) => diagnostics.push({ routeId, code, message });
  const result = (): PortfolioGeometry => ({ valid: !diagnostics.length, width: validBox(snapshot.host) ? width(snapshot.host) : 0,
    height: validBox(snapshot.host) ? height(snapshot.host) : 0, paths: diagnostics.length ? [] : paths, attachments, diagnostics });
  const boxes: [string, Box][] = [['host', snapshot.host], ['frame', snapshot.frame], ['stage', snapshot.stage], ['hub', snapshot.hub],
    ['overview', snapshot.overview], ['caption', snapshot.caption], ['stories', snapshot.stories], ['storyIntro', snapshot.storyIntro],
    ['firstFeatureCopy', snapshot.firstFeatureCopy], ['target', snapshot.target], ...CARD_IDS.map(id => [id, snapshot.cards?.[id]] as [string, Box]),
    ...(snapshot.textObstacles ?? []).map(o => [o.id, o.box] as [string, Box])];
  for (const [id, box] of boxes) if (!validBox(box)) warn('snapshot', 'invalid-box', `Missing, nonfinite or empty ${id} box.`);
  if (!['desktop', 'tablet', 'phone'].includes(snapshot.layout) || !['split', 'stacked'].includes(snapshot.storyLayout)) warn('snapshot', 'invalid-layout', 'Layout mode must come from the computed CSS custom property.');
  if (!snapshot.storyPadding || Object.values(snapshot.storyPadding).some(v => !Number.isFinite(v) || v < 0) || !Number.isFinite(snapshot.cornerExtent) || snapshot.cornerExtent < 0) warn('snapshot', 'invalid-size', 'Computed padding and corner extent must be finite nonnegative CSS pixels.');
  if (diagnostics.length) return result();
  const local = (box: Box) => toHostBox(box, snapshot.host, snapshot.dpr);
  const hub = local(snapshot.hub), stage = local(snapshot.stage), stories = local(snapshot.stories), intro = local(snapshot.storyIntro), target = local(snapshot.target), caption = local(snapshot.caption);
  const cards = Object.fromEntries(CARD_IDS.map(id => [id, local(snapshot.cards[id])])) as Record<PortfolioCardId, Box>;
  // Ports are computed from snapped edges and snapped ONCE back in viewport space.
  const portPoint = (point: Point) => snapPointToHost(add(point, { x: snapshot.host.left, y: snapshot.host.top }), snapshot.host, snapshot.dpr);
  const attach = (routeId: string, surfaceId: PortfolioAttachment['surfaceId'], point: Point, side: Side, flare: Flare): PortfolioAttachment => {
    const item = { routeId, surfaceId, point: portPoint(point), side, flare, penetration: PENETRATION };
    attachments.push(item);
    const box = surfaceId === 'hub' ? hub : surfaceId === 'target' ? target : cards[surfaceId];
    const radius = surfaceId === 'hub' ? snapshot.hubRadius ?? 24 : surfaceId === 'target' ? snapshot.targetRadius ?? 23 : snapshot.cardRadius ?? 24;
    const along = side === 'left' || side === 'right' ? item.point.y - box.top : item.point.x - box.left;
    const size = side === 'left' || side === 'right' ? height(box) : width(box);
    const tolerance = .5 / normalizedDpr(snapshot.dpr) + EPSILON;
    if (Math.min(along - radius, size - radius - along) + tolerance < flare.halfWidth + 4) warn(routeId, 'flare-clearance', `${surfaceId} flare reaches a rounded corner.`);
    return item;
  };
  const push = (id: string, route: Point[], options: RibbonOptions) => {
    try {
      const clean = cleanPoints(route);
      if (clean.length < 2) throw new Error('Route requires two distinct endpoints.');
      const outward: Record<Side, Point> = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, top: { x: 0, y: -1 }, bottom: { x: 0, y: 1 } };
      let wrongDirection = false;
      for (const a of attachments.filter(a => a.routeId === id)) {
        const atStart = same(a.point, clean[0]), atEnd = same(a.point, clean[clean.length - 1]);
        if (!atStart && !atEnd) continue;
        const direction = atStart ? unit(sub(clean[1], clean[0])) : unit(sub(clean[clean.length - 2], clean[clean.length - 1]));
        if (dot(direction, outward[a.side]) < .999) {
          warn(id, 'port-direction', `Route must leave ${a.surfaceId}'s ${a.side} edge outward, or arrive along its inward normal.`);
          wrongDirection = true;
        }
      }
      if (!wrongDirection) paths.push(ribbonPath(id, route, options));
    }
    catch (error) { warn(id, 'invalid-runway', error instanceof Error ? error.message : 'Unable to construct route.'); }
  };
  const hubHeight = height(hub), hubRadius = snapshot.hubRadius ?? 24;
  if (snapshot.layout === 'desktop') {
    const hubFlare = hubHeight < 184 ? COMPACT_FLARE : DESKTOP_FLARE;
    const limit = hubRadius + hubFlare.halfWidth + 4;
    const rows: [PortfolioCardId, PortfolioCardId][] = [['tenants', 'payments'], ['portfolio', 'connections'], ['import', 'maintenance']];
    rows.forEach((pair, row) => pair.forEach((id, column) => {
      const left = column === 0, card = cards[id];
      const from = attach(id, id, { x: left ? card.right : card.left, y: centerY(card) }, left ? 'right' : 'left', DESKTOP_FLARE);
      // Different pairs share a port on each side, producing asymmetric forks.
      const portFractions = left ? [.25, .25, .75] : [.25, .75, .75];
      const to = attach(id, 'hub', { x: left ? hub.left : hub.right, y: hub.top + clamp(hubHeight * portFractions[row], limit, hubHeight - limit) }, left ? 'left' : 'right', hubFlare);
      const rail = (from.point.x + to.point.x) / 2;
      push(id, [from.point, { x: rail, y: from.point.y }, { x: rail, y: to.point.y }, to.point], { startFlare: DESKTOP_FLARE, endFlare: hubFlare, radius: 20 });
    }));
  }
  const spineX = snapshot.layout === 'phone' ? portPoint({ x: stage.left + 12, y: 0 }).x : portPoint({ x: centerX(hub), y: 0 }).x;
  if (snapshot.layout !== 'desktop') for (const id of CARD_IDS) {
    const card = cards[id], onLeft = snapshot.layout === 'tablet' && ['tenants', 'portfolio', 'import'].includes(id);
    const to = attach(id, id, { x: onLeft ? card.right : card.left, y: centerY(card) }, onLeft ? 'right' : 'left', COMPACT_FLARE);
    push(id, [{ x: spineX, y: to.point.y }, to.point], { endFlare: COMPACT_FLARE, radius: 12 });
  }
  const stemFlare = snapshot.layout === 'desktop' ? DESKTOP_FLARE : COMPACT_FLARE;
  const terminalFlare = snapshot.layout === 'desktop' && snapshot.storyLayout === 'split' ? DESKTOP_FLARE : COMPACT_FLARE;
  const from = attach('exit', 'hub', { x: centerX(hub), y: hub.bottom }, 'bottom', stemFlare);
  const to = attach('exit', 'target', { x: centerX(target), y: target.top }, 'top', terminalFlare);
  const lastBottom = Math.max(...Object.values(cards).map(b => b.bottom));
  const exitPoints: Point[] = [from.point];
  const radius = snapshot.layout === 'desktop' && snapshot.storyLayout === 'split' ? 20 : 12;
  if (snapshot.layout === 'phone') {
    const firstTop = Math.min(...Object.values(cards).map(b => b.top));
    const topTurn = hub.bottom + stemFlare.depth + radius;
    if (topTurn + radius > firstTop + .5 / normalizedDpr(snapshot.dpr)) warn('exit', 'hub-runway', 'Phone hub needs 40px clear before the first card.');
    exitPoints.push({ x: from.point.x, y: topTurn }, { x: spineX, y: topTurn });
  }
  if (snapshot.storyLayout === 'stacked') {
    const r = 12;
    const safeLeft = stories.left + snapshot.cornerExtent + 8, safeRight = stories.right - snapshot.cornerExtent - 8;
    if (safeRight <= safeLeft) warn('exit', 'boundary-clearance', 'No flat section-boundary crossing is available.');
    const entryX = spineX >= safeLeft && spineX <= safeRight ? spineX : portPoint({ x: centerX(stories), y: 0 }).x;
    if (Math.abs(entryX - spineX) > EPSILON) {
      const turn = Math.max(lastBottom + 32, caption.bottom + 16) + r;
      if (turn + r > stories.top - snapshot.cornerExtent - 8) warn('exit', 'dark-corridor', 'Increase dark-side bottom padding: moving the spine inward must clear caption and corner footprint.');
      exitPoints.push({ x: spineX, y: turn }, { x: entryX, y: turn });
    }
    const lane = stories.right - snapshot.storyPadding.right / 2;
    if (lane - intro.right < 5 || stories.right - lane < 5) warn('exit', 'escape-lane', 'Right padding does not provide a clear 2px escape lane.');
    const upperLow = stories.top + snapshot.cornerExtent + 8 + r, upperHigh = intro.top - 8 - r;
    if (upperHigh < upperLow) warn('exit', 'upper-band', 'Increase stories top padding to fit the entry turns below the corners.');
    const upper = (upperLow + upperHigh) / 2;
    const lower = intro.bottom + 24;
    if (target.top - intro.bottom < 72 - .5 / normalizedDpr(snapshot.dpr)) warn('exit', 'lower-band', 'Keep at least 72px between story intro and first pattern frame.');
    exitPoints.push({ x: entryX, y: upper }, { x: lane, y: upper }, { x: lane, y: lower }, { x: to.point.x, y: lower }, to.point);
  } else {
    const turn = Math.max(target.top - 60, lastBottom + 32);
    if (target.top - turn < terminalFlare.depth + radius + 8) warn('exit', 'terminal-runway', 'First-frame approach is too short for its bend and flare.');
    if (Math.abs(to.point.x - spineX) < 8) {
      // The ribbon builder uses a tangent-preserving S for a tiny lateral shift.
      exitPoints.push({ x: spineX, y: turn }, { x: to.point.x, y: turn }, to.point);
    } else exitPoints.push({ x: spineX, y: turn }, { x: to.point.x, y: turn }, to.point);
  }
  push('exit', exitPoints, { startFlare: stemFlare, endFlare: terminalFlare, radius });
  const obstacles: PortfolioObstacle[] = [{ id: 'caption', box: caption }, { id: 'intro', box: intro }, { id: 'first-copy', box: local(snapshot.firstFeatureCopy) },
    ...(snapshot.textObstacles ?? []).map(o => ({ id: o.id, box: local(o.box) }))];
  for (const path of paths) {
    if (outlineSelfIntersects(path.outline)) warn(path.id, 'self-intersection', 'Filled ribbon outline crosses itself.');
    if (path.envelope.left < -.01 || path.envelope.top < -.01 || path.envelope.right > width(snapshot.host) + .01 || path.envelope.bottom > height(snapshot.host) + .01) warn(path.id, 'host-overflow', 'Connector leaves the measured host.');
    for (const [id, box] of Object.entries(cards)) {
      if (id !== path.id && outlineHitsBox(path.outline, inflated(box, 4))) warn(path.id, 'card-collision', `Connector crosses ${id}.`);
      if (id === path.id && outlineHitsBox(path.outline, inflated(box, -PENETRATION - .01))) warn(path.id, 'terminal-reentry', `Connector enters ${id} beyond its terminal overlap.`);
    }
    if (outlineHitsBox(path.outline, inflated(hub, -PENETRATION - .01))) warn(path.id, 'hub-collision', 'Connector crosses the hub interior beyond its terminal overlap.');
    if (path.id === 'exit' && outlineHitsBox(path.outline, inflated(target, -PENETRATION - .01))) warn(path.id, 'terminal-reentry', 'Exit enters the pattern frame beyond its terminal overlap.');
    for (const obstacle of obstacles) if (outlineHitsBox(path.outline, inflated(obstacle.box, 4))) warn(path.id, 'text-collision', `Connector crosses ${obstacle.id}.`);
  }
  if (snapshot.layout === 'desktop') {
    for (const side of ['left', 'right'] as const) {
      const ports = attachments.filter(a => a.surfaceId === 'hub' && a.side === side).sort((a, b) => a.point.y - b.point.y);
      for (let i = 1; i < ports.length; i++) if (!same(ports[i].point, ports[i - 1].point) && ports[i].point.y - ports[i - 1].point.y < ports[i].flare.halfWidth + ports[i - 1].flare.halfWidth + 4 - EPSILON) warn(ports[i].routeId, 'hub-port-overlap', `Adjacent ${side} hub flares do not have separate attachment footprints.`);
    }
    const branches = paths.filter(p => p.id !== 'exit');
    for (let i = 0; i < branches.length; i++) for (let j = i + 1; j < branches.length; j++) {
      const a = branches[i], b = branches[j];
      if (a.envelope.right < b.envelope.left || b.envelope.right < a.envelope.left || a.envelope.bottom < b.envelope.top || b.envelope.bottom < a.envelope.top) continue;
      const aHub = attachments.find(item => item.routeId === a.id && item.surfaceId === 'hub');
      const bHub = attachments.find(item => item.routeId === b.id && item.surfaceId === 'hub');
      const sharedPort = aHub && bHub && aHub.side === bHub.side && same(aHub.point, bHub.point);
      if (!sharedPort && outlinesCross(a.outline, b.outline)) warn(a.id, 'branch-crossing', `Independent desktop branch intersects ${b.id}.`);
    }
  }
  return result();
}
