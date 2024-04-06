import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { cartAtom, productsAtom } from "../../utils/atoms";
import api from "../../utils/api";
import Select from "react-select";

function InputForm() {
  const productRef = useRef();
  const quantityRef = useRef();
  const [cart, setCart] = useAtom(cartAtom);
  const [products, setProducts] = useAtom(productsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(true);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await api.get("/api/product");
        setProducts(response?.data);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProduct?.Quantity > 0 && quantity > 0) {
      setIsAddToCartDisabled(false);
    } else {
      setIsAddToCartDisabled(true);
    }
  }, [selectedProduct, quantity]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  if (isLoading && products.length < 0) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const handleAddToCart = () => {
    const productName = selectedProduct ? selectedProduct.label : "";
    const availableQuantity = selectedProduct ? selectedProduct.Quantity : 0;

    if (selectedProduct && quantity > 0) {
      if (quantity > availableQuantity) {
        alert(`Only ${availableQuantity} items are available in stock for ${productName}`);
        return;
      }

      const newItem = {
        id: selectedProduct.value,
        product: productName,
        price: selectedProduct.price,
        quantity: parseInt(quantity),
      };
      setCart((prevCart) => [...prevCart, newItem]);
      setSelectedProduct(null);
      setQuantity("");
    }
  };

  return (
    <>
      <div className="grid gap-4">
        <div>
          <br />
          <Label className="text-base ml-6" htmlFor="product">
            Product
          </Label>
          <Select
            ref={productRef}
            className="w-[95%] ml-6"
            id="product"
            options={products.map((product) => ({
              value: product.id,
              label: product.ProductName,
              price: product.selling_price,
              Quantity: product.Quantity,
              isOutOfStock: product.Quantity === "0",
              isDisabled: product.Quantity === "0",
            }))}
            onChange={setSelectedProduct}
            value={selectedProduct}
            placeholder="Select product"
            isSearchable
            getOptionLabel={(option) => `${option.label} ${option.isOutOfStock ? "(Out of Stock)" : ""}`}
            styles={{
              option: (provided, state) => ({
                ...provided,
                ...(state.isDisabled && {
                  cursor: "not-allowed",
                  opacity: 0.5,
                  backgroundColor: "#f3f4f6",
                }),
              }),
            }}
            classNamePrefix="select"
          />
        </div>
        <div>
          <Label className="text-base ml-6" htmlFor="quantity">
            Quantity
          </Label>
          <Input
            ref={quantityRef}
            className="w-[95%] ml-6 text-base"
            id="quantity"
            placeholder="Enter quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 gap-4 px-8">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedProduct(null);
            setQuantity("");
          }}
        >
          Clear
        </Button>
        <Button onClick={handleAddToCart} disabled={isAddToCartDisabled}>
          Add to Cart
        </Button>
      </div>
    </>
  );
}

export default InputForm;
















// import React, { useRef, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useAtom } from "jotai";
// import { cartAtom, productsAtom } from "../../utils/atoms";
// import api from "../../utils/api";
// import Select from "react-select";

