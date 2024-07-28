import React from 'react';
import Abonnement from 'ui-component/producteurhome/Abonnements';
import Chemin from 'ui-component/producteurhome/Chemin';
import Comments from 'ui-component/producteurhome/Comments';
import Landing from 'ui-component/producteurhome/Landing';
import Mission from 'ui-component/producteurhome/Mission';

const ProducteurAccueil = () => {
  return (
    <>
      <Landing />
      <Mission />
      <Chemin />
      <Abonnement />
      <Comments />
    </>
  );
};

export default ProducteurAccueil;
