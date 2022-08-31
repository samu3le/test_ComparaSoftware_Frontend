import { defineStore } from "pinia";
import { reactive } from "vue";

import { $fetch } from "@/plugins/fetch";

const MODEL = "config";

export const useConfigStore = defineStore(`${MODEL}-store`, () => {
  const getAllState = reactive({
    isLoading: false,
    data: {},
  });
  async function getAll() {
    getAllState.isLoading = true;
    getAllState.data = [];
    return $fetch
      .get(`/${MODEL}`, {})
      .then(({ data }) => {
        const { type_documents, gender, cities, marital_status, occupations } =
          data;
        getAllState.isLoading = false;
        getAllState.data = {
          type_documents,
          gender,
          cities,
          marital_status,
          occupations,
        };
        return Promise.resolve(data);
      })
      .catch((e) => {
        getAllState.isLoading = false;
        return Promise.reject(e);
      });
  }

  return {
    getAllState,
    getAll,
  };
});
