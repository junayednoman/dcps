import React from "react";
import { Field } from "formik";

const MyDatePicker = ({ name, label, value, defaultValue }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type="date"
        className={`md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px] ${
          label ? "" : "mt-7"
        }`}
      />
    </div>
  );
};

export default MyDatePicker;
