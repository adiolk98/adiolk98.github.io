import React, { createContext, useContext, useState } from 'react';

const FileSystemContext = createContext();

export const useFileSystem = () => useContext(FileSystemContext);

const initialFileSystem = {
    name: '/',
    type: 'folder',
    children: [
        { name: 'home', type: 'folder', children: [] },
        { name: 'documents', type: 'folder', children: [
            { name: '未命名.txt', type: 'file' },
        ] },
        { name: 'downloads', type: 'folder', children: [] },
        { name: 'music', type: 'folder', children: [] },
        { name: 'videos', type: 'folder', children: [] },
        { name: 'pictures', type: 'folder', children: [] },
    ]
};

function findNodeByPath(root, pathArr) {
    let node = root;
    for (const part of pathArr) {
        if (!node.children) return null;
        node = node.children.find(child => child.name === part && child.type === 'folder');
        if (!node) return null;
    }
    return node;
}

export const FileSystemProvider = ({ children }) => {
    const [fileSystem, setFileSystem] = useState(initialFileSystem);
    const [currentPath, setCurrentPath] = useState([]); // e.g. ['home']

    // ls
    const ls = () => {
        const node = findNodeByPath(fileSystem, currentPath);
        if (!node || !node.children) return '';
        return node.children.map(child => child.name).join('  ');
    };

    // cd
    const cd = (dir) => {
        if (dir === '/') {
            setCurrentPath([]);
            return true;
        }
        if (dir === '..') {
            setCurrentPath(prev => prev.slice(0, -1));
            return true;
        }
        const node = findNodeByPath(fileSystem, currentPath);
        if (!node || !node.children) return false;
        const target = node.children.find(child => child.name === dir && child.type === 'folder');
        if (target) {
            setCurrentPath(prev => [...prev, dir]);
            return true;
        }
        return false;
    };

    // mkdir
    const mkdir = (name) => {
        setFileSystem(prev => {
            const pathArr = [...currentPath];
            const parent = findNodeByPath(prev, pathArr);
            if (!parent || !parent.children) return prev;
            if (parent.children.find(child => child.name === name)) return prev;
            parent.children.push({ name, type: 'folder', children: [] });
            return { ...prev };
        });
    };

    // touch
    const touch = (name) => {
        setFileSystem(prev => {
            const pathArr = [...currentPath];
            const parent = findNodeByPath(prev, pathArr);
            if (!parent || !parent.children) return prev;
            if (parent.children.find(child => child.name === name)) return prev;
            parent.children.push({ name, type: 'file' });
            return { ...prev };
        });
    };

    return (
        <FileSystemContext.Provider value={{ fileSystem, setFileSystem, currentPath, setCurrentPath, ls, cd, mkdir, touch }}>
            {children}
        </FileSystemContext.Provider>
    );
};