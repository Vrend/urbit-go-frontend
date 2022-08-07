import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import "bootswatch/dist/litera/bootstrap.min.css";
import './index.css';
import App from './App';

const EXTERNAL_AUTH = true;

ReactDOM.render(<BrowserRouter basename="/apps/urbit-go"><App ext_auth={EXTERNAL_AUTH} /></BrowserRouter>, document.getElementById('root'));
