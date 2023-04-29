import { API_BASE_URL } from './common.js';
import { formatCurrency } from './utils.js';

const productDisplayContainer = document.getElementById('product-display');

async function getData(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Error');
  }
}

function getId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id;
}

function generateProductHTML(product) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('product');

  const firstCell = document.createElement('div');
  firstCell.classList.add('product-cell');

  const contentTop = document.createElement('content-top');
  contentTop.classList.add('content-top');

  const heading = document.createElement('h1');
  heading.textContent = product.name;

  const body = document.createElement('p');
  body.innerHTML = product.description;

  const tagContainer = document.createElement('div');
  tagContainer.classList.add('tag-container');

  product.categories.forEach((category) => {
    const tag = document.createElement('div');
    tag.classList.add('capsule');
    tag.textContent = category.name.toUpperCase();
    tagContainer.append(tag);
  });

  const priceContainer = document.createElement('div');
  priceContainer.classList.add('pricing-container');

  const addToCartButton = document.createElement('button');
  addToCartButton.classList.add('button-cta');
  addToCartButton.textContent = 'ADD TO CART';

  const price = document.createElement('p');
  price.textContent = formatCurrency(product.prices);

  const secondCell = document.createElement('div');
  secondCell.classList.add('product-cell');

  const image = document.createElement('img');
  image.src = product.images[0].src;
  image.alt = product.name;
  image.classList.add('single-product-image');

  secondCell.append(image);

  priceContainer.append(addToCartButton, price);
  contentTop.append(heading, body, tagContainer);
  firstCell.append(contentTop, priceContainer);

  mainWrapper.append(firstCell, secondCell);

  return mainWrapper;
}

function displayProduct(product) {
  productDisplayContainer.append(generateProductHTML(product));
}

async function main() {
  const productId = getId();
  const data = await getData(`${API_BASE_URL}/${productId}?_embed`);
  displayProduct(data);
}

main();
