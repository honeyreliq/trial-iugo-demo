# iUGO Care v5

This is the codebase for the front end client of the iUGO Care v5 application.

## Dev environment requirements
### Dependencies
- [Node.js](https://nodejs.org/en/download/) (includes `npm`)
- [yarn](https://classic.yarnpkg.com/en/docs/getting-started)
```
npm install --global yarn
```
#### Recommended VSCode Extensions
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) (runs on top of Prettier)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
## Project Setup
#### To install dependencies:
```
yarn install
```
#### To compile and hot-reload for development:
```
yarn serve
```
Default location is `localhost:8080`.
## Project Conventions
### Folder Structure
This is an overview of the project structure with comments inline to help illustrate the scope and purpose of each section. These structural decisions were based off of industry recommendations. 

The main areas to add code for new features will likely be in `views` and `store`, with changes to global configuration files as needed.

```bash
|-- miugo
    # project-level configuration
    |-- .gitignore
    |-- package.json
    |-- README.md
    |-- yarn.lock
    |-- ...
    # github workflows
    |-- .github
    |   |-- ...
    # public files
    |-- public
    |   |-- index.html
    |   |-- ...
    # project code
    |-- src
        # vue app-level configuration
        |-- App.vue
        |-- i18n.ts
        |-- main.ts
        |-- router.ts
        |-- ...
        |-- assets
        |   |-- MiUGO_Care.svg
            |-- ...
        # project-level utility functions and data
        |-- common
        |   |-- data
        |   |   |-- userInformation.json
        |   |   |-- settingArrayOptions.ts
                |-- ...
        |   |-- utils
        |       |-- conversion-helpers.ts
                |-- ...
        # project-level presentation components
        |-- components
        |   |-- base
        |       |-- BaseButton.vue
        |       |-- BaseCard.vue
        |       |-- BaseTimePicker.vue
        |       |-- ...
        # project-level reusable page layouts
        |-- layouts
            # main layout
        |   |-- main
        |   |   |-- AppBar.vue
        |   |   |-- Drawer.vue
        |   |   |-- MainFooter.vue
        |   |   |-- ...
                # components used only within main layout
        |   |   |-- components
        |   |       |-- AboutDialog.vue
        |   |       |-- PrivacyDialog.vue
        |   |       |-- ...
            # simple layout (used for error pages, etc.)
        |   |-- simple
        |       |-- SimpleFooter.vue
        |       |-- SimpleIndex.vue
        |       |-- SimpleView.vue
        # strings for localization
        |-- locales
        |   |-- en.json
        |   |-- es.json
        # configurations for vuetify and jest
        |-- plugins
        |   |-- base.js
        |   |-- vuetify.ts
        # vuetify style overrides
        |-- sass
        |   |-- overrides.sass
        |   |-- variables.scss
        |   |-- _appbar.sass
        |   |-- ...
        # vuex store
        |-- store
            # global export files
        |   |-- index.ts
        |   |-- mutation-types.ts
            # store for admin features
        |   |-- admin
        |       |-- activity-log
        |   |       |-- actions.ts
        |   |       |-- index.ts
        |   |       |-- ...
            # future features will have their own store
        |   |-- ...
        # views shown within layouts
        |-- views
            |-- admin
            |-- ...
            # example feature folder structure
            |-- patient-chart
            |   |-- PatientChart.vue
            |   |-- ...
            |   |-- information
                    # components only used within information section of patient chart
            |       |-- components
            |           |-- CareProgramInformation.vue
            |           |-- InsuranceInformation.vue
            |           |-- ...
                    # dialogs that only belong to information section of patient chart
            |       |-- dialogs
                        |-- UpdateCareProgramInfoDialog.vue
                        |-- ...
            |   |-- ...
            |-- ...
        |-- ...
```

### Component Structure

The structure and syntax for new Vue components follows best practices outlined in the [Vue 2 Style Guide](https://vuejs.org/v2/style-guide/) alongside requirements for [annotating return types](https://vuejs.org/v2/guide/typescript.html#Annotating-Return-Types) in TypeScript with Vue, and a few project-specific conventions.

This is meant to demonstrate a fake example component that uses all possible options, Vuex, imported methods, and more. If any of these options are irrelevant for a given new component, those options should be removed instead of being left empty.

```vue
<template>
  <!-- kebab-case for Vuetify and 3rd-party components -->
  <v-component-from-external-library>
    <!-- PascalCase for MiUGO components -->
    <InHouseComponent 
    :inHouseProp="importedHelperMethod(someData)"/>
    {{ someProp }}
  </v-component-from-external-library>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import InHouseComponent from './InHouseComponent.vue';
import SomeMixin from '@/another/path';
import importedHelperMethod from './path/to/helper-methods.ts';
import i18n from '@/i18n';

// The Vue.extend syntax is for TypeScript
export default Vue.extend({
  name: 'MyComponent',
  components: {
    InHouseComponent,
  },
  mixins: ['SomeMixin'],
  props: {
  	someProp: {
  	  type: Object,
  	  default: function() {
  	  	return {};
  	  },
  	},
  	someOtherProp: {
  	  type: any,
  	  default: null,
  	},
  },
  // The `any` return type here can be easily missed
  // but it often solves many TS-specific compiler errors
  data(): any {
  	return {
        someData: 'defaultValue',
      },
  },
  computed: {
    ...mapState('someVuexStore', ['someState']),
    someComputedData(): string {},
  },
  watch: {
    someData(newVal: any): void {},
  },
  // lifecycle hooks in the order they are called by vue instance
  // see https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
  beforeCreated() {},
  // ...
  destroyed() {},
  methods: {
    ...mapMutations('someVuexStore', {
      someLocalMethod: 'SOME_MUTATION',
    }),
    // declare imported methods 
    // to allow use within template tags
    importedHelperMethod,
  	someLocalMethod(arg: any): void {},
  },
});
</script>
```
