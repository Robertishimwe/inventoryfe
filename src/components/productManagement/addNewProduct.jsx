
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NewProduct() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm font-medium">Product Name</span>
            <input className="input" placeholder="Enter product name" type="text" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium">Description</span>
            <textarea className="input" placeholder="Enter product description" />
          </label>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Category</span>
            <select className="input">
              <option>Select Category</option>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Supplier</span>
            <select className="input">
              <option>Select Supplier</option>
              <option>Supplier 1</option>
              <option>Supplier 2</option>
              <option>Supplier 3</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Unit</span>
            <select className="input">
              <option>Select Unit</option>
              <option>Unit 1</option>
              <option>Unit 2</option>
              <option>Unit 3</option>
            </select>
          </div>
          <label className="flex flex-col">
            <span className="text-sm font-medium">Price(frw)</span>
            <input className="input" placeholder="Enter price" type="text" />
          </label>
          <Button className="col-span-2" size="sm">
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
    </main>
  )
}

