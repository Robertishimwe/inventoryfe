const transformCartData = (cartData) => {
    return cartData.map((item) => {
      return {
        productId: item.id,
        amount: item.quantity,
      };
    });
  };
export default transformCartData
