import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppRouter from './routers';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
