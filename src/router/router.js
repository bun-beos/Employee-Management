import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import EmployeeList from '../views/employee/EmployeeList.vue'
import CustomerList from '../views/customer/Index.vue'
import InterfaceOptional from '../views/interface-optional/InterfaceOptional.vue'
import MISAForm from '../components/bases/form/MISAForm.vue'

// Định nghĩa các router
const routers = [
    {
        path: "/home", name: "HomeRouter", component: Home
    },
    {
        path: "/employeelist", name: "EmployeeListRouter", component: EmployeeList,
        children: [
            {
                path: "employee-infomation", name: "NewEmployeeRouter", component: MISAForm
            }
        ]
    },
    {
        path: "/customerList", name: "CustomerListRouter", component: CustomerList
    },
    {
        path: "/interface-option", name: "InterfaceOptionalRouter", component: InterfaceOptional
    }
]

const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routers
})

export default vueRouter