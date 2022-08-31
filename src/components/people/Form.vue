<template>
  <div :style="['display: flex', 'flex-direction: column']">
    <form>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>Nombre</label>
            <div>
              <input class="form-control" name="name" v-model="formData.name" />
            </div>
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <div>
              <input
                class="form-control"
                name="last_name"
                v-model="formData.last_name"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Tipo de documento</label>
            <div>
              <select class="form-select" v-model="formData.type_document">
                <option value="">Seleccione...</option>
                <option
                  v-for="(item, index) in configGetAllState.data.type_documents"
                  :key="index"
                  :value="index"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Número de documento</label>
            <div>
              <input
                class="form-control"
                name="document"
                v-model="formData.document"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <div>
              <input
                class="form-control"
                name="email"
                v-model="formData.email"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Dirección</label>
            <div>
              <textarea
                class="form-control"
                rows="3"
                v-model="formData.address"
              ></textarea>
            </div>
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <div>
              <input
                class="form-control"
                name="phone"
                v-model="formData.phone"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Genero</label>
            <div>
              <select class="form-select" v-model="formData.gender">
                <option value="">Seleccione...</option>
                <option
                  v-for="(item, index) in configGetAllState.data.gender"
                  :key="index"
                  :value="index"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label>Fecha de nacimiento</label>
            <div>
              <input
                type="date"
                class="form-control"
                name="birth_date"
                v-model="formData.birth_date"
                :max="new Date().toISOString().split('T')[0]"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Ciudad</label>
            <div>
              <select class="form-select" v-model="formData.city">
                <option value="">Seleccione...</option>
                <option
                  v-for="(item, index) in configGetAllState.data.cities"
                  :key="index"
                  :value="index"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Estado civil</label>
            <div>
              <select class="form-select" v-model="formData.marital_status">
                <option value="">Seleccione...</option>
                <option
                  v-for="(item, index) in configGetAllState.data.marital_status"
                  :key="index"
                  :value="index"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Ocupación</label>
            <div>
              <select class="form-select" v-model="formData.occupation">
                <option value="">Seleccione...</option>
                <option
                  v-for="(item, index) in configGetAllState.data.occupations"
                  :key="index"
                  :value="index"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Area</label>
            <div>
              <input class="form-control" name="area" v-model="formData.area" />
            </div>
          </div>
          <div class="form-group">
            <label>Salario</label>
            <div>
              <input
                class="form-control"
                name="salary"
                v-model="formData.salary"
                type="number"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Estado</label>
            <div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="formData.is_active"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <Button
      text="Guardar"
      icon="fa-solid fa-floppy-disk"
      class="mt-5"
      @click="saveEvent"
    />
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { storeToRefs } from "pinia";

import alerts from "@/plugins/alerts.js";

import Button from "@/components/Button.vue";

import { usePeopleStore } from "@/stores/people.js";
import { useConfigStore } from "@/stores/config.js";

const alert = alerts();

const peopleStore = usePeopleStore();
const configStore = useConfigStore();

const { formState } = storeToRefs(peopleStore);
const { formSetState, save, getAll } = peopleStore;

const { getAllState: configGetAllState } = configStore;

const formData = reactive({});

watch(
  () => formState.value.data,
  (currentValue, oldValue) => {
    console.log("formState.data", currentValue, oldValue);
    if (currentValue) {
      for (const key in currentValue) {
        formData[key] = currentValue[key];
      }
    }
  }
);

const saveEvent = async () => {
  try {
    const res = await save({
      data: formData,
    });
    for (const key in formData) {
      formData[key] = "";
    }
    formSetState({
      data: {},
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
</script>
