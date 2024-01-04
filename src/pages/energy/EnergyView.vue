<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-row class="mb-2">
      <a-col :span="8">
        <h1>Energy</h1>
      </a-col>
      <a-col>
        <a-button
          icon="plus"
          class="float-right"
          :style="{
            marginTop: '-2px',
          }"
          type="primary"
          @click="showAddModal"
        >
          Thêm thiết bị
        </a-button>
      </a-col>
    </a-row>
    <a-table
      bordered
      :rowKey="(r, i) => i"
      :columns="columns"
      :dataSource="listDevice"
      :pagination="pagination"
    >
      <template slot="stt" slot-scope="text, record, index">
        {{ getIndex(index) }}
      </template>
      <template slot="type" slot-scope="text">
        {{ showType(text) }}
        <a-popover>
          <template slot="content">
            <p v-if="text == 'date'">
              Theo dõi năng lượng trung bình của thiết bị theo ngày.
            </p>
            <p v-if="text == 'week'">
              Theo dõi năng lượng trung bình của thiết bị theo tuần.
            </p>
            <p v-if="text == 'workdays_weekend'">
              Theo dõi năng lượng trung bình của thiết bị theo ngày làm việc và
              ngày cuối tuần.
            </p>
          </template>
          <a-icon type="info-circle" />
        </a-popover>
      </template>
      <template slot="habit" slot-scope="text, record">
        <a-button @click="onShowHabit(record)">Hiển thị</a-button>
      </template>
      <template slot="log" slot-scope="text, record">
        <a-button @click="onShowLog(record)">Hiển thị</a-button>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-popconfirm
          title="Bạn có chắc chắn muốn xoá thiết bị này không?"
          @confirm="onDelete(record)"
        >
          <a-tooltip title="Xoá thiết bị">
            <a-button shape="circle" icon="delete" type="danger" @click.stop />
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal v-model="showAddDevice" destroyOnClose>
      <template slot="title">
        <h1 class="title m-0">Thêm thiết bị</h1>
      </template>

      <a-form-model
        :style="{ marginTop: '-12px' }"
        :model="addForm"
        ref="addDeviceForm"
      >
        <a-form-model-item label="Entity id" prop="entity_id">
          <a-select style="width: 100%" v-model="addForm.entity_id">
            <a-select-option v-for="item in listEntityId" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="Type" prop="type">
          <a-popover placement="bottom" class="info-modal-input">
            <template slot="content">
              <p>
                date: Theo dõi năng lượng trung bình của thiết bị theo ngày.
              </p>
              <p>
                week: Theo dõi năng lượng trung bình của thiết bị theo tuần.
              </p>
              <p>
                workdays_weekend: Theo dõi năng lượng trung bình của thiết bị
                theo ngày làm việc và ngày cuối tuần.
              </p>
            </template>
            <template slot="title">
              <span>Loại train</span>
            </template>
            <a-icon type="question-circle" />
          </a-popover>
          <a-select style="width: 100%" v-model="addForm.type">
            <a-select-option
              v-for="item in types"
              :key="item.id"
              :value="item.value"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <template slot="footer">
        <div class="mx-2 my-1">
          <a-button @click="hideAddModal">Hủy</a-button>
          <a-button type="primary" @click="onAddNewDevice">Lưu</a-button>
        </div>
      </template>
    </a-modal>

    <a-modal v-model="showLog" :width="800" destroyOnClose>
      <template slot="title">
        <h1 class="title m-0">Log</h1>
      </template>
      <p v-if="typeof listLog === 'string'">{{ listLog }}</p>
      <ul v-else>
        <li v-for="log in listLog" :key="log.index">
          {{ log }}
        </li>
      </ul>
      <template slot="footer"><div></div> </template>
    </a-modal>
    <a-modal v-model="showHabit" :width="800" destroyOnClose>
      <template slot="title">
        <h1 class="title m-0">Lượng tiêu thụ trung bình</h1>
      </template>
      <p v-if="typeof listHabit === 'string'">{{ listHabit }}</p>
      <ul v-else>
        <li>
          <h3 class="d-inline text-bold">Cuối tuần:</h3>
          <p v-if="listHabit['weekend']" class="d-inline">
            {{ listHabit["weekend"] }}
          </p>
        </li>
        <li class="mt-4">
          <h3 class="d-inline text-bold">Ngày trong tuần:</h3>
          <p v-if="listHabit['workdays']" class="d-inline">
            {{ listHabit["workdays"] }}
          </p>
        </li>
      </ul>
      <template slot="footer"><div></div> </template>
    </a-modal>
  </a-card>
