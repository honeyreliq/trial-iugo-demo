<template>
  <v-speed-dial
    v-model="addButton"
    bottom
    right
    hover
    v-bind="positionBindings"
    direction="top"
    transition="slide-y-reverse-transition"
    class="add-speed-dial mb-4 mr-4"
  >
    <template v-slot:activator>
      <BaseButton
        v-bind="$attrs"
        v-on="$listeners"
        v-model="addButton"
        color="primary"
        dark
        fab
        x-large
        elevation="4"
      >
        <fa-icon v-if="addButton" :icon="['fal', 'times']" class="fa-fw" />
        <fa-icon v-else :icon="['fal', 'plus']" class="fa-fw" />
      </BaseButton>
    </template>
    <BaseButton
      v-for="item in items"
      :key="item.title"
      fab
      dark
      :color="item.color"
      elevation="4"
      @click.stop="openDialog(item.handle)"
      v-tooltip="{
        content: item.tooltip,
        placement: 'left',
        classes: [
          'add-tooltip',
          $vuetify.theme.dark ? 'theme--dark' : 'theme--light',
        ],
        offset: 10,
      }"
    >
      <fa-icon :icon="['fad', item.icon]" class="fa-fw" />
    </BaseButton>
  </v-speed-dial>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseSpeedDial',
  data(): any {
    return {
      addButton: false,
    };
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          title: undefined,
          icon: undefined,
          tooltip: undefined,
          color: undefined,
          handle: undefined,
        };
      },
    },
    items: Array,
    color: {
      type: String,
      default: null,
    },
    tooltip: {
      type: Array,
      default: (): Array<any> => [],
    },
  },
  methods: {
    openDialog(openDialogHandler: string) {
      this.$root.$emit('openDialog', openDialogHandler);
    },
  },
  computed: {
    positionBindings() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {
          // absolute: true,
          fixed: true,
        };
      }
      return {
        fixed: true,
      };
    },
  },
});
</script>

// <style lang="scss" scoped>

// .v-speed-dial {
//   position: absolute;
// }
// .v-btn--floating {
//   position: relative;
// }
// </style>
