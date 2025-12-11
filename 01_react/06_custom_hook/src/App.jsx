import "./App.css";
import { useCart } from "./hooks/useCart";
import { products } from "./data/products";
import ProductCart from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const { cart, addToCart, updateQuantity, removeFromCart, total } = useCart();
  return (
    <>
      <div className="app">
        <header>
          <h1>Shopping Cart</h1>
        </header>
        <main className="products">
          <section>
            {products.map((product) => (
              <div key={product.id}>
                <ProductCart
                  product={product}
                  onAddToCart={addToCart}
                />
              </div>
            ))}
          </section>
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            total={total}
          />
        </main>
      </div>
    </>
  );
}

export default App;
