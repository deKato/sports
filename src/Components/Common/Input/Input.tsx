import { HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  value?: string;
}

const Input = (props: InputProps) => {
  return <input {...props} />;
};

export default Input;
