<template>
  <div class="form-container">
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Name" v-model="employee.name"/>
          <div class="error" v-if="!$v.employee.name.required && $v.$dirty">Name is required</div>
          <div class="error" v-if="!$v.employee.name.minLength">Name must have at least {{$v.employee.name.$params.minLength.min}} letters.</div>
        </div>
        <div>
          <input type="text" class="form-control mt-5" placeholder="Salary" v-model="employee.salary"/>
          <div class="error" v-if="!$v.employee.salary.required && $v.$dirty">Salary is required</div>
        </div>
        <div>
          <input type="text" class="form-control mt-5" placeholder="age" v-model="employee.age"/>
          <div class="error" v-if="!$v.employee.age.required && $v.$dirty">Age is required</div>
        </div>
        <button type="button" class="btn btn-success mt-5" @click="save()" :disabled="submitStatus === 'PENDING'">Create</button>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
      </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: "CreateEmployeeForm",
  data() {
    return {
      employee: {
        name: "",
        salary: "",
        age: "",
      },
      submitStatus: null
    };
  },
  validations: {
    employee:{
      name: {
      required,
      minLength: minLength(4)
      },
      salary:{
        required
      },
      age:{
        required
      }
    }
    
  },
  methods: {
    ...mapActions(["createEmployee"]),
    save: function () {
      this.$v.$touch()
      if (this.$v.$invalid && this.$v.$dirty) {
        this.submitStatus = 'ERROR'
      } else {
        this.createEmployee(this.employee);
        this.resetValidations();
        this.resetEmployee();
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    resetEmployee: function () {
      this.employee = {
        name: "",
        age: "",
        salary: "",
      };
    },
    resetValidations: function () {
      this.$v.$reset();
    }
  },
};
</script>

<style>
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  font-size: 15px;
}
</style>