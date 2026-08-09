import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface BuilderInfo {
  name: string;
  role: string;
  title: string; // The generated title, e.g. "Terminal Wizard"
}

export interface GeneratorContextType {
  uploadedImage: string | null; // object URL or data URL
  setUploadedImage: (url: string | null) => void;
  selectedFrameId: string | null;
  setSelectedFrameId: (id: string | null) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  builderInfo: BuilderInfo;
  setBuilderInfo: React.Dispatch<React.SetStateAction<BuilderInfo>>;
  generatedImage: string | null;
  setGeneratedImage: (img: string | null) => void;
  resetAll: () => void;
}

const defaultBuilderInfo: BuilderInfo = {
  name: '',
  role: '',
  title: 'Builder', // default fallback title
};

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

export const GeneratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>('classic-frame');
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [builderInfo, setBuilderInfo] = useState<BuilderInfo>(defaultBuilderInfo);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const resetAll = () => {
    if (uploadedImage && uploadedImage.startsWith('blob:')) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setSelectedFrameId('classic-frame');
    setZoom(1);
    setRotation(0);
    setBuilderInfo(defaultBuilderInfo);
    setGeneratedImage(null);
  };

  return (
    <GeneratorContext.Provider
      value={{
        uploadedImage,
        setUploadedImage,
        selectedFrameId,
        setSelectedFrameId,
        zoom,
        setZoom,
        rotation,
        setRotation,
        builderInfo,
        setBuilderInfo,
        generatedImage,
        setGeneratedImage,
        resetAll,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};

export const useGenerator = () => {
  const context = useContext(GeneratorContext);
  if (context === undefined) {
    throw new Error('useGenerator must be used within a GeneratorProvider');
  }
  return context;
};
