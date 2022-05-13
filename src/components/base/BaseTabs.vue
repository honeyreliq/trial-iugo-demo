<template>
  <div ref="tabs" v-resize="onResize">
    <!-- confirmed as working on the div.  -->
    <v-select
      :value="activeTab"
      @change="updateSelectList"
      :items="items"
      item-text="label"
      return-object
      hide-details="true"
      single-line
      :label="$t('selectTab')"
      class="hidden-sm-and-up pt-0"
    >
      <template v-slot:item="{ item }">
        <span v-if="item.type === TAB_TYPES.SYSTEM" v-text="$t(item.label)" />
        <span v-else v-text="item.label" />
        <v-spacer />
        <v-badge
          v-if="item.badge"
          inline
          :content="item.badge"
          class="ml-1"
          :color="
            $vuetify.theme.dark ? 'lightGrey naturalGrey--text' : 'naturalGrey'
          "
        ></v-badge>
      </template>
      <template v-slot:selection="{ item }">
        <span v-if="item.type === TAB_TYPES.SYSTEM" v-text="$t(item.label)" />
        <span v-else v-text="item.label" />
        <v-badge
          v-if="item.badge"
          inline
          :content="item.badge"
          class="ml-1"
          :color="
            $vuetify.theme.dark ? 'lightGrey naturalGrey--text' : 'naturalGrey'
          "
        ></v-badge>
      </template>
    </v-select>

    <v-tabs
      :value="activeTab.label"
      hide-slider
      :fixed-tabs="fixedTabs"
      :color="$vuetify.theme.dark ? 'lightGrey naturalGrey--text' : 'darkGrey'"
      show-arrows
      background-color="transparent"
      class="content-filter hidden-xs-only"
    >
      <v-tab
        v-for="(tab, i) in tabs"
        :value="tab.label"
        :href="'#' + tab.label"
        :key="tab.label"
        :tabindex="i"
        :to="tab.to"
        :ref="`tab-${i}`"
        @click="updateActiveTab(tab)"
        class="mr-2 rounded"
      >
        <template v-if="tab.label === 'dashboard'">
          <fa-icon :icon="['fad', 'analytics']" class="fa-fw" />
        </template>
        <template v-else>
          <span class="text-no-wrap text-truncate">
            <span v-if="tab.type === TAB_TYPES.SYSTEM" v-text="$t(tab.label)" />
            <span v-else v-text="tab.label" />
          </span>
          <v-badge
            v-if="tab.badge"
            inline
            :content="tab.badge"
            class="ml-1"
            :color="
              $vuetify.theme.dark
                ? 'lightGrey naturalGrey--text'
                : 'naturalGrey'
            "
          ></v-badge>
        </template>
      </v-tab>

      <v-menu
        v-if="more.length"
        bottom
        offset-y
        origin="bottom left"
        transition="slide-y-transition"
        min-width="200"
      >
        <template v-slot:activator="{ on }">
          <BaseButton text class="rounded px-4" v-on="on">
            More
            <fa-icon
              right
              dark
              :icon="['fas', 'caret-down']"
              class="fa-fw fa-button ml-2"
            />
          </BaseButton>
        </template>

        <v-list class="backgroundX" v-if="showMore">
          <v-list-item
            v-for="list in more"
            :key="list.label"
            @click="addCustomTab(list)"
          >
            <v-list-item-content>
              <v-list-item-title
                v-if="list.type === TAB_TYPES.SYSTEM"
                v-text="$t(list.label)"
              />
              <v-list-item-title v-else v-text="list.label" />
            </v-list-item-content>
            <v-list-item-icon>
              <v-badge
                v-if="list.badge"
                inline
                :content="list.badge"
                :color="
                  $vuetify.theme.dark
                    ? 'lightGrey naturalGrey--text'
                    : 'naturalGrey'
                "
              ></v-badge>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ITabItem } from '@/common/interfaces/index';
import { TAB_TYPES } from '@/common/data/tab-constants';
// @ts-ignore
import variables from '@/sass/variables.scss';

