import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import Store from '../redux/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <Provider store={Store}>
  <DndProvider backend={HTML5Backend}>
    <App />
    </DndProvider>
  </Provider>
</React.StrictMode>,
)
