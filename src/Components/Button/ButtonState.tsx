export type ButtonProps = {
  key: string;
  onClick: () => void;
  buttontext: string;
  hidden?: boolean;
  form?: string;
};

export type ButtonWithStringProps = {
  key: string;
  onClick: () => (string: string) => void;
  buttontext: string;
  hidden?: boolean;
  form?: string;
};
