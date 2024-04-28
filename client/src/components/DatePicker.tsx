import ReactDatePicker from "react-date-picker";
import { HandleInputChange } from "../types";
import dayjs from "dayjs";

interface DatePickerProps {
  value?: string;
  name: string;
  onChange: HandleInputChange;
}

export const DatePicker = (props: DatePickerProps) => {
  const { value, name, onChange } = props;

  const onChangeHandler = (date: Date) => {
    const [dateString] = date.toISOString().split("T");
    onChange({
      name,
      value: dayjs(dateString).format("YYYY-MM-DD"),
    });
  };

  return (
    <ReactDatePicker
      value={value}
      id={name}
      name={name}
      className={"date-picker"}
      onChange={(value) => onChangeHandler(value as Date)}
      clearIcon={null}
    />
  );
};
