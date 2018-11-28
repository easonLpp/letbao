// 一进页面。先判断是否登陆过
$.ajax({
  type: 'get',
  url: '/employee/checkRootLogin',
  dataType: 'json',
  success: function (info) {
    console.log(info);
    if (info.error === 400) {
      location.href = 'login.html'
    }
    if (info.success) {
      console.log('登陆成功');
    }
  }
})