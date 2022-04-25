import { ButtonDefaultProps } from "./ButtonState";

const ButtonWidget = (props: ButtonDefaultProps) => (
  <>
    <button {...props}>{props.buttontext}</button>
  </>
);

export default ButtonWidget;
