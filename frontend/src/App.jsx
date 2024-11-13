import React from 'react';
import InputQuery from './components/InputOutput'
import DisplayBox from './components/DisplayBox';
import { MessageProvider } from './components/MessageContext';
import './App.css'

function App() {
  return (
    <MessageProvider>
    <div className="App">
      <DisplayBox />
      <InputQuery />
    </div>
    </MessageProvider>
  );
}

export default App;
