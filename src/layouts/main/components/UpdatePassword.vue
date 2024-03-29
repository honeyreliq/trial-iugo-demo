<template>
  <v-dialog v-model="passwordDialog"
            width="500">
    <template v-slot:activator="{ on, attrs }">
      <BaseButton color="primary"
        v-bind="attrs"

        v-on="on">
        {{$t('update')}}
      </BaseButton>
    </template>
    <v-card>
      <BaseToolbar :title="$t('updatePassword')">
      </BaseToolbar>
      <v-card-text>
        <v-form class="ml-1" ref="updatePasswordForm" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col class="title" cols="12">
                {{$t('currentPasswordSubtitle')}}
                <v-text-field v-model="currentPassword"
                              :append-icon="showCurrent ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showCurrent ? 'text' : 'password'"
                              full-width
                              :label="$t('currentPasswordLbl')"
                              :rules="pwdRules"
                              hide-details="auto"
                              :disabled="disableField"
                              counter
                              @click:append="showCurrent = !showCurrent"></v-text-field>
              </v-col>
              <v-col class="text-h6" cols="12">
                {{$t('newPasswordSubtitle')}}
                <v-text-field v-model="newPassword"
                              :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showNew ? 'text' : 'password'"
                              full-width
                              :label="$t('newPasswordLbl')"
                              :rules="pwdRules"
                              hide-details="auto"
                              :disabled="disableField"
                              counter
                              @click:append="showNew = !showNew"></v-text-field>
              </v-col>
              <v-col class="text-h6" cols="12">
                {{$t('confirmPasswordSubtitle')}}
                <v-text-field v-model="confirmPassword"
                              :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showConfirm ? 'text' : 'password'"
                              full-width
                              :label="$t('confirmPasswordLbl')"
                              :rules="pwdConfirm"
                              hide-details="auto"
                              :disabled="disableField"
                              counter
                              @click:append="showConfirm = !showConfirm"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-dialog v-model="success.show" persistent max-width="600px">
                  <v-card>
                    <v-card-title class="text-h5">{{$t('passwordUpdatedTitle')}}</v-card-title>
                    <v-card-text>{{$t('passwordUpdatedText')}}</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <BaseButton color="primary" @click="closeSuccessModalHandler">
                        {{$t('close')}}
                      </BaseButton>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-alert type="error" dismissible v-model="showErrorAlert" class="multi-line">
                  {{ alertMessage }}
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <BaseButton
          @click="cancelUpdatePassword">
          {{$t('cancel')}}
        </BaseButton>
        <BaseButton color="primary"
          @click="updatePassword">
          {{$t('save')}}
        </BaseButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'UpdatePassword',
    data() {
      return {
        passwordDialog: false,
        showCurrent: false,
        showNew: false,
        showConfirm: false,
        showErrorAlert: false,
        showAlert: false,
        disableField: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        alertMessage: '',
        success: {
          show: false,
        },
        pwdRules: [
          (v: string) => !!v || this.$t('passwordRequiredMsg'),
        ],
        pwdConfirm: [
          (v: string) => !!v || this.$t('confirmPwdRequiredMsg'),
          // @ts-ignore
          (v: string) => v === this.newPassword || this.$t('confirmPwdMatchMsg'),
        ],
      };
    },
    methods: {
      updatePassword(): void {
        //
      },
      cancelUpdatePassword() {
        // @ts-ignore
        this.clear();
        this.passwordDialog = false;
      },
      closeSuccessModalHandler(): void {
        this.clear();
      },
      clear(): void {
        // @ts-ignore
        this.$refs.updatePasswordForm.reset();
        this.disableField = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.success.show = false;
        this.showErrorAlert = false;
        this.alertMessage = '';
      },
    },
  });
</script>
<style lang="scss" scoped>
  .multi-line {
    white-space: pre-line;
  }
</style>
