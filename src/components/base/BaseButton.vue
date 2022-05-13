<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :color="color"
    depressed
    :disabled="disabled"
  >
    <span>
      <slot />
    </span>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseButton',
  props: {
    color: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
