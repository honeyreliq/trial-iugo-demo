<template>
  <v-btn-toggle
    v-bind="$attrs"
    v-on="$listeners"
    :active-class="activeClass"
    borderless
    v-model="currentValue"
    @change="$emit('input', currentValue)"
  >
    <slot/>
  </v-btn-toggle>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'BaseButtonGroup',
    props: {
      activeClass: {
        type: String,
        default: 'primary white--text',
      },
      value: String,
    },
    data(): any {
      return {
        // The prop is copied to a local data value
        // because it may be mutated, and child components
        // should not mutate parent props.
        // Vuetify is a little finicky with other solutions.
        currentValue: this.value,
      };
    },
  });
</script>
