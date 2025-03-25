// utils/uploadImage.js
export const uploadImageToImageBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=4939b4eab1ea6852078318085d761cfe`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error uploading image');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error('Error uploading image');
    }
  };