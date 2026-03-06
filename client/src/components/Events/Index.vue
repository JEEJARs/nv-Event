<template>
  <div>
    <h2>Get all events</h2>
    <h4>จำนวน event {{ events.length }}</h4>
    
    <div v-for="event in events" v-bind:key="event.id">
      <p>id: {{ event.id }}</p>
      <p>title: {{ event.title }}</p>
      <p>description: {{ event.description }}</p>
      <p>location: {{ event.location }}</p>
      <p>date: {{ event.date }}</p>
      <p>organizer: {{ event.organizer }}</p>
      <p>
        <button v-on:click="navigateTo('/event/'+ event.id)">ดู event</button>
        <button v-on:click="navigateTo('/event/edit/'+ event.id)">แก้ไข event</button>
        <button v-on:click="deleteEvent(event)">ลบข้อมูล</button>
      </p>
      <hr>
    </div>
    
    <div class="logout-section">
      <p><button v-on:click="logout" class="logout-btn">Logout</button></p>
    </div>
  </div>
</template>

<script>
import EventsService from '../../services/EventsService'

export default {
  data () {
    return {
      events: []
    }
  },
  async created () {
    // เรียกใช้ Service เพื่อดึงข้อมูลเมื่อ Component ถูกโหลด [6]
    this.events = (await EventsService.index()).data
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setEvent', null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo (route) {
      this.$router.push(route) // สั่งเปลี่ยนหน้าด้วย Vue Router [5]
    },
    
    async deleteEvent (event) {
      let result = confirm("Want to delete?")
      if (result) {
        try {
          await EventsService.delete(event)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async refreshData() {
      this.events = (await EventsService.index()).data
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
</style>
