import { uploadImageToImageBB } from "@/lib/uploadImage";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";

const ImageInput2 = ({ name, label, placeholder }) => {
  const [ meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadImageToImageBB(file);
        const imageUrl = response.data.display_url;
        setFieldValue(name, imageUrl);
        setUploadError("");
      } catch (error) {
        setUploadError("Error uploading image");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[6px]"
        type="file"
        id={name}
        placeholder={placeholder}
        onChange={handleImageUpload}
        accept="image/*"
        disabled={isUploading}
      />
      {isUploading && <p>Uploading...</p>}
      {uploadError && <p className="text-red-500">{uploadError}</p>}
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ImageInput2;
