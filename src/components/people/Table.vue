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
      <template v-if="field === 'type_document'">
        {{ configGetAllState.data.type_documents?.[data] }}
      </template>
      <template v-else-if="field === 'gender'">
        {{ configGetAllState.data.gender?.[data] }}
      </template>
      <template v-else-if="field === 'city'">
        {{ configGetAllState.data.cities?.[data] }}
      </template>
      <template v-else-if="field === 'marital_status'">
        {{ configGetAllState.data.marital_status?.[data] }}
      </template>
      <template v-else-if="field === 'occupation'">
        {{ configGetAllState.data.occupations?.[data] }}
      </template>
      <template v-else-if="field === 'is_active'">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            :checked="data"
            @change="toggleActive(row.id, data)"
          />
        </div>
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
import { useConfigStore } from "@/stores/config.js";

const alert = alerts();

const peopleStore = usePeopleStore();
const configStore = useConfigStore();

const { getAllState } = storeToRefs(peopleStore);
const { getAll, updatePerPage, updatePage, formSetState } = peopleStore;

const { getAllState: configGetAllState } = configStore;

const edit = (row) => {
  formSetState({
    data: row,
  });
};

const toggleActive = async (id, data) => {
  try {
    await peopleStore.save({
      data: {
        id,
        is_active: !data,
      },
    });
  } catch (error) {
    alert.error(error.message);
  }
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
