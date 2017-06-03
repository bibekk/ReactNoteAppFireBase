import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
//importing bootstrap css that was installed later by npm
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
