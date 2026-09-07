import React, { createContext, useContext, useEffect, useState } from 'react';

const FileSystemContext = createContext();

export const useFileSystem = () => useContext(FileSystemContext);

const STORAGE_KEY = 'retro-filesystem';

const NOTE_CONTENT = '如果你在看這個...\n那首歌還沒停過。\n\n千千靜聽裡，找那個編號 0477 的錄音檔。';

const initialFileSystem = {
    name: '/',
    type: 'folder',
    children: [
        { name: 'home', type: 'folder', children: [
            { name: 'readme.txt', type: 'file', content: '這台機器上的東西都是真的：\ncd / ls / mkdir / touch / rm / cat 都會改到同一份檔案系統，\nFinder 看到的就是 Terminal 看到的。' },
        ] },
        { name: 'documents', type: 'folder', children: [
            { name: '未命名.txt', type: 'file', content: NOTE_CONTENT, locked: true },
        ] },
        { name: 'downloads', type: 'folder', children: [] },
        { name: 'music', type: 'folder', children: [] },
        { name: 'videos', type: 'folder', children: [] },
        { name: 'pictures', type: 'folder', children: [] },
    ]
};

export function findNodeByPath(root, pathArr) {
    let node = root;
    for (const part of pathArr) {
        if (!node.children) return null;
        node = node.children.find(child => child.name === part && child.type === 'folder');
        if (!node) return null;
    }
    return node;
}

// 走訪整棵樹產生 `tree` 指令的輸出，用真實節點而不是寫死的字串。
export function renderTree(node, prefix = '') {
    const children = node.children || [];
    return children.map((child, i) => {
        const last = i === children.length - 1;
        const line = `${prefix}${last ? '└── ' : '├── '}${child.type === 'folder' ? '📁 ' : '📄 '}${child.name}`;
        if (child.type !== 'folder') return line;
        return [line, renderTree(child, `${prefix}${last ? '    ' : '│   '}`)].filter(Boolean).join('\n');
    }).join('\n');
}

// 每次寫入都回傳全新的節點，避免直接改到 state 裡的物件。
function updateNodeAtPath(root, pathArr, updater) {
    if (pathArr.length === 0) return updater(root);
    const [head, ...rest] = pathArr;
    if (!root.children) return root;
    return {
        ...root,
        children: root.children.map(child =>
            child.name === head && child.type === 'folder'
                ? updateNodeAtPath(child, rest, updater)
                : child
        ),
    };
}

function loadFileSystem() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (error) {
        console.warn('Failed to read saved filesystem (handled):', error.message);
    }
    return initialFileSystem;
}

export const FileSystemProvider = ({ children }) => {
    const [fileSystem, setFileSystem] = useState(loadFileSystem);
    const [currentPath, setCurrentPath] = useState([]); // e.g. ['home']

    // 讓 Terminal 建立的東西重新整理後還在，才像一台真的機器。
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(fileSystem));
        } catch (error) {
            console.warn('Failed to persist filesystem (handled):', error.message);
        }
    }, [fileSystem]);

    const currentNode = () => findNodeByPath(fileSystem, currentPath);

    const ls = () => {
        const node = currentNode();
        if (!node || !node.children) return '';
        return node.children
            .map(child => (child.type === 'folder' ? `${child.name}/` : child.name))
            .join('  ');
    };

    const cd = (dir) => {
        if (dir === '/' || dir === '~') {
            setCurrentPath([]);
            return true;
        }
        if (dir === '..') {
            setCurrentPath(prev => prev.slice(0, -1));
            return true;
        }
        if (dir === '.') return true;
        const node = currentNode();
        if (!node || !node.children) return false;
        const target = node.children.find(child => child.name === dir && child.type === 'folder');
        if (!target) return false;
        setCurrentPath(prev => [...prev, dir]);
        return true;
    };

    const addChild = (entry) => {
        const node = currentNode();
        if (!node || !node.children) return false;
        if (node.children.some(child => child.name === entry.name)) return false;
        setFileSystem(prev => updateNodeAtPath(prev, currentPath, parent => ({
            ...parent,
            children: [...parent.children, entry],
        })));
        return true;
    };

    const mkdir = (name) => addChild({ name, type: 'folder', children: [] });
    const touch = (name) => addChild({ name, type: 'file', content: '' });

    const rm = (name) => {
        const node = currentNode();
        const target = node?.children?.find(child => child.name === name);
        if (!target) return false;
        setFileSystem(prev => updateNodeAtPath(prev, currentPath, parent => ({
            ...parent,
            children: parent.children.filter(child => child.name !== name),
        })));
        return true;
    };

    const readFile = (name) => {
        const target = currentNode()?.children?.find(child => child.name === name);
        if (!target || target.type === 'folder') return null;
        return target.content ?? '';
    };

    const writeFile = (name, content) => {
        const node = currentNode();
        if (!node || !node.children) return false;
        setFileSystem(prev => updateNodeAtPath(prev, currentPath, parent => ({
            ...parent,
            children: parent.children.some(child => child.name === name)
                ? parent.children.map(child => (child.name === name ? { ...child, content } : child))
                : [...parent.children, { name, type: 'file', content }],
        })));
        return true;
    };

    // 給 tab 補完用：目前目錄的名稱清單。
    const entryNames = () => (currentNode()?.children || []).map(child => child.name);

    const tree = () => `📁 /${currentPath.join('/')}\n${renderTree(currentNode() || { children: [] })}`;

    return (
        <FileSystemContext.Provider value={{
            fileSystem, setFileSystem, currentPath, setCurrentPath,
            ls, cd, mkdir, touch, rm, readFile, writeFile, entryNames, tree,
        }}>
            {children}
        </FileSystemContext.Provider>
    );
};
