import { IProduct } from "../interfaces";
import { textSlice } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface IProps {
  product: IProduct;
  setProductEdit: (product: IProduct) => void;
  openEditModal: () => void;
  openConfirmModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
}
export default function ProductCard({
  product,
  setProductEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}: IProps) {
  const { title, description, imageURL, price, colors, category } = product;

  /* ----------- Render ----------- */
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  /* ----------- Handlers ----------- */
  const onEdit = (product: IProduct) => {
    setProductEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };
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
      <div className="flex items-center my-4 space-x-1 flex-wrap">
        {renderProductColors}
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
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => onEdit(product)}
        >
          EDIT
        </Button>
        <Button
          className="bg-[#c2344d] hover:bg-[#922234] text-white"
          onClick={() => openConfirmModal()}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
}
