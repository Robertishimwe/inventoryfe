import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAtom } from 'jotai';
import { cartAtom, productsAtom } from "../../utils/atoms";
import api from "../../utils/api";
import Select from 'react-select';

function InputForm() {
  const productRef = useRef();
  const quantityRef = useRef();
  const [cart, setCart] = useAtom(cartAtom);
  const [products, setProducts] = useAtom(productsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await api.get('/api/product/getAll');
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

  if (isLoading && products.length < 0) {
    return <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  const handleAddToCart = () => {
    const productName = selectedProduct ? selectedProduct.label : '';
    const quantity = parseInt(quantityRef.current.value);
    if (selectedProduct && quantity > 0) {
      const newItem = { id: selectedProduct.value, product: productName, price: selectedProduct.price, quantity };
      setCart((prevCart) => [...prevCart, newItem]);
      setSelectedProduct(null);
      quantityRef.current.value = "";
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
            options={products.map(product => ({ value: product.id, label: product.product_name, price: product.price }))}
            onChange={setSelectedProduct}
            value={selectedProduct}
            placeholder="Select product"
            isSearchable
          />
        </div>
        <div>
          <Label className="text-base ml-6" htmlFor="quantity">
            Quantity
          </Label>
          <Input
            ref={quantityRef}
            className="w-[95%] ml-6 text-base" // Apply the same font and size as Product
            id="quantity"
            placeholder="Enter quantity"
            type="number"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 gap-4 px-8">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </>
  );
}

export default InputForm;
