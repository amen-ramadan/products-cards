/**
 * Validates a product object and returns an object of errors.
 * @param {Object} product - The product object to validate
 * @param {string} product.title - The title of the product (must be 10-80 characters)
 * @param {string} product.description - The description of the product (must be 10-900 characters)
 * @param {string} product.imageURL - The URL of the product image (must be a valid URL)
 * @param {string} product.price - The price of the product (must be a valid number)
 * @returns {Object} An object containing validation errors for each field
 * @returns {string} returns.title - Error message for the title field
 * @returns {string} returns.description - Error message for the description field
 * @returns {string} returns.imageURL - Error message for the imageURL field
 * @returns {string} returns.price - Error message for the price field
 */

// ** productObj === errorsObj (TITLE, DESCRIPTION, IMAGE, PRICE)

export const productValidation = (product: { title: string; description: string; imageURL: string; price: string }): { title: string; description: string; imageURL: string; price: string } => {
  const errors: { title: string; description: string; imageURL: string; price: string } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (!product.title.trim() || product.title.length < 3 || product.title.length > 80) {
    errors.title = "Product title must be between 3 and 80 characters!";
  }
  if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
    errors.description = "Product description must be between 10 and 900 characters!";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid image URL is required";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required!";
  }

  return errors;
};
