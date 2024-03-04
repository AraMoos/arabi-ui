<script setup lang="ts">
import { ref } from 'vue';
import { Action, ActionsBar, Table, Button } from '../components';
import { TableColumn, SelectQuery } from '~/components/Table/types';

export type User = {
  id?: number
  name?: string
  age?: number
};

const tableColumns = ref<TableColumn[]>([
  { label: 'Id', key: 'id', sortable: false },
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Age', key: 'age', sortable: true },
  { label: 'Actions', key: 'action', sortable: false },
]);
const array = Array.from({ length: 50 }, () => {
  return { name: 'Mostafa ARABI', id: `${Math.floor(Math.random() * 10000000000)}`, age: Math.floor(Math.random() * 80) + 20 };
});
const users = ref(array);


const handleClick = (item: User) => {
  alert(`you are gonna edit ${item.name}`);
};

const handleSelect = (selectQuery: SelectQuery) => {
  alert(`${selectQuery.all}\n\r ${selectQuery.included.join(';')}\n\r ${selectQuery.excluded.join(';')}\n\r`);
};

const handleSort = (columns: TableColumn[]) => {
  let sort = '';
  for (const column of columns) {
    sort += `${column.label} ${column.order}\n\r`;
  }
  alert(sort);
};
</script>

<template>
  <Table :table-columns="tableColumns" :items="users" selectable @on-select="handleSelect" @on-sort="handleSort">
    <template #action="item">
      <ActionsBar gap="8px">
        <Action icon="edit-2" @click="handleClick(item)" />
        <Action icon="ly-delete" variant="danger" />
      </ActionsBar>
    </template>
  </Table>
</template>