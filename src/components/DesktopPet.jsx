import React, { useEffect, useRef, useState } from 'react';

// ChatGPT pet 豆虎 (pet_6acdcd125e48819188ef7bd237f53263).
// Original v2 atlas: 8 × 11 cells, each 192 × 208, with transparent padding.
const ANIMATIONS = {
  idle: { row: 0, durations: [280, 110, 110, 140, 140, 320] },
  right: { row: 1, durations: [120, 120, 120, 120, 120, 120, 120, 220] },
  left: { row: 2, durations: [120, 120, 120, 120, 120, 120, 120, 220] },
  greeting: { row: 3, durations: [140, 140, 140, 280] },
};
const SPEED = 34;

export default function DesktopPet() {
  const petRef = useRef(null);
  const spriteRef = useRef(null);
  const hovered = useRef(false);
  const greetingRequested = useRef(false);
  const [greeting, setGreeting] = useState(false);

  useEffect(() => {
    const pet = petRef.current;
    const sprite = spriteRef.current;
    const desktop = pet.parentElement;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motion.matches;
    let maxX = 0;
    let x = 0;
    let target = 0;
    let initialized = false;
    let restUntil = performance.now() + 2400;
    let last = performance.now();
    let animation = 'idle';
    let frame = 0;
    let elapsed = 0;
    let raf = 0;

    const measure = () => {
      // Use the live CRT desktop, rather than the outer browser viewport.
      maxX = Math.max(0, desktop.clientWidth - pet.offsetWidth - 16);
      if (!initialized && desktop.clientWidth) {
        x = maxX * .28;
        target = x;
        initialized = true;
      }
      x = Math.max(0, Math.min(x, maxX));
      target = Math.max(0, Math.min(target, maxX));
      pet.style.transform = `translateX(${Math.round(x)}px)`;
    };
    const paint = () => {
      sprite.style.backgroundPosition = `${frame * 100 / 7}% ${ANIMATIONS[animation].row * 10}%`;
      pet.dataset.state = animation;
    };
    const changeAnimation = (next) => {
      if (next === animation) return;
      animation = next;
      frame = 0;
      elapsed = 0;
      paint();
    };
    const onMotionChange = (event) => {
      reduced = event.matches;
      target = x;
      restUntil = performance.now() + 2400;
      changeAnimation('idle');
      setGreeting(false);
    };

    const tick = (now) => {
      const dt = document.hidden ? 0 : Math.min(now - last, 100);
      last = now;
      if (document.hidden) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (greetingRequested.current) {
        greetingRequested.current = false;
        target = x;
        restUntil = now + 3000;
        // Restart a repeated click from the first greeting frame.
        changeAnimation('idle');
        if (!reduced) changeAnimation('greeting');
        setGreeting(true);
      }

      if (reduced) {
        if (now >= restUntil) setGreeting(false);
      } else if (animation !== 'greeting') {
        if (hovered.current) {
          target = x;
          restUntil = now + 1800;
          changeAnimation('idle');
        } else if (Math.abs(target - x) < 1) {
          changeAnimation('idle');
          if (now >= restUntil) {
            target = Math.random() * maxX;
            restUntil = now + 3000 + Math.random() * 2200;
          }
        } else {
          changeAnimation(target > x ? 'right' : 'left');
          const distance = target - x;
          x += Math.sign(distance) * Math.min(Math.abs(distance), SPEED * dt / 1000);
          pet.style.transform = `translateX(${Math.round(x)}px)`;
          if (Math.abs(target - x) < 1) restUntil = now + 2400 + Math.random() * 2400;
        }
      }

      if (!reduced) {
        elapsed += dt;
        let durations = ANIMATIONS[animation].durations;
        while (elapsed >= durations[frame]) {
          elapsed -= durations[frame];
          frame += 1;
          if (frame === durations.length) {
            if (animation === 'greeting') {
              changeAnimation('idle');
              restUntil = now + 2000;
              setGreeting(false);
              durations = ANIMATIONS.idle.durations;
            } else frame = 0;
          }
          paint();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(desktop);
    observer.observe(pet);
    measure();
    paint();
    motion.addEventListener('change', onMotionChange);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <button
      ref={petRef}
      type="button"
      className="desktop-pet"
      aria-label="豆虎，點一下打招呼"
      title="豆虎 · 點一下打招呼"
      onClick={() => { greetingRequested.current = true; }}
      onMouseEnter={() => { hovered.current = true; }}
      onMouseLeave={() => { hovered.current = false; }}
      onFocus={() => { hovered.current = true; }}
      onBlur={() => { hovered.current = false; }}
    >
      {greeting && <span className="desktop-pet-bubble px" role="status">喵～</span>}
      <span ref={spriteRef} className="desktop-pet-sprite" aria-hidden="true" />
    </button>
  );
}
