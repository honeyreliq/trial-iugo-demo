<template>
  <v-btn
    v-on="$listeners"
    depressed
    plain
    icon
    small
    :disabled="disabled"
    v-tooltip="{
      content: tooltip,
      classes: [
        'add-tooltip',
        this.$vuetify.theme.dark ? 'theme--dark' : 'theme--light',
      ],
    }"
  >
    <fa-icon
      v-if="icon"
      v-bind="$attrs"
      :icon="['fal', icon]"
      class="fa-fw fa-button"
    />
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseIconButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: null,
    },
  },
});
</script>
<style scoped lang='sass'>
.v-icon
  font-size: 20px !important
</style>