import React, { useState } from 'react';

function ImageUploader() {
  const [imageSrc, setImageSrc] = useState('');
  const [colorResult, setColorResult] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handlePixelClick = async (event) => {
    const canvas = event.target;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const pixelData = context.getImageData(x, y, 1, 1).data;
    const red = pixelData[0];
    const green = pixelData[1];
    const blue = pixelData[2];

    const data = {
      red: red,
      green: green,
      blue: blue
    };

    try {
      const response = await fetch('http://localhost:5000/return_color', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const color = await response.text();
      setColorResult(`Predicted Color: ${color}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <h1>Image Pixel Color</h1>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <br />
      {imageSrc && (
        <canvas
          style={{ display: 'block', cursor: 'crosshair' }}
          width="500"
          height="500"
          onClick={handlePixelClick}
          ref={(canvas) => {
            if (canvas) {
              const image = new Image();
              image.onload = () => {
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, 500, 500);
              };
              image.src = imageSrc;
            }
          }}
        ></canvas>
      )}
      {colorResult && <div>{colorResult}</div>}
    </div>
  );
}

export default ImageUploader;
