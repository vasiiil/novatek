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
        >Открыть последнюю закрытую</v-btn>
        <v-btn
          :disabled="!closedTabsExists"
          variant="outlined"
          @click="openAll"
        >Открыть все</v-btn>
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
            <v-window v-model="currentTab">
              <v-window-item
                v-for="tab in visibleTabs"
                :key="`tab-component-${tab.route}`"
                :value="tab.route"
              >
                <component :is="tab.component" />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITab } from '@/global'
import TabOne from '@/components/tabs/TabOne.vue'
import TabTwo from '@/components/tabs/TabTwo.vue'
import TabThree from '@/components/tabs/TabThree.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    TabOne,
    TabTwo,
    TabThree
  },
  data () {
    return {
      currentTab: 'one' as string,
      closedTabs: [] as string[],
      tabs: [
        {
          route: 'one',
          name: 'Tab One',
          visible: true,
          component: 'tab-one'
        },
        {
          route: 'two',
          name: 'Tab Two',
          visible: true,
          component: 'tab-two'
        },
        {
          route: 'three',
          name: 'Tab Three',
          visible: true,
          component: 'tab-three'
        }
      ] as ITab[]
    }
  },
  computed: {
    visibleTabs (): ITab[] {
      return this.tabs.filter(tab => tab.visible)
    },
    closedTabsExists (): boolean {
      return this.closedTabs.length > 0
    }
  },
  methods: {
    closeTab (tabId: string): void {
      const tab = this.tabs.find((tab: ITab) => tab.route === tabId)
      if (!tab) {
        return
      }
      tab.visible = false
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
  },
  beforeRouteUpdate  (to, from, next): void {
    if (to.path === '/') {
      next()
    }
    if (this.visibleTabs.length > 0) {
      const tab = this.visibleTabs.find((tab: ITab) => `/${tab.route}` === to.path)
      if (tab) {
        next()
      } else {
        next(this.visibleTabs[0].route)
      }
    }
    next('/')
  }
})
</script>

<style scoped>
.buttons--container {
  display: flex;
  justify-content: space-around;
}
</style>