// function InputForm() {
//   const productRef = useRef();
//   const quantityRef = useRef();
//   const [cart, setCart] = useAtom(cartAtom);
//   const [products, setProducts] = useAtom(productsAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsError(false);
//         setIsLoading(true);
//         const response = await api.get("/api/product");
//         setProducts(response?.data);
//       } catch (err) {
//         setIsError(true);
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedProduct?.Quantity > 0 && quantityRef.current.value > 0) {
//       setIsAddToCartDisabled(false);
//     } else {
//       setIsAddToCartDisabled(true);
//     }
//   }, [selectedProduct, quantityRef]);

//   if (isLoading && products.length < 0) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   const handleAddToCart = () => {
//     const productName = selectedProduct ? selectedProduct.label : "";
//     const quantity = parseInt(quantityRef.current.value);
//     const availableQuantity = selectedProduct ? selectedProduct.Quantity : 0;

//     if (selectedProduct && quantity > 0) {
//       if (quantity > availableQuantity) {
//         alert(`Only ${availableQuantity} items are available in stock for ${productName}`);
//         return;
//       }

//       const newItem = {
//         id: selectedProduct.value,
//         product: productName,
//         price: selectedProduct.price,
//         quantity,
//       };
//       setCart((prevCart) => [...prevCart, newItem]);
//       setSelectedProduct(null);
//       quantityRef.current.value = "";
//     }
//   };

//   return (
//     <>
//       <div className="grid gap-4">
//         <div>
//           <br />
//           <Label className="text-base ml-6" htmlFor="product">
//             Product
//           </Label>
//           <Select
//             ref={productRef}
//             className="w-[95%] ml-6"
//             id="product"
//             options={products.map((product) => ({
//               value: product.id,
//               label: product.ProductName,
//               price: product.selling_price,
//               Quantity: product.Quantity,
//               isOutOfStock: product.Quantity === "0",
//               isDisabled: product.Quantity === "0", // Add isDisabled prop
//             }))}
//             onChange={setSelectedProduct}
//             value={selectedProduct}
//             placeholder="Select product"
//             isSearchable
//             getOptionLabel={(option) => `${option.label} ${option.isOutOfStock ? "(Out of Stock)" : ""}`}
//             styles={{
//               option: (provided, state) => ({
//                 ...provided,
//                 ...(state.isDisabled && {
//                   cursor: "not-allowed",
//                   opacity: 0.99,
//                   backgroundColor: "#f3f4f6", // Add background color
//                 }),
//               }),
//             }}
//             classNamePrefix="select"
//           />
//         </div>
//         <div>
//           <Label className="text-base ml-6" htmlFor="quantity">
//             Quantity
//           </Label>
//           <Input
//             ref={quantityRef}
//             className="w-[95%] ml-6 text-base"
//             id="quantity"
//             placeholder="Enter quantity"
//             type="number"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end mt-4 gap-4 px-8">
//         <Button
//           variant="outline"
//           onClick={() => {
//             setSelectedProduct(null);
//             quantityRef.current.value = "";
//           }}
//         >
//           Clear
//         </Button>
//         <Button onClick={handleAddToCart} disabled={isAddToCartDisabled}>
//           Add to Cart
//         </Button>
//       </div>
//     </>
//   );
// }

// export default InputForm;































































// import React, { useRef, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useAtom } from "jotai";
// import { cartAtom, productsAtom } from "../../utils/atoms";
// import api from "../../utils/api";
// import Select from "react-select";

// function InputForm() {
//   const productRef = useRef();
//   const quantityRef = useRef();
//   const [cart, setCart] = useAtom(cartAtom);
//   const [products, setProducts] = useAtom(productsAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsError(false);
//         setIsLoading(true);
//         const response = await api.get("/api/product");
//         setProducts(response?.data);
//       } catch (err) {
//         setIsError(true);
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedProduct && quantityRef.current.value > 0) {
//       setIsAddToCartDisabled(false);
//     } else {
//       setIsAddToCartDisabled(true);
//     }
//   }, [selectedProduct, quantityRef]);

//   if (isLoading && products.length < 0) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   const handleAddToCart = () => {
//     const productName = selectedProduct ? selectedProduct.label : "";
//     const quantity = parseInt(quantityRef.current.value);
//     const availableQuantity = selectedProduct ? selectedProduct.Quantity : 0;

//     if (selectedProduct && quantity > 0) {
//       if (quantity > availableQuantity) {
//         alert(`Only ${availableQuantity} items are available in stock for ${productName}`);
//         return;
//       }

//       const newItem = {
//         id: selectedProduct.value,
//         product: productName,
//         price: selectedProduct.price,
//         quantity,
//       };
//       setCart((prevCart) => [...prevCart, newItem]);
//       setSelectedProduct(null);
//       quantityRef.current.value = "";
//     }
//   };

//   return (
//     <>
//       <div className="grid gap-4">
//         <div>
//           <br />
//           <Label className="text-base ml-6" htmlFor="product">
//             Product
//           </Label>
//           <Select
//             ref={productRef}
//             className="w-[95%] ml-6"
//             id="product"
//             options={products
//               .filter(product => product.Quantity > 0)
//               .map(product => ({
//                 value: product.id,
//                 label: product.ProductName,
//                 price: product.selling_price,
//                 Quantity: product.Quantity,
//                 isOutOfStock: product.Quantity === "0",
//               }))}
//             onChange={setSelectedProduct}
//             value={selectedProduct}
//             placeholder="Select product"
//             isSearchable
//             getOptionLabel={(option) => `${option.label} ${option.isOutOfStock ? "(Out of Stock)" : ""}`}
//             styles={{
//               option: (provided, state) => ({
//                 ...provided,
//                 ...(state.data.isOutOfStock && {
//                   cursor: "not-allowed",
//                   opacity: 0.5,
//                 }),
//               }),
//             }}
//             classNamePrefix="select"
//           />
//         </div>
//         <div>
//           <Label className="text-base ml-6" htmlFor="quantity">
//             Quantity
//           </Label>
//           <Input
//             ref={quantityRef}
//             className="w-[95%] ml-6 text-base"
//             id="quantity"
//             placeholder="Enter quantity"
//             type="number"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end mt-4 gap-4 px-8">
//         <Button
//           variant="outline"
//           onClick={() => {
//             setSelectedProduct(null);
//             quantityRef.current.value = "";
//           }}
//         >
//           Clear
//         </Button>
//         <Button onClick={handleAddToCart} disabled={isAddToCartDisabled}>
//           Add to Cart
//         </Button>
//       </div>
//     </>
//   );
// }

// export default InputForm;



































































// import React, { useRef, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useAtom } from "jotai";
// import { cartAtom, productsAtom } from "../../utils/atoms";
// import api from "../../utils/api";
// import Select from "react-select";

// function InputForm() {
//   const productRef = useRef();
//   const quantityRef = useRef();
//   const [cart, setCart] = useAtom(cartAtom);
//   const [products, setProducts] = useAtom(productsAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsError(false);
//         setIsLoading(true);
//         const response = await api.get("/api/product");
//         setProducts(response?.data);
//       } catch (err) {
//         setIsError(true);
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedProduct && quantityRef.current.value > 0) {
//       setIsAddToCartDisabled(false);
//     } else {
//       setIsAddToCartDisabled(true);
//     }
//   }, [selectedProduct, quantityRef]);

//   if (isLoading && products.length < 0) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   const handleAddToCart = () => {
//     const productName = selectedProduct ? selectedProduct.label : "";
//     const quantity = parseInt(quantityRef.current.value);
//     const availableQuantity = selectedProduct ? selectedProduct.Quantity : 0;

//     if (selectedProduct && quantity > 0) {
//       if (quantity > availableQuantity) {
//         alert(`Only ${availableQuantity} items are available in stock for ${productName}`);
//         return;
//       }

//       const newItem = {
//         id: selectedProduct.value,
//         product: productName,
//         price: selectedProduct.price,
//         quantity,
//       };
//       setCart((prevCart) => [...prevCart, newItem]);
//       setSelectedProduct(null);
//       quantityRef.current.value = "";
//     }
//   };

//   return (
//     <>
//       <div className="grid gap-4">
//         <div>
//           <br />
//           <Label className="text-base ml-6" htmlFor="product">
//             Product
//           </Label>
//           <Select
//             ref={productRef}
//             className="w-[95%] ml-6"
//             id="product"
//             options={products.map((product) => ({
//               value: product.id,
//               label: product.ProductName,
//               price: product.selling_price,
//               Quantity: product.Quantity,
//               isOutOfStock: product.Quantity === "0",
//               className: product.Quantity === "0" ? "cursor-not-allowed opacity-50" : "",
//             }))}
//             onChange={setSelectedProduct}
//             value={selectedProduct}
//             placeholder="Select product"
//             isSearchable
//             // isDisabled={(option) => `${option.label} ${option.isOutOfStock ? true : false}`}
//             getOptionLabel={(option) => `${option.label} ${option.isOutOfStock ? "(Out of Stock)" : ""}`}
//             styles={{
//               option: (provided, state) => ({
//                 ...provided,
//                 ...(state.data.isOutOfStock && {
//                   cursor: "not-allowed",
//                   opacity: 0.5,
//                 }),
//               }),
//             }}
//             classNamePrefix="select"
//           />
//         </div>
//         <div>
//           <Label className="text-base ml-6" htmlFor="quantity">
//             Quantity
//           </Label>
//           <Input
//             ref={quantityRef}
//             className="w-[95%] ml-6 text-base"
//             id="quantity"
//             placeholder="Enter quantity"
//             type="number"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end mt-4 gap-4 px-8">
//         <Button
//           variant="outline"
//           onClick={() => {
//             setSelectedProduct(null);
//             quantityRef.current.value = "";
//           }}
//         >
//           Clear
//         </Button>
//         <Button onClick={handleAddToCart} disabled={isAddToCartDisabled}>
//           Add to Cart
//         </Button>
//       </div>
//     </>
//   );
// }

// export default InputForm;




















































































































































// import React, { useRef, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useAtom } from 'jotai';
// import { cartAtom, productsAtom } from "../../utils/atoms";
// import api from "../../utils/api";
// import Select from 'react-select';

// function InputForm() {
//   const productRef = useRef();
//   const quantityRef = useRef();
//   const [cart, setCart] = useAtom(cartAtom);
//   const [products, setProducts] = useAtom(productsAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsError(false);
//         setIsLoading(true);
//         const response = await api.get('/api/product');
//         setProducts(response?.data);
//       } catch (err) {
//         setIsError(true);
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading && products.length < 0) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>
//   }

