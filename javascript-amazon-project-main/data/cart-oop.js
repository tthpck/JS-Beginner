function Cart(localStorageKey) {

const cart = {
  cartItems: undefined,
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (!this.cartItems) {
      this.cartItems = [{
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings - Gold",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 2400,
    keywords: [
      "accessories",
      "womens"
    ]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/round-airtight-food-storage-containers.jpg",
    name: "Round Airtight Food Storage Containers - 5 Piece",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 2899,
    keywords: [
      "boxes",
      "food containers",
      "kitchen"
    ]
  }]
    }
  
  },

  saveToStorage(){
  localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },

  addToCart(productId){

      let matchingItem = this.cartItems.find(cartItem => cartItem.productId ===productId)//codice diverso dal corso (questo piu breve)

      if (matchingItem) {
        matchingItem.quantity++
      } else {     
        this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '2',
      })}
      this.saveToStorage();
  },

  removeFromCart(productId){

  const newCart = [];
  
  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    };
    this.cartItems = newCart;
  })
  this.saveToStorage();
  },

  calculateCartQuantity(){
        let cartQuantity = 0;
      this.cartItems.forEach(item => {
            cartQuantity+= item.quantity;
           
      })
      return cartQuantity;

  },

  updateDeliveryOption(productId, deliveryOptionId){
     let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

     matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();

},

  updateQuantity(productId, newQuantity) {
          this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
              cartItem.quantity = newQuantity;
            }
          })
          this.saveToStorage();
  },

};

return cart;
}



const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');



cart.loadFromStorage();
businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);










    











    



