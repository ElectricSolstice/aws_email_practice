import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContentForm from './ContentForm';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ContentForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
