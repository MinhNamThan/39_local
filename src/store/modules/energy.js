import apiService from "@/services/energy";

export default {
  namespaced: true,
  state: {
    listDevice: [],
    listEntityId: [],
    listLog: [],
    listHabit: [],
  },
  getters: {},
  actions: {
    async getListDevice(context) {
      const { data } = await apiService.getListDevice();
      const list_devices = data.list_devices;
      context.commit("setDeviceList", list_devices);
    },
    async getListEntityId(context) {
      const { data } = await apiService.getListEntityId();
      const dataStr = [];
      data.forEach((element) => {
        dataStr.push(element.toString());
      });
      context.commit("setEntityIdList", dataStr);
    },
    async saveDevice(context, body) {
      await apiService.saveDevice(body);
    },
    async deleteDevice(context, body) {
      await apiService.deleteDevice(body);
    },
    async trainDevice(context, body) {
      await apiService.trainDevice(body);
    },
    async getLogState(context, body) {
      const log = await apiService.getLogState(body);
      context.commit("setListLog", log.data);
    },
    async getHabitState(context, body) {
      const habit = await apiService.getHabitState(body);
      context.commit("setListHabit", habit.data);
    },
  },
  mutations: {
    setDeviceList(state, list) {
      state.listDevice = list;
    },
    setEntityIdList(state, list) {
      state.listEntityId = list;
    },
    setListLog(state, list) {
      state.listLog = list;
    },
    setListHabit(state, list) {
      state.listHabit = list;
    },
  },
};
