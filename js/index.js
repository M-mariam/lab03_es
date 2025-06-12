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