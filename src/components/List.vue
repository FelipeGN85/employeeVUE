<template>
  <div>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="allEmployees.length > 0" class="container">
      <table>
        <tr>
          <td>Name</td>
          <td>Salary</td>
          <td>Age</td>
          <td>Details</td>
          <td>Delete</td>
        </tr>
        <tr v-for="emp in allEmployees" v-bind:key="emp.id">
          <td>{{ emp.employee_name }}</td>
          <td>{{ emp.employee_salary }}</td>
          <td>{{ emp.employee_age }}</td>
          <td><button v-on:click="goToDetails(emp.id)">Details</button></td>
          <td><button v-on:click="deleteEmp(emp.id)">Delete</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "EmployeeList",
  components: {
    Spinner,
  },
  methods: {
    ...mapActions(["fetchEmployees", "deleteEmployee"]),
    deleteEmp: function(id){
      this.deleteEmployee(id);
    },
    goToDetails(id) {
      this.$router.push({
       path:`/employee/details/${id}`,
      });
    },

  },
  computed: {
    ...mapGetters(["allEmployees"]),
    ...mapGetters(["isLoading"])
  },
  created() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
table,
td {
  border: 1px solid;
  width: 35%;
}
</style>