/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import reduxThunk from 'redux-thunk'; 
import reducers from './app/store/reducers';
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const createStoreWithMiddleware=createStore(reducers,composeEnhancers(
    applyMiddleware(reduxThunk)
))
const appRedux = ()=>{
   return(
   <Provider store={createStoreWithMiddleware}>
        <App/>
    </Provider>
   );
}
AppRegistry.registerComponent(appName, () => appRedux);