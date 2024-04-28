import ReactSelect, { SingleValue } from "react-select";
import { HandleInputChange } from "../types";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  name: string;
  value: string;
  onChange: HandleInputChange;
}

export const Select = (props: SelectProps) => {
  const { options, name, value, onChange } = props;

  const onChangeHandler = (selectedOption: SingleValue<Option>) => {
    onChange({
      name,
      value: selectedOption!.value,
    });
  };

  return (
    <ReactSelect
      className="select"
      options={options}
      isSearchable
      name={name}
      id={name}
      value={options.find((option) => option.value === value)}
      onChange={(val) => onChangeHandler(val)}
    />
  );
};
