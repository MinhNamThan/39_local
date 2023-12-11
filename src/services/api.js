const BASE_URL = process.env.VUE_APP_API_BASE_URL;
module.exports = {
  DEVICE_STATE: `${BASE_URL}/state/get_list_device`,
  ENTITY_ID_STATE: `${BASE_URL}/state/get_list_entity_id`,
  ADD_DEVICE_STATE: `${BASE_URL}/state/add_device`,
  DELETE_DEVICE_STATE: `${BASE_URL}/state/delete`,
  TRAIN_DEVICE_STATE: `${BASE_URL}/state/train`,
  LOG_DEVICE_STATE: `${BASE_URL}/state/log`,
  HABIT_DEVICE_STATE: `${BASE_URL}/state/show_habit`,
  DEVICE_ENERGY: `${BASE_URL}/energy/get_list_device`,
  ENTITY_ID_ENERGY: `${BASE_URL}/energy/get_list_entity_id`,
  ADD_DEVICE_ENERGY: `${BASE_URL}/energy/add_device`,
  DELETE_DEVICE_ENERGY: `${BASE_URL}/energy/delete`,
  TRAIN_DEVICE_ENERGY: `${BASE_URL}/energy/train`,
  LOG_DEVICE_ENERGY: `${BASE_URL}/energy/log`,
  HABIT_DEVICE_ENERGY: `${BASE_URL}/energy/show_mean_energy`,
};
