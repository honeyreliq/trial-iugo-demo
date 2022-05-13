import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { demo } from './demo/index';
import { settings } from './settings/index';


Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '5.0.1',
  },
  modules: {
    demo,
    settings
  },
};

export default new Vuex.Store<RootState>(store);
