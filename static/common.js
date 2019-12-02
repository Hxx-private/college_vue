/**
  * @param {String} apiurl 接口地址
  * @param {String} callback 回调函数
  */
function axiosGet(vm, apiurl, callback) {
  var loading = vm.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  axios.get(apiurl, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .then(function (response) {
      console.log(response);
      loading.close();
      callback(response)
    })
    .catch(function (error) {
      loading.close();
      console.log(error.status);
    });
}
/**
  * @param {String} apiurl 接口地址
  * @param {Object} data 参数信息
  * @param {String} callback 回调函数
  */
function axiosDelete(apiurl, data, callback) {
  var loading = vm.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  axios.delete(apiurl, data)
    .then(function (response) {
      console.log(response);
      loading.close();
      callback(response)
    })
    .catch(function (error) {
      loading.close();
      console.log(error);
    });
}
