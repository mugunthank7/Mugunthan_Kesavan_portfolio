import React from 'react';
import Portfolio from './components/portfolio/Portfolio.jsx';

// Top-level application component. Simply renders the Portfolio
// component, which contains all of the individual sections of the
// website. Additional providers or context wrappers can be added
// here if needed in the future.
export default function App() {
  return <Portfolio />;
}