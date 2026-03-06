import Api from '../services/Api'

export default {
  index (search) {
    return Api().get('events')
  },
  show (eventId) {
    return Api().get('event/' + eventId)
  },
  post (event) {
    return Api().post('event', event)
  },
  put (event) {
    return Api().put('event/' + event.id, event)
  },
  delete (event) {
    return Api().delete('event/' + event.id)
  }
}
