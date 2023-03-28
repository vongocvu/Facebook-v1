import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './Components/GlobalStyle';
import './Components/GlobalStyle/GlobalStyle.css'
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import stores from "./redux/stores"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={stores}>
        <BrowserRouter>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
