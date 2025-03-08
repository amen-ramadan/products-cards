import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";

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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [formData, setFormData] = useState<IProduct>(defaultProduct);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /* ----------- HANDLERS ----------- */
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
    // ** Validate the field as user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = formData;
    const errors = productValidation({ title, description, imageURL, price });

    // ** Check if there is a property has a value of "" && Check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((error) => error === "") &&
      Object.values(errors).every((error) => error === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      { ...formData, id: uuid(), colors: tempColors },
      ...prev,
    ]);
    setFormData(defaultProduct);
    setTempColors([]);
    closeModal();
    console.log("Product added successfully");
  };
  const onCancel = () => {
    setFormData(defaultProduct);
    closeModal();
  };

  /* ----------- Render Product List ----------- */
  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
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
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  // ** application
  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputs}
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
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-500 hover:bg-gray-600"
              onClick={onCancel}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
