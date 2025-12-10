export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId){

      let matchingItem = cart.find(cartItem => cartItem.productId ===productId)//codice diverso dal corso (questo piu breve)

      if (matchingItem) {
        matchingItem.quantity++
      } else {     
        cart.push({
        productId: productId,
        quantity: 1,
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