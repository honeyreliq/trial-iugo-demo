<template>
  <v-row class="pa-2">
    <v-col cols="auto" class="pa-0 flex-grow-0 mr-2">
      <v-chip small label color="lightGrey darken-1" class="black--text">
        {{ timeSummary }}
      </v-chip>
    </v-col>
    <v-col cols="auto" class="pa-0 flex-grow-1 mr-2">
      <span class="d-flex justify-space-between mb-1">
        <v-chip small label color="primary" dark class="mr-1">
          {{ formatSecondsToMinutes(timeSpent) }}
        </v-chip>
        <v-chip
          v-if="timeTarget"
          small
          label
          color="naturalGrey lighten-1"
          dark
        >
          {{ formatSecondsToMinutes(timeTarget - timeSpent) }}
        </v-chip>
      </span>
      <v-progress-linear
        v-if="timeTarget"
        color="primary"
        background-color="naturalGrey lighten-1"
        height="8"
        :value="(timeSpent / timeTarget) * 100"
        striped
        class="rounded-xl"
      ></v-progress-linear>
    </v-col>
    <v-col cols="auto" class="pa-0 flex-grow-0">
      <v-chip small label outlined color="primary" class="mr-1 mb-4x">{{
        formatSecondsToMinutes(timeTarget)
      }}</v-chip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { formatSecondsToMinutes } from '@/common/utils/datetime-helpers';

export default Vue.extend({
  name: 'BaseProgressTime',
  props: {
    timeSpent: {
      type: Number,
      default: 0,
    },
    timeTarget: {
      type: Number,
      default: 0,
    },
    timeSummary: {
      type: String,
      default: '',
    },
  },
  methods: {
    formatSecondsToMinutes,
  },
});
</script>
