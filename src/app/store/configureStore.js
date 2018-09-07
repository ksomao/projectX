import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { callApiMiddleware } from './_helpers/apiMiddleware'

import {rootReducer} from './index'
import {rootInitialState} from './index'
 
const loggerMiddleware = createLogger()


export default function configureStore() {
    return createStore(rootReducer, rootInitialState, applyMiddleware(thunkMiddleware, loggerMiddleware, callApiMiddleware))
}