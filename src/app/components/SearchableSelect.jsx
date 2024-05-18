import Select from "react-select";

const SearchableSelect = ({ options, onChange, value, placeholder }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isSearchable={true}
    />
  );
};

export default SearchableSelect;
