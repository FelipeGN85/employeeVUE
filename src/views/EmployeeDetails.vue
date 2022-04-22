<template>
  <div>
    <h1>Employee Details</h1>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="employee" class="details-container">
      <div class="card" style="width: 26rem">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ employee.employee_name }}</li>
          <li class="list-group-item">{{ employee.employee_salary }}</li>
          <li class="list-group-item">{{ employee.employee_age }}</li>
        </ul>
        <div class="card-footer">Employee</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "@/components/Spinner.vue";
export default {
  name: "EmployeeDetails",
  components: {
    Spinner,
  },
  methods: {
    ...mapActions(["fetchEmployee"]),
  },
  computed: {
    ...mapGetters(["employee"]),
    ...mapGetters(["isLoading"]),
  },
  created() {
    this.fetchEmployee(this.$route.params.id);
  },
};
</script>

<style>
.details-container {
  margin-top: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}
</style>