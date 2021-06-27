import React from 'react';
import './index.css';

const ImageGallery = ({ children, onPictureClick }) => {
  return (
    <ul className="ImageGallery" onClick={onPictureClick}>
      {children}
    </ul>
  );
};

export default ImageGallery;
