import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

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
  const [formData, setFormData] = useState<IProduct>(defaultProduct);
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

    console.log("Product added successfully");
  };
  const onCancel = () => {
    setFormData(defaultProduct);
    closeModal();
  };

  /* ----------- Render Product List ----------- */
  const renderProductList = productList.map((product) => (
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
