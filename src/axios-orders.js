import axios from 'axios'

// create a global base url
const instance = axios.create({
  baseURL: 'https://react-burger-builder-146be.firebaseio.com/'
})

export default instance