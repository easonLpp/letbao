// 进度条
$(document).ajaxStart(function () {
  NProgress.start()
  console.log(12);
})

$(document).ajaxStop(function () {
  console.log(34);
  setTimeout(function () {
    NProgress.done()
  }, 5000);

})

// 左侧侧边栏
$(function () {
  // 左侧二级菜单切换
  $(".category").click(function () {
    $(this).next().stop().slideToggle();
  })
})