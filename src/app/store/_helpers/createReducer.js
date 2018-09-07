
/*
 Handling the creation of a reducer to avoid the switch
 */
export default function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action){
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}
