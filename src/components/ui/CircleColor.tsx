interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}
export default function CircleColor({ color, ...rest }: IProps) {
  return (
    <span
      className={`block w-5 h-5 rounded-full cursor-pointer mb-1`}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
}
