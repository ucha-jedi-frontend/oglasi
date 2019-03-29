import "@babel/polyfill";
import {getRoomDescription, getCategoryName, searchRealEstates, saveToSessionStorage,
         filter, getChechboxValues, sortBy, searchNav} from "./misc.js"
import {autocomplete, city} from "./autocomplete" 
import {} from "./modal.js"
import {} from "./form-validation.js"
import {} from "./oglas.js"
import {} from "./carousel.js"
import {} from "./objavi.js"

autocomplete(document.getElementById(`town`), city);
autocomplete(document.getElementById(`detail_search_id_city`), city);


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
  $(`#searhInNav`).click(searchNav);
});

export {getDescription,_render,displayAds,_api}