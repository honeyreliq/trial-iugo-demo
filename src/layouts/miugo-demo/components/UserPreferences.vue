<template>
  <v-dialog :value="value" @input="$emit('input')" width="600px" @keydown.esc="prefModal = false">
    <!-- <v-card color="var(--v-background-base)">

      <v-toolbar dark flat fixed color="primary">
        <v-toolbar-title>{{ $t('preferences') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <BaseButton icon dark @click.native="$emit('input')">
          <fa-icon :icon="['fal', 'times']" class="fa-fw" />
        </BaseButton>
      </v-toolbar>

      <v-row no-gutters>
        <v-col cols="12">
          <v-card-title class="pb-0">
            <span class="mr-2 light"><fa-icon :icon="['fad', 'cog']" class="fa-fw" /></span>
            <span class="text-h6">{{$t('account')}}</span>
          </v-card-title>
          <v-card-text>
            <BaseCard>
              <v-row no-gutters class="mb-4">
                <v-col class="text-h6" cols="auto" sm="12" md="4">{{ $t('language') }}</v-col>
                <v-spacer />
                <v-col cols="auto" sm="12" md="8">
                  <v-select v-model="currentLocale"
                      :items="locales"
                      item-text="title"
                      return-object
                      single-line
                      @change="updateLanguage()"
                      menu-props="auto" filled dense hide-details
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-4">
                <v-col cols="12">
                  <v-divider />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-h6" cols="auto">{{ $t('tooltips') }}</v-col>
                <v-spacer />
                <v-col cols="auto">
                  <v-switch v-model="tooltips" class="ma-0 pa-0"
                    @change="savePrefereces()" hide-details />
                </v-col>
                <v-col
                  class="text-subtitle-2"
                  cols="12"
                >{{ $t('tooltipsDescription') }}</v-col>
              </v-row>
            </BaseCard>
          </v-card-text>

          <v-card-title class="pb-0">
            <span class="mr-2 light"><fa-icon :icon="['fad', 'palette']" class="fa-fw" /></span>
            <span class="text-h6">{{$t('theme')}}</span>
          </v-card-title>
          <v-card-text>
            <BaseCard>
              <v-row no-gutters>
                <v-radio-group v-model="theme" dense hide-details class="ma-0 pa-0"
                  @change="changeTheme()">
                  <v-radio :label="$t('lightMode')" value="lightMode"></v-radio>
                  <v-radio :label="$t('darkMode')" value="darkMode"></v-radio>
                </v-radio-group>
              </v-row>
            </BaseCard>
          </v-card-text>

          <v-card-title class="pb-0">
            <span class="mr-2 light"><fa-icon :icon="['fad', 'calendar-edit']" class="fa-fw" /></span>
            <span class="text-h6">{{$t('dateAndTimePreferences')}}</span>
          </v-card-title>
          <v-card-text>
            <BaseCard>
              <v-row no-gutters class="mb-4">
                <v-col class="text-h6" cols="auto" sm="12" md="4">{{ $t('timeZone') }}</v-col>
                <v-spacer />
                <v-col cols="auto" sm="12" md="8">
                  <v-select v-model="patientTimeZone"
                    :items="timeZones"
                    item-text="timeZoneName"
                    return-object
                    single-line
                    @change="savePrefereces()"
                    menu-props="auto" filled dense hide-details
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-4">
                <v-col class="text-h6" cols="auto" sm="12" md="4">{{ $t('dateFormat') }}</v-col>
                <v-spacer />
                <v-col cols="auto" sm="12" md="8">
                  <v-select v-model="dateFormat"
                    :items="dateFormats"
                    item-text="name"
                    return-object
                    single-line
                    @change="savePrefereces()"
                    menu-props="auto" filled dense hide-details
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                  <v-col class="text-h6" cols="9">{{ $t('timeFormat') }}</v-col>
                  <v-col >
                    12 hrs
                  </v-col>
                  <v-col >
                    <v-switch v-model="timeFormat" class="ma-0 pa-0" hide-details
                    @change="savePrefereces()"/>
                  </v-col>
                  <v-col >
                    24 hrs
                  </v-col>
              </v-row>
            </BaseCard>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <BaseButton color="primary" @click.native="$emit('input')">{{$t('close')}}</BaseButton>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card> -->
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
// Mixins
import { mapMutations } from 'vuex';

export default Vue.extend({
  name: 'UserPreferences',
  props: ['value' ],

  data: () => ({
    currentPatient: null,
    currentLocale: {
      name: 'en',
      flag: 'usFlag.png',
      label: 'English',
      title: 'English',
    },
    theme: 'lightMode',
    tooltips: true,
    patientTimeZone:
    {
      timeZone: 'Etc/UTC',
      windowsTimeZone: 'UTC',
      timeZoneName: '(UTC) Coordinated Universal Time',
    },
    dateFormat: {
      name: 'MM/DD/YYYY',
      value: 'MM/dd/yyyy',
    },
    timeFormat: false,
  }),
  mounted() {
    this.$root.$on('openPreferences', this.updateForm);
  },
  methods: {
    ...mapMutations('settings', {
      setDrawer: 'SET_DRAWER',
    }),
    // ...mapMutations('patients', {
    //   setCurrentPatient: 'setCurrentPatient',
    // }),
    updateForm(): void {
      //
    },
    updateLanguage(): void {
      //
    },
    changeTheme(): void {
      //
    },
    savePrefereces(): void {
      //
    },
  },
});
</script>

