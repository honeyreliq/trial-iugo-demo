<template>
  <v-breadcrumbs :dark="dark" class="base-breadcrumbs" v-bind:class="[margin, padding, {'white--text': dark}]" v-bind="$attrs" :items="breadcrumbs">
    <template v-slot:divider v-if="breadcrumbs && icon">
      <fa-icon :icon="['fal', icon]" class="fa-fw" />
    </template>
  </v-breadcrumbs> 
</template>

<script lang="ts">
export default {
  name: 'BaseBreadcrumb',
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null,
    },
    breadcrumbs: {
      type: Array,
    },
    icon: {
      type: String,
      default: null
    },
    margin: {
      type: String,
      default: 'ma-0',
    },
    padding: {
      type: String,
      default: 'pa-0',
    },
  },
  data(): any {
    return {
      
    }
  },
};
</script>
<style lang="scss">
ul.base-breadcrumbs li {
  padding-bottom: 0px !important;
}
</style>
