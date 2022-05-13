<template>
  <v-menu
    :close-on-click="closeOnClick"
    bottom
    left
    offset-y
    origin="top right"
    transition="scroll-y-transition"
    min-width="140"
    
  >
    <template v-slot:activator="{ on, attrs }">
      <!-- <BaseButton v-bind="attrs" v-on="on" class="mr-2" v-if="!checkMobile"> -->
      <BaseButton v-bind="attrs" v-on="on" class="mr-2">
        <fa-icon :icon="['far', 'plus']" class="fa-fw fa-button" />
      </BaseButton>
    </template>

    <v-list flat>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click.stop=""
      >
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
// import { isMobile } from 'mobile-device-detect';

export default Vue.extend({
  name: 'CustomListMenu',
  data(): any {
    return {
      items: [
        { title: 'createList' },
        { title: 'editList' },
        { title: 'deleteList' },
        { title: 'manageList' },
      ],
      closeOnClick: true,
    };
  },
  // mounted () {
  //   this.onResize();
  // },
  methods: {
  //   onResize () {
  //     console.log(isMobile);
  //   },
    // checkMobile() {
    //   return isMobile;
    // }
  },
});
</script>
