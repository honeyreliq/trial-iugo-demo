<template>
  <v-list-item
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.to"
    :active-class="`primary white--text`"
    :class="item.color"
  >
    <v-list-item-icon v-if="item.icon">
      <fa-icon :icon="['fad', item.icon]" class="fa-fw" />
    </v-list-item-icon>
    <v-list-item-icon
      v-else
      class="v-list-item__icon--text text-subtitle-2 text-center"
      v-text="computedText"
    />
    <v-list-item-content v-if="item.title">
      <v-list-item-title v-text="item.title" class="text-subtitle-1" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
// Could not find a declaration file for module 'vuetify/lib/mixins/themeable'.
// '.../miugo/node_modules/vuetify/lib/mixins/themeable/index.js' implicitly has an 'any' type.
// @ts-ignore
import Themeable from 'vuetify/lib/mixins/themeable';

export default Vue.extend({
  name: 'BaseItem',
  mixins: [Themeable],
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          href: undefined,
          icon: undefined,
          title: undefined,
          to: undefined,
        };
      },
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedText() {
      if (!this.item || !this.item.title) {
        return '';
      }

      let text = '';

      this.item.title.split(' ').forEach((val: string) => {
        text += val.substring(0, 1);
      });

      return text;
    },
    href() {
      return this.item.href || (!this.item.to ? '#' : undefined);
    },
  },
});
</script>