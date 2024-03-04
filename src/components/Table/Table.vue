<script setup lang="ts" generic="T">
import { ref, useSlots, watch } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { TableColumn, SelectQuery } from './types';
import { CheckBox } from '~/components';
import { Caret } from './local';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const props = withDefaults(defineProps<{
  tableColumns?: Array<TableColumn>
  items?: Array<T>
  selectable?: boolean
  uniqueKey?: string
}>(), {
  tableColumns: () => [],
  items: () => [],
  uniqueKey: 'id',
});

const emit = defineEmits(['onSelect', 'ScrollEnded', 'onSort']);

const selectedItems = ref<string[]>([]);
const unSelectedItems = ref<string[]>([]);
const sortColumns = ref<TableColumn[]>([]);
const selectAll = ref(false);
const cols = ref(props.tableColumns.length);

const slots = useSlots();

const handleSort = (column: TableColumn) => {
  if (!column.sortable) {
    return false;
  }
  let override = sortColumns.value;
  const index = override.findIndex((col) => col.key === column.key);
  if (index > -1) {
    let col = override[index];
    switch (col.order) {
      case 'asc':
        col.order = 'desc';
        break;
      case 'desc':
        override.splice(index, 1);
    }
  } else {
    column.order = 'asc';
    override.push(column);
  }
  sortColumns.value = override;
  emit('onSort', override);
};

const activeOrder = (key: string) => {
  const column = sortColumns.value.find((col) => col.key === key);
  if (column) {
    return column.order;
  }
  return 'none';
};
const setSelected = (all: boolean, included: string[], excluded: string[]) => {
  const selectQ: SelectQuery = {
    all: all,
    included: included,
    excluded: excluded
  };
  emit('onSelect', selectQ);
};

const handleSelectAll = (value: boolean) => {
  let override: string[] = [];
  if (value) {
    for (const item of props.items) {
      override.push(item[props.uniqueKey]);
    }
  }
  selectedItems.value = override;
  unSelectedItems.value = [];
  setSelected(value, [], []);
};

const handleSelect = (value: boolean, id: string) => {
  let overrideSelected = selectedItems.value;
  let overrideUnselected = unSelectedItems.value;
  if (value) {
    overrideSelected.push(id);
    let index = overrideUnselected.indexOf(id);
    if (index > -1) {
      overrideUnselected.splice(index, 1);
    }
  } else {
    let index = overrideSelected.indexOf(id);
    selectAll.value && overrideUnselected.push(id);
    if (index > -1) {
      overrideSelected.splice(index, 1);
    }
  }
  selectedItems.value = overrideSelected;
  unSelectedItems.value = overrideUnselected;
  setSelected(selectAll.value, selectAll.value ? [] : overrideSelected, selectAll.value ? overrideUnselected : []);
};

const checkedRow = (id: string) => {
  return selectedItems.value.includes(id);
};

const handleScroll = async (event: Event) => {
  const e = event.target as HTMLElement;
  const scrollHeight = e.scrollHeight;
  const scrollTop = e.scrollTop;
  const clientHeight = e.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight) {
    emit('ScrollEnded');
  }
};

watch(() => props.items, (newItems) => {
  let overrideUnselected = unSelectedItems.value;
  let overrideSelected = selectedItems.value;
  if (selectAll.value) {
    for (const item of newItems) {
      const id = item[props.uniqueKey];
      let index = overrideSelected.indexOf(id);
      if (overrideUnselected.includes(id) === false && index === -1) {
        overrideSelected.push(id);
      }
    }
  }
  selectedItems.value = overrideSelected;
});
</script>

<template>
  <div class="table">
    <div class="thead">
      <div v-if="selectable" class="checkbox" role="th">
        <CheckBox v-model="selectAll" @on-change="handleSelectAll" />
      </div>
      <div v-for="(column, index) in tableColumns"
           :key="index"
           role="th"
           :class="[{ 'th-sortable': column.sortable }, activeOrder(column.key)]"
           @click="handleSort(column)"
      >
        <span class="th-label">{{ column.label }}</span>
        <span v-if="column.sortable" class="th-sort">
          <Caret :active="activeOrder(column.key) === 'asc'" class="up" />
          <Caret :active="activeOrder(column.key) === 'desc'" />
        </span>
      </div>
    </div>
    <DynamicScroller :items="items" :min-item-size="30" class="scroller" @scroll="handleScroll">
      <template #default="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" :data-index="index">
          <div class="row">
            <div v-if="selectable" role="td" class="checkbox">
              <CheckBox :checked="checkedRow(item[uniqueKey])" @on-change="handleSelect($event, item[uniqueKey])" />
            </div>
            <div v-for="(column, i) in tableColumns" :key="i" role="td">
              <template v-if="slots[column.key]">
                <slot :name="column.key" v-bind="item" />
              </template>
              <span v-else class="td-label">{{ item[column.key] }}</span>
            </div>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<style scoped lang="scss">
.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;

  .scroller {
    flex: 1;
    overflow-y: auto
  }

  .thead,
  .row {
    display: grid;
    grid-template-columns: to-rem(50) repeat(v-bind(cols), 1fr);
    width: 100%;

    [role="th"],
    [role="td"] {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      padding: 10px;
      column-gap: 10px;
      color: color('dark-90');

      &.checkbox {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: 80%;
          transform: translateY(-50%);
          background-color: color('dark-40');
        }
      }
    }
  }

  .thead {
    border-radius: 7px 7px 0 0;
    background-color: color('dark-10');
    user-select: none;

    [role="th"] {
      font: font(lg);

      &.th-sortable {
        position: relative;
        cursor: pointer;

        >* {
          position: relative;
          z-index: 2;
        }

        &::before {
          content: '';
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border: 1px solid color('dark-10');
          background-color: transparent;

          @include transition-(200);
        }

        &:hover,
        &.desc,
        &.asc {
          &::before {
            background-color: color('dark-20');
          }
        }

        .th-sort {
          display: flex;
          flex-direction: column;
          row-gap: 5px;
          padding: 0 3px;
          cursor: pointer;

          .up {
            transform: rotate(180deg);
          }
        }
      }
    }

  }

  .row {
    &:nth-child(even) {
      background-color: rgba((color('dark-10')), 40%);
    }

    [role="td"] {
      border-top: 1px solid color('dark-40');
      font: font(lg-200);
    }
  }

}
</style>