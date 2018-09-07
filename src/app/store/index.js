import { combineReducers } from 'redux'
import { birds } from './birds/reducer'

import initialState from './_helpers/initialState'

export const rootReducer = combineReducers({
    birds
})

export const rootInitialState = {
    birds: {
        list : {
            ...initialState
        }
    }
}
