const FontLoader = ({ children }) => {
  // Simplified - just render children without font loading logic
  // Google Fonts will load automatically via CSS import
  return <div>{children}</div>;
};

export default FontLoader;
