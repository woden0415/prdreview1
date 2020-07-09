const Util = {
  getUrlParams() {
    let url = window.location.href;
    url = url.split("#") || [];
    url = url[1] || "";
    url = url.split("?") || [];
    url = url[1] || "";
    url = url.split("&") || "";
    let result = {};
    for (let i = 0; i < url.length; i++) {
      if (url[i]) {
        let params = url[i].split("=");
        result[params[0]] = decodeURI(params[1]);
      }
    }
    return result;
  },
  debounce(func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  }
};

export default Util;
