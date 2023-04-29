import { API_BASE_URL } from './common.js';
import { formatCurrency } from './utils.js';

const productListContainer = document.getElementById('product-list-container');
const spinners = document.querySelectorAll('.loading-spinner');
const errorMessages = document.querySelectorAll('.error-message');

function displaySpinners() {
  spinners.forEach((spinner) => (spinner.style.display = 'inline-block'));
}

function hideSpinners() {
  spinners.forEach((spinner) => (spinner.style.display = 'none'));
}

function displayErrors() {
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = 'Error loading data';
    errorMessage.display = 'inline-block';
  });
}
function hideErrors() {
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  });
}

async function getData(url) {
  try {
    displaySpinners();
    hideErrors();
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    displayErrors(error);
  } finally {
    hideSpinners();
  }
}

function generateProduct({ id, name, prices: price, images }) {
  const productContainer = document.createElement('div');
  productContainer.classList.add('product-item');

  const productLink = document.createElement('a');
  productLink.href = `./product.html?id=${id}`;

  const productImage = document.createElement('img');
  productImage.classList.add('product-image');
  productImage.src = images[0].src;
  productImage.alt = name;

  const productContentContainer = document.createElement('div');
  productContentContainer.classList.add('product-content');

  const productTitle = document.createElement('h3');
  productTitle.textContent = name;

  const productBody = document.createElement('p');
  productBody.textContent = formatCurrency(price);

  productContentContainer.append(productTitle, productBody);
  productLink.append(productImage, productContentContainer);
  productContainer.append(productLink);

  return productContainer;
}

function renderProduct(product) {
  productListContainer.append(generateProduct(product));
}

function renderProducts(products) {
  products.forEach((product) => {
    renderProduct(product);
  });
}

async function main() {
  const data = await getData(`${API_BASE_URL}?_embed`);
  renderFeatured(data);
  renderProducts(data);
  console.log(data);
}

main();
