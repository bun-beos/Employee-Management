<template>
  <div class="table-content">
    <!-- Công cụ điều khiển bảng -->
    <div class="table-control">
      <div
        class="left-control"
        v-show="this.checkBoxArray.length || this.checkBoxArray === true"
      >
        <div class="checked-number">
          Đã chọn
          <b>{{
            this.checkBoxArray === true
              ? this.employees.TotalRows
              : this.checkBoxArray.length
          }}</b>
        </div>
        <div class="clear-check" @click="onCancelChecked">Bỏ chọn</div>
        <div
          class="select-all"
          @click="onCheckAll"
          v-if="this.checkBoxTHead === true"
        >
          Chọn tất cả
        </div>
        <div
          class="action-tbl"
          @click="onDeleteAllSelected"
          v-show="this.checkBoxArray.length > 0 || this.checkBoxArray === true"
        >
          <m-icon
            :boxIconType="'box-icon-trash'"
            :iconType="'icon-trash'"
          ></m-icon>
          <div class="action-content">Xóa tất cả</div>
        </div>
      </div>

      <div class="right-control">
        <m-input-icon
          ref="inputSearch"
          :placeholder="'Tìm theo mã, tên nhân viên'"
          :boxIconType="'box-icon-search'"
          :iconType="'icon-search'"
          v-model="inputSearchData"
          @onClickIcon="onSearchData(10, 1)"
          @keydown.enter="onSearchData(10, 1)"
        ></m-input-icon>
        <m-icon
          :boxIconType="'box-icon-refresh'"
          :iconType="'icon-refresh'"
          :tooltip="'Lấy lại dữ liệu'"
          @click="onRefresh"
        ></m-icon>
        <m-icon
          :boxIconType="'box-icon-excel'"
          :iconType="'icon-excel'"
          :tooltip="'Xuất ra Excel'"
          @click="onExportToExcel"
        ></m-icon>
      </div>
    </div>

    <!-- Dữ liệu của bảng -->
    <div class="table-data">
      <table class="table-data-content">
        <thead>
          <tr>
            <th>
              <!-- <m-input-checkbox
                @click="onCheckAll"
                :length="checkBoxArray.length"
              ></m-input-checkbox> -->
              <input
                type="checkbox"
                @click="onCheckAllInPage"
                :value="checkBoxTHead"
                v-model="checkBoxTHead"
              />
            </th>
            <th class="emp-code">Mã nhân viên</th>
            <th class="emp-full_name">Tên nhân viên</th>
            <th class="emp-gender">Giới tính</th>
            <th class="emp-date_of_birth">Ngày sinh</th>
            <th class="emp-id_number" title="Số chứng minh nhân dân">
              Số CMND
            </th>
            <th class="emp-position_name">Chức danh</th>
            <th class="emp-department_name">Tên đơn vị</th>
            <th class="emp-bank_acc_number">Số tài khoản</th>
            <th class="emp-bank_name">Tên ngân hàng</th>
            <th class="emp-bank_branch" title="Chi nhánh tài khoản ngân hàng">
              Chi nhánh TK ngân hàng
            </th>
            <th class="emp-mobilephone_number">Điện thoại di động</th>
            <th class="table-function">Chức năng</th>
          </tr>
        </thead>
        <tbody v-if="!isShowTableLoading && !errorGetData">
          <tr
            v-for="(employee, index) in employees.Employees"
            :key="employee.EmployeeId"
            @dblclick="changeEmployee"
            :id="index"
          >
            <td @dblclick.stop="">
              <input
                type="checkbox"
                :value="employee.EmployeeId"
                v-model="checkBoxArray"
              />
            </td>
            <td class="emp-code">
              {{ employee.EmployeeCode }}
            </td>
            <td class="emp-full_name">
              {{ employee.FullName }}
            </td>
            <td class="emp-gender">
              {{ $helper.formatGender(employee.Gender) }}
            </td>
            <td class="emp-date_of_birth">
              {{ $helper.formatDate(employee.DateOfBirth) }}
            </td>
            <td class="emp-id_number">
              {{ employee.IdentityNumber }}
            </td>
            <td class="emp-position_name">
              {{ employee.PositionName }}
            </td>
            <td class="emp-department_name">
              {{ employee.DepartmentName }}
            </td>
            <td class="emp-bank_acc_number">
              {{ employee.BankAccount }}
            </td>
            <td class="emp-bank_name">
              {{ employee.BankName }}
            </td>
            <td class="emp-bank_branch">
              {{ employee.BankBranch }}
            </td>
            <td class="emp-mobilephone_number">
              {{ employee.MobilePhoneNumber }}
            </td>
            <td class="table-function" @dblclick.stop="" :id="index">
              <div class="option-func" :id="index">
                <div
                  class="fix-data"
                  @click="$emit('editEmployee', employee.EmployeeId)"
                >
                  Sửa
                </div>
                <m-icon
                  :id="employee.EmployeeId"
                  :class="{
                    'box-icon_checked':
                      showDroplistFunc === employee.EmployeeId,
                  }"
                  :boxIconType="'box-icon-arrow-down_blue'"
                  :iconType="'more-option icon-arrow-down_blue'"
                  @click.stop="onShowDroplistFunc"
                ></m-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <m-droplist
        :id="dropListFunId"
        :showDropList="showDroplistFunc"
        :droplistType="'droplist-func'"
        :items="optionFunction"
        :droplistStyle="droplistStyle"
        @droplistItemEvent="onRunFunctionInRow"
      ></m-droplist>
      <div class="error-get-data" v-show="errorGetData">
        Không tìm thấy được dữ liệu.<br />Vui lòng thử lại.
      </div>
      <m-loading
        :spinnerType="'normal'"
        v-show="isShowTableLoading"
      ></m-loading>
    </div>

    <!-- Điều hướng trang -->
    <div class="table-pagination">
      <!-- Số bản ghi -->
      <div class="left-pagination">
        <div class="total-record">
          Tổng số:
          <b>{{ this.employees === null ? "0" : this.employees.TotalRows }}</b>
          bản ghi
        </div>
      </div>
      <!-- Số bản ghi trên 1 trang -->
      <div class="right-pagination" style="display: flex; position: relative">
        <div class="record-in-page">
          <div class="record-value">
            {{ pageSizeValue }} bản ghi trên 1 trang
          </div>
          <div class="record-more-option">
            <m-icon
              :boxIconType="'box-icon-arrow-down'"
              :iconType="{
                'icon-arrow-down': !showDroplistRecord,
                'icon-arrow-up': showDroplistRecord,
              }"
              @click.stop="onShowDroplistRecord"
            ></m-icon>
          </div>
        </div>
        <m-droplist
          :droplistType="'droplist-record'"
          :items="rowInPage"
          :pageSizeValue="pageSizeValue"
          v-show="showDroplistRecord"
          @droplistItemEvent="onChangepageSizeValue"
        ></m-droplist>

        <!-- Chỉ số trang -->
        <div class="page-number">
          <div
            class="page-number-control pre-page"
            :class="{ disable: pageNumber === 1 }"
            style="margin-right: 8px"
            @click="onPrePage"
          >
            Trước
          </div>
          <div class="page-index">
            <div
              :class="{ 'page-index-item': true, selected: pageNumber === 1 }"
              @click="onSelectPageNumber"
            >
              1
            </div>
            <div
              :class="{ 'page-index-item': true, selected: pageNumber === 2 }"
              v-show="
                (pageTotal > 1 && pageTotal <= 4) ||
                (pageTotal > 4 && pageNumber < 3)
              "
              @click="onSelectPageNumber"
            >
              2
            </div>
            <div
              class="page-index-item"
              v-show="pageTotal > 4 && pageNumber >= 3"
            >
              ...
            </div>
            <div
              class="page-index-item"
              v-show="pageTotal >= 3 && pageNumber < 3"
              @click="onSelectPageNumber"
            >
              3
            </div>
            <div
              v-for="item in 3"
              :key="item"
              v-show="pageNumber >= 3 && pageNumber + 2 < pageTotal"
              :class="{ 'page-index-item': true, selected: item == 1 }"
              @click="onSelectPageNumber"
            >
              {{ pageNumber + item - 1 }}
            </div>
            <div
              class="page-index-item"
              v-show="pageNumber + 2 < pageTotal && pageTotal > 4"
            >
              ...
            </div>
            <div
              :class="{
                'page-index-item': true,
                selected: pageNumber == pageTotal - 2,
              }"
              v-show="pageNumber >= pageTotal - 2 && pageTotal > 4"
              @click="onSelectPageNumber"
            >
              {{ pageTotal - 2 }}
            </div>
            <div
              :class="{
                'page-index-item': true,
                selected: pageNumber == pageTotal - 1,
              }"
              v-show="
                (pageNumber >= 3 && pageTotal === 4) ||
                (pageTotal > 4 && pageNumber >= pageTotal - 2)
              "
              @click="onSelectPageNumber"
            >
              {{ pageTotal - 1 }}
            </div>
            <div
              :class="{
                'page-index-item': true,
                selected: pageNumber == pageTotal,
              }"
              v-show="pageTotal >= 4"
              @click="onSelectPageNumber"
            >
              {{ pageTotal }}
            </div>
          </div>
          <div
            class="page-number-control after-page"
            :class="{ disable: pageNumber == pageTotal }"
            style="margin-left: 8px"
            @click="onNextPage"
          >
            Sau
          </div>
        </div>
      </div>
    </div>

    <!-- disable bảng dữ liệu -->
    <div class="table-disable" v-show="this.checkBoxArray === true"></div>
  </div>
