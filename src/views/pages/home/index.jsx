import React from 'react';
import Restaurateur from 'ui-component/home/Restaurateur';
import Description from 'ui-component/home/Description';
import Mission from 'ui-component/home/Mission';
import Produits from 'ui-component/home/Produits';
import ProducteurDescription from 'ui-component/home/ProducteurDescription';
import Producteur from 'ui-component/home/Producteur';
import Abonnement from 'ui-component/home/Abonnements';
import Comments from 'ui-component/home/Comments';

const Home = () => {
  return (
    <>
      <Restaurateur />
      <Description />
      <Mission />
      <Produits />
      <ProducteurDescription />
      <Producteur />
      <Abonnement />
      <Comments />
    </>
  );
};

export default Home;
