$(function () {
  var currentPage = 1
  var pageSize = 5
  var isDelete
  var currentId
  render()

  function render() {
    $.ajax({

      url: '/user/queryUser',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);

        var str = template("userTmp", info)
        $("tbody").html(str)

        // 在ajax请求回来后, 根据最新的数据, 进行初始化分页插件
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page
            render()
          }
        });
      }

    })
  }

  $("tbody").on("click", ".btn", function () {
    $("#userMoudel").modal("show")
    currentId = $(this).parent().data("id")
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  })
  // 模态框确认按钮被点击，发送ajax，进行修改状态
  $("#confirmBtn").click(function () {
    $.ajax({
      data: {
        id: currentId,
        isDelete: isDelete
      },
      url: "/user/updateUser",
      type: 'post',
      dataType: "json",
      success: function (info) {
        console.log(info);
        // render()
        if (info.success) {
          $("#userMoudel").modal("hide")
          render()

        }
      }
    })
  })
})