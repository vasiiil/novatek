<template>
  <v-btn variant="outlined" @click="counter++">Tab Two - {{ counter }}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TabTwo',
  data () {
    return {
      counter: 0
    }
  }
})
</script>

<style scoped>

</style>
