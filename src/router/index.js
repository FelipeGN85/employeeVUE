import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/employees',
        name: 'employees',
        component: () =>
            import ('../views/EmployeeList.vue')
    },
    {
        path: '/employee/details/:id',
        name: 'employee',
        component: () =>
            import ('../views/EmployeeDetails.vue')
    },
    {
        path: '/employee/create',
        name: 'create-employee',
        component: () =>
            import ('../views/EmployeeCreate.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router