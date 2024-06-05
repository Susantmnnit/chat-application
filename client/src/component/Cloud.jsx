import React, { useState } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const Cloud = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const cld = new Cloudinary({cloud: {cloudName: 'dcpgteuyq'}});
  
  // Handle file upload
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset','chit-chat'); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dcpgteuyq/image/upload`,
        formData
      );
      console.log("response.data.secure_url-",response.data.secure_url);
      setUploadedImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  let img;
  if (uploadedImageUrl) {
    img = cld.image(uploadedImageUrl)
      .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
      .quality('auto')
      .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {uploadedImageUrl && <AdvancedImage cldImg={img} />}
    </div>
  );
};

export default Cloud;
