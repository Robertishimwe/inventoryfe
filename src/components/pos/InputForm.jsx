import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useAtom } from 'jotai';
import { cartAtom, productsAtom } from "../../utils/atoms";
import api from "../../utils/api";

function InputForm() {
  const productRef = useRef();
  const quantityRef = useRef();
  const [cart, setCart] = useAtom(cartAtom);
  const [products, setProducts] = useAtom(productsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

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
    const productName = productRef.current.value;
    const quantity = parseInt(quantityRef.current.value);
    const selectedProduct = products.find(product => product.product_name === productName);

    if (selectedProduct && quantity > 0) {
      const newItem = { id: selectedProduct.id, product: productName, price: selectedProduct.price, quantity };
      setCart((prevCart) => [...prevCart, newItem]);
      productRef.current.value = "";
      quantityRef.current.value = "";
    }
  };
  console.log(">>>>>>>products", products)
  console.log(">>>>>>>", cart)

  return (
    <>
      <div className="grid gap-4">
        <div>
          <br />
          <Label className="text-base ml-6" htmlFor="product">
            Product
          </Label>
          <Input
            ref={productRef}
            className="w-[95%] ml-6"
            id="product"
            list="products"
            placeholder="Enter product name or code"
            type="text"
          />
          <datalist id="products">
            {products.map(product => (
              <option key={product.id} value={product.product_name} />
            ))}
          </datalist>
        </div>
        <div>
          <Label className="text-base ml-6" htmlFor="quantity">
            Quantity
          </Label>
          <Input
            ref={quantityRef}
            className="w-[95%] ml-6"
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
