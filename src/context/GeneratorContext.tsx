import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BuilderData {
  name: string;
  role: string;
}

export interface GeneratorContextType {
  uploadedImage: string | null;
  setUploadedImage: (url: string | null) => void;
  crop: { x: number; y: number };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  croppedAreaPixels: Area | null;
  setCroppedAreaPixels: (area: Area | null) => void;
  selectedPFPTemplateId: string;
  setSelectedPFPTemplateId: (id: string) => void;
  selectedBuilderTemplateId: string;
  setSelectedBuilderTemplateId: (id: string) => void;
  previewMode: 'frame' | 'builder';
  setPreviewMode: (mode: 'frame' | 'builder') => void;
  builderData: BuilderData;
  setBuilderData: React.Dispatch<React.SetStateAction<BuilderData>>;
  generatedTitle: string;
  setGeneratedTitle: (title: string) => void;
  resetAll: () => void;
}

const defaultBuilderData: BuilderData = {
  name: '',
  role: '',
};

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

export const GeneratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [selectedPFPTemplateId, setSelectedPFPTemplateId] = useState<string>('goa-palms');
  const [selectedBuilderTemplateId, setSelectedBuilderTemplateId] = useState<string>('goa-jungle');
  const [previewMode, setPreviewMode] = useState<'frame' | 'builder'>('frame');
  const [builderData, setBuilderData] = useState<BuilderData>(defaultBuilderData);
  const [generatedTitle, setGeneratedTitle] = useState<string>('Builder');

  const resetAll = () => {
    if (uploadedImage && uploadedImage.startsWith('blob:')) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setSelectedPFPTemplateId('goa-palms');
    setSelectedBuilderTemplateId('goa-jungle');
    setBuilderData(defaultBuilderData);
    setGeneratedTitle('Builder');
  };

  return (
    <GeneratorContext.Provider
      value={{
        uploadedImage,
        setUploadedImage,
        crop,
        setCrop,
        zoom,
        setZoom,
        rotation,
        setRotation,
        croppedAreaPixels,
        setCroppedAreaPixels,
        selectedPFPTemplateId,
        setSelectedPFPTemplateId,
        selectedBuilderTemplateId,
        setSelectedBuilderTemplateId,
        previewMode,
        setPreviewMode,
        builderData,
        setBuilderData,
        generatedTitle,
        setGeneratedTitle,
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
