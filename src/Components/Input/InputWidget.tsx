import { InputProps } from "./InputState";

const InputWidget = (props: InputProps) => (
  <>
    <span>Choose the name for your Fleet: </span>
    <input
      type="text"
      placeholder={props.titlePlaceholder}
      onChange={(e) => props.onChange(e)}
    />
  </>
);
export default InputWidget;
