<template>
  <v-img v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-img>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseLinkedImage',
});
</script>
