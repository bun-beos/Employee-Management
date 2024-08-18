<template>
  <div class="datepicker">
    <div class="box-input">
      <input
        ref="inputDatePicker"
        type="text"
        :class="{ 'input-date-picker': true, 'input-error': inputError }"
        :placeholder="
          this.$helper.convertDateFormatToResource(
            this.$profile.ProfileDateFormat
          )
        "
        v-model="valueOutput"
        @input="handleInput"
        @focus="selectText"
      />
      <m-icon
        :boxIconType="'box-icon-calendar'"
        :iconType="'icon-calendar'"
        @click.stop="onShowDatePicker"
      ></m-icon>
    </div>

    <div
      class="calendar"
      v-if="isShowDatePicker"
      @click.stop="this.isShowYearOption = false"
    >
      <!-- Lịch hiển thị -->
      <div class="calendar-header">
        <div style="display: flex">
          <div class="calendar-title">{{ currentMonth }}</div>
          <m-icon
            :iconType="'icon-chevron-down_S'"
            @click.stop="onShowYearOption"
            title="Chọn năm"
          ></m-icon>
        </div>
        <div style="display: flex">
          <m-icon
            :iconType="'icon-chevron-left_L'"
            @click.stop="onPreviousMonth"
            title="Tháng trước"
          ></m-icon>
          <m-icon
            :iconType="'icon-chevron-right_L'"
            @click.stop="onNextMonth"
            title="Tháng sau"
          ></m-icon>
        </div>
      </div>

      <table class="table-calendar">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week">
            <td
              v-for="day in week"
              :key="day"
              @click.stop="onSelectDate(day)"
              :class="{
                'today-focus':
                  day === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear(),
                'td-notEmpty': day > 0,
                'current-day-focus':
                  day === hightLightDate.getDate() &&
                  currentDate.getMonth() === hightLightDate.getMonth() &&
                  currentDate.getFullYear() === hightLightDate.getFullYear(),
              }"
            >
              {{ day }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="today-btn" @click="onToday">Hôm nay</div>

      <!-- Bảng chọn năm -->
      <div class="year-option" v-if="isShowYearOption">
        <div class="year-option-header">
          <m-icon
            :iconType="'icon-chevron-left_L'"
            @click.stop="onPreviousYearPage"
            title="Trang trước"
          ></m-icon>
          <div class="year-option-title">{{ yearStart }}-{{ yearEnd }}</div>
          <m-icon
            :iconType="'icon-chevron-right_L'"
            @click.stop="onNextYearPage"
            title="Trang sau"
          ></m-icon>
        </div>

        <table class="table-year">
          <tbody>
            <tr v-for="row in 3" :key="row">
              <td
                v-for="col in 4"
                :key="yearList[col + (row - 1) * 4 - 1]"
                :class="{
                  'this-year-focus':
                    yearList[col + (row - 1) * 4 - 1] === today.getFullYear(),
                  'current-year-focus':
                    yearList[col + (row - 1) * 4 - 1] ===
                    currentDate.getFullYear(),
                }"
                @click.stop="onSelectYear(yearList[col + (row - 1) * 4 - 1])"
              >
                {{ yearList[col + (row - 1) * 4 - 1] }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="this-year" @click.stop="onThisYear">Năm nay</div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "MISAInputDatePicker",
  props: ["modelValue", "isUpdateData", "isHideDatePicker", "inputError"],
  data() {
    return {
      today: new Date(), // Ngày hôm nay
      valueOutput: "", // Giá trị trên thẻ input
      isShowDatePicker: false, // Hiện lịch
      isShowYearOption: false, // Hiện bảng chọn năm
      currentDate: new Date(), // Giá trị để cập nhập lịch
      daysOfWeek: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      calendar: [], // Lịch
      yearStart: 0, // Năm bắt đầu trên bảng chọn
      yearEnd: new Date().getFullYear(), // Năm kết thúc trên bảng chọn
      yearList: [], // Danh sách năm
    };
  },
  computed: {
    hightLightDate() {
      return new Date(this.$helper.convertToDateTime(this.valueOutput));
    },
  },
  watch: {
    isHideDatePicker(newValue) {
      if (newValue) {
        this.isShowDatePicker = !newValue;
      }
    },
    isShowDatePicker(newValue, oldValue) {
      this.onFocus();
      if (newValue && !oldValue) {
        this.$emit("update:isHideDatePicker", !newValue);
        this.isShowYearOption = false;
        if (this.valueOutput !== "" && this.valueOutput !== null) {
          this.currentDate = new Date(
            this.$helper.convertToDateTime(this.valueOutput)
          );
        }
      }
    },
    currentDate(newValue) {
      this.yearEnd = newValue.getFullYear();
      this.updateCalendar();
    },
    yearEnd() {
      this.updateYearOption();
    },
    valueOutput(newValue, oldValue) {
      if (
        newValue != null &&
        oldValue != null &&
        newValue.length < oldValue.length &&
        (newValue.length === 2 || newValue.length === 5)
      ) {
        this.valueOutput = this.valueOutput.slice(0, newValue.length - 1);
      }
      this.$emit("update:modelValue", newValue);
    },
  },
  methods: {
    onShowDatePicker() {
      this.isShowDatePicker = !this.isShowDatePicker;
    },

    onPreviousMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.updateCalendar();
    },

    onNextMonth() {
      let currentYear = this.currentDate.getFullYear();
      let currentMonth = this.currentDate.getMonth();
      let todayYear = this.today.getFullYear();
      let todayMonth = this.today.getMonth();
      if (
        currentYear < todayYear ||
        (currentYear === todayYear && currentMonth < todayMonth)
      ) {
        this.currentDate.setMonth(currentMonth + 1);
        this.updateCalendar();
      }
    },

    onSelectDate(day) {
      if (day) {
        let selected = new Date(this.currentDate);
        selected.setDate(day);
        this.valueOutput = this.$helper.formatDate(selected);
        this.isShowDatePicker = false;
      }
    },

    updateCalendar() {
      let year = this.currentDate.getFullYear();
      if (100 <= year && year < 1000) year = `0${year}`;
      else if (10 <= year && year < 100) year = `00${year}`;
      else if (year < 10) year = `000${year}`;
      let month = this.currentDate.getMonth();

      if (isNaN(year) || isNaN(month)) {
        this.currentDate = this.today;
      }

      let firstDay = new Date(year, month, 1).getDay();
      let daysInMonth = new Date(year, month + 1, 0).getDate();

      let date = 1;
      let newCalendar = [];
      if (firstDay === 0) {
        firstDay = 7;
      }

      for (let i = 0; i < 6; i++) {
        let week = [];
        for (let j = 1; j < 8; j++) {
          if ((i === 0 && j < firstDay) || date > daysInMonth) {
            week.push("");
          } else {
            week.push(date);
            date++;
          }
        }
        if (i === 5 && week[0] === "") {
          break;
        }
        newCalendar.push(week);
      }

      this.calendar = newCalendar;

      this.currentMonth = `Tháng ${month + 1}, ${year}`;
    },

    onToday() {
      this.currentDate = new Date();
      this.valueOutput = this.$helper.formatDate(this.currentDate);
      this.isShowDatePicker = false;
    },

    onShowYearOption() {
      this.isShowYearOption = !this.isShowYearOption;
    },

    onPreviousYearPage() {
      if (this.yearEnd > 1) {
        this.yearEnd = this.yearStart - 1;
      }
    },

    onNextYearPage() {
      if (this.yearEnd <= this.today.getFullYear() - 12) {
        this.yearEnd += 12;
      } else {
        this.yearEnd = this.today.getFullYear();
      }
    },

    onSelectYear(year) {
      this.currentDate.setFullYear(year);
      this.updateCalendar();
      this.isShowYearOption = false;
    },

    updateYearOption() {
      this.yearStart = this.yearEnd - 11;
      let yearValue = this.yearStart;
      this.yearList = [];
      for (let i = 0; i < 12; i++) {
        if (yearValue <= this.yearEnd) {
          this.yearList.push(yearValue);
        } else {
          this.yearList.push("");
        }
        yearValue++;
      }
    },

    onThisYear() {
      this.yearEnd = this.today.getFullYear();
      this.currentDate.setFullYear(this.yearEnd);
      this.updateCalendar();
      this.isShowYearOption = false;
    },

    /**
     * author: ttkien (25/09/2023)
     * Hàm validate ngày tháng năm theo định dạng
     */
    handleInput() {
      let length = this.valueOutput.length;
      if (
        this.$profile.ProfileDateFormat ==
          this.$MISAEnum.dateFormat.dayMonthYear ||
        this.$profile.ProfileDateFormat ==
          this.$MISAEnum.dateFormat.monthDayYear
      ) {
        if (length == 2 || length == 5) {
          this.valueOutput = this.valueOutput + "/";
        } else if (length > 10) {
          this.valueOutput = this.valueOutput.slice(0, length - 1);
        }
      } else if (
        this.$profile.ProfileDateFormat ==
          this.$MISAEnum.dateFormat.yearDayMonth ||
        this.$profile.ProfileDateFormat ==
          this.$MISAEnum.dateFormat.yearMonthDay
      ) {
        if (length == 4 || length == 7) {
          this.valueOutput = this.valueOutput + "/";
        } else if (length > 10) {
          this.valueOutput = this.valueOutput.slice(0, length - 1);
        }
      } else if (
        this.$profile.ProfileDateFormat == this.$MISAEnum.dateFormat.yearOnly
      ) {
        if (length > 4) {
          this.valueOutput = this.valueOutput.slice(0, length - 1);
        }
      }

      // if (!isNaN(this.valueOutput[length - 1])) {
      //   let year = this.today.getFullYear();
      //   let yearThousand = Math.floor(year / 1000);
      //   let yearCutUnit = Math.floor(year / 100);
      //   let yearCutDozen = Math.floor(year / 10);
      //   if (length === 1) {
      //     if (this.valueOutput >= 0 && this.valueOutput <= 3) {
      //       this.valueOutput = this.valueOutput;
      //     } else {
      //       this.valueOutput = "";
      //     }
      //   } else if (length === 2) {
      //     if (this.valueOutput >= 1 && this.valueOutput <= 31) {
      //       this.valueOutput = this.valueOutput + "/";
      //     } else {
      //       this.valueOutput = this.valueOutput.slice(0, length - 1);
      //     }
      //   } else if (length === 4) {
      //     if (this.valueOutput[3] > 1) {
      //       this.valueOutput = this.valueOutput.slice(0, length - 1);
      //     }
      //   } else if (length === 5) {
      //     if (
      //       this.valueOutput.slice(3, 5) >= 1 &&
      //       this.valueOutput.slice(3, 5) <= 12
      //     ) {
      //       this.valueOutput = this.valueOutput + "/";
      //     } else {
      //       this.valueOutput = this.valueOutput.slice(0, length - 1);
      //     }
      //   } else if (length === 7) {
      //     if (this.valueOutput[6] > yearThousand) {
      //       this.valueOutput = this.valueOutput.slice(0, length - 1);
      //     }
      //   } else if (length === 8) {
      //     if (this.valueOutput.slice(6, 8) > yearCutUnit) {
      //       this.valueOutput = this.valueOutput.slice(0, length - 1);
      //     }
      //   } else if (length === 9) {
      //     if (this.valueOutput.slice(6, 9) > yearCutDozen) {
      //       this.valueOutput = this.valueOutput.slice(0, length - 1);
      //     }
      //   } else if (length === 10) {
      //     if (this.valueOutput.slice(6, 10) > year) {
      //       this.valueOutput = this.valueOutput.slice(0, length - 1);
      //     }
      //   } else if (length > 10) {
      //     this.valueOutput = this.valueOutput.slice(0, length - 1);
      //   }
      // } else if (this.valueOutput[length - 1] !== "/") {
      //   this.valueOutput = this.valueOutput.slice(0, length - 1);
      // }
    },

    onFocus() {
      this.$refs.inputDatePicker.focus();
    },

    selectText(e) {
      e.target.select();
    },
  },

  created() {
    this.valueOutput = this.modelValue;
    this.updateCalendar();
    this.updateYearOption();
  },
};
</script>
  
