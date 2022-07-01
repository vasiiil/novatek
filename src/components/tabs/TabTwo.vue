<template>
  <v-btn variant="outlined" @click="counter++">Tab Two - {{ counter }}</v-btn>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { getTabByRouteType, setTabDataLoadedType } from '@/global'
export default defineComponent({
  name: 'TabTwo',
  setup () {
    const getTabByRoute = inject<getTabByRouteType>('getTabByRoute', s => undefined)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setTabDataLoaded = inject<setTabDataLoadedType>('setTabDataLoaded', s => {})

    return {
      getTabByRoute,
      setTabDataLoaded
    }
  },
  data () {
    return {
      counter: 0
    }
  },
  activated () {
    const tab = this.getTabByRoute('two')
    if (!tab) {
      return
    }
    if (tab.needLoad) {
      // загрузка данных с сервера или еще откуда-нибудь
      this.counter = 0
      this.setTabDataLoaded('two')
    }
  }
})
</script>

<style scoped>

</style>
