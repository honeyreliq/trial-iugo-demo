<template>
  <v-card
      v-bind="$attrs"
      v-bind:class="margin"
      :color="color"
      flat
  >
    <section :class="headClass">
      <v-card-title 
        v-if="title" v-bind:class="['text-h6', titlePadding]">{{ title }}
        </v-card-title>
      <v-card-subtitle v-if="subtitle" v-bind:class="['text-subtitle-2', subtitlePadding]">{{ subtitle }}</v-card-subtitle>
      <v-divider v-if="(title || subtitle) && divider"></v-divider>
    </section>
    <section :class="bodyClass">
      <v-card-text v-if="$slots['default']" class="pa-4">
        <slot/>
      </v-card-text>
    </section>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BaseCard',

  props: {
    color: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    margin: {
      type: String,
      default: 'mb-4',
    },
    divider: {
      type: Boolean,
      default: false,
    },
    headClass: {
      type: String,
      default: '',
    },
    bodyClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    subtitlePadding() {
      // if there's no divider and no body content
      if (!this.divider && this.$slots['default']) {
        return 'pb-0';
      }
      return '';
    },
    titlePadding() {
      // if there's a divider, subtitle, or body content
      if (this.divider || this.subtitle || !this.$slots['default']) {
        return 'pb-4';
      // if there's no subtitle
      } else if (!this.subtitle) {
        return 'pb-0';
      }
      return '';
    }
  },
});
</script>
