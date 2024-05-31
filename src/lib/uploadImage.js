// utils/uploadImage.js
export const uploadImageToImageBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=d94c0d5def21106c79ac86cbe6fc1b52`, {
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
  