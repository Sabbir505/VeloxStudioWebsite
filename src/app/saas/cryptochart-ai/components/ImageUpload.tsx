import React, { useCallback, useState } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from '../constants';
import { UploadedImage } from '../types';

interface ImageUploadProps {
  onImagesSelected: (images: UploadedImage[]) => void;
  isAnalyzing: boolean;
  multiple?: boolean;
  variant?: 'full' | 'compact';
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImagesSelected, 
  isAnalyzing, 
  multiple = false,
  variant = 'full'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = useCallback((files: FileList | File[]) => {
    setError(null);
    const validImages: UploadedImage[] = [];
    let fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) fileArray = [fileArray[0]];

    let processedCount = 0;
    fileArray.forEach(file => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError("Invalid file type. Please upload PNG, JPG, or WEBP.");
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) validImages.push({ base64: result, mimeType: file.type });
        processedCount++;
        if (processedCount === fileArray.length && validImages.length > 0) onImagesSelected(validImages);
      };
      reader.onerror = () => setError("Failed to read file.");
      reader.readAsDataURL(file);
    });
  }, [onImagesSelected, multiple]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isAnalyzing) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) processFiles(e.target.files);
  };

  const isCompact = variant === 'compact';

  return (
    <div 
      className={`relative w-full rounded-3xl transition-all duration-300 ease-out text-center overflow-hidden group
        ${isCompact ? 'p-6' : 'p-12 md:p-20'}
        ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Interactive Background */}
      <div className={`absolute inset-0 transition-all duration-300
        ${isDragging 
          ? 'bg-cyan-500/10 border-2 border-cyan-400' 
          : 'bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30'
        }
      `}></div>
      
      {/* Animated Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>

      <input
        type="file"
        accept={ALLOWED_FILE_TYPES.join(',')}
        onChange={handleFileInput}
        disabled={isAnalyzing}
        multiple={multiple}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
      />
      
      <div className={`relative z-10 flex flex-col items-center justify-center pointer-events-none`}>
        {!isCompact && (
          <div className={`p-5 rounded-2xl mb-6 transition-all duration-300 relative group-hover:scale-110
            ${isDragging ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10 shadow-lg'}
          `}>
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
             </svg>
          </div>
        )}
        
        <div>
          {isCompact ? (
             <div className="flex items-center gap-3 justify-center text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/10 text-cyan-500 dark:text-cyan-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                </div>
                <span className="text-sm font-medium">Add Evidence</span>
             </div>
          ) : (
            <>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3 tracking-tight">
                {multiple ? "Upload Evidence" : "Analyze Structure"}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Drop your chart here to initialize <span className="text-cyan-600 dark:text-cyan-400">Deep Scan</span>
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="absolute bottom-6 left-0 right-0 mx-auto w-max max-w-[90%] bg-rose-500/10 border border-rose-500/40 backdrop-blur-xl text-rose-600 dark:text-rose-200 px-6 py-3 rounded-xl text-sm z-20 shadow-xl">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;