
                const _api = axios.create({
                  baseURL:`http://localhost:3000`
              });

              async function displayAds(){
                let response = await _api.get(`/listings`);
                let ads = await response.data;

                for (const ad of ads) {
                  let description =await getDescription(ad.id);
                  let room = getRoomDescription(ad.roomCount);
                  _render(ad,description,room);
                }
              }

              async function getDescription(id){
                try{
                let response = await _api.get(`/listingDescriptions?id=${id}`);
                let descriptions = response.data;
                let description = descriptions[0].text;
                 if(description.length > 150){
                   return description.substring(0,150)
                 }
                return description;
                }catch(e){
                  console.log(e)
                }
              }
            function getRoomDescription(roomCount){
              let room;
              switch(roomCount){
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
              }
              return room;
            }

            async function _render(ad,description,room=``){
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
           
//autocomplete



