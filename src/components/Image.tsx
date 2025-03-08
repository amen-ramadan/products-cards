interface IProps {
  imageUrl: string;
  alt: string;
  className?: string;
}
export default function Image({ imageUrl, alt, className }: IProps) {
  return <img src={imageUrl} alt={alt} className={className} />;
}
