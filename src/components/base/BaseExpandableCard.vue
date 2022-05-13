<template>
  <v-expansion-panels v-bind="$attrs" v-model="expandedCard" flat class="base-expansion-panel">
    <v-expansion-panel :class="color">
      <v-expansion-panel-header :color="headerColor">
        <template v-slot:actions>
          <v-btn small icon class="pointer" :disabled="disableCard">
            <fa-icon :icon="['far', 'chevron-down']" class="fa-fw fa-list" />
          </v-btn>
        </template>

        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-space-between">
              <span>
                <span class="mr-4" :class="headerClass">{{ title }}</span>
                <span class="text-subtitle-2 mr-4"><slot name="header-start"/></span>
              </span>
              <span class="mr-4 d-flex flex-wrap" v-if="!open"><slot name="header-end"/></span>
              <span class="mr-4 d-flex flex-wrap" v-if="open"><slot name="header-end-open"/></span>
            </v-col>
            <v-col cols="12">
              <div v-if="!open">
                <slot name="header-excerpt" />
              </div>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ExpandableCard',
  data() {
    return {
      expandedCard: this.expanded ? 0 : null,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    headerColor: {
      type: String,
      default: '',
    },
    headerClass: {
      type: String,
      default: 'text-h6',
    },
    disableCard: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
});
</script>