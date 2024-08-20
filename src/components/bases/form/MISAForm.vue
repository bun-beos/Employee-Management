<template>
  <!-- Form thông tin nhân viên -->
  <div class="form-view" @click="onHideSelectWindows">
    <div class="form-window">
      <!-- Phần đầu form -->
      <div class="form-header">
        <!-- Tiêu đề form -->
        <div style="display: flex">
          <div class="form-title">Thông tin nhân viên</div>
        </div>

        <div style="display: flex">
          <m-icon tabindex="20" title="Trợ giúp" :boxIconType="'box-icon-question'"
            :iconType="'icon-question'"></m-icon>
          <m-icon tabindex="21" title="Đóng form" :boxIconType="'box-icon-x_L'" :iconType="'icon-x_L'"
            @click="onCancelForm" @keydown.tab.prevent="onFocusInput('employeeCode')"
            @keydown.enter.prevent="onCancelForm"></m-icon>
        </div>
      </div>

      <!-- Phần thân form - nội dung chính -->
      <div class="form-body">
        <!-- Nhóm thứ nhất-->
        <div class="group-1" style="display: flex">
          <!-- Nhóm bên trái -->
          <div class="group-1_col-1">
            <div style="display: flex">
              <!-- Mã nhân viên-->
              <div class="emp-code">
                <label for="employeeCode" class="label-required" @click="onFocusInput('employeeCode')">Mã<span
                    class="span-required">*</span></label>
                <m-input ref="employeeCode" v-model="dataEmployeeOutput.EmployeeCode"
                  :inputError="isInvalidCode"></m-input>
                <div class="input-error-mess" :class="{ 'tag-hidden': !isEmptyCode }">
                  Mã không được để trống
                </div>
              </div>
              <!-- Tên nhân viên-->
              <div class="emp-name">
                <label for="fullName" class="label-required" @click="onFocusInput('fullName')">Tên<span
                    class="span-required">*</span></label>
                <m-input ref="fullName" v-model="dataEmployeeOutput.FullName" :inputError="isEmptyName"></m-input>
                <div class="input-error-mess" :class="{ 'tag-hidden': !isEmptyName }">
                  Tên không được để trống
                </div>
              </div>
            </div>
            <!-- Đơn vị làm việc-->
            <div class="emp-department">
              <label for="departmentName" class="label-required" @click="onFocusInput('departmentName')">Đơn vị<span
                  class="span-required">*</span></label>
              <m-input-combobox ref="departmentName" v-model:isHideCombobox="isHideCombobox"
                :boxIconType="'box-icon-chevron-down_L'" :iconType="'icon-chevron-down_L'" :items="dataDepartmentNames"
                v-model="dataEmployeeOutput.DepartmentName" :inputError="isInvalidDepartment"
                @keydown.tab="isHideCombobox = true"></m-input-combobox>
              <div class="input-error-mess" :class="{ 'tag-hidden': !isEmptyDepartment }">
                Đơn vị không được để trống
              </div>
            </div>
            <!-- Chức danh -->
            <div class="emp-title">
              <label for="position" @click="onFocusInput('position')">Chức danh</label>
              <m-input ref="position" v-model="dataEmployeeOutput.PositionName"></m-input>
            </div>
          </div>

          <!-- Nhóm bên phải -->
          <div class="group-1_col-2">
            <div style="display: flex">
              <!-- Ngày sinh -->
              <div class="emp-birthday">
                <label for="dateOfBirth" @click="onFocusInput('dateOfBirth')">Ngày sinh</label>
                <m-input-datepicker tabindex="5" ref="dateOfBirth" v-model:isHideDatePicker="isHideDatePicker"
                  v-model="dateOfBirth" :inputError="isInvalidDateOfBirth"
                  @keydown.tab="isHideDatePicker = true"></m-input-datepicker>
              </div>

              <!-- Giới tính -->
              <div class="emp-gender">
                <label for="gender" @click="onFocusInput('gender')">Giới tính</label>
                <m-input-radio ref="gender" :items="dataGender" v-model="picked"></m-input-radio>
              </div>
            </div>

            <div class="box-id-card">
              <!-- Số chứng minh nhân dân -->
              <div class="emp-id">
                <label for="identityNumber" title="Số chứng minh nhân dân" @click="onFocusInput('identityNumber')">Số
                  CMND</label>
                <m-input ref="identityNumber" v-model="dataEmployeeOutput.IdentityNumber"></m-input>
              </div>
              <!-- Ngày cấp -->
              <div class="emp-id-datepicker">
                <!-- <div class="date-picker"> -->
                <label for="identityDate" @click="onFocusInput('identityDate')">Ngày cấp</label>
                <m-input-datepicker ref="identityDate" v-model:isHideDatePicker="isHideDatePicker"
                  v-model="identityDate" :inputError="isInvalidIdentityDate"
                  @keydown.tab="isHideDatePicker = true"></m-input-datepicker>
                <!-- </div> -->
              </div>
            </div>

            <!-- Nơi cấp -->
            <div class="emp-id-place">
              <label for="identityPlace" @click="onFocusInput('identityPlace')">Nơi cấp</label>
              <m-input ref="identityPlace" v-model="dataEmployeeOutput.IdentityPlace"></m-input>
            </div>
          </div>
        </div>

        <!-- Nhóm thứ hai - địa chỉ -->
        <div class="group-2">
          <div class="emp-address">
            <label for="address" @click="onFocusInput('address')">Địa chỉ</label>
            <m-input ref="address" v-model="dataEmployeeOutput.Address"></m-input>
          </div>
        </div>

        <!-- Nhóm thứ ba -->
        <div class="group-3">
          <!-- Số điện thoại di động -->
          <div class="emp-mobile-phone">
            <label for="mobilePhoneNumber" @click="onFocusInput('mobilePhoneNumber')" title="Điện thoại di động">ĐT di
              động</label>
            <m-input ref="mobilePhoneNumber" v-model="dataEmployeeOutput.MobilePhoneNumber"></m-input>
          </div>
          <!-- Số điện thoại cố định -->
          <div class="emp-landline-phone">
            <label for="telephoneNumber" @click="onFocusInput('telephoneNumber')" title="Điện thoại cố định">ĐT cố
              định</label>
            <m-input ref="telephoneNumber" v-model="dataEmployeeOutput.TelephoneNumber"></m-input>
          </div>
          <!-- Địa chỉ email -->
          <div class="emp-email">
            <label for="email" @click="onFocusInput('email')">Email</label>
            <m-input ref="email" v-model="dataEmployeeOutput.Email" :inputError="isInvalidEmail"></m-input>
          </div>
        </div>

        <!-- Nhóm thứ tư-->
        <div class="group-4">
          <!-- Tài khoản ngân hàng -->
          <div class="emp-bank-account">
            <label for="bankAccount" @click="onFocusInput('bankAccount')">Tài khoản ngân hàng</label>
            <m-input ref="bankAccount" v-model="dataEmployeeOutput.BankAccount"></m-input>
          </div>
          <!-- Tên ngân hàng -->
          <div class="emp-bank-name">
            <label for="bankName" @click="onFocusInput('bankName')">Tên ngân hàng</label>
            <m-input ref="bankName" v-model="dataEmployeeOutput.BankName"></m-input>
          </div>
          <!-- Chi nhánh ngân hàng -->
          <div class="emp-bank-branch">
            <label for="bankBranch" @click="onFocusInput('bankBranch')">Chi nhánh</label>
            <m-input ref="bankBranch" v-model="dataEmployeeOutput.BankBranch"
              @keydown.tab.prevent="onFocusInput('save')"></m-input>
          </div>
        </div>
      </div>

      <!-- Phần chân form -->
      <div class="form-footer">
        <div class="left-btn">
          <m-button tabindex="19" ref="cancel" class="minor-button" :title="'Hủy'" @click="onCancelForm"
            @keydown.enter="onCancelForm"></m-button>
        </div>
        <div class="right-btn">
          <m-button tabindex="17" ref="save" class="minor-button" :title="'Cất'" @click.prevent="onSaveEmployee"
            @keydown.enter="onSaveEmployee"></m-button>
          <m-button tabindex="18" ref="saveAndAdd" class="main-button" :title="'Cất và thêm'"
            @click="onSaveAndAddEmployee" @keydown.enter="onSaveAndAddEmployee"></m-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAForm",
  props: [
    "dataEmployeeInput", // Dữ liệu nhân viên vào form
    "formMode", // Chế độ form
    "toastMsgData", // Dữ liệu toast message
    "closeFunction", // Hàm đóng form
    "dialogData", // Dữ liệu dialog
    "isActionDialog", // Hành động của dialog
  ],
  data() {
    return {
      isHideCombobox: true, // Ẩn combobox
      isHideDatePicker: true, // Ẩn lịch
      toastMsgDataOutput: {}, // Dữ liệu toast msg truyền ra
      dialogDataOutput: {}, // Dữ liệu dialog truyền ra
      dataEmployeeOutput: {}, // Dữ liệu nhân viên
      dataNewEmployee: {
        EmployeeCode: "",
        FullName: "",
        PositionName: null,
        DepartmentId: "",
        DepartmentName: null,
        DateOfBirth: null,
        Gender: null,
        IdentityNumber: null,
        IdentityDate: null,
        IdentityPlace: null,
        Address: null,
        MobilePhoneNumber: null,
        TelephoneNumber: null,
        Email: null,
        BankAccount: null,
        BankName: null,
        BankBranch: null,
      }, // Dữ liệu cho nhân viên mới
      dateOfBirth: this.$helper.formatDate(this.dataEmployeeInput.DateOfBirth), // Ngày sinh sau khi format
      identityDate: this.$helper.formatDate(
        this.dataEmployeeInput.IdentityDate
      ), // Ngày cấp sau khi format
      picked: this.$helper.formatGender(this.dataEmployeeInput.Gender), // Giới tính đã chọn
      dataGender: ["Nam", "Nữ", "Khác"], // Dữ liệu giới tính
      dataDepartments: [], // Danh sách đơn vị
      dataDepartmentNames: [], // Danh sách tên đơn vị
      employeeId: null, // id của nhân viên
      isEmptyCode: false, // Trường mã bị trống
      isEmptyName: false, // Trường tên bị trống
      isEmptyDepartment: false, // Trường đơn vị bị trống
      isInvalidCode: false, // Mã không đúng định dạng
      isInvalidDepartment: false, // Đơn vị không hợp lệ
      isInvalidDateOfBirth: false, // Ngày sinh không hợp lệ
      isInvalidIdentityDate: false, // Ngày cấp không hợp lệ
      isInvalidEmail: false, // Email không hợp lệ
      validateInput: false, // Kiểm tra dữ liệu của form
      isWaiting: "", // Trạng thái chờ của form
    };
  },
  watch: {
    dataDepartments(newValue) {
      for (const item of newValue) {
        this.dataDepartmentNames.push(item.DepartmentName);
      }
    },

    isActionDialog(newValue) {
      if (newValue) {
        if (!this.validateInput) {
          this.onFocusErrorField();
        }
        if (this.isWaiting === "closeFormChanged") {
          this.onValidateInput();
          if (this.validateInput) {
            if (this.formMode === this.$MISAEnum.formMode.changeEmployee) {
              this.editEmployee();
            } else if (
              this.formMode === this.$MISAEnum.formMode.addNewEmployee
            ) {
              this.insertEmployee();
            }
          }
        }
      } else if (newValue === false) {
        if (this.isWaiting === "closeFormChanged") {
          this.onCloseForm();
        }
      }
      if (this.isWaiting === "save" && this.validateInput) {
        if (this.formMode === this.$MISAEnum.formMode.changeEmployee) {
          this.editEmployee();
        } else if (this.formMode === this.$MISAEnum.formMode.addNewEmployee) {
          this.insertEmployee();
        }
      }
    },

    validateInput(newValue) {
      if (newValue) {
        if (this.formMode === this.$MISAEnum.formMode.changeEmployee) {
          this.editEmployee();
        } else if (this.formMode === this.$MISAEnum.formMode.addNewEmployee) {
          this.insertEmployee();
        }
      }
    },
  },
  methods: {
    /**
     * author: ttkien (21/09/2023)
     * ẩn danh sách đơn vị
     */
    onHideSelectWindows() {
      this.isHideCombobox = true;
      this.isHideDatePicker = true;
    },

    /**
     * author: ttkien (21/09/2023)
     * aufocus vào ô mã nhân viên
     */
    onFocusInput(refName) {
      this.$nextTick(() => {
        this.$refs[refName].onFocus();
      });
    },

    /**
     * author: ttkien (23/08/2023)
     * đóng form
     */
    onCloseForm() {
      this.closeFunction();
    },

    /**
     * author: ttkien (24/08/2023)
     * Hiển thị toast message
     * */
    onShowToastMessage() {
      this.showToastMessage = true;
    },

    /**
     * author: ttkien (24/08/2023)
     * Ẩn toast message
     * */
    onHideToastMessage() {
      this.showToastMessage = false;
    },

    /**
     * author: ttkien (26/09/2023)
     * Hàm tạo mới toast message thành công
     * @param {string} toastMsgContent Nội dung thông báo
     */
    newToastMsgSuccess(toastMsgContent) {
      let d = new Date();
      this.toastMsgDataOutput.id = d.getTime();
      this.toastMsgDataOutput.isShowToastMsg = true;
      this.toastMsgDataOutput.boxIconType = "box-icon-success";
      this.toastMsgDataOutput.iconType = "icon-success";
      this.toastMsgDataOutput.toastMsgContent = toastMsgContent;
      this.$emit("update:toastMsgData", this.toastMsgDataOutput);
    },

    /**
     * author: ttkien (26/09/2023)
     * Hàm tạo mới toast message lỗi
     */
    newToastMsgError(error) {
      let d = new Date();
      this.toastMsgDataOutput.id = d.getTime();
      this.toastMsgDataOutput.isShowToastMsg = true;
      this.toastMsgDataOutput.boxIconType = "box-icon-error";
      this.toastMsgDataOutput.iconType = "icon-error";
      this.toastMsgDataOutput.toastMsgContent = this.$helper.showError(error);
      this.$emit("update:toastMsgData", this.toastMsgDataOutput);
    },

    /**
     * author: ttkien (28/09/2023)
     * Hàm tạo mới dialog
     * @param {string} title Tiêu đề thông báo
     * @param {string} content Nội dung thông báo
     * @param {string} mainButton Nội dung nút chính
     * @param {string} minorButton2 Nội dung nút phụ 2
     * @param {string} minorButton1 Nội dung nút phụ 1
     */
    createNewDialog(title, content, mainButton, minorButton2, minorButton1) {
      this.dialogDataOutput.isShowDialog = true;
      this.dialogDataOutput.dialogTitle = title;
      if (title === this.$MISAResource["VN"].dialogTitle.dataError) {
        this.dialogDataOutput.iconType = "icon-error_L";
      } else if (title === this.$MISAResource["VN"].dialogTitle.dataChange) {
        this.dialogDataOutput.iconType = "icon-question_L";
      }
      this.dialogDataOutput.dialogContent = content;
      this.dialogDataOutput.mainButton = mainButton;
      this.dialogDataOutput.minorButton2 = minorButton2;
      this.dialogDataOutput.minorButton1 = minorButton1;
      this.$emit("update:dialogData", this.dialogDataOutput);
      this.$emit("update:isActionDialog", null);
    },

    /**
     * author: ttkien (21/09/2023)
     * Hàm so sánh dữ liệu
     */
    compareData() {
      // chuyển dữ liệu giới tính về dạng lưu trữ trong database
      this.dataEmployeeOutput.Gender = this.$helper.convertGenderToEnum(
        this.picked
      );

      // chuyển dữ liệu ngày tháng năm về date time
      this.dataEmployeeOutput.DateOfBirth = this.$helper.convertToDateTime(
        this.dateOfBirth
      );
      this.dataEmployeeOutput.IdentityDate = this.$helper.convertToDateTime(
        this.identityDate
      );

      // lấy ra departmentId
      for (const item of this.dataDepartments) {
        if (this.dataEmployeeOutput.DepartmentName === item.DepartmentName) {
          this.dataEmployeeOutput.DepartmentId = item.DepartmentId;
        }
      }
      let keys = Object.keys(this.dataEmployeeInput);
      for (const key of keys) {
        if (this.dataEmployeeInput[key] !== this.dataEmployeeOutput[key]) {
          return false;
        }
      }
      return true;
    },

    /**
     * author: ttkien (21/09/2023)
     * Hàm validate input
     */
    onValidateInput() {
      let errorList = [];
      let countError = 0;
      if (this.dataEmployeeOutput.EmployeeCode === "") {
        this.isEmptyCode = true;
        this.isInvalidCode = true;
        let content = this.$helper.customizeEmployeeCode(
          "Mã",
          "emptyRequiredField"
        );
        errorList.push(content);
        countError++;
      } else {
        this.isEmptyCode = false;
        let codeRegex = /^NV-\d{5}$/;
        if (!codeRegex.test(this.dataEmployeeOutput.EmployeeCode)) {
          let content = this.$MISAResource["VN"].dialogContent.invalidCode;
          errorList.push(content);
          countError++;
          this.isInvalidCode = true;
        } else {
          this.isInvalidCode = false;
        }
      }

      if (this.dataEmployeeOutput.FullName === "") {
        this.isEmptyName = true;
        let content = this.$helper.customizeEmployeeCode(
          "Tên",
          "emptyRequiredField"
        );
        errorList.push(content);
        countError++;
      } else {
        this.isEmptyName = false;
      }

      if (
        this.dataEmployeeOutput.DepartmentName === "" ||
        this.dataEmployeeOutput.DepartmentName === null
      ) {
        this.isEmptyDepartment = true;
        this.isInvalidDepartment = true;
        let content = this.$helper.customizeEmployeeCode(
          "Đơn vị",
          "emptyRequiredField"
        );
        errorList.push(content);
        countError++;
      } else {
        this.isEmptyDepartment = false;
        this.isInvalidDepartment = false;

        // lấy ra departmentId
        let departmentName = this.dataEmployeeOutput.DepartmentName;
        let index = this.dataDepartmentNames.indexOf(departmentName);
        if (index === -1) {
          this.isInvalidDepartment = true;
          let content =
            this.$MISAResource["VN"].dialogContent.invalidDepartment;
          errorList.push(content);
          countError++;
        } else {
          this.dataEmployeeOutput.DepartmentId =
            this.dataDepartments[index].DepartmentId;
          this.isInvalidDepartment = false;
        }
      }

      // chuyển dữ liệu giới tính về dạng lưu trữ trong database
      this.dataEmployeeOutput.Gender = this.$helper.convertGenderToEnum(
        this.picked
      );

      // chuyển dữ liệu ngày tháng năm về date
      this.dataEmployeeOutput.DateOfBirth = this.$helper.convertToDateTime(
        this.dateOfBirth
      );
      this.dataEmployeeOutput.IdentityDate = this.$helper.convertToDateTime(
        this.identityDate
      );

      // validate ngày tháng năm
      let dateOfBirth = new Date(this.dataEmployeeOutput.DateOfBirth);
      let identityDate = new Date(this.dataEmployeeOutput.IdentityDate);
      let toDay = new Date();
      toDay.setHours(0, 0, 0, 0);

      // Kiểm tra ngày sinh
      if (this.dataEmployeeOutput.DateOfBirth !== null) {
        if (dateOfBirth > toDay) {
          let content = this.$helper.customizeEmployeeCode(
            "Ngày sinh",
            "dateInFuture"
          );
          errorList.push(content);
          this.isInvalidDateOfBirth = true;
          countError++;
        } else if (
          this.dataEmployeeOutput.DateOfBirth.slice(8, 10) !=
          dateOfBirth.getDate()
        ) {
          let content = this.$helper.customizeEmployeeCode(
            "Ngày sinh",
            "invalidDate"
          );
          errorList.push(content);
          this.isInvalidDateOfBirth = true;
          countError++;
        } else {
          this.isInvalidDateOfBirth = false;
        }
      } else {
        this.isInvalidDateOfBirth = false;
      }

      // Kiểm tra ngày cấp
      if (this.dataEmployeeOutput.IdentityDate !== null) {
        if (identityDate > toDay) {
          let content = this.$helper.customizeEmployeeCode(
            "Ngày cấp",
            "dateInFuture"
          );
          errorList.push(content);
          this.isInvalidIdentityDate = true;
          countError++;
        } else if (
          this.dataEmployeeOutput.IdentityDate.slice(8, 10) !=
          identityDate.getDate()
        ) {
          let content = this.$helper.customizeEmployeeCode(
            "Ngày cấp",
            "invalidDate"
          );
          errorList.push(content);
          this.isInvalidIdentityDate = true;
          countError++;
        } else {
          this.isInvalidIdentityDate = false;
        }
      } else {
        this.isInvalidIdentityDate = false;
      }

      // Kiểm tra email
      if (
        this.dataEmployeeOutput.Email !== "" &&
        this.dataEmployeeOutput.Email !== null
      ) {
        let email = this.dataEmployeeOutput.Email;
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
          this.isInvalidEmail = true;
          let content = this.$MISAResource["VN"].dialogContent.invalidEmail;
          errorList.push(content);
          countError++;
        } else {
          this.isInvalidEmail = false;
        }
      } else {
        this.isInvalidEmail = false;
      }

      if (countError === 0) {
        this.validateInput = true;
      } else {
        var contentDialog = "";
        if (countError > 1) {
          for (let i = 0; i < countError; i++) {
            contentDialog = contentDialog + `- ${errorList[i]}<br>`;
          }
        } else {
          contentDialog = errorList[0];
        }
        this.createNewDialog(
          this.$MISAResource["VN"].dialogTitle.dataError,
          contentDialog,
          this.$MISAResource["VN"].button.close
        );
        this.validateInput = false;
      }
    },

    /**
     * author: ttkien (21/09/2023)
     * Hàm focus vào các trường đang lỗi
     */
    onFocusErrorField() {
      if (this.isInvalidCode) {
        this.onFocusInput("employeeCode");
      } else if (this.isEmptyName) {
        this.onFocusInput("fullName");
      } else if (this.isInvalidDepartment) {
        this.onFocusInput("departmentName");
      } else if (this.isInvalidDateOfBirth) {
        this.onFocusInput("dateOfBirth");
      } else if (this.isInvalidIdentityDate) {
        this.onFocusInput("identityDate");
      } else if (this.isInvalidEmail) {
        this.onFocusInput("email");
      }
    },

    /**
     * author: ttkien (21/09/2023)
     * Hủy form
     */
    onCancelForm() {
      let isDataChanged = !this.compareData();
      if (isDataChanged) {
        this.createNewDialog(
          this.$MISAResource["VN"].dialogTitle.dataChange,
          this.$MISAResource["VN"].dialogContent.dataChanged,
          this.$MISAResource["VN"].button.yes,
          this.$MISAResource["VN"].button.cancel,
          this.$MISAResource["VN"].button.no
        );
        this.isWaiting = "closeFormChanged";
      } else {
        this.onCloseForm();
      }
    },

    /**
     * author: ttkien(27/08/2023)
     * Cất dữ liệu
     */
    onSaveEmployee() {
      this.onValidateInput();
      this.isWaiting = "save";
    },

    /**
     * author: ttkien (26/09/2023)
     * Hàm cất và thêm mới
     */
    onSaveAndAddEmployee() {
      this.onValidateInput();
      this.isWaiting = "save and add";
    },

    /**
     * author: ttkien (19/09/2023)
     * lấy tất cả đơn vị
     */
    async getAllDepartment() {
      try {
        this.dataDepartments = await this.$api.getAllDepartmentAsync();
      } catch (error) {
        this.dataDepartments = {};
        this.$helper.showError(error);
      }
    },

    /**
     * author: ttkien (21/09/2023)
     * Hàm thêm mới dữ liệu
     */
    async insertEmployee() {
      try {
        await this.$api.insertEmployeeAsync(this.dataEmployeeOutput);
        this.newToastMsgSuccess(
          this.$MISAResource["VN"].toastMessage.addEmployeeSuccessfull
        );
        this.onCloseForm();
        this.$emit("reloadData");
        if (this.isWaiting === "save and add") {
          this.$emit("createNewForm");
        }
      } catch (error) {
        this.newToastMsgError(error);
      };
      this.validateInput = false;
    },

    /**
     * author: ttkien (21/09/2023)
     * Hàm sửa dữ liệu
     */
    async editEmployee() {
      try {
        await this.$api.updateEmployeeAsync(this.employeeId, this.dataEmployeeOutput);
        this.newToastMsgSuccess(
          this.$MISAResource["VN"].toastMessage.changeEmployeeSuccessfull
        );
        this.onCloseForm();
        this.$emit("reloadData");
        if (this.isWaiting === "save and add") {
          this.$emit("createNewForm");
        }
      } catch (error) {
        this.newToastMsgError(error);
      };
      this.validateInput = false;
    },
  },

  created() {
    // Khởi tạo dữ liệu cho form
    let keys = Object.keys(this.dataEmployeeInput);
    for (const key of keys) {
      this.dataEmployeeOutput[key] = this.dataEmployeeInput[key];
    }

    if (this.formMode === this.$MISAEnum.formMode.changeEmployee) {
      this.employeeId = this.dataEmployeeOutput.EmployeeId;
    }
    this.getAllDepartment();
    this.onFocusInput("employeeCode");
  },

  beforeUnmount() {
    this.dataEmployeeOutput = this.dataNewEmployee;
    this.$emit("update:dataEmployeeInput", this.dataNewEmployee);
  },
};
</script>

<style scoped>
@import url(./MISAForm.css);
</style>