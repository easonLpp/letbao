$(function () {
  var currentPage = 1
  var pageSize = 3
  render()
  // 渲染分类页面
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      type: 'get',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var str = template("addFirsttmp", info)
        $("tbody").html(str)
        // 分页
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

  // 添加分类
  $("#addCate").click(function () {
    // console.log(123);
    $('#addFirst').modal('show')
    // 进行表单校
  })

  $('#form').bootstrapValidator({

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 校验字段
    fields: { // input框中需要配置 name
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });





  // 4. 注册表单校验成功事件, 阻止默认的提交, 通过  ajax 提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //   //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      url: '/category/addTopCategory',
      success: function (info) {
        console.log(info);
        // if (info.success)
        $('#addFirst').modal('hide');
        currentPage = 1;
        render();

        // 重置表单(bootstrapValidator 的插件)
        $("#form").data('bootstrapValidator').resetForm(true)
      }
    })

  });

})