import { HTMLAttributes } from "react";

const Button = (props: HTMLAttributes<HTMLButtonElement>) => {
  const { children, ...rest } = props;
  return <button {...rest}>{props.children}</button>;
};

export default Button;
