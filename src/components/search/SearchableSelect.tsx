import { Dropdown } from 'semantic-ui-react';

type SearchableSelectProps = {
    options: Option[],
    placeholder: string,
    multi?: boolean
}

type Option = {
    text: string,
    value: string
}

const SearchableSelect = ({ options, placeholder, multi = false}: SearchableSelectProps) => {

    return (
        <Dropdown placeholder={placeholder} fluid multiple={multi} search selection options={options} />
    );
    };

export default SearchableSelect