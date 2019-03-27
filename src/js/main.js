// import a from "./moduleTest"
// console.log(a)
(function (){
const _api = axios.create({
  baseURL: `http://localhost:3000`
});

async function displayAds() {
  let response = await _api.get(`/listings`);
  let ads = await response.data;
  for (const ad of ads) {
    let description = await getDescription(ad.id);
    let room = getRoomDescription(ad.roomCount);
    _render(ad, description, room);
  }
  getCategoryName(0)
}
async function getDescription(id) {
  try {
    let response = await _api.get(`/listingDescriptions?id=${id}`);
    let descriptions = response.data;
    let description = descriptions[0].text;
    if (description.length > 150) {
      return description.substring(0, 150)
    }
    return description;
  } catch (e) {
    console.log(e)
  }
}
function getRoomDescription(roomCount) {
  let room;
  switch (roomCount) {
    case 0: room = `garsonjera`;
      break;
    case 1:
      room = `jednosoban`;
      break;
    case 1.5:
      room = `jednoiposoban`;
      break;
    case 2:
      room = `dvosoban`;
      break;
    case 2.5:
      room = `dvoiposoban`;
      break;
    case 3:
      room = `trosoban`;
      break;
    case 3.5:
      room = `troiposoban`;
      break;
    case 4:
      room = `četvorosoban`;
      break;
    case 4.5:
      room = `četvoroiposoban`;
      break;
    case 5:
      room = `petosoban`;
      break;
    case 600:
      room = `lokal`;
      break;
    case 700:
      room = `zemljište`;
      break;
  }
  return room;
}

async function _render(ad, description, room = ``) {
  $(`.mainBox`).append(`<div class="row box marg-top">
                <div class="box-img">
                    <img src="${ad.imgUrl}" alt="${ad.id}">
                </div>
                <div class="box-body text-left">
                    <h2><a href="oglas.html" data-id=${ad.id}  class="stretched-link">${ad.street}, ${ad.m2}m<sup>2</sup>, ${room}</a></h2>
                    <p class="location">${ad.district}, ${ad.area}, Srbija</p>
                    <p class="description">${description}..</p>
                    <div class="details">
                        <div>
                            <p>Cena</p>
                            <p class="price">
                                <span>${ad.price.toLocaleString(`sr-RS`)} &euro;</span>
                                <small>datum postavljanja oglasa : ${ad.date}</small>
                            </p>
                        </div>
                        <div class="size">
                            <p class="size-label">Kvadratura</p>
                            <span>${ad.m2} m <sup>2</sup></span>
                        </div>
                    </div>
                </div>
            </div>`)
}
displayAds()

$(document).ready(function () {
  $(`#formButton`).click(function (){
  $(`#dropdown`).toggle();
});
  $(`#buttonSearch`).click(filter);
  $(`#nav-list`).click(searchRealEstates);
  $(`#check`).click(getChechboxValues);
  $(`#mainBox`).click(saveToSessionStorage);
  $(`#sort`).change(sortBy);
});


const searchRealEstates = async (e) => {
  const prop = e.target.innerHTML;
  let id;
  switch (prop) {
    case `Stanovi`: id = `1`;
      break;
    case `Kuće`: id = `2`;
      break;
    case `Lokali`: id = `3`;
      break;
    case `Zemljišta`: id = `4`;
      break;
  }
  getCategoryName(id);
  let response = await _api.get(`/listings?descriptionId=${id}`)
  let ads = await response.data;
  $(`.mainBox`).html(``)
  for (const ad of ads) {
    let description = await getDescription(ad.id);
    let room = getRoomDescription(ad.roomCount);
    _render(ad, description, room);
  }
}

function saveToSessionStorage(e) {
  if (e.target.classList.contains(`stretched-link`)) {
  const id = e.target.attributes[1].value;
  sessionStorage.setItem(`id oglasa`, JSON.stringify(id));
  }
}

function searchArea() {
  let cityInput = document.getElementById(`detail_search_id_city`);
  let city = ``;
  if (!(cityInput.selectedIndex == 0 || cityInput.selectedIndex == 5)) {
      city = `area=${cityInput.options[cityInput.selectedIndex].label}`;
  }
  return city;
}
function searchInput(id,name){
  let input = document.getElementById(id);
  let value = ``;
  if (input.selectedIndex != 0) {
    value = `${name}=${input.options[input.selectedIndex].value}`;
  }
  return value;
}

function searching(minVal,maxVal,name){
  let min = document.getElementById(minVal).value;
  let max = document.getElementById(maxVal).value;
  let value = ``;
  if(min == 0 & max == 0) {
    value = ``;
  } else if (min == 0 & max != 0) {
    value = (`${name}_lte=${max}`)
  } else if (min != 0 & max == 0) {
    value = (`${name}_gte=${min}`);
  } else {
    value = `${name}_gte=${min}&${name}_lte=${max}`
  }
  return value;
}
function searchId() {
  let idInput = document.getElementById(`idAd`).value;
  let idAd = ``;
  if (idInput != 0) {
      idAd = `id=${idInput}`;
  }
  return idAd;
}               

async function filter() {
  let id = searchId();
  if(id != ``){
    let response = await _api.get(`/listings?${id}`);
    let ads = await response.data;
    $(`.mainBox`).empty()
  if (ads.length === 0) {
      $(`.mainBox`).append(`Nema rezultata koji ispunjavaju vase zahteve. Vratite se na pretragu.`);
  } else{
    let ad = ads[0];
    let description = await getDescription(ad.id);
    let room = getRoomDescription(ad.roomCount);
    _render(ad, description, room);
  }
} else{
    filteringAll()
  }
}

function getChechboxValues(){
  let checkBtn = []
  const checkButtons = $(`#filt :checkbox:checked`)
  for (const btn of checkButtons) {
    const str = `${btn.name}=${true}`
    checkBtn.push(str)
  } 
   return  checkBtn;
}

async function filteringAll(){
  const checkBoxes = getChechboxValues();
  const values = [searchArea(),searching(`min_price`,`max_price`,`price`),searching(`min_surface`,`max_surface`,`m2`),
                  searching(`min_nb_rooms`,`max_nb_rooms`,`roomCount`),searching(`min_floor`,`max_floor`,`floor`),
                  searchInput(`id_heating`,`heating`),searchInput(`detail_type`,`descriptionId`),...checkBoxes].filter(w=>w);
const sda = values.length > 0 ? `?${values.join(`&`)}` : ``;
let response = await _api.get(`/listings${sda}`);
let ads = await response.data;
$(`.mainBox`).empty()
if (ads.length === 0) {
    $(`.mainBox`).append(`Nema rezultata koji ispunjavaju vase zahteve. Vratite se na pretragu.`);
} else{
for (const ad of ads) {
    let description = await getDescription(ad.id);
    let room = getRoomDescription(ad.roomCount);
    _render(ad, description, room);
}
}
const idd = $(`#detail_type`).val();
getCategoryName(idd);
}

function getCategoryName(id){
  let str = `Kategorija: `
  const catname = $(`#catname`);
  switch(id){
    case `0`: catname.text(`${str}sve`).attr(`data-id`,`0`);
    break;
    case `1`: catname.text(`${str}stanovi`).attr(`data-id`,`1`);
    break;
    case `2`:  catname.text(`${str}kuće`).attr(`data-id`,`2`);
    break;
    case `3`:  catname.text(`${str}lokali`).attr(`data-id`,`3`);
    break;
    case `4`: catname.text(`${str}zemljište`).attr(`data-id`,`4`);
    break;
  }
}

async function sortBy(){
  const sort = $(`#sort`).val();
  let val = getSortValue(sort);
  let response;
    const checkBoxes = getChechboxValues();
    const values = [searchArea(),searching(`min_price`,`max_price`,`price`),searching(`min_surface`,`max_surface`,`m2`),
                    searching(`min_nb_rooms`,`max_nb_rooms`,`roomCount`),searching(`min_floor`,`max_floor`,`floor`),
                    searchInput(`id_heating`,`heating`),searchInput(`detail_type`,`descriptionId`),...checkBoxes,val].filter(w=>w);
  const sda = values.length > 0 ? `?${values.join(`&`)}` : ``;
  response = await _api.get(`/listings${sda}`);
  let ads = await response.data;
  $(`.mainBox`).html(``)
  for (const ad of ads) {
    let description = await getDescription(ad.id);
    let room = getRoomDescription(ad.roomCount);
    _render(ad, description, room);
  } 
}

function getSortValue(sort){
  let val;
  switch(sort){
    case `0`: val=`0`
     break;
    // case `1`: val= `jedan`;
    // break;
    // case `2`: val= `dva`;
    // break;
    case `3`: val=`_sort=price&_order=asc`;
    break;
    case `4`: val=`_sort=price&_order=desc`;
  }
  return val;
}

})()