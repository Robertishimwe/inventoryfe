import React from "react";
import InputForm from "../components/pos/InputForm";
import Cart from "../components/pos/Cart";
import { Card } from "@/components/ui/card"

function Pos() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <InputForm />
          <Cart />
        </Card>
      </main>
    </>
  );
}

export default Pos;
