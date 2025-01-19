import React from 'react';
import { useAuth } from 'context/AuthContext';
import Header from 'ui-component/account/Header';
import Profile from 'ui-component/account/profile';
import CommandesRestaurateur from 'ui-component/account/CommandesRestaurateur';
import ProduitsProducteur from 'ui-component/account/ProduitsProducteur';

const account = () => {
  const { auth } = useAuth();
  return (
    <>
      <Header />
      <Profile />
      {auth?.user?.role === 'restaurateur' && <CommandesRestaurateur />}
      {auth?.user?.role === 'producteur' && <ProduitsProducteur />}
    </>
  );
};

export default account;
