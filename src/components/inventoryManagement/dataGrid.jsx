"use strict";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { inventoryAtom } from "../../utils/atoms";
import api from "../../utils/api";

import TopUpPopUp from "./topUp";

const GridExample = () => {
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isTopUpPopupOpen, setIsTopUpPopupOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const productRef = useRef(null);
  const quantityRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/stock/getAllStock");
        const transformedData = transformData(response.data.stock);
        setInventory(transformedData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error);
      }
    };

    fetchData();
  }, [setInventory]);

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/dashboard/inventory/addNew");
  };

  const handleTopUpClick = (inventoryItem) => {
    setSelectedInventory(inventoryItem);
    setIsTopUpPopupOpen(true);
  };

  const handleTopUpFormSubmit = async (event) => {
    event.preventDefault();

    const product = productRef.current.value;
    const quantity = quantityRef.current.value;
    // {
    //   "productId": 3,
    //   "amount": 700,
    //   "buying_price": 200,
    //   "selling_price": 250,
    //   "supplier_id": 2
    // },

    console.log("Product:", product);
    console.log("Quantity:", quantity);

    // Your form submission logic here, e.g., making an API request to update the stock

    setIsTopUpPopupOpen(false);
  };

  const transformData = useMemo(() => {
    return (data) =>
      data.map((item) => ({
        ID: item.product?.id,
        Product: item.product?.product_name,
        Category: item.product?.productCategory?.name,
        Stock: parseInt(item.quantity),
        Buying_Price: parseFloat(item?.buying_price),
        Selling_Price: parseFloat(item?.selling_price),
        Unit: item.product?.unit?.unit_name,
        Reorder_Stock_Level: parseInt(item.minimumStockLevel),
        Stock_In_Cash: parseInt(item.quantity) * parseFloat(item?.buying_price),
        Last_Re_Stock_Date: `${new Date(item.lastRestockDate).getDate()}/${(
          new Date(item.lastRestockDate).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${new Date(item.lastRestockDate).getFullYear()}`,
      }));
  }, []);

  const columnDefs = useMemo(
    () => [
      { field: "ID", checkboxSelection: false, editable: false },
      { field: "Product" },
      { field: "Category" },
      { field: "Stock", filter: "agNumberColumnFilter" },
      { field: "Buying_Price", filter: "agNumberColumnFilter" },
      { field: "Selling_Price", filter: "agNumberColumnFilter" },
      { field: "Unit" },
      { field: "Reorder_Stock_Level", filter: "agNumberColumnFilter" },
      { field: "Stock_In_Cash", filter: "agNumberColumnFilter" },
      { field: "Last_Re_Stock_Date", filter: "agDateColumnFilter" },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
    }),
    []
  );

  if (isLoading) {
    return (
      <p className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        Loading...
      </p>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      className="ag-theme-quartz gap-4 p-4 md:gap-8 md:p-6"
      style={{ height: "89vh" }}
    >
      <div className="flex gap-2 pb-4">
        {/* <Button className="ml-auto" size="sm" onClick={handleAdd}>
          Add New
        </Button>
        <Button
          className="ml-2"
          size="sm"
          onClick={handleTopUpClick}
          disabled={selectedInventory === null}
        >
          Top Up
        </Button> */}
      </div>
      <AgGridReact
        rowData={inventory}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="single"
        suppressRowClickSelection={false}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100, 200, 500, 1000]}
        onCellClicked={(params) => handleTopUpClick(params.data)}
      />
      {isTopUpPopupOpen && (
        <TopUpPopUp
          setIsTopUpPopupOpen={setIsTopUpPopupOpen}
          selectedInventory={selectedInventory}
        />
      )}
    </div>
  );
};

export default GridExample;
