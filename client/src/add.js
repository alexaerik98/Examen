function run() {
    new Vue({
      el: '#add',
      data: {
        id: 'default',
        protein: {}
      },
      created: function () {
      },
      methods: {
        addProtein: function() {
            this.protein={"id": 0,
            "name": document.getElementById("name").value,
            "brand": document.getElementById("brand").value,
            "aroma": document.getElementById("aroma").value,
            "size": document.getElementById("size").value,
            "type": document.getElementById("type").value,
            "price": document.getElementById("price").value};
            
            return axios.put('http://localhost:3000/proteins', this.protein).then(
               (response) => {
                    this.message = response.data;
                    console.log(this.message); // saved
                }
            );      
            
          },
        }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  