<template>
  <router-view />
</template>

<!--<template>
		<p>Is it Idle? - {{ isIdle }}</p>
</template>-->

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      userPrefs: {
        currentLocale: {	
          name: 'en',
          flag: 'usFlag.png',
          label: 'English',
          title: 'English',
        },
        theme: 'lightMode',
        unit: 'imperial'
      }
    };
  },
  watch: {
    $route(to) {
      document.title = 'iUGO Care: ' + to.meta.title || 'iUGO Care';
    },
  },

  /*computed: {
		isIdle() {
			return this.$store.state.idleVue.isIdle;
		}
  },*/

  created() {
   const storedUserPrefs = JSON.parse(localStorage.getItem('userPrefs'));
   if (storedUserPrefs) {
     this.userPrefs = storedUserPrefs;
   }
   this.$i18n.locale =  this.userPrefs.currentLocale.name;
   this.$vuetify.theme.dark = this.userPrefs.theme === 'darkMode'
  //  this.unit = this.userPrefs.unit;
  },
});


</script>