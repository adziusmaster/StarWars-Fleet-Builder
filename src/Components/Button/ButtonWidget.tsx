import { ButtonProps } from "./ButtonState";

const ButtonWidget = (props: ButtonProps) => (
  <>
    <button {...props}>{props.buttontext}</button>
  </>
);

export default ButtonWidget;
