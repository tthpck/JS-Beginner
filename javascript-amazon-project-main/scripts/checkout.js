import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadproducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import '../data/cart-class.js'
//import '../data/car.js';
//import '../data/backend-practice.js';


async function loadPage(){
  console.log('load page'  );

  await loadProductsFetch();

  return 'value2'
}

loadPage().then((value) => {88
  console.log('next step');
  console.log(value)
})

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
  loadCart(() => {
    resolve();
  });
  }),
]).then(()=> {
  renderOrderSummary();
  renderPaymentSummary();
})

/*
new Promise((resolve) => {
  loadproducts( () => {
    resolve('value1');
  })

}).then((value) => {
  console.log(value)
  return new Promise((resolve) => {
  loadCart(() => {
    resolve();
  });
  })

}).then (() => {
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
loadproducts(() =>{
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
})
*/


