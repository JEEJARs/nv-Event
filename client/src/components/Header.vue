<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <!-- Original static menu items -->
        <li><router-link :to="{name: 'blogs'}">Blogs</router-link></li>
        <li><router-link :to="{name: 'users'}">Users</router-link></li>
        <li><router-link :to="{name: 'events'}">Events</router-link></li>
        
        <!-- Dynamic model-based menu items -->
        <li v-for="model in filteredModels" :key="model.name">
          <router-link :to="{name: model.route}">{{ model.name }}</router-link>
        </li>
        
        <li><router-link :to="{name: 'login'}">Login</router-link></li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import modelService from '../services/modelService'

export default {
  setup() {
    const models = ref([])

    const fetchModels = async () => {
      try {
        const modelsData = await modelService.getModels()
        models.value = modelsData
      } catch (error) {
        console.error('Error loading models:', error)
      }
    }

    onMounted(() => {
      fetchModels()
    })

    // Filter out models that already exist in static menu
    const filteredModels = computed(() => {
      const staticModels = ['Blog', 'User', 'Event'] // Models already in static menu
      console.log('All models:', models.value)
      console.log('Static models to filter:', staticModels)
      const filtered = models.value.filter(model => !staticModels.includes(model.name))
      console.log('Filtered models:', filtered)
      return filtered
    })

    return {
      models,
      filteredModels
    }
  }
}
</script>

<style scoped>
    .nv-navbar {
        background-color:palegoldenrod;
        width: 100%;
        padding: 10px 0px 10px 0px;
    }
    .nv-navbar .nav {
        list-style: none;
        margin:0;
        padding:0;
        float:left;
    }
    .nv-navbar .nav li {
        float:left;
    }
    .nv-navbar .nav li a {
        padding: 10px;
        text-decoration: none;
        color:gray;
        font-weight: bold;
    }
    .nv-navbar .nav li a:hover {
        padding: 10px;
        text-decoration: none;
        color:darkslategrey;
    }
    .nv-navbar .nav li a.router-link-active {
        background-color:gold;
        color:darkslategrey;
    }
    .clearfix {
        clear: left;
    }
</style>