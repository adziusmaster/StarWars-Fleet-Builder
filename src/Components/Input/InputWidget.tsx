import ButtonWidget from "../Button/ButtonWidget";
import { InputProps } from "./InputState";

const InputWidget = (props: InputProps) => (
  <>
    {props.nameEmpty && (
      <>
        <div className="alert alert-danger" role="alert">
          Choose the name for your Fleet!
        </div>
      </>
    )}
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={props.titlePlaceholder}
          onChange={(e) => props.onChange(e)}
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        {ButtonWidget({
          key: "save name",
          onClick: props.onClick,
          buttontext: "save name",
          className: "btn btn-info",
        })}
      </div>
    </>
  </>
);
export default InputWidget;
