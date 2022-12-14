import React from 'react';
import { APIContextProvider } from 'react-native-api-context';
import Page from './Page';

export default function App() {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  return (
    <APIContextProvider BaseURL={BASE_URL}>
      <Page />
    </APIContextProvider>
  );
}
