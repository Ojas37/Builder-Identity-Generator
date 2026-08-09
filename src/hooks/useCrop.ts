import { useCallback } from 'react';
import { useGenerator, type Area } from '../context/GeneratorContext';

export function useCrop() {
  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    rotation,
    setRotation,
    setCroppedAreaPixels,
  } = useGenerator();

  const handleCropChange = useCallback(
    (location: { x: number; y: number }) => {
      setCrop(location);
    },
    [setCrop]
  );

  const handleZoomChange = useCallback(
    (zoomValue: number) => {
      setZoom(zoomValue);
    },
    [setZoom]
  );

  const handleRotationChange = useCallback(
    (rotationValue: number) => {
      setRotation(rotationValue);
    },
    [setRotation]
  );

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixelsValue: Area) => {
      setCroppedAreaPixels(croppedAreaPixelsValue);
    },
    [setCroppedAreaPixels]
  );

  return {
    crop,
    zoom,
    rotation,
    onCropChange: handleCropChange,
    onZoomChange: handleZoomChange,
    onRotationChange: handleRotationChange,
    onCropComplete: handleCropComplete,
  };
}
