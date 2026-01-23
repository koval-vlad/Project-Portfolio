// TechPill.tsx
import React from 'react';
import '../../index.css';

// Defining the shape of the props
interface TechPillProps {
  name: string;
  imageUrl?: string; // The '?' means this prop is optional
}

const TechPill: React.FC<TechPillProps> = ({ name, imageUrl }) => {
  return (
    <div className="mac-pill">
      <div className="pill-image-section">
        {imageUrl && <img src={imageUrl} alt="" className="pill-icon" />}
      </div>
      <div className="pill-text-section">
        <span className="pill-text">{name}</span>
      </div>
    </div>
  );
};

export default TechPill;