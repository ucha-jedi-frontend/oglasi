const _api = axios.create({
    baseURL: `http://localhost:3000`
});

async function displayAds() {
    let response = await _api.get(`/listings`);
    let ads = await response.data

    for (const ad of ads) {
        let description = await getDescription(ad.id);
        let room = getRoomDescription(ad.roomCount);
        _render(ad, description, room);
    }
}

async function filter() {
    let city = searchArea();
    let price = searchPrice();
    let surface = searchSurface();
    let room = searchNumberRooms();
    let floor = searchFloor();
    let id = searchId();

    let response = await _api.get(`/listings?${city}&${price}&${surface}&${room}&${floor}&${id}`);
    let ads = await response.data
    console.log(ads)
    $(`.jelena`).empty()
    if (ads.length === 0) {
        $(`.jelena`).append('Nema rezultata koji ispunjavaju vase zahteve. Vratite se na pretragu. ');
    }
    for (const ad of ads) {
        let description = await getDescription(ad.id);
        let room = getRoomDescription(ad.roomCount);
        _render(ad, description, room);
    }
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
        case 0:
            room = `garsonjera`;
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
    }
    return room;
}

async function _render(ad, description, room = ``) {
    $(`.jelena`).append(`<div class="row box marg-top">
<div class="box-img">
    <img src="${ad.imgUrl}" alt="${ad.id}">
</div>
<div class="box-body text-left">
    <h2><a href="#" class="stretched-link">${ad.street}, ${ad.m2}m2, ${room}</a></h2>
    <p class="location">${ad.district}, ${ad.area}, Srbija</p>
    <p class="description">${description}</p>
    <div class="details">
        <div>npm run
            <p>Cena</p>
            <p class="price">
                <span>${ad.price} &euro;</span>
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

    $("#formButton").click(function () {

        $("#dropdown").toggle();

    });

});

function searchArea() {
    let cityInput = document.getElementById('detail_search_id_city');
    let city = '';
    if (!(cityInput.selectedIndex == 0 || cityInput.selectedIndex == 5)) {
        city = `area=${cityInput.options[cityInput.selectedIndex].label}`;
    }
    return city;
}

function searchNumberRooms() {
    let roomMin = document.getElementById('min_nb_rooms').value;
    let roomMax = document.getElementById('max_nb_rooms').value;
    let rooms = '';
    if (roomMin == 0 & roomMax == 0) {
        rooms = '';
    } else if (roomMin == 0 & roomMax != 0) {
        rooms = `roomCount_lte=${roomMax}`;
    } else if (roomMin != 0 & roomMax == 0) {
        rooms = `roomCount_gte=${roomMin}`;
    } else {
        rooms = `roomCount_gte=${roomMin}&roomCount_lte=${roomMax}`;
    }
    return rooms;
}

function searchPrice() {
    let priceMin = document.getElementById('min_price').value;
    let priceMax = document.getElementById('max_price').value;
    let price = '';
    if (priceMin == 0 & priceMax == 0) {
        price = '';
    } else if (priceMin == 0 & priceMax != 0) {
        price = `price_lte=${priceMax}`;
    } else if (priceMin != 0 & priceMax == 0) {
        price = `price_gte=${priceMin}`;
    } else {
        price = `price_gte=${priceMin}&price_lte=${priceMax}`;
    }

    return price;
}

function searchSurface() {
    let surfaceMin = document.getElementById('min_surface').value;
    let surfaceMax = document.getElementById('max_surface').value;
    let surface = '';
    if (surfaceMin == 0 & surfaceMax == 0) {
        surface = '';
    } else if (surfaceMin == 0 & surfaceMax != 0) {
        surface = `m2_lte=${surfaceMax}`;
    } else if (surfaceMin != 0 & surfaceMax == 0) {
        surface = `m2_gte=${surfaceMin}`;
    } else {
        surface = `m2_gte=${surfaceMin}&m2_lte=${surfaceMax}`;
    }
    return surface;
}

function searchFloor() {
    let floorMin = document.getElementById('min_floor').value;
    let floorMax = document.getElementById('max_floor').value;
    let floor = '';
    if (floorMin == 0 & floorMax == 0) {
        floor = '';
    } else if (floorMin == 0 & floorMax != 0) {
        floor = `floor_lte=${floorMax}`;
    } else if (floorMin != 0 & floorMax == 0) {
        floor = `floor_gte=${floorMin}`;
    } else {
        floor = `floor_gte=${floorMin}&floor_lte=${floorMax}`;
    }
    return floor;
}

function searchId() {
    let idInput = document.getElementById('idAd').value;
    let idAd = '';
    if (idAd != 0) {
        let idAd = `id=${idInput}`;
    }

    return idAd;
}               