<style scoped>
@import url(./MISAInput.css);

.datepicker {
  width: 100%;
  position: relative;
  font-size: 13px;
}

.calendar {
  position: absolute;
  font-size: 14px;
  top: 40px;
  right: 0;
  width: 276px;
  padding: 8px;
  border: 1px solid var(--input-border-color);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 3px 6px #7d7878ab;
  cursor: pointer;
  z-index: 1;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 10px;
}

.calendar-header .calendar-title {
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.table-calendar thead {
  color: var(--input-placeholder-color);
}

.table-calendar th,
.table-calendar td {
  font-weight: 500;
  width: 36px;
  height: 36px;
  text-align: center;
}

.table-calendar td {
  border-radius: 50%;
  cursor: pointer;
}

.table-calendar .td-notEmpty:hover {
  background-color: var(--primary-btn-background-color_hover);
  color: #fff;
}

.table-calendar td:focus-visible {
  outline-color: var(--primary-btn-background-color);
}

.table-calendar .current-day-focus {
  background-color: #58e9f3;
}

.table-calendar .today-focus {
  background-color: var(--primary-btn-background-color);
  color: #fff;
}

.button-arrow {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 16px;
  margin: 0 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.button-arrow:hover {
  background-color: var(--primary-btn-background-color_hover);
  color: #fff;
}

.button-arrow:active {
  background-color: var(--primary-btn-background-color_active);
  color: #fff;
}

.button-arrow:focus-visible {
  outline-color: var(--primary-btn-background-color_active);
}

.today-btn,
.this-year {
  height: 44px;
  line-height: 44px;
  margin-top: 8px;
  border-top: 1px solid var(--input-border-color);
  color: var(--primary-btn-background-color);
  text-align: center;
}

.today-btn:active,
.this-year:active {
  color: var(--primary-btn-background-color_active);
  background-color: var(--input-border-color);
}

.year-option {
  position: absolute;
  font-size: 14px;
  top: 35px;
  right: 40px;
  width: 250px;
  padding: 8px;
  border: 1px solid var(--input-border-color);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 3px 6px #7d7878ab;
  cursor: pointer;
  z-index: 2;
}

.year-option-header {
  display: flex;
  justify-content: space-between;
}

.table-year td {
  width: 50px;
  height: 32px;
}

.table-year td:hover {
  color: #fff;
  background-color: var(--primary-btn-background-color_hover);
  border-radius: 4px;
}

.table-year .current-year-focus {
  background-color: var(--btn-focus-visible);
  border-radius: 4px;
  color: #fff;
}

.table-year .this-year-focus {
  color: #fff;
  background-color: var(--primary-btn-background-color);
  border-radius: 4px;
}

.this-year {
  height: 32px;
  line-height: 32px;
}
</style>