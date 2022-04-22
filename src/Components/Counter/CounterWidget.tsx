import { CounterProps } from "./CounterState";

const CounterWidget = (props: CounterProps) => (
  <>
    <span>Name of your Fleet: {props.title}</span>
    <br></br>
    <span {...props}>
      {"  "}
      {"  "}
    </span>
  </>
);

export default CounterWidget;
