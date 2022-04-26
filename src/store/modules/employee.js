import axios from "axios";

const state = {
    employees: [],
    loading: false,
    employee: {},
    memoizedEmployeeList: null
};

const getters = {
    allEmployees: (state) => state.employees,
    isLoading: (state) => state.loading,
    employee: (state) => state.employee,
    getMemoizedEmployeeList: state => {
        return state.memoizedEmployeeList;
    },
};

const actions = {
    async fetchEmployees({ commit, getters }) {
        if (!getters.getMemoizedEmployeeList) {
            commit('isLoading', true);
            axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
                .then(response => {
                    commit('setEmployees', response.data.data);
                    commit('setMemoizedEmployeeList', response.data.data)
                }).catch(error => {
                    alert(error);
                    window.location.reload();
                }).finally(() => {
                    commit('isLoading', false);
                });
        } else {
            return getters.getMemoizedEmployeeList;
        }
    },

    async fetchEmployee({ commit }, id) {
        commit('isLoading', true);
        axios.get(`http://dummy.restapiexample.com/api/v1/employee/${id}`)
            .then(response => {
                commit('setEmployee', response.data.data)
            }).catch(error => {
                alert(error);
                window.location.reload();
            }).finally(() => {
                commit('isLoading', false);
            });
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
            }).finally(() => {
                commit('isLoading', false);
            });
    }
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
    createEmployee: (state, data) => state.employees.unshift(data),

    setMemoizedEmployeeList(state, employeeRequest) {
        state.memoizedEmployeeList = employeeRequest;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}