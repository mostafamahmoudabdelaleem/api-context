import React, { type PropsWithChildren } from 'react';
import APIProvider from './ApiContext';
import PopupProvider from './PopupContext';

const APIContextProvider: React.FC<
  PropsWithChildren<{
    BaseURL: string;
    customLoader: React.ReactNode | null;
  }>
> = ({ children, BaseURL, customLoader = null }) => {
  return (
    <PopupProvider customLoader={customLoader}>
      <APIProvider BaseURL={BaseURL}>{children}</APIProvider>
    </PopupProvider>
  );
};

export default APIContextProvider;
