import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import Works from '../Works';

// jsdom 沒有 matchMedia，Works 的 reduced-motion 判斷會直接炸
window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;

describe('Works', () => {
  it('co2table 卡片把四支開場動畫排在截圖前面', () => {
    render(<HelmetProvider><Works /></HelmetProvider>);

    // 四支動畫 = 四支可點的手機
    expect(screen.getAllByRole('button', { name: /重播開場動畫/ })).toHaveLength(4);

    // 第一張是動畫，之後才是 5 張截圖 → 圓點共 6 顆
    const dots = screen.getAllByRole('button', { name: /共 6 張/ });
    expect(dots).toHaveLength(6);
    expect(dots[0].getAttribute('aria-label')).toBe('第 1 張，共 6 張');
  });
});
