import React from 'react';
import './index.css';

const ImageGalleryItem = ({ data }) =>
  data.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        modalpicture={largeImageURL}
      />
    </li>
  ));

export default ImageGalleryItem;
