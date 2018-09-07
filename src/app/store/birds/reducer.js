import * as types from './types'

import createReducer from '../_helpers/createReducer'

export const birds = createReducer({}, {
    [types.LOAD_BIRDS_REQUEST](state, action) {
        let list = state
        list.data = []
        list.loading = true
        list.success = false
        list.error = ''
        return { list }
    },
    [types.LOAD_BIRDS_SUCCESS](state, action) {
        let list = state

        list.data = action.response
        list.loading = action.loading
        list.success = action.success
        list.error = action.error
        return { list }
    },
    [types.LOAD_BIRDS_FAILURE](state, action) {
        let list = state
        list.data = []
        list.loading = true
        list.success = false
        list.error = action.error
        return { list }
    }
})

