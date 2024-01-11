export const pagination = {
  pageSize: 50,
  current: 1,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "50", "100", "150"],
};

export const columns1 = [
  {
    title: "STT",
    width: 45,
    align: "center",
    scopedSlots: { customRender: "stt" },
  },
  {
    title: "entityId",
    width: 160,
    dataIndex: "entity_id",
  },
  {
    title: "Tên",
    width: 160,
    dataIndex: "friendly_name",
  },
  {
    title: "Loại theo dõi",
    width: 110,
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
  },
  {
    title: "Tiêu thụ trung bình",
    width: 100,
    scopedSlots: { customRender: "habit" },
  },
  {
    title: "Phát hiện bất thường",
    width: 100,
    scopedSlots: { customRender: "log" },
  },
  {
    title: "Hành động",
    width: 45,
    scopedSlots: { customRender: "action" },
  },
];

export const types = [
  { id: 1, name: "Theo ngày", value: "date" },
  { id: 2, name: "Theo tuần", value: "week" },
  { id: 3, name: "Theo ngày làm việc và ngày nghỉ", value: "workdays_weekend" },
];
