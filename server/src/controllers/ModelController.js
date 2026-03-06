const db = require('../models')

const getModels = async (req, res) => {
  try {
    // Get all model names from the database object
    const allKeys = Object.keys(db)
    console.log('All database keys:', allKeys)
    
    const modelNames = allKeys
      .filter(key => key !== 'sequelize' && key !== 'Sequelize')
      .map(modelName => ({
        name: modelName,
        route: modelName.toLowerCase() + 's' // plural form for routing
      }))
    
    console.log('Model names to return:', modelNames)
    res.json(modelNames)
  } catch (error) {
    console.error('Error in getModels:', error)
    res.status(500).json({ error: 'Failed to fetch models' })
  }
}

module.exports = {
  getModels
}
