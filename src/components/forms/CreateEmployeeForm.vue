<template>
  <div class="form-container">
    <form>
      <div class="row">
        <input type="text" placeholder="Name" v-model="employee.name"/>
      </div>
      <div class="row">
        <input type="text" placeholder="Salary" v-model="employee.salary"/>
      </div>
      <div class="row">
        <input type="text" placeholder="Age" v-model="employee.age"/>
      </div>
      <div class="row">
        <button type="button" class="btn btn-success" @click="save()">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'CreateEmployeeForm',
  data() {
    return {
      employee:{
        name: "",
        salary: "",
        age: ""
      }
    };
  },
  methods: {
    ...mapActions(["createEmployee"]),
    save: function () {
      this.createEmployee(this.employee);
      this.resetEmployee();
    },
    resetEmployee: function () {
      this.employee = {
        name: "",
        age: "",
        salary: "",
      };
    },
  },
};
</script>

<style>
  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
  }
</style>