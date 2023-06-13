import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'


console.log("render app freessh redux");

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
)
