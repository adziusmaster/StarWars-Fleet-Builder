import { CounterProps } from "./CounterState";

const CounterWidget = (props: CounterProps) => (
  <>
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          Name of your Fleet: {props.title}
        </span>
      </div>
    </nav>
  </>
);

export default CounterWidget;
