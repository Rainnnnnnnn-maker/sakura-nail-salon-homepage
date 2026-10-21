"use client";

import { useEffect } from "react";

const STAGGER_MS = 120;
const MAX_STAGGER_STEPS = 8;

/**
 * data-reveal を付けた要素を、スクロールで画面に入ったときにふわっと表示する。
 *
 * HTML は最初から表示された状態で書き出し、読み込み時に画面より下にある要素だけを隠す。
 * そのため JavaScript 無効時は常に表示され、見た目は globals.css 側で
 * prefers-reduced-motion: no-preference のときだけ適用される。
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // 同時に画面へ入った要素だけに時間差をつける。
        // 縦積みになるスマホでは1つずつ入るので、余計な待ち時間が生まれない。
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .filter((target) => target.dataset.revealState === "pending");

        entering.forEach((target, index) => {
          const step = Math.min(index, MAX_STAGGER_STEPS);
          target.style.setProperty("--reveal-delay", `${step * STAGGER_MS}ms`);
          target.dataset.revealState = "revealed";
          observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    for (const target of targets) {
      const isBelowViewport =
        target.getBoundingClientRect().top >= window.innerHeight;
      if (!isBelowViewport || target.contains(document.activeElement)) continue;

      target.dataset.revealState = "pending";
      observer.observe(target);
    }

    // キーボード操作で隠れている要素にフォーカスが移ったら、待たずに表示する
    const showFocusedTarget = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-reveal]");
      if (target?.dataset.revealState !== "pending") return;

      target.dataset.revealState = "shown";
      observer.unobserve(target);
    };

    document.addEventListener("focusin", showFocusedTarget);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", showFocusedTarget);
      for (const target of targets) {
        delete target.dataset.revealState;
        target.style.removeProperty("--reveal-delay");
      }
    };
  }, []);

  return null;
}
