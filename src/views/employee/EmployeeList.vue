<template>
  <div @click="onHideDroplists">
    <!-- Phần header -->
    <div class="container-header">
      <div style="display: flex; align-items: center">
        <m-icon
          :boxIconType="'header-icon'"
          :iconType="'icon-three-stripes'"
        ></m-icon>
        <div class="header-branch">
          <div class="header-branch-title">
            Công ty TNHH sản suất - thương mại - dịch vụ Qui Phúc
          </div>
          <m-icon :iconType="'header-branch-icon icon-chevron-down_L'"></m-icon>
        </div>
      </div>

      <div style="display: flex; align-items: center">
        <div class="header-tooltip">
          <m-icon
            :iconType="'header-tooltip-icon icon-bell'"
            :tooltip="'Thông báo'"
          ></m-icon>
        </div>
        <div class="account-info">
          <div class="account-info-btn">
            <div class="btn-info-div">
              <m-icon
                :boxIconType="'user-avatar'"
                :iconType="'icon-user-avatar'"
              ></m-icon>
              <div class="user-name">Trần Trung Kiên</div>
              <m-icon :iconType="'icon-chevron-down_S'"></m-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nội dung chính -->
    <div class="container-content">
      <!-- Tiêu đề của bảng -->
      <div class="table-title">
        <div class="table-name">Nhân viên</div>
        <m-button
          class="main-button"
          title="Thêm mới nhân viên"
          @click="onAddNewEmployee"
        ></m-button>
      </div>
      <!-- Nội dung bảng -->
      <m-table-data
        ref="tableData"
        :employees="dataEmployeeTable"
        @getEmployeeInPage="getEmployeeInPage"
        @onRefresh="onRefreshData"
        @editEmployee="onEditEmployee"
        @duplicateEmployee="onDuplicateEmployee"
        v-model:dialogData="dialogData"
        v-model:isActionDialog="actionDialog"
        v-model:toastMsgData="toastMsgData"
        v-model:pageSizePresent="pageSizePresent"
        v-model:pageNumberPresent="pageNumberPresent"
        @showPageLoading="onShowPageLoading"
      ></m-table-data>
      <!-- Kết thúc nội dung bảng -->
    </div>
  </div>

  <!-- form thông tin nhân viên -->
  <router-view
    v-model:dataEmployeeInput="dataEmployeeForm"
    :closeFunction="onHideForm"
    :formMode="formMode"
    v-model:dialogData="dialogData"
    v-model:isActionDialog="actionDialog"
    v-model:toastMsgData="toastMsgData"
    @reloadData="onRefreshData(pageSizePresent, pageNumberPresent, '', '', '')"
    @createNewForm="onAddNewEmployee"
  ></router-view>

  <!-- loading... -->
  <m-loading :spinnerType="'normal'" v-show="showPageLoading"></m-loading>

  <!-- dialog -->
  <m-dialog
    :dialogData="dialogData"
    v-if="dialogData.isShowDialog"
    @closeDialog="onCloseDialog"
    @minorActionDialog1="onMinorActionDialog"
    @mainActionDialog="onMainActionDialog"
  ></m-dialog>

  <!-- toast message -->
  <div id="toast-msg">
    <transition-group>
      <m-toast-message
        v-for="item in toastMsgArray"
        :key="item.id"
        :toastMsgData="item"
        @onHide="onHideToastMessage"
      ></m-toast-message>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "EmployeeList",
  data() {
    return {
      showPageLoading: false, // Hiển thị laoding
      showForm: false, // Hiển thị form
      formMode: this.$MISAEnum.formMode.addNewEmployee, // Chế độ form
      dataEmployeeTable: null, // Dữ liệu truyền vào bảng
      pageSizePresent: 10,
      pageNumberPresent: 1,
      dataEmployeeForm: {
        EmployeeCode: "",
        FullName: "",
        DateOfBirth: null,
        Gender: null,
        DepartmentId: "",
        DepartmentName: null,
        PositionName: null,
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
      }, // Dữ liệu truyền cho form

      dialogData: {
        isShowDialog: false, // Ẩn hiện dialog
        iconType: "", // Loại icon cho dialog
        dialogTitle: "", // Tiêu đề
        dialogContent: "", // Nội dung
        minorButton2: "", // Nút phụ 2
        minorButton1: "", // Nút phụ 1
        mainButton: "", // Nút chính
      },
      actionDialog: false, // Hành động của dialog
      toastMsgArray: [],
      toastMsgData: {
        id: 0,
        isShowToastMsg: false,
        boxIconType: "",
        iconType: "",
        toastMsgContent: "",
      },
    };
  },
  watch: {
    toastMsgData(newValue) {
      if (newValue.isShowToastMsg) {
        this.toastMsgArray.push(newValue);
      }
    },
  },
  methods: {
    /**
     * author: ttkien (23/08/2023)
     * hiển thị form thông tin để thêm mới nhân viên
     */
    onAddNewEmployee() {
      this.formMode = this.$MISAEnum.formMode.addNewEmployee;
      this.showPageLoading = true;
      this.getNewEmployeeCode();
    },

    /**
     * author: ttkien (23/08/2023)
     * ẩn form thông tin
     */
    onHideForm() {
      this.$router.push("/employeelist");
    },

    /**
     * author: ttkien (29/08/2023)
     * @param {event} e
     * double click vào hàng để hiển thị form sửa thông tin nhân viên
     */
    onEditEmployee(id) {
      this.formMode = this.$MISAEnum.formMode.changeEmployee;
      this.showPageLoading = true;
      this.getEmployeeById(id);
    },

    /**
     * author: ttkien (01/10/2023)
     * Nhân bản nhân viên
     */
    async onDuplicateEmployee(id) {
      this.formMode = this.$MISAEnum.formMode.addNewEmployee;
      this.showPageLoading = true;
      try {
        this.dataEmployeeForm = await this.$api.getEmployeeAsync(id);
        this.getNewEmployeeCode();
      } catch (error) {
        this.dialogData.isShowDialog = true;
        this.dialogData.iconType = "icon-error_L";
        this.dialogData.dialogTitle =
          this.$MISAResource["VN"].dialogTitle.dataError;
        this.dialogData.dialogContent =
          this.$MISAResource["VN"].dialogContent.errorGetEmployee;
        this.dialogData.mainButton = this.$MISAResource["VN"].button.agree;
        this.showPageLoading = false;
      }
    },

    /**
     * author: ttkien (28/09/2023)
     * Hàm ẩn dialog
     */
    onHideDialog() {
      this.dialogData.isShowDialog = false;
    },

    /**
     * author: ttkien (28/09/2023)
     * Hành động phụ của dialog
     */
    onMinorActionDialog() {
      this.actionDialog = false;
      this.onHideDialog();
    },

    /**
     * author: ttkien (28/09/2023)
     * Hàm duyệt hành động chính của thông báo
     */
    onMainActionDialog() {
      this.actionDialog = true;
      this.onHideDialog();
    },

    /**
     * author: ttkien (28/09/2023)
     * Hàm ẩn dialog
     */
    onCloseDialog() {
      this.actionDialog = "";
      this.onHideDialog();
    },

    /**
     * author: ttkien (24/08/2023)
     * @param {number} id
     * Ẩn toast message
     * */
    onHideToastMessage(id) {
      for (const index in this.toastMsgArray) {
        if (this.toastMsgArray[index].id === id)
          this.toastMsgArray.splice(index, 1);
      }
      // this.toastMsgData.isShowToastMsg = false;
      // console.log(this.toastMsgData.isShowToastMsg);
    },

    /**
     * Create by: ttkien (01/09/2023)
     * Hàm lấy lại dữ liệu
     */
    onRefreshData(pageSize, pageNumber) {
      this.dataEmployeeTable = null;
      this.getEmployeeInPage(pageSize, pageNumber, "", "", "");
    },

    /**
     * author: ttkien (28/9/2023)
     * ẩn tất cả droplist
     */
    onHideDroplists() {
      this.$refs.tableData.onHideAllDroplists();
    },

    /**
     * author: ttkien (19/09/2023)
     * @param {Guid} id : định danh nhân viên
     * hàm lấy nhân viên theo id
     */
    async getEmployeeById(id) {
      try {
        this.dataEmployeeForm = await this.$api.getEmployeeAsync(id);
        this.showPageLoading = false;
        this.$router.push("/employeelist/employee-infomation");
      } catch (error) {
        this.showPageLoading = false;
        this.dialogData.isShowDialog = true;
        this.dialogData.iconType = "icon-error_L";
        this.dialogData.dialogTitle =
          this.$MISAResource["VN"].dialogTitle.dataError;
        this.dialogData.dialogContent =
          this.$MISAResource["VN"].dialogContent.errorGetEmployee;
        this.dialogData.mainButton = this.$MISAResource["VN"].button.agree;
      }
    },

    /**
     * author: ttkien (10/09/2023)
     * Hàm lấy nhân viên ở trang hiện tại
     * @param {string} pageSize Kích thước trang
     * @param {string} pageNumber Trang hiện tại
     */
    async getEmployeeInPage(pageSize, pageNumber, name, code, phoneNumber) {
      try {
        this.dataEmployeeTable = await this.$api.filterEmployeeAsync(
          pageSize,
          pageNumber,
          name,
          code,
          phoneNumber
        );
      } catch (error) {
        this.dataEmployeeTable = {};
        this.$helper.showError();
      }
    },

    /**
     * author: ttkien (06/10/2023)
     * Hàm lấy mã nhân viên mới
     */
    async getNewEmployeeCode() {
      try {
        this.dataEmployeeForm.EmployeeCode = await this.$api.getNewCodeAsync();
        this.showPageLoading = false;
        this.$router.push("/employeelist/employee-infomation");
      } catch (error) {
        this.dialogData.isShowDialog = true;
        this.$router.push("/employeelist/employee-infomation");
        this.dialogData.iconType = "icon-error_L";
        this.dialogData.dialogTitle =
          this.$MISAResource["VN"].dialogTitle.dataError;
        this.dialogData.dialogContent =
          this.$MISAResource["VN"].dialogContent.errorGetNewCode;
        this.dialogData.mainButton = this.$MISAResource["VN"].button.agree;
        this.showPageLoading = false;
      }
    },

    /**
     * author: ttkien (28/09/2023)
     * Hàm hiện loading
     * @param {boolean} status
     */
    onShowPageLoading(status) {
      this.showPageLoading = status;
    },
  },
};
</script>

<style scoped>
@import url(./EmployeeList.css);
</style>
