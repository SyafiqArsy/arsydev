"use client";

import { useCallback, useEffect, useRef } from "react";

import "./ScrollExpand.css";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

interface ExpandConfig {
  startWidth: number;
  startHeight: number;
  startRadius: number;
  endRadius: number;
  mediaZoom: number;
  scrollDistance: number;
  holdDistance: number;
  smoothing: number;
  overlayScrim: number;
  useWindowScroll: boolean;
  enabled: boolean;
}

export interface ScrollExpandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image or video URL shown inside the frame. Empty → gradient placeholder surface. */
  src?: string;
  mediaType?: "image" | "video";
  /** Poster frame while a video loads. */
  poster?: string;
  alt?: string;
  /** Headline held over the frame that lifts away as the media takes over. */
  title?: string;
  /** Small cue shown under the resting frame that fades away as soon as scrolling begins. */
  scrollHint?: string;
  /** Frame width before expanding (%). */
  startWidth?: number;
  /** Frame height before expanding (%). */
  startHeight?: number;
  /** Corner radius of the resting frame (px). */
  startRadius?: number;
  /** Corner radius once fully expanded (px). */
  endRadius?: number;
  /** How far the media is zoomed in at rest. */
  mediaZoom?: number;
  /** Scroll length of the expansion, in multiples of the stage height. */
  scrollDistance?: number;
  /** Extra scroll the frame stays pinned at full bleed before releasing. */
  holdDistance?: number;
  /** Follow time in seconds (0 snaps the frame to the scrollbar). */
  smoothing?: number;
  /** Strength of the gradient scrim that fades in with overlay content. */
  overlayScrim?: number;
  /** Drive expansion from the page scroll instead of the component's own scroller. */
  useWindowScroll?: boolean;
  enabled?: boolean;
  /** Fired once when the frame reaches full bleed (progress === 1). */
  onFinish?: () => void;
  children?: React.ReactNode;
}

export default function ScrollExpand({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  onFinish,
  children,
  className = "",
  style,
  ...rest
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  const propsRef = useRef<ExpandConfig>({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  });

  // Simpan nilai terbaru prop untuk dibaca handler/effect tanpa restart listener.
  useEffect(() => {
    onFinishRef.current = onFinish;
    propsRef.current = {
      startWidth,
      startHeight,
      startRadius,
      endRadius,
      mediaZoom,
      scrollDistance,
      holdDistance,
      smoothing,
      overlayScrim,
      useWindowScroll,
      enabled,
    };
  });

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty("--se-title-size", `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (target >= 1 && !finishedRef.current) {
        finishedRef.current = true;
        onFinishRef.current?.();
      }
      const c = propsRef.current;
      if (c.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    if (useWindowScroll) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      root.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (useWindowScroll) {
        window.removeEventListener("scroll", onScroll);
      } else {
        root.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  let media: React.ReactNode;

  if (mediaType === "video") {
    media = src ? (
      <video
        ref={(node) => {
          mediaRef.current = node;
        }}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <div
        ref={(node) => {
          mediaRef.current = node;
        }}
        className="scroll-expand__media scroll-expand__media--placeholder"
      />
    );
  } else {
    media = src ? (
      <img
        ref={(node) => {
          mediaRef.current = node;
        }}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    ) : (
      <div
        ref={(node) => {
          mediaRef.current = node;
        }}
        className="scroll-expand__media scroll-expand__media--placeholder"
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? "" : "scroll-expand--scroller"} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}