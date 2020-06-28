function users() {
  get = function () {
    return axios.get('http://localhost:3000/proteins');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/proteins/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
