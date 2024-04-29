import Select from 'react-select';

const SearchableSelect = ({ options, onChange, value }) => {
    return (
        <Select
            options={options}
            onChange={onChange}
            value={value}
            isSearchable={true}
        />
    );
};

export default SearchableSelect;