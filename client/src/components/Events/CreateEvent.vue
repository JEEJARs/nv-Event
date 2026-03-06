<template>
  <div class="container">
    <h1>Create Event</h1>
    <form v-on:submit.prevent="createEvent">
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
        <input type="text" v-model="event.status" class="form-control" placeholder="Enter event status">
      </div>

      <button type="submit" class="btn btn-primary">Create Event</button>
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
    async createEvent() {
      try {
        await EventsService.post(this.event)
        this.$router.push({
          name: 'events'
        })
      } catch (err) {
        console.log(err)
      }
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
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
