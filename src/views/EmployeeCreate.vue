<template>
  <div>
      <h1>Create Employee</h1>
        <CreateEmployeeForm />
  </div>
</template>

<script>
import CreateEmployeeForm from '@/components/forms/CreateEmployeeForm.vue';
export default {
    name: 'EmployeeCreate',
    components:{
        CreateEmployeeForm
    },
    
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