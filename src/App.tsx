import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Select from "./components/ui/Select";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import { ProductNameTypes } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProduct: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* ----------- STATES ----------- */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEditModel, setIsOpenEditModel] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [formData, setFormData] = useState<IProduct>(defaultProduct);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);

  /* ----------- HANDLERS ----------- */
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openEditModal = () => setIsOpenEditModel(true);
  const closeEditModal = () => setIsOpenEditModel(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
    // ** Validate the field as user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    // ** Validate the field as user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitEditHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    // ** Check if there is a property has a value of "" && Check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((error) => error === "") &&
      Object.values(errors).every((error) => error === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);

    setProductToEdit(defaultProduct);
    setTempColors([]);
    closeEditModal();
    console.log("Product edited successfully");
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = formData;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    // ** Check if there is a property has a value of "" && Check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((error) => error === "") &&
      Object.values(errors).every((error) => error === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...formData,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setFormData(defaultProduct);
    setTempColors([]);
    closeModal();
    console.log("Product added successfully");
  };

  const onCancel = () => {
    setFormData(defaultProduct);
    setTempColors([]);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    closeModal();
  };

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast.success("Product has been removed! ", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  /* ----------- Render Product List ----------- */
  const renderProductList = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductEdit={setProductToEdit}
      openEditModal={openEditModal}
      openConfirmModal={openConfirmModal}
      idx={index}
      setProductToEditIdx={setProductToEditIdx}
    />
  ));
  const renderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        className="text-gray-800 font-medium text-sm mb-[2px]"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={formData[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage message={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));
  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col">
        <label
          className="text-gray-800 font-medium text-sm mb-[2px]"
          htmlFor={id}
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage message={errors[name]} />
      </div>
    );
  };

  // ** application
  return (
    <main className="container mx-auto">
      <Button
        className="bg-indigo-600 hover:bg-indigo-700 block mx-auto my-10 px-10 font-medium text-white"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputs}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {tempColors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Submit
            </Button>
            <Button
              className="bg-[#f5f5fa] hover:bg-gray-300 text-black"
              onClick={onCancel}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
      {/* Edit Product Modal */}
      <Modal
        isOpen={isOpenEditModel}
        closeModal={closeEditModal}
        title="Edit Product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Submit
            </Button>
            <Button
              className="bg-[#f5f5fa] hover:bg-gray-300 text-black"
              onClick={closeEditModal}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
      {/* Delete Product Modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this product from your store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data,sales history, and other related information will also be deleted . please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-[#922234] text-white"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            className="bg-[#f5f5fa] hover:bg-gray-300 text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}

export default App;
