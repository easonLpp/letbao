$(function () {
  // 一进页面获取二级分类的数据
  var currentPage = 1
  var pageSize = 5
  render()

  function render() {

    $.ajax({
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      success: function (info) {
        console.log(info);

        var htmlstr = template("secondTemp", info)
        $("tbody").html(htmlstr)

        // 分页
        $("#secondVal").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage, //当前页数
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small",
          onPageClicked: function (a, b, c, page) {
            console.log(page);
            currentPage = page
            render()
          }
        })

      }
    })

  }

  // 点击添加按钮 显示模态框
  // var total
  $(".secAddBtn").click(function () {
    console.log(123);
    $("#secAddModal").modal("show")
    // 显示模态框时，请求选择一级菜单的数据
    // 发送ajax请求
    $.ajax({
      data: {
        page: 1,
        pageSize: 100
      },
      type: "get",
      url: '/category/queryTopCategoryPaging',
      dataType: '',
      success: function (info) {
        console.log(info);
        // total = info.total
        var str = template("dropdownTpl", info)
        $(".dropdown-menu").html(str)

      }

    })
  })

  // 给下拉列表的a添加点击事件(通过事件委托)
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    console.log(txt);
    $(".chosFir ").text(txt)
    var id = $(this).data('id');
    $("[name='categoryId']").val(id)
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID")

  })
  // 4. 配置文件上传插件, 让插件发送异步文件上传请求

  $("#fileupload").fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data);
      var picobj = data.result;
      var picUrl = picobj.picAddr
      $("#imgBox img").attr("src", picUrl)
      $('[name="brandLogo"]').val(picUrl);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
  })

  // 表单校验功能
  $("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应input表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          },

        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类名称'
          },

        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传图片'
          },

        }
      },
    }

  });

  // 注册表单校验成功事件

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      data: $('#form').serialize(),
      url: '/category/addSecondCategory',
      type: 'post',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $("#secAddModal").modal("hide")
          currentPage = 1
          render()

          // 重置表单
          $("#form").data("bootstrapValidator").resetForm(true)
          // 由于下拉框和图pain不是表单元素，要手动重置
          // dropdownMenu1
          $(".chosFir").text("请选择一级分类");
          $("#imgBox img").attr("src", "./images/none.png")

        }
      }
    })
  })
})