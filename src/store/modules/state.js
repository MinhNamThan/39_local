import apiService from "@/services/state";

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
      context.commit("setDeviceList", data);
    },
    async getListEntityId(context) {
      const { data } = await apiService.getListEntityId();
      context.commit("setEntityIdList", data);
    },
    async saveDevice(context, body) {
      await apiService.saveDevice(body);
    },
    async deleteDevice(context, id) {
      await apiService.deleteDevice(id);
    },
    async trainDevice(context, body) {
      await apiService.trainDevice(body);
    },
    async getLogState(context, id) {
      const log = await apiService.getLogState(id);
      context.commit("setListLog", log.data);
    },
    async getHabitState(context, id) {
      const habit = await apiService.getHabitState(id);
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
