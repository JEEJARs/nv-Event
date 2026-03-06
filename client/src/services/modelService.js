import axios from 'axios'

const API_URL = 'http://localhost:3000'

const getModels = async () => {
  try {
    const response = await axios.get(`${API_URL}/models`)
    console.log('Models fetched:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching models:', error)
    return []
  }
}

export default {
  getModels
}
