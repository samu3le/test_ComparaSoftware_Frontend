<template>
  <TableCustom
    :data="getAllState.data || []"
    :meta="getAllState.meta || {}"
    :columns="getAllState.COLUMNS"
    @update-data="getAll"
    @update-per-page="updatePerPage"
    @update-page="updatePage"
  >
    <template v-slot:callback="{ data, field, row }">
      <template v-if="field === 'is_active'">
        <span v-if="data">Activo</span>
        <span v-else>Inactivo</span>
      </template>
      <template v-else-if="field === 'actions'">
        <Button
          text="Editar"
          icon="fa-solid fa-pencil"
          bg-color="info"
          @click="edit(row)"
        />
        <Button
          text="Eliminar"
          icon="fa-solid fa-trash"
          bg-color="danger"
          @click="deleteItem(row)"
        />
      </template>
      <template v-else>
        {{ data }}
      </template>
    </template>
  </TableCustom>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import TableCustom from "@/components/TableCustom.vue";
import Button from "@/components/Button.vue";

import alerts from "@/plugins/alerts.js";

import { usePeopleStore } from "@/stores/people.js";

const alert = alerts();

const peopleStore = usePeopleStore();

const { getAllState } = storeToRefs(peopleStore);
const { getAll, updatePerPage, updatePage, formSetState } = peopleStore;

const edit = (row) => {
  formSetState({
    data: row,
  });
};

const deleteItem = async (row) => {
  try {
    const res = await peopleStore.deleteItem({
      id: row.id,
    });
    if (Object.keys(res?.errors || {}).length > 0) {
      alert.fire.error({
        text: JSON.stringify(res.errors),
      });
      return;
    }
    getAll();
    alert.fire.success({
      text: res.message,
    });
  } catch (error) {
    alert.fire.error({
      text: error.errors,
    });
  }
};

onMounted(() => {
  getAll();
});
</script>
