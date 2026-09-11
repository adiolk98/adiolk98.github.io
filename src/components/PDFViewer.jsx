import React from 'react';

const PDFViewer = ({ filePath, title = 'PDF Viewer' }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src={filePath}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title={title}
      ></iframe>
    </div>
  );
};

export default PDFViewer; 