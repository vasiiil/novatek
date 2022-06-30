<template>
  <v-btn variant="outlined" @click="counter++">Tab Three - {{ counter }}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TabThree',
  data () {
    return {
      counter: 0
    }
  }
})
</script>

<style scoped>

</style>
