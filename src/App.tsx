import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.global.css';
import Layout from './components/Layout';

export default function App() {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  );
}
