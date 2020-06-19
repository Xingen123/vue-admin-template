import request from "@/utils/request";

export function getTableData(params) {
  //192.168.70.71:8522/nearprediction/?timeStr=2020-06-19+10:18:08
  http: return request({
    url: "crppi/opticalFlow",
    method: "get",
    params
  });
}
