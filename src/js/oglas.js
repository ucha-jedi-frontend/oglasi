// import {getDescription} from "./main.js"
// import {getRoomDescription} from "./misc.js"

const _apiOg = axios.create({
    baseURL: `http://localhost:3000`
  });

(function getAdId() {
    const id = JSON.parse(sessionStorage.getItem(`id oglasa`)) ;
    displayAd(id);
})();

async function displayAd(id) {
    let response = await _apiOg.get(`/listings?id=${id}`);
    let ad = await response.data;
    let description =await getDescription(id);
    let room = getRoomDescription(ad[0].roomCount);
    let heating = getHeating(ad[0].heating)
    _renderAd(ad[0], description, room, heating);
  }

async function getDescription(id) {
    try {
        let response = await _apiOg.get(`/listingDescriptions?id=${id}`);
        let descriptions = response.data;
        let description = descriptions[0].text;
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
    case 5:
    room = `lokal`;
    break;
    case 6:
    room = `zemljište`;
    break;
}
return room;
}
function getHeating(heating) {
    let heatingType;
    switch (heating) {
        case 1: heatingType = `Centralno`;
        break;
        case 2: heatingType = `Gas`;
        break;
        case 3: heatingType = `Struja`;
        break;
        case 4: heatingType = `Čvrsto gorivo`;
        break;
        case 5: heatingType = `Podno`;
        break;
        
    }
    return heatingType;
    }

   async function _renderAd(ad, description, room = ``, heating = ``) {

    $(`#asideImg1`).attr(`src`,`${ad.imgUrl}`);
    $(`#asideImg2`).attr(`src`,`${ad.img1Url}`);
    $(`#asideImg3`).attr(`src`,`${ad.img2Url}`);
    $(`#asideImg4`).attr(`src`,`${ad.img3Url}`);

    $(`#img1`).append(`
    <img src="${ad.imgUrl}" alt="Nekretnina u ulici ${ad.street}" class="responsive"></img>`)
    $(`#img2`).append(`
    <img src="${ad.img1Url}" alt="Nekretnina u ulici ${ad.street}" class="responsive"></img>`)
    $(`#img3`).append(`
    <img src="${ad.img2Url}" alt="Nekretnina u ulici ${ad.street}" class="responsive"></img>`)
    $(`#img4`).append(`
    <img src="${ad.img3Url}" alt="Nekretnina u ulici ${ad.street}" class="responsive"></img>`)

    $(`.s_desna`).append(`
    <div><span>${ad.price} &euro;</span></div>
    <div><span>${Math.floor(ad.price / ad.m2)} &euro;/m<sup>2</sup></span></div>
    <div><span>${ad.legalization_completed === true ? `Da` : `Ne`}</span></div>
    <div><span>${heating}</span></div>
    <div><span>${ad.m2} m<sup>2</sup></span></div>
    <div><span>${ad.parking === true ? `Da` : `Ne`}</span></div>
    <div><span>${ad.floor}</span></div>
    <div><span>${room}</span></div>
    <div><span>${ad.elevator === true ? `Da` : `Ne`}</span></div>
    <div><span>${ad.terrace === true ? `Da` : `Ne`}</span></div>`)
  
   $(`.opis_oglasa`).append(`
   <h2>${ad.street}, ${ad.district}, ${ad.area}, ${ad.m2} m<sup>2</sup>, ${room}</h2>
    <p>${description}</p>`)
}       
