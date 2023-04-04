<template>
  <div>
    <h1>Gestion des séances</h1>
    <form @submit.prevent="addSession">
      <input v-model="newSession.start_time" type="text" placeholder="Start time (e.g. 21:00)" />
      <input
        v-model="newSession.date"
        type="datetime-local"
        placeholder="Date et heure (ex. 2023-04-01T21:00:00)"
      />
      <input
        v-model="newSession.theater_id"
        type="text"
        placeholder="Theater ID (e.g. 617154fba22aa4072fcffebc)"
      />
      <input
        v-model="newSession.movie_id"
        type="text"
        placeholder="Movie ID (e.g. 6171532f163aa845d80414f2)"
      />
      <button type="submit">Add session</button>
    </form>
    <ul>
      <li v-for="session in sessions" :key="session._id">
        <div v-if="!session.editing">
          <span>ID de Séance :{{ session._id }}</span> <br />
          <span>ID du Film :{{ session.movie_id }}</span> <br />
          <span>ID de la Salle :{{ session.theater_id }}</span> <br />
          <span>Heure de début :{{ session.start_time }}</span> <br />
          <span>Date de la séance :{{ session.date }}</span> <br />
          <button @click="editSession(session)">Edit</button>
        </div>
        <div v-if="session.editing">
          <span>ID de Séance :{{ session._id }}</span> <br />
          <input v-model="session.theater_id" type="text" placeholder="Theater ID" /><br />
          <input v-model="session.movie_id" type="text" placeholder="Movie ID" /><br />
          <input
            v-model="session.start_time"
            type="text"
            placeholder="Start time (e.g. 20:00)"
          /><br />
          <input v-model="session.date" type="text" placeholder="Date (e.g. 2023-01-21)" /><br />
          <button @click="saveSession(session)">Save</button>
          <button @click="cancelEdit(session)">Cancel</button>
        </div>
        <button @click="deleteSession(session._id)">Delete</button>
      </li>
    </ul>
    <div>
      <button v-if="currentPage > 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ pageCount }}</span>
      <button v-if="currentPage < pageCount" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      sessions: [],
      currentPage: 1,
      sessionsPerPage: 10,
      totalSessions: 0,
      newSession: {
        movie_id: '',
        theater_id: '',
        date: '',
        start_time: ''
      }
    }
  },
  created() {
    this.getSessions()
  },
  methods: {
    // Get sessions based on current page and sessions per page
    getSessions() {
      const skip = (this.currentPage - 1) * this.sessionsPerPage
      axios
        .get(`http://localhost:8081/sessions?skip=${skip}&limit=${this.sessionsPerPage}`)
        .then((response) => {
          this.sessions = response.data
          // Update total number of sessions
          this.totalSessions = response.headers['x-total-count']
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // Go to previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.getSessions()
      }
    },
    // Go to next page
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++
        this.getSessions()
      }
    },
    addSession() {
      // Convert date to Date object
      const dateObj = new Date(this.newSession.date)

      // Format date as YYYY-mm-ddTHH:MM:ssZ
      const formattedDate = dateObj.toISOString()

      // Set formatted date on newSession object
      this.newSession.date = formattedDate
      axios
        .post('http://localhost:8081/sessions', this.newSession)
        .then((response) => {
          this.sessions.unshift(response.data)
          this.newSession = {
            movie_id: '',
            theater_id: '',
            date: '',
            start_time: ''
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    deleteSession(sessionId) {
      axios
        .delete(`http://localhost:8081/sessions/${sessionId}`)
        .then((response) => {
          this.sessions = this.sessions.filter((session) => session._id !== sessionId)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    toggleEdit(session) {
      session.editing = !session.editing
    },
    editSession(session) {
      // set editing flag
      session.editing = true
    },
    saveSession(session) {
      axios
        .put(`http://localhost:8081/sessions/${session._id}`, session)
        .then((response) => {
          // Toggle editing flag back to false
          this.toggleEdit(session)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    cancelEdit(session) {
      // Reset the session data to the original values
      const originalSession = this.sessions.find((s) => s._id === session._id)
      Object.assign(session, originalSession)
      // Reset the edit flag
      session.editing = false
    },
    updateSession(session) {
      axios
        .put(`http://localhost:8081/sessions/${session._id}`, session)
        .then((response) => {
          session.editing = false
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getSessionById(sessionId) {
      return this.sessions.find((session) => session._id === sessionId)
    }
  },
  // Computed property for total number of pages
  computed: {
    pageCount() {
      return Math.ceil(this.totalSessions / this.sessionsPerPage)
    }
  }
}
</script>
