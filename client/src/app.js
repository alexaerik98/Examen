function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      proteins: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.proteins = response.data));
    },
    methods: {
      deleteProtein: function(id) {
        console.log('HTTP DELETE spre backend, protein: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.proteins = response.data));  
        });
      },
    }
  });


}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
