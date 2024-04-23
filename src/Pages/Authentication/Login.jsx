import React, { useState, useEffect, createContext, useContext } from 'react';
import './style.css'; // Import CSS file for styles
import shopLogo from './images/6.jpg'; // Import shop logo image

// Import phone images
import phone1 from './images/1.jpg';
import phone2 from './images/2.jpg';
import phone3 from './images/3.jpg';
import phone4 from './images/4.jpg';
import phone5 from './images/5.jpg';

const products = [
  { id: 1, title: 'iPhone 9', price: 29990, image: phone1 },
  { id: 2, title: 'iPhone X', price: 106900, image: phone2 },
  { id: 3, title: 'Samsung Universe 9', price: 103894.94, image: phone3 },
  { id: 4, title: 'OPPOF19', price: 15490, image: phone4 },
  { id: 5, title: 'Huawei P30', price: 59990, image: phone5 },
];

// Create Cart Context
const CartContext = createContext();

const ShoppingApp = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const calculateTotals = () => {
    let totalQty = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalQty += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    setTotalQuantity(totalQty);
    setTotalAmount(totalPrice);
  };

  const addItemToCart = (product) => {
    const itemExists = cartItems.find((item) => item.id === product.id);

    if (itemExists) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setSelectedProduct(product);
  };

  const removeItemFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateItemQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        totalAmount,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      <div className="container">
        <div className="shop-logo">
          <img src={shopLogo} alt="Shop Logo" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          <h1>ONLINE MOBILE SHOPPING STORE</h1>
          <p style={{ color: 'blue' }}>NOTE: Click "Add to Cart" button to increase the cart summary.</p>
        </div>

        {/* Display selected product details at the top */}
        {selectedProduct && (
          <div className="selected-product-top">
            <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '200px', height: '200px' }} />
            <h3>{selectedProduct.title}</h3>
            <p>Price: ₹{selectedProduct.price}</p>
            <p>Quantity: {selectedProduct.quantity}</p>
            <p>Total Amount: ₹{selectedProduct.quantity * selectedProduct.price}</p>
          </div>
        )}

        <div className="cart-summary-top">
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Quantity: <span id="total-quantity">{totalQuantity}</span></p>
            <p>Total Amount: ₹<span id="total-amount">{totalAmount.toFixed(2)}</span></p>
          </div>
        </div>

        <div className="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
              <h4>{product.title}</h4>
              <p>Price: ₹{product.price}</p>
              <button className="btn btn-primary mb-3" onClick={() => addItemToCart(product)}>
                Add to Cart
              </button>
              {/* Display selected product image */}
              {selectedProduct && selectedProduct.id === product.id && (
                <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '50px', height: '50px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

const App = () => {
  return (
    <ShoppingApp />
  );
};

export default App;
export { useCart };














 


















































