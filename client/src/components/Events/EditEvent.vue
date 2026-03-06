<template>
  <div class="container">
    <h1>Edit Event</h1>
    <form v-on:submit.prevent = "editEvent">
      <div class="mb-3">
        <label class="form-label">Title:</label>
        <input type="text" v-model="event.title" class="form-control" placeholder="Enter event title">
      </div>

      <div class="mb-3">
        <label class="form-label">Description:</label>
        <textarea v-model="event.description" class="form-control" rows="4" placeholder="Enter event description"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Location:</label>
        <input type="text" v-model="event.location" class="form-control" placeholder="Enter event location">
      </div>

      <div class="mb-3">
        <label class="form-label">Date:</label>
        <input type="date" v-model="event.date" class="form-control">
      </div>

      <div class="mb-3">
        <label class="form-label">Organizer:</label>
        <input type="text" v-model="event.organizer" class="form-control" placeholder="Enter event organizer">
      </div>
      
      <div class="mb-3">
        <label class="form-label">Status:</label>
        <input type="text" v-model="event.status" class="form-control">
      </div>
      <p>
        <button type="submit" class="btn btn-primary">update event</button>
        <button v-on:click="navigateTo('/events')" class="btn btn-secondary">กลับ</button>
      </p>
    </form>
  </div>
</template>

<script>
import EventsService from '../../services/EventsService'

export default {
  data() {
    return {
      event: {
        title: '',
        description: '',
        location: '',
        date: '',
        organizer: '',
        status: 'saved'
      }
    }
  },
  methods: {
    async editEvent () {
      try {
        await EventsService.put(this.event)
        this.$router.push({
          name: 'events'
        })
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async created () {
    try {
      let eventId = this.$route.params.eventId // รับค่าพารามิเตอร์จาก URL [5]
      this.event = (await EventsService.show(eventId)).data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style>
