import axios from "axios";

const baseURL = "https://employee-management-api-7sds.onrender.com/api/v1"

const api = axios.create({
    baseURL: baseURL,
});

export const getNewCodeAsync = async () => {
    try {
        const res = await api.get("/Employees/NewCode")
        return res.data
    }
    catch (error) {
        throw error
    }
}

export const getEmployeeAsync = async (id) => {
    try {
        const res = await api.get(`/Employees/${id}`)
        return res.data
    }
    catch (error) {
        throw error
    }
}

export const filterEmployeeAsync = async (pageSize, pageNumber, name, code, phoneNumber) => {
    try {
        const res = await api.get(`/Employees/Filter?pageSize=${pageSize}&pageNumber=${pageNumber}&fullName=${name}&employeeCode=${code}&phoneNumber=${phoneNumber}`)
        return res.data
    }
    catch (error) {
        throw error
    }
}

export const deleteEmployeeAsync = async (id) => {
    try {
        await api.delete(`/Employees/${id}`)
    } catch (error) {
        throw error
    }
}

export const deleteManyEmployeeAsync = async (ids) => {
    try {
        await api.delete("/Employees", {
            data: ids,
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        throw error
    }
}

export const insertEmployeeAsync = async (employee) => {
    try {
        await api.post("/Employees", employee)
    } catch (error) {
        throw error
    }
}

export const updateEmployeeAsync = async (id, employee) => {
    try {
        await api.put(`/Employees/${id}`, employee)
    } catch (error) {
        throw error
    }
}

export const exportToExcelAsync = async (dateFormatValue, fullName, employeeCode, phoneNumber) => {
    try {
       const res = await api.get(`/Employees/Excel?dateFormatValue=${dateFormatValue}&fullName=${fullName}&employeeCode=${employeeCode}&phoneNumber=${phoneNumber}`, {
        responseType: 'blob'
       })
       return res.data
    } catch (error) {
        throw error
    }
}

export const getAllDepartmentAsync = async () => {
    try {
        const res = await api.get("/Departments")
        return res.data
    } catch (error) {
        throw error
    }
}

export const getUserProfileAsync = async () => {
    try {
        const res = await api.get("/UserProfiles")
        return res.data
    } catch (error) {
        throw error
    }
}

export const updateUserProfileAsync = async (id, userprofile) => {
    try {
        let res = await api.put(`/UserProfiles/${id}`, userprofile)
        return res.data
    } catch (error) {
        throw error
    }
}