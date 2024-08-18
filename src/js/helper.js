import MISAEnum from './MISAEnum'
import MISAResource from './MISAResource'
import profile from './profile'

const helper = {
    /**
     * author: ttkien (28/09/2023)
     * Hàm thay thế nội dung cụ thể cho thông báo
     * @param {string} specificContent Nội dung cụ thể thay thế
     * @param {string} dialogType Kiểu thông báo muốn hiển thị
     * @returns 
     */
    customizeEmployeeCode(specificContent, dialogType) {
        let content = MISAResource["VN"].dialogContent;
        if (dialogType === "exist") {
            return content.employeeCodeExist.replace("employee-code", specificContent);
        }
        else if (dialogType === "delete") {
            return content.deleteEmployee.replace("employee-code", specificContent)
        }
        else if (dialogType === "emptyRequiredField") {
            return content.emptyRequiredField.replace("field-name", specificContent)
        }
        else if (dialogType === "dateInFuture") {
            return content.invalidDateInFuture.replace("date-field-name", specificContent)
        }
        else if (dialogType === "invalidDate") {
            return content.invalidDate.replace("date-field-name", specificContent)
        }
    },

    /**
     * author: ttkien (26/09/2023)
     * Hàm format giới tính
     * @param {int} value 
     * @returns giới tính
     */
    formatGender(value) {
        if (value === MISAEnum.genderValue.female) return MISAResource["VN"].gender.female
        else if (value === MISAEnum.genderValue.male) return MISAResource["VN"].gender.male
        else if (value === MISAEnum.genderValue.other) return MISAResource["VN"].gender.other
        else return null
    },

    /**
     * author: ttkien (26/09/2023)
     * hàm chuyển giới tính về kiểu enum
     * @param {string} value 
     * @returns giới tính kiểu enum
     */
    convertGenderToEnum(value) {
        if (value === MISAResource["VN"].gender.male) return MISAEnum.genderValue.male
        else if (value === MISAResource["VN"].gender.female) return MISAEnum.genderValue.female
        else if (value === MISAResource["VN"].gender.other) return MISAEnum.genderValue.other
        else return null
    },

    /**
     * author: ttkien
     * 29/08/2023
     * định dạng dữ liệu ngày tháng năm
     */
    formatDate(date) {
        if (date === null) return null
        else {
            date = new Date(date)

            let dateValue = date.getDate()
            dateValue = dateValue < 10 ? `0${dateValue}` : dateValue

            let monthValue = date.getMonth() + 1
            monthValue = monthValue < 10 ? `0${monthValue}` : monthValue

            let yearValue = date.getFullYear()
            if (100 <= yearValue && yearValue < 1000) yearValue = `0${yearValue}`
            else if (10 <= yearValue && yearValue < 100) yearValue = `00${yearValue}`
            else if (yearValue < 10) yearValue = `000${yearValue}`

            if (profile.ProfileDateFormat == MISAEnum.dateFormat.dayMonthYear) {
                return `${dateValue}/${monthValue}/${yearValue}`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.monthDayYear) {
                return `${monthValue}/${dateValue}/${yearValue}`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.yearDayMonth) {
                return `${yearValue}/${dateValue}/${monthValue}`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.yearMonthDay) {
                return `${yearValue}/${monthValue}/${dateValue}`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.yearOnly) {
                return `${yearValue}`
            }
        }
    },

    /*
     * author: ttkien
     * 31/08/2023
     * chuyển đổi ngày tháng năm thành date time
     */
    convertToDateTime(date) {
        if (date === null || date === "") return null
        else {
            let values = date.split('/')

            if (profile.ProfileDateFormat == MISAEnum.dateFormat.dayMonthYear) {
                return `${values[2]}-${values[1]}-${values[0]}T00:00:00+07:00`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.monthDayYear) {
                return `${values[2]}-${values[0]}-${values[1]}T00:00:00+07:00`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.yearDayMonth) {
                return `${values[0]}-${values[2]}-${values[1]}T00:00:00+07:00`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.yearMonthDay) {
                return `${values[0]}-${values[1]}-${values[2]}T00:00:00+07:00`
            }
            else if (profile.ProfileDateFormat == MISAEnum.dateFormat.yearOnly) {
                return `${values[0]}-01-01T00:00:00+00:00`
            }

        }
    },
    /**
     * author: ttkien
     * 31/08/2023
     * hàm xử lí lỗi
     */
    showError(error) {
        console.log("error: ", error);
        if (error !== undefined && error.response !== undefined) {
            let status = error.response.status;
            let userMsg = error.response.data.UserMessage;
            console.log(status)
            switch (status) {
                case 400:
                case 409:
                    return userMsg;
                case 404:
                case 500:
                    return userMsg;
                default:
                    return null;
            }
        }
    },

    /**
     * author: ttkien (09/10/2023)
     * Hàm chuyển đổi giá trị date format từ enum sang resoure
     * @param {enum} value Giá trị date format trong enum
     * @retunrs Giá trị date format trong resource
     */
    convertDateFormatToResource(value) {
        if (value == MISAEnum.dateFormat.monthDayYear) {
            return MISAResource.dateFormat.monthDayYear
        }
        else if (value == MISAEnum.dateFormat.yearDayMonth) {
            return MISAResource.dateFormat.yearDayMonth
        }
        else if (value == MISAEnum.dateFormat.yearMonthDay) {
            return MISAResource.dateFormat.yearMonthDay
        }
        else if (value == MISAEnum.dateFormat.yearOnly) {
            return MISAResource.dateFormat.yearOnly
        }
        else {
            return MISAResource.dateFormat.dayMonthYear
        }
    },

    /**
     * author: ttkien (09/10/2023)
     * Hàm chuyển date format về giá trị enum
     * @param {string} value Giá trị date format trong resource
     * @returns Giá trị date format trong enum
     */
    convertDateFormatToEnum(value) {
        if (value == MISAResource.dateFormat.monthDayYear) {
            return MISAEnum.dateFormat.monthDayYear
        }
        else if (value == MISAResource.dateFormat.yearDayMonth) {
            return MISAEnum.dateFormat.yearDayMonth
        }
        else if (value == MISAResource.dateFormat.yearMonthDay) {
            return MISAEnum.dateFormat.yearMonthDay
        }
        else if (value == MISAResource.dateFormat.yearOnly) {
            return MISAEnum.dateFormat.yearOnly
        }
        else {
            return MISAEnum.dateFormat.dayMonthYear
        }
    }
}

export default helper