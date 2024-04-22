import { Field } from "formik";

const SelectInput = ({ label, name, placeholder, items }) => {
    return (
        <div className="mb-4">
            <label className='font-semibold' htmlFor={name}>{label}*</label>
            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={name} id={name}>
                <option className='text-gray-300' value={placeholder} selected >{placeholder}</option>
                {items.map((item, i) => (
                    <option key={i} value={'item'}>{'item'}</option>
                ))}
            </Field>
        </div>
    );
};

export default SelectInput;