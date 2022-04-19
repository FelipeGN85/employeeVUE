import axios from "axios";

const state = {
    employees: [],
    loading: false,
    employee: {}
};

const getters = {
    allEmployees: (state) => state.employees,
    isLoading: (state) => state.loading,
    employee: (state) => state.employee
};

const actions = {
    async fetchEmployees({ commit }) {
        commit('isLoading', true);
        axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
            .then(response => {
                commit('setEmployees', response.data.data);
            }).catch(error => {
                alert(error);
                window.location.reload();
            }).finally(() => {
                commit('isLoading', false);
            });
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}