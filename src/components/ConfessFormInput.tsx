import "./ConfessForm.css";

interface FormInputProps {
  labelText: string;
  inputValue: string;
  onChangeFunc: (text: string) => void;
  name: string;
}

const ConfessFormInput = ({
  labelText,
  inputValue,
  onChangeFunc,
  name,
}: FormInputProps) => {
  return (
    <div className="form__inputContainer">
      <label>{labelText}</label>
      <input
        className="form__input"
        type="text"
        required
        value={inputValue}
        onChange={(e) => onChangeFunc(e.target.value)}
        aria-label={name}
      />
    </div>
  );
};

export default ConfessFormInput;
