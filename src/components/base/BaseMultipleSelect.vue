<template>
  <v-col cols="12">
    <v-combobox
      v-model="selectedItems"
      :label="label"
      :items="items"
      multiple
      hide-details="auto"
      flat
      allow-overflow
      :readonly="readonly"
      v-bind="$attrs"
      class="multiSelect"
    >
    
      <template v-slot:selection="{ item }">
        <v-chip
          :input-value="item"
          :key="item.id"
          color="naturalGrey"
          text-color="white"
          :close="!readonly"
          :small="smallChips"
          @click:close="remove(item)"
          label
        >
          <strong> {{ item.text }}</strong>
        </v-chip>
      </template>
    
    </v-combobox>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseMultipleSelect',
  props: {
    label: String,
    items: {
      type: Array,
    },
    smallChips: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: (): Array<any> => [],
    },
  },
  data(): any {
    return {
      selectedItems: [...this.selected],
    };
  },
  methods: {
    remove(option: any) {
      this.selectedItems.splice(this.selectedItems.indexOf(option), 1);
    },
  },
  watch: {
    selectedItems(): void {
      this.$emit('update:selected', [ ...this.selectedItems]);
    }
  },
});
</script>

<style lang="scss" scoped>
::v-deep .multiSelect.v-input--is-label-active .v-select__slot {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>