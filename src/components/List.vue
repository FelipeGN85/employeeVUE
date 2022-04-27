<template>
  <div>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="allEmployees.length > 0" class="container">
      <div class="wrapper-scroll-y scrollbar">
        <table class="table table-success table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Salary</th>
              <th scope="col">Age</th>
              <th scope="col">Details</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in allEmployees" v-bind:key="emp.id">
              <td>{{ emp.employee_name }}</td>
              <td>{{ emp.employee_salary }}</td>
              <td>{{ emp.employee_age }}</td>
              <td><button type="button" class="btn btn-success" v-on:click="goToDetails(emp.id)">Details</button></td>
              <td><button type="button" class="btn btn-danger" v-on:click="deleteEmp(emp.id)">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
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
    deleteEmp: function (id) {
      this.deleteEmployee(id);
    },
    goToDetails(id) {
      this.$router.push({
        path: `/employee/details/${id}`,
      });
    },
  },
  computed: {
    ...mapGetters(["allEmployees", "isLoading"]),
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
.scrollbar {
position: relative;
height: 825px;
overflow: auto;
}
.wrapper-scroll-y {
display: block;
}
</style>