import React, { useEffect } from 'react';
import Abonnement from 'ui-component/restaurateur/Abonnements';
import Chemin from 'ui-component/restaurateur/Chemin';
import Comments from 'ui-component/restaurateur/Comments';
import Landing from 'ui-component/restaurateur/Landing';
import Mission from 'ui-component/restaurateur/Mission';

const RestaurateurAccueil = () => {

  

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

export default RestaurateurAccueil;
