'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Only animate sections that start fully below the viewport
    const sections = Array.from(document.querySelectorAll('section.section'));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );

    sections.forEach((s) => {
      const { top } = s.getBoundingClientRect();
      // Only hide sections whose TOP starts below 90% of viewport height
      // (generous threshold so #try never gets hidden on normal screens)
      if (top > window.innerHeight * 0.9) {
        s.classList.add('reveal');
        io.observe(s);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}