import * as types from './types'
import {birdServices} from './services'

export const loadBirds = () => {
    return {
        types: [types.LOAD_BIRDS_REQUEST, types.LOAD_BIRDS_SUCCESS, types.LOAD_BIRDS_FAILURE],
        shouldCallAPI: state => state.birds.list.data.length === 0,
        callAPI: birdServices.getBirds
    }
}

export const addBird = bird => {
    return {
        types: [types.ADD_BIRD_REQUEST, types.ADD_BIRD_SUCCESS, types.ADD_BIRD_FAILURE],
        callAPI: birdServices.createBird(bird) 
    }
}