// components/DocumentUpload.jsx
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadFile } from '../utils/firebaseUpload';

const DocumentUpload = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      const urls = await Promise.all(
        files.map(file => uploadFile(file, 'user-documents'))
      );
      
      onUploadComplete(urls);
      setFiles([]);
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
      
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-slate-400 mb-2" />
          <span className="text-slate-600">
            Drag and drop files here, or click to select
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Selected files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                <span className="text-sm truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
          
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;