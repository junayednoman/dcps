import { Field } from "formik";

const ImageInput = ({ name, label, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <Field
        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[6px]"
        type="file"
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ImageInput;
