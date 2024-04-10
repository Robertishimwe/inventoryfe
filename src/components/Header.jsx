import { Link, useNavigate } from "react-router-dom"
import { loggedinUserAtom, unitsAtom, categoriesAtom, productsAtom, inventoryAtom, suppliersAtom, transactionAtom, cartAtom, usersAtom, cartItemAtom } from "../utils/atoms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

import { useResetAtom } from 'jotai/utils';

function Header() {

  const resetLoggedinUser = useResetAtom(loggedinUserAtom);
  const resetUnits = useResetAtom(unitsAtom);
  const resetCategories = useResetAtom(categoriesAtom);
  const resetProducts = useResetAtom(productsAtom);
  const resetInventory = useResetAtom(inventoryAtom);
  const resetSuppliers = useResetAtom(suppliersAtom);
  const resetTransaction = useResetAtom(transactionAtom);
  const resetCart = useResetAtom(cartAtom);
  const resetUsers = useResetAtom(usersAtom);
  const resetCartItem = useResetAtom(cartItemAtom);

  const resetAllAtoms = () => {
    resetLoggedinUser();
    resetUnits();
    resetCategories();
    resetProducts();
    resetInventory();
    resetSuppliers();
    resetTransaction();
    resetCart();
    resetUsers();
    resetCartItem();
  }

  const handleLogout = () => {
    resetAllAtoms();
    window.location.reload(); // refresh the page
  };

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
    <Link className="lg:hidden" href="#">
      <Package2Icon className="h-6 w-6" />
      <span className="sr-only">Home</span>
    </Link>
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
          <Input className="hidden" />
        </div>
      </form>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <img
            alt="Avatar"
            className="rounded-full"
            height="32"
            src="./green.jpg"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  )
}

function Package2Icon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    )
  }

export default Header