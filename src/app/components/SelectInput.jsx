import { Field } from "formik";

const SelectInput = () => {
    return (
        <div className="mb-4">
            <label className='font-semibold' htmlFor={"land_development_tax_paid"}>ভুমি উন্নয়ন কর*</label>
            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"land_development_tax_paid"} id={"land_development_tax_paid"}>
                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                <option value='পরিশোধিত'>পরিশোধিত</option>
                <option value='অপরিশোধিত'>অপরিশোধিত</option>
            </Field>
        </div>
    );
};

export default SelectInput;