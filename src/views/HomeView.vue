<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/novatek.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="12" class="buttons--container">
        <v-btn
          :disabled="!closedTabsExists"
          variant="outlined"
          @click="openLastClosed"
        >Открыть последнюю закрытую
        </v-btn>
        <v-btn
          :disabled="!closedTabsExists"
          variant="outlined"
          @click="openAll"
        >Открыть все
        </v-btn>
      </v-col>

      <v-col
        cols="12"
      >
        <v-card>
          <v-tabs
            v-model="currentTab"
            background-color="deep-purple-accent-4"
            :stacked="true"
          >
            <v-tab
              v-for="tab in visibleTabs"
              :key="`tab-${tab.route}`"
              :value="`${tab.route}`"
              :to="`${tab.route}`"
            >
              {{ tab.name }}
              <v-icon @click.stop.prevent="closeTab(tab.route)">mdi-close-box</v-icon>
            </v-tab>
          </v-tabs>
          <v-card-text>
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component
                  :is="Component"
                />
              </keep-alive>
            </router-view>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'
import { getTabByRouteType, ITab, setTabDataLoadedType } from '@/global'

export default defineComponent({
  name: 'HomeView',
  setup () {
    const tabs: ITab[] = reactive([
      {
        route: 'one',
        name: 'Tab One',
        visible: true,
        needLoad: true
      },
      {
        route: 'two',
        name: 'Tab Two',
        visible: true,
        needLoad: true
      },
      {
        route: 'three',
        name: 'Tab Three',
        visible: true,
        needLoad: true
      }
    ])

    const getTabByRoute: getTabByRouteType = (route) => tabs.find((tab: ITab) => tab.route === route)
    const setTabDataLoaded: setTabDataLoadedType = (route) => {
      const tab = getTabByRoute(route)
      if (!tab) {
        return
      }
      tab.needLoad = false
    }

    provide('getTabByRoute', getTabByRoute)
    provide('setTabDataLoaded', setTabDataLoaded)

    return {
      tabs
    }
  },
  data () {
    return {
      currentTab: '' as string,
      closedTabs: [] as string[]
    }
  },
  computed: {
    visibleTabs (): ITab[] {
      return this.tabs.filter(tab => tab.visible)
    },
    visibleTabsExists (): boolean {
      return this.visibleTabs.length > 0
    },
    closedTabsExists (): boolean {
      return this.closedTabs.length > 0
    }
  },
  watch: {
    $route (to) {
      if (to.path === '/') {
        if (this.visibleTabsExists) {
          this.$router.push(this.visibleTabs[0].route)
        }
        return
      }
      if (this.visibleTabsExists) {
        const tab = this.visibleTabs.find((tab: ITab) => `/${tab.route}` === to.path)
        if (!tab) {
          this.$router.back()
        }
      } else {
        this.$router.push('/')
      }
    }
  },
  methods: {
    closeTab (tabId: string): void {
      const tab = this.tabs.find((tab: ITab) => tab.route === tabId)
      if (!tab) {
        return
      }
      tab.visible = false
      tab.needLoad = true
      this.closedTabs.push(tabId)
      if (tabId !== this.currentTab) {
        return
      }
      if (this.visibleTabs.length === 0) {
        this.$router.push('/')
        return
      }
      this.$router.push(this.visibleTabs[0].route)
    },
    openLastClosed (): void {
      if (!this.closedTabsExists) {
        return
      }
      const tabId: string = this.closedTabs.pop() as string
      const tab = this.tabs.find((tab: ITab) => tab.route === tabId)
      if (!tab) {
        return
      }
      tab.visible = true
      this.currentTab = tabId
      this.$router.push(this.currentTab)
    },
    openAll (): void {
      if (!this.closedTabsExists) {
        return
      }
      for (const tab of this.tabs) {
        tab.visible = true
      }
      this.closedTabs = []
      this.$router.push(this.currentTab)
    }
  }
})
</script>

<style scoped>
.buttons--container {
  display: flex;
  justify-content: space-around;
}
</style>
