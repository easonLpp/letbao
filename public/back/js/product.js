$(function () {
  var currentPage = 1
  var pageSize = 3
  var picArr = [] // 专门用于存储所有用于提交的图片对象

  render()
  // 1 一进页面，发送ajax请求，渲染商品列表
  function render() {
    $.ajax({
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      type: 'get',
      dataType: 'json',
      url: '/product/queryProductDetailList',
      success: function (info) {
        console.log(info);
        var str = template("productTpl", info)
        $("tbody").html(str)

        // 分页
        $(".productPage").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage, //当前页
          totalPages: Math.ceil(info.total / pageSize), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page
            render()
          }
        });
      }
    })
  }
  // 2，点击添加按钮，显示添加模态框
  $(".addproBtn").click(function () {
    $("#addPro").modal("show")
    // 发送二级分类的ajax请求
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: "json",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        var htmlstr = template("dropdownTpl", info)
        $(".dropdown-menu").html(htmlstr)
      }
    })
  })

  // 3.给二级下拉框里的a注册事件委托
  $(".dropdown-menu").on("click", 'a', function () {
    // 获取文本, 赋值给按钮

    var txt = $(this).text()
    console.log(txt);
    $('.dropdown-toggle .choseSec').text(txt)
    // 获取id, 赋值给隐藏域

    var id = $(this).data("id")
    $("[name=brandId]").val(id)
    // 将隐藏域的校验状态, 更新成 VALID
    $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID")

  })
  // 4配置文件上传插件
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var picObj = data.result
      console.log(picObj);
      // 将上传的图片对象(图片地址和名称) 添加到数组最前面
      picArr.unshift(picObj)
      var picUrl = picObj.picAddr
      // 将每次上传完成的图片, 显示在结构最前面
      $("#imgBox img").prepend('  <img src="' + picUrl + '" style="width: 100px">')
      // 如果长度超过 3, 需要将最后一个移除
      if (picArr.length > 3) {
        picArr.pop(); //删除数组中最后一项        
        // $('#imgBox img:last-of-type')   找最后一个图片类型的子元素  (只关注类型)
        $("#imgBox img:last-of-type").remove()
        // 如果文件上传满了 3张, 当前picStatus的校验状态, 更新成 VALID
        if (picArr.length === 3) {
          $("#form").data('bootstrapValidator').updateStatus("picStatus", "VALID")
        }
      }
    }
  });

  // 5 添加表单校验
  $("#form").bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandId: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      },
    }

  })
  // 6. 注册一个表单校验成功事件, 阻止默认的提交, 通过ajax提交
  var paramsStr = $("#form").serialize()

  // 还需要拼接上图片数据
  // key=value&key1=value1&key2=value2;

  // 多个参数之间, 通过 & 分隔, 每个键值对, 通过 = 分开
  // paramsStr += "&picName1=xx&picAddr1=xx";
  paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr
  paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr
  paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr

  // brandId = 1 & num = 2 &
  // picAddr1 = xx & picName1 = xx &
  // picAddr2 = xx & picName2 = xx &
  // picAddr3 = xx & picName3 = xx
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      dataType: 'json',
      data: paramsStr,
      success: function (info) {
        if (info.success) {
          $("#addPro").modal("hide")
          currentPage = 1;
          render();

          // 重置
          $("#form").data("bootstrapValidator").reserForm(true)
          // 按钮文本和图片需要手动重置
          $("#choseSec").text("请选择二级分类")
          $("#imgBox img").remove();
          picArr = [];
        }
      }
    })
  })

})