<template>
  <div>
      <h1>Create Employee</h1>
       <div class="create-container">
           <form>
               <div class="row">
                   <input type="text" class="form-control" placeholder="Name" v-model="employee.name" />
               </div>
               <div class="row">
                   <input type="text" class="form-control" placeholder="Salary" v-model="employee.salary" />
               </div>
               <div class="row">
                   <input type="text" class="form-control" placeholder="Age" v-model="employee.age" />
               </div>
               <div class="row">
                   <button type="button" class="btn btn-success" @click="save()">Create</button>
               </div>
           </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'EmployeeCreate',
    data: function() {
        return {
            employee:{
                name:'',
                age:'',
                salary:''
            }
        };
    },
    methods: {
        ...mapActions(['createEmployee']),
        save: function() {
            this.createEmployee(this.employee);
            this.resetEmployee();
        },
        resetEmployee: function() {
            this.employee = {
                id: 0,
                name:'',
                age:'',
                salary:''
            }
        }
    }
}
</script>

<style>
.create-container {
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}
</style>