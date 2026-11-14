import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import type { PortfolioDiagramRefs } from './PortfolioDiagram';
import { portfolioCards } from './portfolio-diagram-content';
import {
  buildPortfolioGeometry,
  normalizedDpr,
  type Box,
  type PortfolioGeometry,
  type PortfolioSnapshot,
} from './portfolio-diagram-geometry';

export type PortfolioConnectionRefs = PortfolioDiagramRefs & {
  host: RefObject<HTMLDivElement | null>;
  overview: RefObject<HTMLElement | null>;
  overviewHeading: RefObject<HTMLDivElement | null>;
  overviewCorners: RefObject<HTMLDivElement | null>;
  stories: RefObject<HTMLElement | null>;
  storyIntro: RefObject<HTMLDivElement | null>;
  featureTrack: RefObject<HTMLDivElement | null>;
  firstFeatureCopy: RefObject<HTMLDivElement | null>;
  target: RefObject<HTMLDivElement | null>;
};

/** DOMRect edges remain raw viewport coordinates; geometry does the only snap. */
const rawBox = (element: Element): Box => {
  const { left, top, right, bottom } = element.getBoundingClientRect();
  return { left, top, right, bottom };
};
const cssPixels = (value: string) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function usePortfolioConnections(refs: PortfolioConnectionRefs) {
  // Depend on stable ref identities, not the object literal assembled by Landing.
  const { host, overview, overviewHeading, overviewCorners, frame, stage, hub,
    caption, cards, stories, storyIntro, featureTrack, firstFeatureCopy, target } = refs;
  const [geometry, setGeometry] = useState<PortfolioGeometry | null>(null);
  const publishedSignature = useRef('');
  const diagnosticSignature = useRef('');

  // React's measurement/cleanup pattern: https://react.dev/reference/react/useLayoutEffect
  useLayoutEffect(() => {
    let live = true;
    let scheduledFrame: number | null = null;
    let resolutionQuery: MediaQueryList | null = null;

    const publish = (next: PortfolioGeometry) => {
      if (!live) return;
      // Outlines/samples are validation data; only path/size/status changes redraw.
      const signature = JSON.stringify([next.valid, next.width, next.height,
        next.paths.map(path => [path.id, path.d]), next.diagnostics]);
      if (signature !== publishedSignature.current) {
        publishedSignature.current = signature;
        setGeometry(next);
      }
      const diagnostics = JSON.stringify(next.diagnostics);
      if (import.meta.env.DEV && !next.valid && diagnostics !== diagnosticSignature.current) {
        console.warn('[Inzu portfolio connections]', next.diagnostics);
      }
      diagnosticSignature.current = diagnostics;
    };

    const measure = () => {
      if (!live) return;
      const elements = {
        host: host.current, overview: overview.current, heading: overviewHeading.current,
        corners: overviewCorners.current, frame: frame.current, stage: stage.current,
        hub: hub.current, caption: caption.current, stories: stories.current,
        intro: storyIntro.current, track: featureTrack.current,
        firstCopy: firstFeatureCopy.current, target: target.current,
      };
      const missing = Object.entries(elements).filter(([, element]) => !element).map(([id]) => id);
      missing.push(...portfolioCards.filter(card => !cards.current[card.id]).map(card => card.id));
      if (missing.length) {
        const bounds = elements.host?.getBoundingClientRect();
        publish({ valid: false, width: bounds?.width ?? 0, height: bounds?.height ?? 0,
          paths: [], attachments: [], diagnostics: [{ routeId: 'snapshot', code: 'missing-anchor',
            message: `Waiting for visible anchors: ${missing.join(', ')}.` }] });
        return;
      }

      // Read the complete layout once. No observed element is resized by this hook.
      // DOMRect behavior: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
      const stageStyle = getComputedStyle(elements.stage!);
      const storyStyle = getComputedStyle(elements.stories!);
      const mode = stageStyle.getPropertyValue('--portfolio-layout').trim();
      const storyMode = storyStyle.getPropertyValue('--portfolio-story-layout').trim();
      const cardEntries = portfolioCards.map(card => [card.id, rawBox(cards.current[card.id]!) ] as const);
      const snapshot: PortfolioSnapshot = {
        layout: mode === 'desktop' || mode === 'tablet' ? mode : 'phone',
        storyLayout: storyMode === 'stacked' ? 'stacked' : 'split',
        dpr: normalizedDpr(window.devicePixelRatio),
        host: rawBox(elements.host!),
        frame: rawBox(elements.frame!),
        stage: rawBox(elements.stage!),
        hub: rawBox(elements.hub!),
        cards: Object.fromEntries(cardEntries) as PortfolioSnapshot['cards'],
        overview: rawBox(elements.overview!),
        caption: rawBox(elements.caption!),
        stories: rawBox(elements.stories!),
        storyIntro: rawBox(elements.intro!),
        firstFeatureCopy: rawBox(elements.firstCopy!),
        target: rawBox(elements.target!),
        storyPadding: {
          top: cssPixels(storyStyle.paddingTop), right: cssPixels(storyStyle.paddingRight),
          bottom: cssPixels(storyStyle.paddingBottom), left: cssPixels(storyStyle.paddingLeft),
        },
        cornerExtent: elements.corners!.getBoundingClientRect().height,
        hubRadius: cssPixels(getComputedStyle(elements.hub!).borderTopLeftRadius),
        cardRadius: Math.max(...portfolioCards.map(card => cssPixels(getComputedStyle(cards.current[card.id]!).borderTopLeftRadius))),
        targetRadius: cssPixels(getComputedStyle(elements.target!).borderTopLeftRadius),
        textObstacles: [{ id: 'overview-heading', box: rawBox(elements.heading!) }],
      };
      publish(buildPortfolioGeometry(snapshot));
    };

    const schedule = () => {
      if (!live || scheduledFrame !== null) return;
      scheduledFrame = requestAnimationFrame(() => {
        scheduledFrame = null;
        measure();
      });
    };

    // RO only invalidates our absolutely positioned SVG, avoiding layout loops.
    // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver#observation_errors
    const observer = new ResizeObserver(schedule);
    const observed = [host.current, overview.current, overviewHeading.current,
      overviewCorners.current, frame.current, stage.current, hub.current,
      caption.current, stories.current, storyIntro.current, featureTrack.current,
      firstFeatureCopy.current, target.current,
      ...portfolioCards.map(card => cards.current[card.id])];
    new Set(observed).forEach(element => { if (element) observer.observe(element); });
    window.addEventListener('resize', schedule);

    // Font loading may move anchors without a viewport resize.
    // https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready
    const fonts = document.fonts;
    fonts?.ready.then(() => { if (live) schedule(); });
    fonts?.addEventListener('loadingdone', schedule);

    // Each resolution change needs a new query for the new DPR (MDN example).
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
    const watchResolution = () => {
      resolutionQuery?.removeEventListener('change', resolutionChanged);
      resolutionQuery = window.matchMedia(`(resolution: ${normalizedDpr(window.devicePixelRatio)}dppx)`);
      resolutionQuery.addEventListener('change', resolutionChanged);
    };
    const resolutionChanged = () => {
      if (!live) return;
      watchResolution();
      schedule();
    };
    watchResolution();
    measure();

    return () => {
      live = false;
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      fonts?.removeEventListener('loadingdone', schedule);
      resolutionQuery?.removeEventListener('change', resolutionChanged);
      if (scheduledFrame !== null) cancelAnimationFrame(scheduledFrame);
    };
  }, [host, overview, overviewHeading, overviewCorners, frame, stage, hub, caption,
    cards, stories, storyIntro, featureTrack, firstFeatureCopy, target]);

  return geometry;
}
