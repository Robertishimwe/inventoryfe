const transformCartData = (cartData) => {
    return cartData.map((item) => {
      return {
        productId: item.id,
        amount: item.quantity,
        final_price: item.price
      };
    });
  };
export default transformCartData
