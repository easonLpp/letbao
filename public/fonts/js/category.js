$(function () {
  // 一进页面发送一级分类ajax请求

  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlstr = template("firstTpl", info)
      $(".lt_category_left ul").html(htmlstr)

      render(info.rows[0].id)
    }
  })


  // 给一级分类注册点击事件
  $(".lt_category_left ul").on("click", 'a', function () {

    $(".lt_category_left ul a").removeClass("current")
    $(this).addClass("current")
    // $(this).parent.siblings.child.removeClass("current")
    render($(this).data("id"))

  })


  // 根据一级分类的id 渲染 二级分类
  function render(id) {

    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      dataType: 'json',
      data: {
        id: id
      },
      success: function (info) {
        console.log(info);
        var str = template("secondTpl", info)
        $(".lt_category_right ul").html(str)
      }
    })

  }

})