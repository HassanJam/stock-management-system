// NavbarContext.js
import React, { createContext, useState, useContext } from 'react';

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [navbarTitle, setNavbarTitle] = useState('Stock Management');

  return (
    <NavbarContext.Provider value={{ navbarTitle, setNavbarTitle }}>
      {children}
    </NavbarContext.Provider>
  );
};
