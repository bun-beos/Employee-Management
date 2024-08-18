const MISAResource = {
    employeeCode: "",
    dateFormat: {
        dayMonthYear: "DD/MM/YYY",
        monthDayYear: "MM/DD/YYYY",
        yearDayMonth: "YYYY/DD/MM",
        yearMonthDay: "YYYY/MM/DD",
        yearOnly: "YYYY",
    },
    VN: {
        button: {
            yes: "Có",
            no: "Không",
            agree: "Đồng ý",
            cancel: "Hủy",
            close: "Đóng",
            save: "Lưu",
        },
        toastMessage: {
            success: "Thành công!",
            error: "Lỗi!",
            warning: "Cảnh báo!",
            infomation: "Thông tin!",
            undo: "Hoàn tác",
            employeeDataDeleted: "Dữ liệu nhân viên đã bị xóa.",
            addEmployeeSuccessfull: "Thêm mới nhân viên thành công.",
            changeEmployeeSuccessfull: "Thay đổi dữ liệu nhân viên thành công.",
            deleteEmployeeSuccessfull: "Xóa nhân viên thành công."
        },
        dialogTitle: {
            dataExist: "Dữ liệu đã tồn tại.",
            deleteData: "Xóa dữ liệu",
            dataChange: "Dữ liệu đã thay đổi",
            dataError: "Lỗi"
        },
        dialogContent: {
            deleteEmployee: "Bạn có chắc chắn muốn xóa nhân viên <br> &lt;employee-code&gt; không?",
            deleteManyEmployees: "Bạn có chắc chắn muốn xóa những nhân viên đã chọn không?",
            dataChanged: "Dữ liệu đã thay đổi. Bạn có muốn lưu lại không?",
            errorGetNewCode: "Không lấy được mã nhân viên mới.",
            errorGetEmployee: "Nhân viên đã bị xóa hoặc không tồn tại. Vui lòng thử lại.",
            employeeCodeExist: "Mã nhân viên <employee-code> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.",
            emptyRequiredField: "field-name không được để trống.",
            invalidCode: "Mã không đúng định dạng (NV-00000).",
            invalidDepartment: "Đơn vị không hợp lệ.",
            invalidDate: "date-field-name không hợp lệ.",
            invalidDateInFuture: "date-field-name không được lớn hơn ngày hiện tại.",
            invalidEmail: "Email không hợp lệ."
        },
        gender: {
            male: "Nam",
            female: "Nữ",
            other: "Khác"
        },
    },
    EN: {
        button: {
            agree: "Agree",
            cancel: "Cancel"
        },
        toastMessage: {
            success: "Success!",
            error: "Error!",
            warning: "Warning!",
            infomation: "Information!",
            undo: "Undo",
            employeeDataDeleted: "Employee data has been deleted.",
            addEmployeeSuccessfull: "Successfully added new employees.",
            changeEmployeeSuccessfull: "Changed employee data successfully."
        },
        dialog: {
            dataExist: "Data already exists",
            employeeCodeExist: "Employee code <NV-000001> already exists in the system, please check again."
        }
    }
}

export default MISAResource