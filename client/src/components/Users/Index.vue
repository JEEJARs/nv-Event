<template>
  <div>
    <h2>Get all users</h2>
    <p><button v-on:click="navigateTo('/user/create')" class="create-btn">สร้างผู้ใช้</button></p>
    <h4>จำนวนผู้ใช้งาน {{ users.length }}</h4>
    <div v-for="user in users" v-bind:key="user.id">
      <p>id: {{ user.id }}</p>
      <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>
      <p class="timestamp">Created: {{ formatDate(user.createdAt) }} | Updated: {{ formatDate(user.updatedAt) }}</p>
      <p><button v-on:click="navigateTo('/user/' + user.id)">ดูข้อมูลผู้ใช้</button></p>
      <p><button v-on:click="navigateTo('/user/edit/' + user.id)">แก้ไขข้อมูล</button></p>
      <p><button v-on:click=deleteUser(user)>ลบข้อมูล</button></p>
      <hr>
    </div>
    
    <div class="logout-section">
      <p><button v-on:click="logout" class="logout-btn">Logout</button></p>
    </div>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data
      console.log(this.users)
    } catch (error) {
      console.log(error)
    }
  },


  // Logic จะเขียนตรงนี้
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      await UsersService.delete(user)
      this.refreshData()
    },
    async refreshData() {
      this.users = (await UsersService.index()).data
    },
    logout() {
      const authenStore = useAuthenStore()
      authenStore.logout() // เรียก action logout จาก store

      this.$router.push({
        name: 'login'
      })
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
  },


};
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
