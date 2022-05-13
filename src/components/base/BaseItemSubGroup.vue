<template>
  <BaseItemGroup
    :item="item"
    text
    :prepend-icon="item.icon"
    sub-group
    append-icon="mdi-menu-down"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseItemSubGroup',
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          avatar: undefined, // TODO: change to "icon"?
          group: undefined,
          title: undefined,
          children: [],
        };
      },
    },
  },
});
</script>
