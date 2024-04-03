import { atomWithStorage } from 'jotai/utils';

export const loggedinUserAtom = atomWithStorage('loggedinUser', null);
export const unitsAtom = atomWithStorage('units', []);
export const categoriesAtom = atomWithStorage('categories', []);
export const productsAtom = atomWithStorage('products', []);
export const inventoryAtom = atomWithStorage('inventory', []);
export const suppliersAtom = atomWithStorage('suppliers', []);
export const transactionAtom = atomWithStorage('transaction', []);
export const cartAtom = atomWithStorage('cart', []);
export const usersAtom = atomWithStorage('users', []);
export const cartItemAtom = atomWithStorage('cartItem', []);
