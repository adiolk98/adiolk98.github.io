import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DesktopPet from '../DesktopPet';

let callbacks;
let observers;
let desktopWidth;
let time;
let reduced;
let id;

function advance(ms = 100) {
  time += ms;
  const pending = [...callbacks.values()];
  callbacks.clear();
  act(() => pending.forEach(callback => callback(time)));
}

beforeEach(() => {
  callbacks = new Map();
  observers = [];
  desktopWidth = 350;
  time = performance.now();
  reduced = false;
  id = 0;
  vi.stubGlobal('requestAnimationFrame', vi.fn(callback => {
    callbacks.set(++id, callback);
    return id;
  }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn(handle => callbacks.delete(handle)));
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback) { observers.push(callback); }
    observe() {}
    disconnect() {}
  });
  vi.stubGlobal('matchMedia', () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }));
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function () {
    return this.classList.contains('desktop-viewport') ? desktopWidth : 0;
  });
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function () {
    return this.classList.contains('desktop-pet') ? 112 : 0;
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderPet() {
  return render(<div className="desktop-viewport"><DesktopPet /></div>);
}

describe('DesktopPet', () => {
  it('plays the original greeting and returns to idle after interaction', () => {
    renderPet();
    const pet = screen.getByRole('button', { name: '豆虎，點一下打招呼' });
    expect(pet.dataset.state).toBe('idle');
    fireEvent.click(pet);
    advance();
    expect(pet.dataset.state).toBe('greeting');
    expect(screen.getByRole('status')).toHaveTextContent('喵～');
    for (let frame = 0; frame < 8; frame++) advance();
    expect(pet.dataset.state).toBe('idle');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('keeps the pet inside the actual desktop while moving and after a resize', () => {
    vi.spyOn(Math, 'random').mockReturnValue(1);
    renderPet();
    const pet = screen.getByRole('button', { name: /豆虎/ });
    const position = () => Number(pet.style.transform.match(/translateX\((\d+)px\)/)[1]);
    advance(3000);
    for (let frame = 0; frame < 100; frame++) advance();
    expect(position()).toBeLessThanOrEqual(350 - 112 - 16);
    expect(position()).toBeGreaterThan(100);
    desktopWidth = 180;
    act(() => observers.forEach(callback => callback()));
    expect(position()).toBeLessThanOrEqual(180 - 112 - 16);
    desktopWidth = 80;
    act(() => observers.forEach(callback => callback()));
    expect(position()).toBe(0);
  });

  it('keeps reduced-motion pets still and cancels animation when unmounted', () => {
    reduced = true;
    const view = renderPet();
    const pet = screen.getByRole('button', { name: /豆虎/ });
    const position = pet.style.transform;
    fireEvent.click(pet);
    advance();
    expect(screen.getByRole('status')).toHaveTextContent('喵～');
    advance(5000);
    expect(pet.style.transform).toBe(position);
    expect(pet.dataset.state).toBe('idle');
    expect(pet.querySelector('.desktop-pet-sprite').style.backgroundPosition).toBe('0% 0%');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    view.unmount();
    expect(callbacks.size).toBe(0);
  });
});
