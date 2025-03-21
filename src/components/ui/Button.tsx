import { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: string;
}
export default function Button({
  children,
  className,
  width = "w-full",
  ...rest
}: IProps) {
  return (
    <button
      className={` ${width} px-4 py-2 rounded-lg cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
