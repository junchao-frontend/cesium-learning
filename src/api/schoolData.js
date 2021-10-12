import request from "@/utils/request";
export function getEquipmentInfo(name) {
  return request({
    url: "/echartsForm/equipment?BuildingName=" + name,
    method: "get"
  });
}
