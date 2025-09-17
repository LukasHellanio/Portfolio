import React, { useState } from "react";

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 80,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setIsError] = useState(false);

  // Convert to WebP if possible
  const getOptimizedSrc = (originalSrc) => {
    if (originalSrc.includes(".svg")) return originalSrc;

    // For now, return original - we'll optimize the actual files
    return originalSrc;
  };

  if (hasError) {
    return (
      <div
        className={`bg-neutral-800 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-neutral-500 text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-neutral-800 animate-pulse rounded"
          style={{ width, height }}
        />
      )}

      <img
        src={getOptimizedSrc(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: width ? `${width}px` : "auto",
          height: height ? `${height}px` : "auto",
        }}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