</template>

<script>
export default {
  name: "MISATableData",
  props: [
    "employees", // Dữ liệu truyền vào bảng
    "changeEmployee", // Hàm hiện form thay đổi nhân viên
    "dialogData", // Dữ liệu truyền cho dialog
    "isActionDialog", // Thực hiện tiếp hành động trước thông báo
    "toastMsgData", // Dữ liệu truyền cho toast message
  ],
  data() {
    return {
      isShowTableLoading: false, // Ẩn hiện loading
      errorGetData: false, // Lỗi không lấy được dữ liệu
      batchActionList: ["Xóa"], // Các thao tác thực hiện hàng loạt
      inputSearchData: "", //Dữ liệu tìm kiếm nhân viên
      showDroplistFunc: 0, // Ẩn hiện chức năng trên hàng
      dropListFunId: 1, // Id của droplist chức năng
      droplistFunIndex: [-1], // Thứ tự của bản ghi tương ứng với danh sách chức năng
      optionFunction: ["Nhân bản", "Xóa", "Ngừng sử dụng"], // Danh sách chức năng
      checkBoxTHead: false,
      checkBoxArray: [], // Mảng lưu id của các bản ghi được chọn
      showDroplistRecord: false, // Ẩn hiện droplist số bản ghi trên trang
      droplistStyle: {
        // css cho vị trí của droplist chức năng
        right: 0,
        top: 0,
      },
      pageSizeChoosed: "10", // Kích thước trang đã chọn
      rowInPage: [
        // Danh sách số bản ghi trên trang
        "10 bản ghi trên 1 trang",
        "20 bản ghi trên 1 trang",
        "30 bản ghi trên 1 trang",
        "50 bản ghi trên 1 trang",
        "100 bản ghi trên 1 trang",
      ],
      pageTotal: 1, // Tổng số trang
      pageNumber: 1, // Trang hiện tại
      dialogDataOutput: {}, // Dữ liệu update cho dialog
      toastMsgDataOutput: {}, // Dữ liệu update cho toast message
      isWaiting: null, // Trạng thái hàm đang chờ
      employeeId: "", // Id của nhân viên đang chọn
      employeeCode: "", // Mã nhân viên đang chọn
    };
  },
  computed: {
    /**
     * author: ttkien (28/09/2023)
     * Tính kích thước của trang
     */
    pageSizeValue() {
      return this.pageSizeChoosed.split(" ")[0];
    },
  },
  watch: {
    employees(newValue) {
      if (newValue === null) {
        this.isShowTableLoading = true;
        this.errorGetData = !this.isShowTableLoading;
      } else if (JSON.stringify(newValue) === "{}") {
        this.isShowTableLoading = false;
        this.errorGetData = !this.isShowTableLoading;
        newValue.TotalRows = 0;
      } else {
        this.isShowTableLoading = false;
        this.errorGetData = false;
        this.pageTotal = Math.ceil(newValue.TotalRows / this.pageSizeValue);
        if (this.checkBoxArray !== true) {
          this.checkBoxTHead = this.onCheckEmployeeChecked();
        }
      }
    },

    pageSizeValue(newValue, oldValue) {
      this.$emit("update:pageSizePresent", newValue);
      if (this.pageNumber === 1) {
        if (this.inputSearchData === "") {
          this.$emit(
            "getEmployeeInPage",
            newValue,
            this.pageNumber,
            "",
            "",
            ""
          );
        } else {
          this.onSearchData(newValue, this.pageNumber);
        }
      } else {
        this.pageNumber = 1;
      }
      if (newValue > oldValue) {
        this.checkBoxTHead = false;
      }
    },

    pageNumber(newValue) {
      this.$emit("update:pageNumberPresent", newValue);
      if (this.inputSearchData === "") {
        this.$emit(
          "getEmployeeInPage",
          this.pageSizeValue,
          newValue,
          "",
          "",
          ""
        );
      } else {
        this.onSearchData(this.pageSizeValue, newValue);
      }
    },

    /**
     * author: ttkien (20/09/2023)
     * Hàm thực hiện hành động chính của dialog
     * @param {string} newValue Trạng thái dialog
     */
    isActionDialog(newValue) {
      if (newValue) {
        if (this.isWaiting === "delete") {
          this.onDeleteEmployee(this.employeeId);
        } else if (this.isWaiting === "deleteMany") {
          this.onDeleteManyEmployee();
        }
      } else if (newValue === "") {
        this.isWaiting = null;
      }
    },

    checkBoxArray(newValue) {
      if (newValue.length === 1) {
        this.getEmployeeById(this.checkBoxArray[0]);
      }
      if (newValue !== true) {
        this.checkBoxTHead = this.onCheckEmployeeChecked();
      }
    },
  },
  methods: {
    /**
     * author: ttkien (28/09/2023)
     * Hàm refresh dữ liệu
     */
    onRefresh() {
      this.checkBoxTHead = false;
      this.checkBoxArray = [];
      this.pageSizeChoosed = this.rowInPage[0];
      this.$emit("onRefresh", this.pageSizeValue, (this.pageNumber = 1));
    },

    /**
     * author: ttkien (21/09/2023)
     * focus vào ô tìm kiếm
     */
    focusInputSearch() {
      this.$nextTick(() => {
        this.$refs.inputSearch.onFocus();
      });
    },

    /**
     * author: ttkien (21/09/2023)
     * chuyển về trang trước
     */
    onPrePage() {
      if (this.pageNumber > 1) {
        this.pageNumber -= 1;
      }
    },

    /**
     * author: ttkien (21/09/2023)
     * chuyển đến trang sau
     */
    onNextPage() {
      if (this.pageNumber < this.pageTotal) {
        this.pageNumber += 1;
      }
    },

    /**
     * author: ttkien (16/09/2023)
     * Chọn trang
     * @param {event} e
     */
    onSelectPageNumber(e) {
      this.pageNumber = parseInt(e.target.innerText);
    },

    /**
     * author: ttkien (11/09/2023)
     * @param {number} item Số bản ghi trên một trang
     * chọn số bản ghi trên 1 trang
     */
    onChangepageSizeValue(item) {
      this.pageSizeChoosed = item;
      this.showDroplistRecord = false;
    },

    /**
     * author: ttkien (24/08/2023)
     * chọn tất cả checkbox
     */
    onCheckAllInPage() {
      if (!this.checkBoxTHead) {
        for (const employee of this.employees.Employees) {
          this.checkBoxArray.push(employee.EmployeeId);
          this.checkBoxArray = [...new Set(this.checkBoxArray)];
        }
      } else {
        let ids = [];
        for (const employee of this.employees.Employees) {
          ids.push(employee.EmployeeId);
        }
        this.checkBoxArray = this.checkBoxArray.filter(
          (idValue) => ids.indexOf(idValue) === -1
        );
      }
    },

    /**
     * author: ttkien (21/09/2023)
     * Hàm chọn tất cả nhân viên
     */
    onCheckAll() {
      this.checkBoxArray = true;
      this.checkBoxTHead = true;
    },

    /**
     * author: ttkien (24/08/2023)
     * @param {event} e
     * hiển thị danh sách chức năng 1 hàng
     */
    onShowDroplistFunc(e) {
      var rect = e.target.getBoundingClientRect();
      this.droplistStyle = { right: rect.right, top: rect.bottom };
      this.dropListFunId = e.target.id;
      this.employeeId = this.dropListFunId;
      this.droplistFunIndex[0] = e.target.parentElement.parentElement.id;
      if (this.showDroplistFunc !== this.dropListFunId) {
        this.showDroplistFunc = this.dropListFunId;
      } else this.showDroplistFunc = null;
      this.showDroplistRecord = false;
    },

    /**
     * author: ttkien (27/09/2023)
     * Hàm xử lí chức năng trong hàng
     * @param {string} item Tên chức năng
     */
    onRunFunctionInRow(item) {
      if (item === this.optionFunction[1]) {
        this.createNewDialog(
          this.$MISAResource["VN"].dialogTitle.deleteData,
          this.$helper.customizeEmployeeCode(
            this.employees.Employees[this.droplistFunIndex[0]].EmployeeCode,
            "delete"
          ),
          this.$MISAResource["VN"].button.yes,
          this.$MISAResource["VN"].button.no
        );
        this.isWaiting = "delete";
      } else if (item === this.optionFunction[0]) {
        this.$emit("duplicateEmployee", this.dropListFunId);
      }
      this.showDroplistFunc = null;
    },

    /**
     * author: ttkien (23/08/2023)
     * ẩn hiện lựa chọn số bản trên 1 trang
     */
    onShowDroplistRecord() {
      this.showDroplistRecord = !this.showDroplistRecord;
      this.showDroplistFunc = null;
    },

    /**
     * author: ttkien (23/08/2023)
     * ẩn tất cả droplist đang hiện
     */
    onHideAllDroplists() {
      this.showDroplistFunc = null;
      this.showDroplistRecord = false;
    },

    /**
     * author: ttkien (29/08/2023)
     * Hàm bỏ chọn tất cả checkbox
     */
    onCancelChecked() {
      this.checkBoxArray = [];
    },

    /**
     * author: ttkien (28/09/2023)
     * Hàm tạo mới dialog
     * @param {string} title Tiêu đề thông báo
     * @param {string} content Nội dung thông báo
     * @param {string} mainButton Nội dung nút chính
     * @param {string} minorButton2 Nội dung nút phụ 2
     */
    createNewDialog(title, content, mainButton, minorButton2) {
      this.dialogDataOutput.isShowDialog = true;
      this.dialogDataOutput.dialogTitle = title;
      if (
        title === this.$MISAResource["VN"].dialogTitle.deleteData ||
        title === this.$MISAResource["VN"].dialogTitle.dataExist
      ) {
        this.dialogDataOutput.iconType = "icon-warning_L";
        this.dialogDataOutput.dialogContent = content;
      }
      this.dialogDataOutput.mainButton = mainButton;
      this.dialogDataOutput.minorButton2 = minorButton2;
      this.$emit("update:dialogData", this.dialogDataOutput);
      this.$emit("update:isActionDialog", null);
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
     * Hàm xóa một nhân viên
     */
    onDeleteEmployee(id) {
      if (this.employees.Employees.length === 1) {
        this.pageNumber--;
      }
      this.$axios
        .delete(`https://localhost:7114/api/v1/Employees/${id}`)
        .then((res) => {
          console.log("delete: ", res);
          this.newToastMsgSuccess(
            this.$MISAResource["VN"].toastMessage.deleteEmployeeSuccessfull
          );
          this.$emit(
            "getEmployeeInPage",
            this.pageSizeValue,
            this.pageNumber,
            "",
            "",
            ""
          );
          this.checkBoxArray.shift();
          this.checkBoxTHead = false;
        })
        .catch((error) => {
          this.newToastMsgError(error);
        });
      this.isWaiting = null;
      this.$emit("update:isActionDialog", false);
    },

    /**
     * author: ttkien (28/09/2023)
     * Hàm xóa nhiều nhân viên
     */
    onDeleteManyEmployee() {
      if (
        this.employees.Employees.length <= this.checkBoxArray.length &&
        this.pageNumber > 1
      ) {
        this.pageNumber--;
      }
      this.$axios
        .delete("https://localhost:7114/api/v1/Employees", {
          data: this.checkBoxArray,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("delete: ", res);
          this.$emit(
            "getEmployeeInPage",
            this.pageSizeValue,
            this.pageNumber,
            "",
            "",
            ""
          );
          this.newToastMsgSuccess(
            this.$MISAResource["VN"].toastMessage.deleteEmployeeSuccessfull
          );
          this.checkBoxArray = [];
          this.checkBoxTHead = false;
        })
        .catch((error) => {
          this.newToastMsgError(error);
        });
      this.isWaiting = null;
      this.$emit("update:isActionDialog", false);
    },

    /**
     * author: ttkien (30/08/2023)
     * xóa dữ liệu nhiều nhân viên
     */
    onDeleteAllSelected() {
      if (this.checkBoxArray.length === 1) {
        this.createNewDialog(
          this.$MISAResource["VN"].dialogTitle.deleteData,
          this.$helper.customizeEmployeeCode(this.employeeCode, "delete"),
          this.$MISAResource["VN"].button.yes,
          this.$MISAResource["VN"].button.no
        );
        this.isWaiting = "delete";
        this.employeeId = this.checkBoxArray[0];
      } else {
        this.createNewDialog(
          this.$MISAResource["VN"].dialogTitle.deleteData,
          this.$MISAResource["VN"].dialogContent.deleteManyEmployees,
          this.$MISAResource["VN"].button.yes,
          this.$MISAResource["VN"].button.no
        );
        this.isWaiting = "deleteMany";
      }
    },

    /**
     * author: ttkien (19/09/2023)
     * @param {Guid} id : định danh nhân viên
     * hàm lấy nhân viên theo id
     */
    getEmployeeById(id) {
      this.$axios
        .get(`https://localhost:7114/api/v1/Employees/${id}`)
        .then((res) => {
          this.employeeCode = res.data.EmployeeCode;
        })
        .catch(this.$helper.showError);
    },

    /**
     * author: ttkien (30/09/2023)
     * Tìm kiếm dữ liệu
     */
    onSearchData(pageSize, pageNumber) {
      this.pageSizeChoosed = pageSize.toString();
      this.pageNumber = pageNumber;
      if (!isNaN(this.inputSearchData)) {
        this.$emit(
          "getEmployeeInPage",
          pageSize,
          pageNumber,
          '',
          '',
          this.inputSearchData
        );
      } else if (this.inputSearchData.substring(0, 3).toLowerCase() === "nv-") {
        this.$emit(
          "getEmployeeInPage",
          pageSize,
          pageNumber,
          '',
          this.inputSearchData,
          '',
        );
      } else if (this.inputSearchData !== "") {
        this.$emit(
          "getEmployeeInPage",
          pageSize,
          pageNumber,
          this.inputSearchData,
          '',
          '',
        );
      } else {
        this.onRefresh();
      }
    },

    /**
     * author: ttkien (05/10/2023)
     * Hàm export dữ liệu
     */
    onExportToExcel() {
      this.$emit("showPageLoading", true);
      let name = "",
        code = "",
        phoneNumber = "";
      if (!isNaN(this.inputSearchData)) {
        phoneNumber = this.inputSearchData;
      } else if (this.inputSearchData.substring(0, 3).toLowerCase() === "nv-") {
        code = this.inputSearchData;
      } else if (this.inputSearchData !== "") {
        name = this.inputSearchData;
      }
      this.$axios
        .get(
          `https://localhost:7114/api/v1/Employees/Excel?dateFormatValue=${this.$profile.ProfileDateFormat}&name=${name}&code=${code}&phoneNumber=${phoneNumber}`,
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Danh_sach_nhan_vien.xlsx";
          a.click();
          window.URL.revokeObjectURL(url);
          this.$emit("showPageLoading", false);
        })
        .catch(() => {
          this.$helper.showError();
          this.$emit("showPageLoading", false);
        });
    },

    /**
     * author: ttkien (21/09/2023)
     * Hàm check nhân viên đã được tích
     */
    onCheckEmployeeChecked() {
      if (
        this.employees !== null &&
        this.employees.TotalRows !== 0 &&
        this.checkBoxArray.length >= this.employees.Employees.length
      ) {
        for (const employee of this.employees.Employees) {
          if (this.checkBoxArray.indexOf(employee.EmployeeId) === -1) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    if (this.employees === null) {
      this.isShowTableLoading = true;
    }
    this.onRefresh();
    this.focusInputSearch();
  },
  updated() {},
};
</script>

<style scoped>
@import url(./MISATableData.css);
</style>