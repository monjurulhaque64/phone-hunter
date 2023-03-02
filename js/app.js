const loadPhone = async(searchText, datalimit) => {
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhnone(data.data, datalimit)
}


const displayPhnone = (phones, datalimit) =>{
    const phoneContainer = document.getElementById('phone-contaner');
    phoneContainer.textContent = '';
    // display 20 phone
    const showAll = document.getElementById('show-all');
    if(datalimit && phones.length > 10){
        phones = phones.slice(0, 20);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }


    // display no data
    const noData = document.getElementById('no-data');
    if(phones.length === 0){
        noData.classList.remove('d-none');
    }
    else{
        noData.classList.add('d-none');
    }

    phones.forEach(phone => {
       const phoneDiv = document.createElement('div');
       phoneDiv.classList.add('col')
       phoneDiv.innerHTML = `
       <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="..">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <a onclick="ladPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</a>
            </div>
     </div>
       `
       phoneContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleLoader(false);
}

const processSeach = (datalimit) => {
    toggleLoader(true);
    const searchFeild = document.getElementById('search-feild');
    const searchText =searchFeild.value;
    loadPhone(searchText, datalimit)
}

document.getElementById('btn-search').addEventListener ('click', function(){
    // start loader
    processSeach(10);
})

// input search by enter key
document.getElementById('search-feild').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSeach(10);
    }
})


const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


document.getElementById('btn-show-all').addEventListener('click', function(){
    processSeach();
})


const ladPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)
}
// loadPhone()