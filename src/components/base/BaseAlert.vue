<template>
  <v-alert
    v-bind="$attrs"
    :type="type"
    dense
    outlined
    class="mb-0 mt-4 text-subtitle-1"
  >
    <span>
      <slot />
    </span>
  </v-alert>
</template>

<script>
  export default {
    name: 'BaseAlert',
    props: {
      type: {
        type: String,
        default: 'error',
      },
    },
  };
</script>
