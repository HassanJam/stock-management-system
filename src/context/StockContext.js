// src/context/StockContext.js
import React, { createContext, useState, useContext } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState([]);

    const addStock = (stock) => {
        setStocks([...stocks, stock]);
    };

    return (
        <StockContext.Provider value={{ stocks, addStock, setStocks }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStock = () => useContext(StockContext);
