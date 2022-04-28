import axios from "axios";

const state = {
    employees: [],
    loading: false,
    employee: {},
};

const getters = {
    allEmployees: (state) => state.employees,
    isLoading: (state) => state.loading,
    employee: (state) => state.employee
};

const mutations = {
    setEmployees: (state, data) => {
        state.employees = data;
    },
    isLoading: (state, status) => {
        state.loading = status;
    },
    setEmployee: (state, data) => {
        state.employee = data;
    },
    deleteEmployee: (state, id) => {
        var employees = state.employees.filter((e) => {
            if (e.id !== id) {
                return e;
            }
        });
        state.employees = employees;
        return state;
    },
    createEmployee: (state, data) => {
        // state.employees.unshift(data); if no cors error
        state.employees.unshift({
            id: Math.floor(Math.random() * 50) + 25,
            employee_age: data.age,
            employee_name: data.name,
            employee_salary: data.salary
        });
    }
};

const actions = {
    async fetchEmployees({ commit, getters }) {
        if (!getters.allEmployees.length > 0) {
            const loadingTimeout = setTimeout(() => {
                commit('isLoading', true);
            }, 500);
            axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
                .then(response => {
                    clearTimeout(loadingTimeout);
                    commit('setEmployees', response.data.data);
                }).catch(error => {
                    alert(error);
                    window.location.reload();
                }).finally(() => {
                    commit('isLoading', false);
                });
        } else {
            return getters.allEmployees;
        }
    },

    async fetchEmployee({ commit, getters }, id) {
        if (!getters.allEmployees.length > 0) {
            const loadingTimeout = setTimeout(() => {
                commit('isLoading', true);
            }, 500);
            axios.get(`http://dummy.restapiexample.com/api/v1/employee/${id}`)
                .then(response => {
                    clearTimeout(loadingTimeout);
                    commit('setEmployee', response.data.data)
                }).catch(error => {
                    alert(error);
                    window.location.reload();
                }).finally(() => {
                    commit('isLoading', false);
                });

        } else {
            getters.allEmployees.foreach((employee) => {
                if (employee.id == id) {
                    commit('setEmployee', employee);
                }
            })
        }
    },

    async deleteEmployee({ commit }, id) {
        axios.delete(`http://dummy.restapiexample.com/api/v1/delete/${id}`)
            .then(response => {
                commit('deleteEmployee', id)
                alert(response.data.message)
            }).catch(error => {
                alert(error);
            });

    },

    async createEmployee({ commit }, newEmployee) {
        commit('isLoading', true);
        axios.post(`http://dummy.restapiexample.com/api/v1/create`, newEmployee)
            .then(response => {
                commit('createEmployee', response.data)
            }).catch(error => {
                alert(error);
                commit('createEmployee', newEmployee)
            }).finally(() => {
                commit('isLoading', false);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}