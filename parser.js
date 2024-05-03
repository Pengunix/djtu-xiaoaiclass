var jsonArray = [];

function getWeeks(weeksHtml) {
  var weeksArr = weeksHtml.replace("周", "").split(",");
  var weeksA = [];

  for (var j = 0; j < weeksArr.length; j++) {
    if (weeksArr[j].indexOf("-") != -1) {
      var weektmp = weeksArr[j].split("-");
      for (var i = parseInt(weektmp[0]); i <= parseInt(weektmp[1]); i++) {
        weeksA.push(parseInt(i));
      }
    } else {
      weeksA.push(parseInt(weeksArr[j]));
    }
  }
  return weeksA;
}


function getClass(classHtml, day, section) {
  var classA = [];
  var classHtml = classHtml.replace(new RegExp("<wbr>", "g"), ""); // 去除无用字符
  var classs = classHtml.split('讲课学时').filter(item => item != ''); // 分割课程并去空
  if (classs.length >= 1) { //防止空课表
    for (var i = 0; i < classs.length; i++) { //遍历所有课程
      if (classs[i].indexOf("<br>") != -1) { //判断课程信息是否可以正常分割
        var classObj = {};
        var classesObj = classs[i].split("<br>").filter(item => item != ''); //对课程进行分割

        if (classesObj.length == 4) {
          classObj.name = classesObj[0];
          classObj.position = classesObj[1];
          classObj.teacher = classesObj[2];
          classObj.weeks = [].concat(getWeeks(classesObj[3]));
          classObj.day = day;
          classObj.sections = [];
          classObj.sections.push(section);
          classA.push(classObj);
        }
        else {
          classObj.name = classesObj[0];
          classObj.position = "无具体上课地点";
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