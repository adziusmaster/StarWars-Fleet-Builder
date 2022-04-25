type ButtonProps = {
  key: string;
  buttontext: string;
  hidden?: boolean;
  form?: string;
  className?: string;
};

export type ButtonDefaultProps = ButtonProps & {
  onClick: () => void;
};

export type ButtonWithStringProps = ButtonProps & {
  onClick: () => (string: string) => void;
};
