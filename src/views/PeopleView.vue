<template>
  <div class="about">
    <div>
      <h1>People</h1>
      <p>This is the people page.</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 p-5">
          <Form @save="save" />
        </div>
        <div class="col-12 p-5">
          <Table />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Table from "@/components/people/Table.vue";
import Form from "@/components/people/Form.vue";

const save = async (data) => {
  console.log("save", data);
};
</script>