</template>

<script>
import { pagination, columns1, types } from "./const";
import { mapActions, mapState } from "vuex";
import { isSubstring } from "@/utils/stringUtil";
import { trimObject } from "@/utils/formUtil";
export default {
  name: "EnergyView",
  data() {
    return {
      columns: null,
      pagination,
      showAddDevice: false,
      addForm: {},
      listEntities: ["a", "b", "c"],
      value: "",
      types,
      showLog: false,
      showHabit: false,
    };
  },
  computed: {
    ...mapState("energy", [
      "listDevice",
      "listEntityId",
      "listLog",
      "listHabit",
    ]),
    searchListEntities() {
      return this.listEntities.filter((item) =>
        typeof item.name === "string" ? isSubstring(this.value, item) : false
      );
    },
  },
  methods: {
    ...mapActions("energy", [
      "getListDevice",
      "getListEntityId",
      "saveDevice",
      "deleteDevice",
      "getLogEnergy",
      "getHabitEnergy",
    ]),
    getIndex(index) {
      return (
        (this.pagination.current - 1) * this.pagination.pageSize + index + 1
      );
    },
    showAddModal() {
      this.addForm = {};
      this.showAddDevice = true;
    },
    hideAddModal() {
      this.showAddDevice = false;
    },
    onAddNewDevice() {
      this.$refs.addDeviceForm.validate(async (valid) => {
        if (!valid) return;
        if (!this.addForm.entity_id || !this.addForm.entity_id.trim()) {
          this.$notification["warning"]({
            message: "Vui lòng chọn id",
          });
          return;
        }
        if (!this.addForm.type) {
          this.$notification["warning"]({
            message: "Vui lòng chọn loại train",
          });
          return;
        }

        try {
          trimObject(this.addForm);
          let bodyFormData = new FormData();
          bodyFormData.append("entity_id", this.addForm.entity_id);
          bodyFormData.append("type", this.addForm.type);
          await this.saveDevice(bodyFormData);
          await this.getListDevice();
          this.showAddDevice = false;
          this.$notification["success"]({
            message: "Thêm thiết bị thành công",
          });
        } catch (error) {
          this.$notification["error"]({
            message: "Thêm thiết bị không thành công",
          });
        }
      });
    },
    async onDelete(record) {
      try {
        await this.deleteDevice(record.entity_id);
        await this.getListDevice();
        this.$notification["success"]({
          message: "Xoá thiết bị thành công",
        });
      } catch (error) {
        this.$notification["error"]({
          message: "Xoá thiết bị không thành công",
        });
      }
    },
    async onShowLog(record) {
      await this.getLogEnergy(record.entity_id);
      this.showLog = true;
    },
    async onShowHabit(record) {
      await this.getHabitEnergy(record.entity_id);
      this.showHabit = true;
    },
    showType(text) {
      if (text == "workdays_weekend") return "Theo ngày làm việc";
      if (text == "date") return "Theo ngày";
      if (text == "week") return "Theo tuần";
    },
  },
  async mounted() {
    this.columns = columns1;
    await this.getListEntityId();
  },
  async beforeMount() {
    await this.getListDevice();
  },
};
</script>
<style scoped>
h1 {
  text-align: start;
}
.ant-form-item {
  position: relative;
}
.info-modal-input {
  position: absolute;
  left: 40px;
  bottom: 42px;
}
</style>
