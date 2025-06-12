
// part one
let food = ['Burger', 'Pizza', 'Donuts', 'Pizza', 'Koshary', 'Donuts', 'Seafood', 'Burger']

let x = new Set(food);
x.add('pasta');
console.log(x);
x.delete('Burger')
console.log(x);

function ClearSet(set){
    if (set.size >2){
        set.clear();
        console.log('There is more than 2 items');
    }
    else{
        console.log('There is only 2 or less items');
    }
}
ClearSet(x)
console.log(x);
//------------------------------------------------

// part two

class Vehicle{
 constructor(wheels, speed){
    this.wheels = wheels;
    this.speed = speed
 }
}

class Bike extends Vehicle{
    constructor(wheels =2, speed = 'Fast Enough'){
    super(wheels, speed)
 }
    static callCount = 0;
    static countCalls(){
        Bike.callCount++;
        console.log(`this method is called ${Bike.callCount} times`);
    }
}
let bike01 = new Bike();
let bike02 = new Bike(5, 'very fast');
let bike03 = new Bike(1, 'slow');
Bike.countCalls();
Bike.countCalls();
Bike.countCalls();

//-----------------------------------------
let option = document.querySelectorAll('#options .nav-link');
let mydata = []

option.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); 
    let selected = e.target.getAttribute('data-value');  
    getdata(selected);
  });
});


async function getdata(option) {
  showLoader();
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${option}`);
    const result = await res.json();
    mydata = result.recipes;
    display(); 
  }
  catch(error){
    document.getElementById('items').innerHTML = `<p class="text-danger">Failed to load recipes.</p>`;
  }
  finally {
    hideLoader();
}   
}
 
getdata('beef')
function display(){
    let cartona = ``;
    for (let i = 0; i < mydata.length; i++) {
        cartona += ` <div class="col-md-4">
                <img src="${mydata[i].image_url}" class = "w-100" alt="">
                <h4>${mydata[i].title}</h4>
            </div>` ; 
    }
    document.querySelector('#items').innerHTML = cartona;
}
//loader
function showLoader() {
 
  document.getElementById("loader-overlay").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader-overlay").style.display = "none";
}