import { defineStore } from "pinia";
import { reactive } from "vue";

import { $fetch } from "@/plugins/fetch";

const MODEL = "people";

export const usePeopleStore = defineStore(`${MODEL}-store`, () => {
  const formState = reactive({});
  async function formSetState({ data }) {
    formState.data = data;
  }

  const getAllState = reactive({
    isLoading: false,
    data: [],
    meta: {
      page: 1,
      per_page: 10,
      total_items: 10,
      prev_page: null,
      next_page: null,
      last_page: 1,
    },
    COLUMNS: [
      {
        label: "N°",
        field: "id",
      },
      {
        label: "Nombre",
        field: "name",
      },
      {
        label: "Apellido",
        field: "last_name",
      },
      {
        label: "Tipo de documento",
        field: "type_document",
        type: "callback",
      },
      {
        label: "Documento",
        field: "document",
      },
      {
        label: "Dirreción",
        field: "address",
      },
      {
        label: "Teléfono",
        field: "phone",
      },
      {
        label: "Genero",
        field: "gender",
        type: "callback",
      },
      {
        label: "Fecha de nacimiento",
        field: "birth_date",
      },
      {
        label: "Ciudad",
        field: "city",
        type: "callback",
      },
      {
        label: "Estado civil",
        field: "marital_status",
        type: "callback",
      },
      {
        label: "Ocupación",
        field: "occupation",
        type: "callback",
      },
      {
        label: "Area",
        field: "area",
      },
      {
        label: "Salario",
        field: "salary",
      },
      {
        label: "Estado",
        field: "is_active",
        type: "callback",
      },
      {
        label: "Acciones",
        field: "actions",
        type: "callback",
      },
    ],
  });
  async function getAll() {
    const params = new URLSearchParams({
      page: getAllState.meta.page,
      per_page: getAllState.meta.per_page,
    });
    getAllState.isLoading = true;
    getAllState.data = [];
    return $fetch
      .get(`/${MODEL}`, params)
      .then(({ data }) => {
        const { people } = data;
        getAllState.isLoading = false;
        getAllState.data = people.data;
        getAllState.meta = {
          page: people.current_page,
          per_page: people.per_page,
          last_page: people.last_page,
          total_items: people.total,
          prev_page: people.from,
          next_page: people.to,
        };
        return Promise.resolve(people);
      })
      .catch((e) => {
        getAllState.isLoading = false;
        return Promise.reject(e);
      });
  }
  async function updatePerPage(per_page) {
    getAllState.meta.per_page = per_page;
    return getAll();
  }
  async function updatePage(page) {
    getAllState.meta.page = page;
    return getAll();
  }

  const getOneState = reactive({
    isLoading: false,
    data: {},
  });
  async function getOne({ id }) {
    getOneState.isLoading = true;
    getOneState.data = {};
    return $fetch
      .get(`/${MODEL}/${id}`)
      .then(({ data }) => {
        getOneState.isLoading = false;
        const { list: people } = data.people;
        return Promise.resolve(people);
      })
      .catch((e) => {
        getOneState.isLoading = false;
        return Promise.reject(e);
      });
  }

  const saveState = reactive({
    isLoading: false,
    data: {},
  });
  async function save({ data }) {
    if (!data?.id) {
      saveState.isLoading = true;
      saveState.data = {};
      return $fetch
        .post(`/${MODEL}`, data)
        .then((res) => {
          saveState.isLoading = false;
          return Promise.resolve(res);
        })
        .catch((e) => {
          saveState.isLoading = false;
          return Promise.reject(e);
        });
    } else {
      saveState.isLoading = true;
      saveState.data = {};
      return $fetch
        .post(`/${MODEL}/${data?.id}`, data, { method: "PUT" })
        .then((res) => {
          saveState.isLoading = false;
          return Promise.resolve(res);
        })
        .catch((e) => {
          saveState.isLoading = false;
          return Promise.reject(e);
        });
    }
  }

  const deleteState = reactive({
    isLoading: false,
    data: {},
  });
  async function deleteItem({ id }) {
    deleteState.isLoading = true;
    deleteState.data = {};
    return $fetch
      .post(`/${MODEL}/${id}`, {}, { method: "DELETE" })
      .then((res) => {
        deleteState.isLoading = false;
        return Promise.resolve(res);
      })
      .catch((e) => {
        deleteState.isLoading = false;
        return Promise.reject(e);
      });
  }

  return {
    formState,
    formSetState,

    getAllState,
    getAll,
    updatePerPage,
    updatePage,

    getOneState,
    getOne,

    saveState,
    save,

    deleteState,
    deleteItem,
  };
});
