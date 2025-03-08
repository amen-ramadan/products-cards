import { IProduct } from "../interfaces";
import { textSlice } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}
export default function ProductCard({ product }: IProps) {
  const { title, description, imageURL, price, category } = product;
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border border-stone-300 rounded-md p-2 flex flex-col space-y-3">
      <Image
        imageUrl={imageURL}
        alt="car"
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{textSlice(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">
        {textSlice(description)}
      </p>
      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer " />
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer " />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer " />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg text-sky-600 font-semibold">${price}</span>

        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>

      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-700 ">EDIT</Button>
        <Button className="bg-red-700 ">DELETE</Button>
      </div>
    </div>
  );
}
