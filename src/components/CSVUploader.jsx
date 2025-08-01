import React, { useRef, useState } from 'react';
import Papa from 'papaparse';

const CSVUploader = ({ onDataParsed }) => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        onDataParsed(results.data);
      },
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#4F46E5',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
        onClick={() => fileInputRef.current.click()}
      >
        📁 Завантажити CSV
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {fileName && (
        <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
          ✅ Завантажено: <strong>{fileName}</strong>
        </p>
      )}
    </div>
  );
};

export default CSVUploader;
