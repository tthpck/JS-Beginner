export let cart = JSON.parse(localStorage.getItem('cart')) || [];




export function addToCart(productId){

      let matchingItem = cart.find(cartItem => cartItem.productId ===productId)//codice diverso dal corso (questo piu breve)

      if (matchingItem) {
        matchingItem.quantity++
      } else {     
        cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '2',
      })}
      saveToStorage();
};

export function removeFromCart(productId){

  const newCart = [];
  
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    };
    cart = newCart;
  })
  saveToStorage();
}


export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function calculateCartQuantity(){
        let cartQuantity = 0;
      cart.forEach(item => {
            cartQuantity+= item.quantity;
           
      })
      return cartQuantity;

}
    

export function updateQuantity(productId, newQuantity) {
          cart.forEach((cartItem) => {
            if (cartItem.productId === productId) {
              cartItem.quantity = newQuantity;
            }
          })
          saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId){
     let matchingItem = cart.find(cartItem => cartItem.productId === productId);

     matchingItem.deliveryOptionId = deliveryOptionId;

     saveToStorage();

}



export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=> {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send()
}