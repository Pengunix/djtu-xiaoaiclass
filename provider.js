async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  await loadTool('AIScheduleTools')
  try {
    const res = dom.querySelector('#timetable').outerHTML
    return res
  } catch (error) {
    console.error(error)
    await AIScheduleAlert('请点击"本学期课表->确认课表为要导入的课表->个人课表"再点击一键导入按钮')
    return 'do not continue'
  }
}