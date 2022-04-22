import { ButtonProps, ButtonWithStringProps } from "./ButtonState";

const ButtonWithStringWidget = (props: ButtonWithStringProps) => (
  <>
    <button {...props}>{props.buttontext}</button>
  </>
);

export default ButtonWithStringWidget;
