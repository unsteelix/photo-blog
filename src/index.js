import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes/";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
import {firebaseConfig} from "./firebaseConfig"
import * as firebase from "firebase"

firebase.initializeApp(firebaseConfig);

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)