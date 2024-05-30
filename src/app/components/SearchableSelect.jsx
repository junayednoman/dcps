import Select from "react-select";

const SearchableSelect = ({
  options,
  onChange,
  value,
  placeholder,
  label,
  defaultValue,
}) => {
  return (
    <div className="mb-4">
      <h1 className="font-semibold">{label}</h1>
      <Select
        options={options}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        isSearchable={true}
        defaultInputValue={defaultValue}
      />
    </div>
  );
};

export default SearchableSelect;
