<template>
  <div class="form-container">
      <form>
        <input type="text" class="form-control" placeholder="Name" v-model="employee.name"/>
        <input type="text" class="form-control mt-4" placeholder="Salary" v-model="employee.salary"/>
        <input type="text" class="form-control mt-4" placeholder="age" v-model="employee.age"/>
        <button type="button" class="btn btn-success mt-4" @click="save()">Create</button>
      </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreateEmployeeForm",
  data() {
    return {
      employee: {
        name: "",
        salary: "",
        age: "",
      },
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
  margin-top: 50px;
  font-size: 30px;
}
</style>