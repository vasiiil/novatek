<template>
  <v-btn variant="outlined" @click="counter++">Tab One - {{ counter }}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TabOne',
  data () {
    return {
      counter: 0
    }
  }
})
</script>

<style scoped>

</style>