export default Vue.extend({
  name: 'BaseTabs',
  props: {
    activeTab: {
      type: Object as () => ITabItem,
      default: () => ({} as ITabItem),
    },
    items: {
      type: Array as () => Array<ITabItem>,
      default: Array<ITabItem>(),
    },
    fixedTabs: {
      type: Boolean,
      default: false,
    },
    showMore: {
      type: Boolean,
      default: false,
    },
  },
  data(): any {
    return {
      searchExpanded: false,
      tabs: [],
      more: [],
    };
  },
  created() {
    // must assign to instance to have access in template
    this.TAB_TYPES = TAB_TYPES;
  },
  mounted() {
    if (this.showMore) {
      this.$nextTick(() => {
        this.onResize();
      });
    } else {
      this.tabs = this.items;
    }
  },
  methods: {
    addCustomTab(tab: any): void {
      const visibleTabs = this.tabs.slice(0, -1);
      visibleTabs.push(tab);

      const hiddenTabs = this.items.slice(visibleTabs.length - 1);

      if (hiddenTabs.indexOf(tab) >= 0)
        hiddenTabs.splice(hiddenTabs.indexOf(tab), 1);

      this.tabs = [...visibleTabs];
      this.more = [...hiddenTabs];
      this.updateSelectList(tab);
    },
    selectTab(tab: any): void {
      this.updateActiveTab(tab);
    },
    onResize(): void {
      if (this.showMore) {
        const { visibleTabs, hiddenTabs } = this.fixedTabs
          ? this.filterVisibleTabsForFixedWidth()
          : this.filterVisibleTabsForNonFixedWidth();

        this.tabs = visibleTabs;
        this.more = hiddenTabs;
      }
    },
    filterVisibleTabsForFixedWidth() {
      const temp = [...this.items];

      const visibleTabs = temp.splice(
        0,
        this.$refs.tabs.clientWidth /
          (variables.tabsItemMinWidthValue * 2 + variables.spacerValue * 2) -
          1
      );
      if (visibleTabs.indexOf(this.activeTab) < 0) {
        visibleTabs.push(...temp.splice(temp.indexOf(this.activeTab), 1));
      }
      const hiddenTabs = [...temp];

      return { visibleTabs: visibleTabs, hiddenTabs: hiddenTabs };
    },
    /**
     * Assumes that all items are visible, then removes them
     * one at a time starting from the end of the list
     * so long as the total width of all tabs is greater than
     * the width of the container holding them.
     * 
     * NOTE: This has only been tested on the patient charts page,
     * it may not work on other pages that have both the 'plus' button
     * as well as the search button.
     */
    filterVisibleTabsForNonFixedWidth() {
      const visibleTabs: ITabItem[] = [...this.items];
      const hiddenTabs: ITabItem[] = [];
      const existingTabs = Object.entries(this.$refs)
        .filter((ref: any) => ref[0].includes('tab-'))
        .map((ref: any) => {
          return { name: ref, width: ref[1][0].$el.clientWidth };
        });

      // This is an arbitrary number set through manual testing and hard-coded to the patient charts page.
      const moreAndSearchButtonWidths = 175;  
      const containerWidth = this.$refs.tabs.clientWidth - moreAndSearchButtonWidths;
      let totalWidth = existingTabs.reduce(
        (acc: number, curr: any) => acc + curr.width,
        0
      );

      while (totalWidth >= containerWidth) {
        const tab = existingTabs.pop();
        hiddenTabs.unshift(visibleTabs.pop());
        totalWidth -= tab.width;
      }

      return { visibleTabs: visibleTabs, hiddenTabs: hiddenTabs };
    },
    updateActiveTab(tab: any): void {
      this.$emit('update:activeTab', tab);
    },
    navigateToTab(tab: ITabItem) {
      this.$router.push(tab.to);
    },
    updateSelectList(event: any): void {
      if (event && event.to) {
        this.navigateToTab(event);
      } else if (event && event.label) {
        this.updateActiveTab(event);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
// this workaround can be removed when we update to the lastest version of Vuetify 2x
.v-tabs-bar
  > .v-slide-group__wrapper
  > .v-tabs-bar__content
  > .v-tab:first-of-type {
  margin-left: unset !important;
}
</style>