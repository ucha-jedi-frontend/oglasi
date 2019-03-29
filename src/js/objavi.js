import {_api} from "./main.js"


// function getFromSessionStorage(item){
//     return JSON.stringify(sessionStorage.getItem(item))
// }
// function setAdInDB(){
//     const user = getFromSessionStorage(`user`);
//     console.log(user)
//     if(user !== []){
//         console.log( `uspelo`)
//     }
// }
$(`#addAd`).submit(async function (evt) {
    evt.preventDefault();
    const descriptionId = $(`#descriptionId option:selected`)[0].index;
    const street = $(`#street`).val();
    const area = $(`#area`).val();
    const district = $(`#district`).val();
    const m2 = $(`#m2`).val();
    const floor = $(`#floor`).val();
    const roomCount = $(`#roomCount`).val();
    const heating = $(`#heating option:selected`)[0].index;
    const imgUrl = $(`#imgUrl`).val();
    const price = $(`#price`).val();
    const parking = $(`#parking`)[0].checked;
    const garage = $(`#garage`)[0].checked;
    const elevator = $(`#elevator`)[0].checked;
    const terrace = $(`#terrace`)[0].checked;
    const loda = $(`#loda`)[0].checked;
    const yard = $(`#yard`)[0].checked;
    const cableTV = $(`#cableTV`)[0].checked;
    const internet = $(`#internet`)[0].checked;
    const phone = $(`#phone`)[0].checked;
    const air_condition = $(`#air_condition`)[0].checked;
    const recent = $(`#recent`)[0].checked;
    const in_construction = $(`#in_construction`)[0].checked;
    const legalized = $(`#legalized`)[0].checked;

    const legalization_completed = $(`#legalization_completed`)[0].checked;
    _api.post(`/listings`, {
        descriptionId: descriptionId,
        street: street,
        area: area,
        district: district,
        m2: m2,
        floor: floor,
        roomCount: roomCount,
        heating: heating,
        imgUrl: imgUrl,
        price: price,
        parking: parking,
        garage: garage,
        elevator: elevator,
        terrace: terrace,
        loda: loda,
        yard:yard,
        cableTV: cableTV,
        internet: internet,
        phone: phone,
        air_condition: air_condition,
        recent: recent,
        in_construction: in_construction,
        legalized: legalized,
        legalization_completed: legalization_completed
      })
      .catch(function (error) {
        console.log(error);
})
})