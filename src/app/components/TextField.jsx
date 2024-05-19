import { ErrorMessage, Field } from "formik";

const TextField = ({ name, placeholder, label, value }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <Field
        value={value}
        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-[#ED1C24] text-sm mt-1"
      />
    </div>
  );
};

export default TextField;
