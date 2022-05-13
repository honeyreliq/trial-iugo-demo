<template>
  <v-dialog :value="value"
            @input="$emit('input')"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            id="user-settings">
    <v-card fixed color="var(--v-background-base)">
      <BaseToolbar :title="$t('accountAndProfile')" tile>
        <v-spacer></v-spacer>
        <BaseButton icon dark @click.native="$emit('input')">
          <fa-icon :icon="['fal', 'times']" class="fa-fw" />
        </BaseButton>
      </BaseToolbar>

      <v-row no-gutters>
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-list flat nav color="transparent">
            <!-- <v-list-item-group color="darkerGrey" mandatory v-model="selectedOptionLocal">
              <v-list-item key="0">
                <v-list-item-icon>
                  <fa-icon :icon="['fad', 'user-circle']" class="fa-fw" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{$t('account')}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item key="1">
                <v-list-item-icon>
                  <fa-icon :icon="['fad', 'address-card']" class="fa-fw" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{$t('profile')}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group> -->
          </v-list>
        </v-col>
        <v-col cols="12" sm="12" md="9" lg="6">
          <div id="account-section">
            <v-card-title class="justify-left">
              <span class="text-h5" id="account">{{$t('account')}}</span>
            </v-card-title>
            <v-card-text>
              <BaseCard>
                <v-row no-gutters class="mb-4">
                  <v-col class="text-h6" cols="auto">{{$t('email')}}</v-col>
                  <v-spacer />
                  <v-col cols="auto">
                    <UpdateEmail></UpdateEmail>
                  </v-col>
                  <v-col class="text-subtitle-1" cols="12">{{(currentPatient)?currentPatient.emailAddress:null}}</v-col>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <v-divider />
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-col class="text-h6" cols="auto">{{$t('password')}}</v-col>
                  <v-spacer />
                  <v-col cols="auto">
                    <UpdatePassword></UpdatePassword>
                  </v-col>
                </v-row>
              </BaseCard>
            </v-card-text>
          </div>
          <div id="profile-section">
            <v-card-title class="justify-left">
              <span class="text-h5" id="profile">{{$t('profile')}}</span>
            </v-card-title>
            <v-card-subtitle class="pb-0">
              <span class="text-h6">{{$t('personalInformation')}}</span>
            </v-card-subtitle>
            <v-card-text>
              <BaseCard>
                <v-row no-gutters class="mb-4">
                  <v-text-field name="fullName"
                                :label="$t('patientNameTitle')"
                                :value="fullName"
                                readonly
                                class="custom"></v-text-field>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-text-field :label="$t('phone')" :value="(currentPatient)?currentPatient.phone:null" readonly></v-text-field>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-text-field name="birthDate" :label="$t('birthDate')" :value="birthDate" readonly></v-text-field>
                </v-row>

                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <v-divider />
                  </v-col>
                </v-row>

                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <span class="text-h6">{{$t('emergencyContact')}}</span>
                  </v-col>
                </v-row>

                <v-row no-gutters class="mb-4">
                  <v-text-field :label="$t('name')" value="" readonly></v-text-field>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-text-field :label="$t('relationship')" value="" readonly></v-text-field>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-text-field :label="$t('phone')" :value="contactPhone" readonly></v-text-field>
                </v-row>
              </BaseCard>
            </v-card-text>

            <v-card-subtitle class="pb-0">
              <span class="text-h6">{{$t('medicalInformation')}}</span>
            </v-card-subtitle>
            <v-card-text>
              <BaseCard>
                <!-- <v-row v-if="profile != null && profile.patientPrograms != null">
                  <v-row v-for="(program, i) in profile.patientPrograms" :key="i">
                    <v-col cols="12">
                      <v-row no-gutters class="mb-4">
                        <v-col cols="12">
                          <span class="sustitle-1">{{$t('careManagementPrograms')}}</span>
                        </v-col>
                        <v-col cols="12" v-for="(item, i) in program.careManagementPrograms" :key="i">
                          <span class="title">{{item.name}}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row> -->
              </BaseCard>
            </v-card-text>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <BaseButton color="primary" @click.native="$emit('input')">{{$t('close')}}</BaseButton>
          </v-card-actions>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import UpdatePassword from './UpdatePassword.vue';
// @ts-ignore
import UpdateEmail from './UpdateEmail.vue';

import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo);

export default Vue.extend({
  name: 'UserSettings',
  props: ['value', 'selectedOption'],
  data(): any {
    return {
      component: {
        scrollTransitionTime: 1, // always 1, 0 is the default time
      },
    };
  },
  methods: {

  },
  computed: {
    
  },
  watch: {
    
  },
  components: {
    UpdatePassword,
    UpdateEmail,
  },
  created(): void {
   //
  },
});
</script>
<style>
  .v-dialog > .v-card > .v-toolbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .v-dialog > .v-card .v-list {
    position: sticky;
    top: 65px;
    z-index: 998;
  }
</style>

