<template>
  <div>
    <h2>Get all blogs</h2>
    <h4>จำนวน blog {{ blogs.length }}</h4>
    <p><button v-on:click="navigateTo('/blog/create')" class="create-btn">สร้าง blog</button></p>
    
    <div v-for="blog in blogs" v-bind:key="blog.id">
      <p>id: {{ blog.id }}</p>
      <p>title: {{ blog.title }}</p>
      <p>content: {{ blog.content }}</p>
      <p>category: {{ blog.category }}</p>
      <p>status: {{ blog.status }}</p>
      <p class="timestamp">Created: {{ formatDate(blog.createdAt) }} | Updated: {{ formatDate(blog.updatedAt) }}</p>
      <p>
        <button v-on:click="navigateTo('/blog/'+ blog.id)">ดู blog</button>
        <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">แก้ไข blog</button>
        <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
      </p>
      <hr>
    </div>
    
    <div class="logout-section">
      <p><button v-on:click="logout" class="logout-btn">Logout</button></p>
    </div>
  </div>
</template>

<script>
import BlogsService from '../../services/BlogsService'

export default {
  data () {
    return {
      blogs: []
    }
  },
  async created () {
    // เรียกใช้ Service เพื่อดึงข้อมูลเมื่อ Component ถูกโหลด [6]
    this.blogs = (await BlogsService.index()).data
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setBlog', null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo (route) {
      this.$router.push(route) // สั่งเปลี่ยนหน้าด้วย Vue Router [5]
    },
    
    async deleteBlog (blog) {
      let result = confirm("Want to delete?")
      if (result) {
        try {
          await BlogsService.delete(blog)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async refreshData() {
      this.blogs = (await BlogsService.index()).data
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>
<style scoped>
.logout-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  text-align: center;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #c82333;
}

.timestamp {
  color: #666;
  font-size: 0.9em;
  font-style: italic;
  margin: 5px 0;
}

.create-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 15px;
}

.create-btn:hover {
  background-color: #218838;
}
</style>