//   const handleAddToCart = () => {
//     const productName = selectedProduct ? selectedProduct.label : '';
//     const quantity = parseInt(quantityRef.current.value);
//     const availableQuantity = selectedProduct ? selectedProduct.Quantity : 0;

//     if (selectedProduct && quantity > 0) {
//       if (quantity > availableQuantity) {
//         alert(`Only ${availableQuantity} items are available in stock for ${productName}`);
//         return;
//       }

//       const newItem = { id: selectedProduct.value, product: productName, price: selectedProduct.price, quantity };
//       setCart((prevCart) => [...prevCart, newItem]);
//       setSelectedProduct(null);
//       quantityRef.current.value = "";
//     }
//   };

//   return (
//     <>
//       <div className="grid gap-4">
//         <div>
//           <br />
//           <Label className="text-base ml-6" htmlFor="product">
//             Product
//           </Label>
//           <Select
//             ref={productRef}
//             className="w-[95%] ml-6"
//             id="product"
//             options={products.map(product => ({
//               value: product.id,
//               label: product.ProductName,
//               price: product.selling_price,
//               Quantity: product.Quantity,
//               isOutOfStock: product.Quantity === "0"
//             }))}
//             onChange={setSelectedProduct}
//             value={selectedProduct}
//             placeholder="Select product"
//             isSearchable
//             getOptionLabel={option => `${option.label} ${option.isOutOfStock ? '(Out of Stock)' : ''}`}
//           />
//         </div>
//         <div>
//           <Label className="text-base ml-6" htmlFor="quantity">
//             Quantity
//           </Label>
//           <Input
//             ref={quantityRef}
//             className="w-[95%] ml-6 text-base" // Apply the same font and size as Product
//             id="quantity"
//             placeholder="Enter quantity"
//             type="number"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end mt-4 gap-4 px-8">
//         <Button onClick={handleAddToCart}>Add to Cart</Button>
//       </div>
//     </>
//   );
// }

