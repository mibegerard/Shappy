import React from 'react';
import DetailsProduits from 'ui-component/cart/DetailsProduits';
import Header from 'ui-component/cart/Header';
import Products from 'ui-component/cart/Products';

const cart = () => {
  return (
    <>
      <Header />
      <Products />
      <DetailsProduits />
    </>
  );
};

export default cart;
