// 进度条
// NProgress.start();开启进度条
// NProgress.done(),//关闭进度条
// ajax全局事件 (jquery中的全局事件需要给document注册)
// .ajaxComplete() 每个aiax 完成时调用（不管成功与否）
// .ajaxSuccess()  每个ajax只要成功了就会调用
// .ajaxError()    每个ajax只要发送失败了就会调用
// .ajaxSend()     每个ajax发送前调用

//  .ajaxStart()   在第一个ajax请求开始时调用
//  .ajaxStop()    在所有的ajax请求都完成时调用
$(document).ajaxStart(function () {

  NProgress.start()
})

// 现实工作中，不用setTimeout,这里是为了模拟网络延迟
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done()
  }, 500)
})

// 公共的功能：
// 1，左侧二级菜单切换
$(".category").on('click', function () {
  $(this).next().stop().slideToggle();
  //  next():下一个兄弟元素
})