// export default InputForm;






























































// import React, { useRef, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useAtom } from 'jotai';
// import { cartAtom, productsAtom } from "../../utils/atoms";
// import api from "../../utils/api";
// import Select from 'react-select';

// function InputForm() {
//   const productRef = useRef();
//   const quantityRef = useRef();
//   const [cart, setCart] = useAtom(cartAtom);
//   const [products, setProducts] = useAtom(productsAtom);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsError(false);
//         setIsLoading(true);
//         const response = await api.get('/api/product');
//         setProducts(response?.data);
//       } catch (err) {
//         setIsError(true);
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading && products.length < 0) {
//     return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>
//   }

//   const handleAddToCart = () => {

// console.log("??????????????????product",products)




//     const productName = selectedProduct ? selectedProduct.label : '';
//     const quantity = parseInt(quantityRef.current.value);
//     if (selectedProduct && quantity > 0) {
//       const newItem = { id: selectedProduct.value, product: productName, price: selectedProduct.price, quantity };
//       setCart((prevCart) => [...prevCart, newItem]);
//       setSelectedProduct(null);
//       quantityRef.current.value = "";
//     }
//   };

//   return (
//     <>
//       <div className="grid gap-4">
//         <div>
//           <br />
//           <Label className="text-base ml-6" htmlFor="product">
//             Product
//           </Label>
//           <Select
//             ref={productRef}
//             className="w-[95%] ml-6"
//             id="product"
//             options={products.map(product => ({ value: product.id, label: product.ProductName, price: product.selling_price }))}
//             onChange={setSelectedProduct}
//             value={selectedProduct}
//             placeholder="Select product"
//             isSearchable
//           />
//         </div>
//         <div>
//           <Label className="text-base ml-6" htmlFor="quantity">
//             Quantity
//           </Label>
//           <Input
//             ref={quantityRef}
//             className="w-[95%] ml-6 text-base" // Apply the same font and size as Product
//             id="quantity"
//             placeholder="Enter quantity"
//             type="number"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end mt-4 gap-4 px-8">
//         <Button onClick={handleAddToCart}>Add to Cart</Button>
//       </div>
//     </>
//   );
// }

// export default InputForm;
