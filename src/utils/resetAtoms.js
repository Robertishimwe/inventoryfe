import { loggedinUserAtom, unitsAtom, categoriesAtom, productsAtom, inventoryAtom, suppliersAtom, transactionAtom, cartAtom, usersAtom, cartItemAtom } from "./atoms";
import { useResetAtom } from 'jotai/utils';

export const resetAllAtoms = () => {
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
