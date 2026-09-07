import { describe, it, expect, beforeEach } from 'vitest';
import { completeInput } from '../Terminal/commands';
import { findNodeByPath, renderTree } from '../FileSystemContext';
import { loadMessages, appendMessage, clearRoom } from '../YahooChat/chatStore';
import { resolveUrl } from '../../components/BrowserApp';
import {
  WALLPAPERS,
  wallpaperById,
  nextWallpaperId,
  loadWallpaperId,
  saveWallpaperId,
  loadIconPositions,
  saveIconPositions,
} from '../../components/desktopSettings';

const COMMANDS = ['cat', 'cd', 'clear', 'ls', 'mkdir'];
const NAMES = ['notes.txt', 'note-2.txt', 'music'];

describe('terminal tab completion', () => {
  it('completes a unique command and adds a trailing space', () => {
    expect(completeInput('mk', COMMANDS, NAMES)).toEqual({ value: 'mkdir ', hint: '' });
  });

  it('stops at the common prefix when several commands match', () => {
    expect(completeInput('c', COMMANDS, NAMES)).toEqual({ value: 'c', hint: 'cat  cd  clear' });
  });

  it('completes filenames once past the first word', () => {
    expect(completeInput('cat mu', COMMANDS, NAMES)).toEqual({ value: 'cat music ', hint: '' });
  });

  it('offers the shared filename prefix instead of guessing', () => {
    expect(completeInput('cat note', COMMANDS, NAMES)).toEqual({
      value: 'cat note',
      hint: 'notes.txt  note-2.txt',
    });
  });

  it('leaves input untouched when nothing matches', () => {
    expect(completeInput('zzz', COMMANDS, NAMES)).toEqual({ value: 'zzz', hint: '' });
  });
});

describe('filesystem helpers', () => {
  const root = {
    name: '/',
    type: 'folder',
    children: [
      { name: 'home', type: 'folder', children: [{ name: 'a.txt', type: 'file', content: 'hi' }] },
      { name: 'empty', type: 'folder', children: [] },
    ],
  };

  it('walks folders by path and refuses files as path segments', () => {
    expect(findNodeByPath(root, ['home'])?.name).toBe('home');
    expect(findNodeByPath(root, ['home', 'a.txt'])).toBeNull();
    expect(findNodeByPath(root, ['nope'])).toBeNull();
  });

  it('renders the real tree, not a hardcoded one', () => {
    expect(renderTree(root)).toBe(
      ['├── 📁 home', '│   └── 📄 a.txt', '└── 📁 empty'].join('\n')
    );
  });
});

describe('chat store', () => {
  beforeEach(() => localStorage.clear());

  it('seeds a room, then keeps what was sent', () => {
    expect(loadMessages('message-board').length).toBe(1);
    appendMessage('message-board', { user: 'adi', text: 'hello', timestamp: 'now' });
    const messages = loadMessages('message-board');
    expect(messages.length).toBe(2);
    expect(messages[1].text).toBe('hello');
  });

  it('starts empty for a room with no seed', () => {
    expect(loadMessages('unknown-room')).toEqual([]);
  });

  it('clearing a room falls back to the seed', () => {
    appendMessage('gaming', { user: 'adi', text: 'x', timestamp: 'now' });
    expect(clearRoom('gaming').length).toBe(1);
    expect(loadMessages('gaming').length).toBe(1);
  });
});

describe('browser address bar', () => {
  it('treats bare domains as urls', () => {
    expect(resolveUrl('example.com')).toBe('https://example.com');
    expect(resolveUrl('https://a.dev/x')).toBe('https://a.dev/x');
  });

  it('searches google for anything that is not a url', () => {
    expect(resolveUrl('retro pc')).toBe('https://www.google.com/search?q=retro%20pc');
  });

  it('ignores empty input', () => {
    expect(resolveUrl('   ')).toBeNull();
  });
});

describe('desktop settings', () => {
  beforeEach(() => localStorage.clear());

  it('cycles wallpapers and wraps back to the first', () => {
    const ids = WALLPAPERS.map(w => w.id);
    let id = ids[0];
    const seen = [id];
    for (let i = 0; i < ids.length; i += 1) {
      id = nextWallpaperId(id);
      seen.push(id);
    }
    expect(seen).toEqual([...ids, ids[0]]);
  });

  it('falls back to the first wallpaper for an unknown id', () => {
    expect(wallpaperById('gone').id).toBe(WALLPAPERS[0].id);
  });

  it('remembers the chosen wallpaper', () => {
    saveWallpaperId('rose');
    expect(loadWallpaperId()).toBe('rose');
  });

  it('remembers dragged icon positions', () => {
    expect(loadIconPositions()).toEqual({});
    saveIconPositions({ wiki: { x: 12, y: 34 } });
    expect(loadIconPositions()).toEqual({ wiki: { x: 12, y: 34 } });
  });
});
