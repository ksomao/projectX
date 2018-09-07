import API from '../../lib/api'

export const birdServices = {
    getBirds() {
        return API.get('/birds')
    },
    createBird(bird) {
        return API.post('/birds', bird)
    },
    getBird(id) {
        return API.get(`/birds/${id}`)
    }
}
