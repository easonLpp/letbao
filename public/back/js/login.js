$(function () {
  $(".form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          // callback 专门用来配置回调的message（自定义）(必须是callback)
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '请输入密码'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback: {
            message: '密码输入错误'
          }
        }
      }
    }
  });
  /*
   * 2. 校验成功后, 会触发一个事件, 表单校验成功事件
   默认是会提交表单的, 页面就跳转了,
   我们需要注册表单校验成功事件, 在成功事件中, 阻止默认的提交, 通过 ajax 提交
   * */
  $(".form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url: "/employee/employeeLogin",
      data: $(".form").serialize(),
      dataType: "json",
      type: "post",
      success: function (res) {
        console.log(res);
        if (res.error === 1000) {
          // alert("用户不存在");
          // 更新当前input的校验状态
          // updateStatus(filed, status, validator)
          // 参数一：filed：字段名称
          // 参数二：status：状态 
          // 取值：NOT_VALIDATED()未校验 ，VALIDATing（校验中），INVALID（校验失败），VALID（校验成功）
          // 参数三：validator:配置校验规则，用来配置输出的提示信息
          $(".form").data('bootstrapValidator').updateStatus('username', "INVALID", 'callback');
          return;

        }

        if (res.error === 1001) {
          // alert("密码错误");
          $(".form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
          return;
        }

        if (res.success) {
          console.log('123');
          // location.href = "index.html"
        }

      }
    })
  });
  // 重置表单
  /*
   * 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态
   * */
  $('[type="reset"]').click(function () {

    $('.form').data('bootstrapValidator').resetForm();
  })

})