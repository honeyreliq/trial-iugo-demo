<template>
  <v-toolbar
    :color="color"
    flat
    :dark="defaultTheme"
    :light="!defaultTheme"
    v-bind="$attrs"
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <slot />
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseToolbar',
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      defaultTheme: true,
    };
  },
  mounted() {
    this.defaultTheme = this.$attrs.light === undefined;
  },
});
</script>
