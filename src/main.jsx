import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App/App';
import reducer from './reducers';
import gc from './constants/gameConstants';

const store = createStore(reducer, gc.COMBINED_INITIAL_STATE);

render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.body.appendChild(document.createElement('div')),
);
