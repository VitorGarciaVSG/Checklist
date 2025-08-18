
import React from 'react';
import type { Photo } from '../types';

interface PhotoSectionProps {
  photos: Photo[];
  onAddPhotos: (files: FileList) => void;
  onRemovePhoto: (photoId: string) => void;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ photos, onAddPhotos, onRemovePhoto }) => {
    
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onAddPhotos(event.target.files);
      event.target.value = ''; // Reset file input
    }
  };

  return (
    <section className="p-6 border-t border-gray-200">
      <h2 className="text-lg font-bold text-gray-700 mb-4">FOTOS GERAIS DO KIT <span className="text-red-500">*</span></h2>
      <div className="flex flex-col items-center">
        <input
          type="file"
          id="photo-upload-input"
          ref={fileInputRef}
          multiple
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors shadow-md w-full max-w-xs"
        >
          <i className="fas fa-camera mr-2"></i>Adicionar Fotos
        </button>
        <div id="photo-preview-container" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 w-full">
          {photos.map(photo => (
            <div key={photo.id} className="relative w-full h-32 group">
              <img src={photo.dataUrl} className="w-full h-full object-cover rounded-lg shadow-md" alt="Preview"/>
              <button
                onClick={() => onRemovePhoto(photo.id)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoSection;
