<template>
  <div>
    <h1>Show Event</h1>
    <p>id: {{ event.id }}</p>
    <p>title: {{ event.title }}</p>
    <p>description: {{ event.description }}</p>
    <p>location: {{ event.location }}</p>
    <p>date: {{ event.date }}</p>
    <p>organizer: {{ event.organizer }}</p>
    <p>status: {{ event.status }}</p>
    <p>
      <button v-on:click="navigateTo('/event/edit/'+ event.id)">แก้ไข event</button>
      <button v-on:click="navigateTo('/events')">กลับ</button>
    </p>
  </div>
</template>

<script>
import EventsService from '../../services/EventsService'

export default {
  data () {
    return {
      event: null
    }
  },
  async created () {
    try {
      let eventId = this.$route.params.eventId
      this.event = (await EventsService.show(eventId)).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
  }
}
</script>
<style scoped>
</style>
