var jsonArray = [];

function getWeeks(weeksHtml) {
  // 假设，单个课程单双周次序不变，发现单周展开-时全部按单周处理
  // 0: 未发现单双周，1: 单周，2: 双周
  var parity = 0
  if (weeksHtml.indexOf("单") != -1) {
    parity = 1
  }
  if (weeksHtml.indexOf("双") != -1) {
    parity = 2
  }
  // 逗号分割后的周次，会包含单周次[1, 2, 3]，连续周次[1-4,8-10]
  var weeksArr = weeksHtml.replace("周", "").split(",");
  // 检查weeksArr
  // console.log(weeksArr)

  // 解析后的周次列表
  var weeksA = [];

  for (var j = 0; j < weeksArr.length; j++) {
    // 找到-周次分隔符
    if (weeksArr[j].indexOf("-") != -1) {
      var weektmp = weeksArr[j].split("-");
      // 展开之前判断有无单双周
      // 这里只判断有没有发现即可，从初始索引每次加2保留奇偶性
      // parity变量保留012三个值
      if (parity != 0) {
        for (var i = parseInt(weektmp[0]); i <= parseInt(weektmp[1]); i+=2) {
          weeksA.push(parseInt(i));
        }
      } else {
        for (var i = parseInt(weektmp[0]); i <= parseInt(weektmp[1]); i++) {
          weeksA.push(parseInt(i));
        }
      }
    } else {
      weeksA.push(parseInt(weeksArr[j]));
    }
  }
  return weeksA;
}


function getClass(classHtml, day, section) {
  var classA = [];
  var classHtml = classHtml.replace(/<wbr>/g, ""); // 去除无用标签
  var classs = classHtml.split('讲课学时').filter(item => item != ''); // 分割课程并去空
  if (classs.length >= 1) { //防止空课表
    for (var i = 0; i < classs.length; i++) { //遍历所有课程
      if (classs[i].indexOf("<br>") != -1) { //判断课程信息是否可以正常分割
        var classObj = {};
        // 0:课程名,1:教室,2:教师名,3:上课周次
        var classesObj = classs[i].split("<br>").filter(item => item != ''); //对课程进行分割
        if (classesObj.length == 4) {
          var course_name = classesObj[0].match(/\<\<(\S+)\>\>/);
          if (!course_name) {
            course_name = classesObj[0].match(/\&lt\;\&lt\;(\S+)\&gt\;\&gt\;/);
          }
          classObj.name = course_name[1];
          classObj.position = classesObj[1];
          classObj.teacher = classesObj[2];

          classObj.weeks = [].concat(getWeeks(classesObj[3]));
          classObj.day = day;
          classObj.sections = [];
          classObj.sections.push(section);
          classA.push(classObj);
        }
        else {
          var course_name = classesObj[0].match(/\<\<(\S+)\>\>/);
          if (!course_name) {
            course_name = classesObj[0].match(/\&lt\;\&lt\;(\S+)\&gt\;\&gt\;/);
          }
          classObj.name = course_name[1];
          classObj.position = "上课地点待通知";
          classObj.teacher = classesObj[1];
          classObj.weeks = [].concat(getWeeks(classesObj[2]));
          classObj.day = day;
          classObj.sections = [];
          classObj.sections.push(section);
          classA.push(classObj);
        }
      }
    }
  }
  return classA;
}

function scheduleHtmlParser(html) {
  var $ = cheerio.load(html, { decodeEntities: false });
  $("#timetable tr").each(
    function (i) {
      $(this).children('td').each(function (j) {
        if ($(this).html().length >= 2) {
          // j+1: 每天周数; i：第几小节
          var classA = [].concat(getClass($(this).html(), j + 1, i));
          for (var k = 0; k < classA.length; k++) {
            jsonArray.push(classA[k]);
          }
        }
      });
    }
  )

  return jsonArray;
}