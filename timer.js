async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  return {
    totalWeek: 20, // 总周数：[1, 30]之间的整数
    startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 2, // 晚间课程节数：[0, 10]之间的整数
    sections: [
      { section: 1, startTime: "08:25", endTime: "09:05" },
      { section: 2, startTime: "09:10", endTime: "09:55" },
      { section: 3, startTime: "10:25", endTime: "11:10" },
      { section: 4, startTime: "11:15", endTime: "12:00" },
      { section: 5, startTime: "13:35", endTime: "14:20" },
      { section: 6, startTime: "14:25", endTime: "15:10" },
      { section: 7, startTime: "15:25", endTime: "16:10" },
      { section: 8, startTime: "16:15", endTime: "17:00" },
      { section: 9, startTime: "18:00", endTime: "18:45" },
      { section: 10, startTime: "18:50", endTime: "19:30" }
    ], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  }
}