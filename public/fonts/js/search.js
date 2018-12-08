$(function () {
  // 由于所有的功能都是对本地存储的操作,约定一个键 :search_list

  // localStorage 以键值对的方式存储数据的, 而且只能存储字符串类型的数据
  //   (1) 存储复杂数据类型
  // 将复杂数据类型转成 jsonStr 进行存储
  // JSON.stringify(arr / obj) 将复杂数据类型 转成 jsonStr

  // 后台测试
  // var arr = ["张三", "李四", "王五", "赵六"]
  // var jsonStr = JSON.stringify(arr)
  // localStorage.setItem('search_list', jsonStr)

  // 功能分析
  // 1. 获取所有搜索历史, 完成渲染
  // 2. 删除单个搜索历史
  // 3. 清空所有搜索历史
  // 4. 添加单个搜索历史


  //  * 功能1: 渲染功能
  //  * (1) 获取本地历史, 得到jsonStr
  //  * (2) 将jsonStr转成数组
  //  * (3) 根据模板引擎渲染  template( id, 对象 )
  function getArr() {
    var jsonStr = localStorage.getItem("search_list") || '[]'
    console.log(jsonStr);
    // 转成数组
    var arr = JSON.parse(jsonStr)
    console.log(arr);
    return arr
  }

  function searchTpl() {

    var arr = getArr()
    var htmlstr = template("getHistory", {
      list: arr
    })
    $(".lt_history").html(htmlstr)
  }

  searchTpl()

  // 2. 清空所有搜索历史
  //  点击清空按钮,清空所有搜索记录
  // 重新渲染模板
  $(".lt_history").on("click", '.trashBtn', function () {
    console.log(123);
    mui.confirm("你确定清空历史记录吗", "温馨提示" ["取消", "确认"], function (e) {
      console.log(e);
      //  e.index 就是点击的按钮的下标
      if (e.index == 1) {
        localStorage.removeItem("search_list")
        searchTpl()
      }
    })

  })

  // 3.删除单个搜索记录
  $(".lt_history").on("click", '.iconTrash', function () {
    // 得到数组
    var arr = getArr()
    // 获取下标
    var index = $(this).data("index")
    // arr.splice( 从哪开始, 删几个, 替换项1, 替换项2, ... );
    // 删除对应数组
    arr.splice(index, 1)
    // 转成 jsonStr, 存储到本地
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem("search_list", jsonStr)
    // 渲染
    searchTpl()
  })

  // 4: 功能4: 添加单个历史记录
  // * (1) 给搜索按钮, 添加点击事件
  // * (2) 获取搜索关键字
  // * (3) 获取数组, 往数组最前面追加  unshift
  // * (4) 转成 jsonStr, 存储到本地存储中
  // * (5) 重新渲染

  $(".searchBtn").click(function () {
    var key = $('.search_input').val().trim();

    // 获取数组
    var arr = getArr()
    // (1) 如果有重复项, 先将重复项删除
    var index = arr.indexOf(key)
    if (index !== -1) {
      // 有重复项,根据index删除对应向
      arr.splice(index, 1)

    }

  })


})