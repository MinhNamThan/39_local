import { METHOD, request } from "@/utils/request";
import {
  DEVICE_STATE,
  ENTITY_ID_STATE,
  ADD_DEVICE_STATE,
  DELETE_DEVICE_STATE,
  TRAIN_DEVICE_STATE,
  LOG_DEVICE_STATE,
  HABIT_DEVICE_STATE,
} from "./api";

export async function getListDevice() {
  return request(DEVICE_STATE, METHOD.GET);
}
export async function getListEntityId() {
  return request(ENTITY_ID_STATE, METHOD.GET);
}
export async function saveDevice(params) {
  return request(ADD_DEVICE_STATE, METHOD.POST, params);
}
export async function deleteDevice(data) {
  return request(DELETE_DEVICE_STATE, METHOD.DELETE, data);
}
export async function trainDevice(params) {
  return request(TRAIN_DEVICE_STATE, METHOD.POST, params);
}
export async function getLogState(params) {
  return request(LOG_DEVICE_STATE, METHOD.POST, params);
}
export async function getHabitState(params) {
  return request(HABIT_DEVICE_STATE, METHOD.POST, params);
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
