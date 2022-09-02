class Controller {
    constructor() {
      console.log("Singleton / Controller created");
      this.display = document.createElement("section");
      this.display.className = "user-profile";
      this.display.remove();  
      this.runFetch();
      document.querySelector("#generate").addEventListener("click", () => {

        this.runFetch()
      })
    }
    runFetch() {
      const url = "https://reqres.in/api/users/",
        randomNumber = Math.floor(Math.random() * 12),
        page = document.querySelector("main");
      console.log(randomNumber);
  
      fetch(url + randomNumber)
        .then((response) => {
          if (response.ok) {
            console.log("Fetch GET successful!");
          } else {
            console.log("Fetch GET unsuccessful!");
          }
          return response;
        })
        .catch((error) => console.log(error))
        .then((response) => response.json())
        .then((data) => this.displayUser(data));
    }
  
  
    displayUser(user) {
      console.log(user);
  
      
      
      this.display.dataset.userId = user.data.id;
  
      this.display.innerHTML = `   
            <img src="${user.data.avatar}">
              <h2>${user.data.first_name} ${user.data.last_name}</h2>
              <p>Email: <span>${user.data.email}</span></p>`;
  
     
      document.querySelector("main").append(this.display);
    }
  
   
    static getInstance() {
      if (!Controller._instance) {
        Controller._instance = new Controller();
        return Controller._instance;
      } else {
        throw "Singleton has already been created!";
      }
    }
  } // End of Controller Class
  

  // IIFE - Immediately Invoked Function Expression
  (() => {
    //instantiate Singleton
    const app = Controller.getInstance();
  })();
  