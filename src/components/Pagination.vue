<template>
  <ul class="pagination">
    <li
      class="page-item"
      :class="{
        active: false,
        disabled: page == 1,
      }"
      @click="
        update({
          page: 1,
          enabled: page != 1,
        })
      "
    >
      <a class="page-link" href="#">First</a>
    </li>
    <li
      class="page-item"
      :class="{
        active: false,
        disabled: page == 1,
      }"
      @click="
        update({
          page: page - 1,
          enabled: page != 1,
        })
      "
    >
      <a class="page-link" href="#">Previous</a>
    </li>
    <template v-for="n in lastPage" :key="n">
      <li
        class="page-item"
        :class="{
          active: page == n,
          disabled: page == n,
        }"
        @click="
          update({
            page: n,
            enabled: page != n,
          })
        "
      >
        <a class="page-link">{{ n }}</a>
      </li>
    </template>
    <li
      class="page-item"
      :class="{
        active: false,
        disabled: lastPage == page,
      }"
      @click="
        update({
          page: page + 1,
          enabled: page != lastPage,
        })
      "
    >
      <a class="page-link" href="#">Next</a>
    </li>
    <li
      class="page-item"
      :class="{
        active: false,
        disabled: lastPage == page,
      }"
      @click="
        update({
          page: lastPage,
          enabled: lastPage != page,
        })
      "
    >
      <a class="page-link" href="#">Last</a>
    </li>
  </ul>
</template>

<script setup>
const { page, lastPage } = defineProps(["page", "lastPage"]);
const emit = defineEmits(["update"]);

const update = ({ page, enabled }) => {
  if (enabled) emit("update", page);
};
</script>
