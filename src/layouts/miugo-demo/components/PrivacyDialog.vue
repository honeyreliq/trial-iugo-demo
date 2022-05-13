<template>
  <v-dialog v-model="privacy" width="600px" @keydown.esc="privacy = false">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item @click="aboutModal = true;" v-bind="attrs" v-on="on">
      <v-list-item-icon class="mr-4 ">
        <fa-icon :icon="['fad', 'user-lock']" class="fa-fw" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ $t('privacyPolicy')}}</v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <BaseToolbar :title="$t('privacyPolicy')">
        <v-spacer></v-spacer>
        <BaseButton icon dark @click="privacy = false">
          <fa-icon :icon="['fal', 'times']" class="fa-fw" />
        </BaseButton>
      </BaseToolbar>
      <v-card-text v-html="getTranslationContent()" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <BaseButton color="primary" block @click="privacy = false">{{ $t('close')}}</BaseButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'PrivacyDialog',
    data: () => ({
      privacy: false,
      elementName: 'privacyPolicy',
    }),
    methods: {
     
    },
    computed: {
     
    },
    watch: {
      
    },
    created() {
      //
    },
    mounted() {
      //
    },
  });
</script>
