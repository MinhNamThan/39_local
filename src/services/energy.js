import { METHOD, request } from "@/utils/request";
import {
  DEVICE_ENERGY,
  ENTITY_ID_ENERGY,
  ADD_DEVICE_ENERGY,
  DELETE_DEVICE_ENERGY,
  TRAIN_DEVICE_ENERGY,
  LOG_DEVICE_ENERGY,
  HABIT_DEVICE_ENERGY,
} from "./api";

export async function getListDevice() {
  return request(DEVICE_ENERGY, METHOD.GET);
}
export async function getListEntityId() {
  return request(ENTITY_ID_ENERGY, METHOD.GET);
}
export async function saveDevice(params) {
  return request(ADD_DEVICE_ENERGY, METHOD.POST, params);
}
export async function deleteDevice(id) {
  return request(`${DELETE_DEVICE_ENERGY}/${id}`, METHOD.DELETE);
}
export async function trainDevice(params) {
  return request(TRAIN_DEVICE_ENERGY, METHOD.POST, params);
}
export async function getLogState(id) {
  return request(`${LOG_DEVICE_ENERGY}/${id}`, METHOD.GET);
}
export async function getHabitState(id) {
  return request(`${HABIT_DEVICE_ENERGY}/${id}`, METHOD.GET);
}
export default {
  getListDevice,
  getListEntityId,
  saveDevice,
  deleteDevice,
  trainDevice,
  getLogState,
  getHabitState,
};
