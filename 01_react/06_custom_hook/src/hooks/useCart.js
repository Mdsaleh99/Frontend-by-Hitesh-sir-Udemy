import { useEffect, useState } from "react";

// * if no dependency array => useEffect is called on every component render of the component
// * if the dependency array is empty => useEffect is called only on the initial render(just once) of the component
// * if the dependency array contains a dependency => useEffect is called everytime the value of the depencecy changes
// * Dependency: A depency can be a state variable (or) a function
export const useCart = () => {
  const [cart, setCart] = useState(() => { // lazy initial state
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localstorage", error);
      return [];
    }
  });
    
    // Persist cart to localstorage
    useEffect(() => {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localstorage", error);
      }
    }, [cart]);
    
    //Sync across tabs
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === "cart") {
                try {
                    const newCart = JSON.parse(e.newValue || "[]");
                    setCart(newCart);
                } catch (error) {
                    console.error("Failed to parse cart from localstorage", error);
                }
            }
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage); // cleanup
    }, [])
};
