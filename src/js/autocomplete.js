
function autocomplete(inp, arr) {
  
    var currentFocus;
  
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
       
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
      
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        
        this.parentNode.appendChild(a);
        
        for (i = 0; i < arr.length; i++) {
            
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                
                b = document.createElement("DIV");
                
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
               
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                
                b.addEventListener("click", function (e) {
                   
                    inp.value = this.getElementsByTagName("input")[0].value;
                   
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            
            currentFocus++;
           
            addActive(x);
        } else if (e.keyCode == 38) { 
           
            currentFocus--;
            
            addActive(x);
        } else if (e.keyCode == 13) {
            
            e.preventDefault();
            if (currentFocus > -1) {
               
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        
        if (!x) return false;
        
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
       
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
      
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  var city = ["Aleksandrovac",
    "Aleksinac",
    "Alibunar",
    "Apatin",
    "Aranđelovac",
    "Arilje",
    "Bač",
    "Bačka Palanka",
    "Bačka Topola",
    "Bački Petrovac",
    "Bajina Bašta",
    "Batočina",
    "Bečej",
    "Bela crkva",
    "Beočin",
    "Beograd",
    "Blace",
    "Bogatić",
    "Boljevac",
    "Bor",
    "Brus",
    "Čačak",
    "Čajetina",
    "Ćićevac",
    "Ćuprija",
    "Despotovac",
    "Doljevac",
    "Gadžin Han",
    "Gnjilane",
    "Gornji Milanovac",
    "Inđija",
    "Irig",
    "Ivanjica",
    "Jagodina",
    "Kikinda",
    "Kladovo",
    "Knjaževac",
    "Koceljeva",
    "Kopaonik",
    "Kosovska Mitrovica",
    "Kostolac",
    "Kovačica",
    "Kovin",
    "Kragujevac",
    "Kraljevo",
    "Kruševac",
    "Kučevo",
    "Kula",
    "Kuršumlija",
    "Lapovo",
    "Leskovac",
    "Ljig",
    "Ljubovija",
    "Loznica",
    "Lučani",
    "Majdanpek",
    "Negotin",
    "Niš",
    "Nova Pazova",
    "Nova Varoš",
    "Novi Pazar",
    "Novi Sad",
    "Odžaci",
    "Opovo",
    "Pančevo",
    "Paraćin",
    "Peć",
    "Pećinci",
    "Petrovac na Mlavi",
    "Pirot",
    "Požarevac",
    "Požega",
    "Prijepolje",
    "Priština",
    "Prizren",
    "Prokuplje",
    "Rača",
    "Ražanj",
    "Ruma",
    "Šabac",
    "Senta",
    "Šid",
    "Smederevo",
    "Soko Banja",
    "Srbobran",
    "Sremski Karlovci",
    "Sjenica",
    "Subotica",
    "Smederevska Palanka",
    "Temerin",
    "Sombor",
    "Topola",
    "Sremska Mitrovica",
    "Tutin",
    "Stara Pazova",
    "Užice",
    "Svilajnac",
    "Varvarin",
    "Titel",
    "Veliko Gradište",
    "Trstenik",
    "Vladičin Han",
    "Ub",
    "Vlasotince",
    "Valjevo",
    "Vranje",
    "Velika Plana",
    "Vrbas",
    "Vrdnik",
    "Vrnjačka banja",
    "Vršac",
    "Žabalj",
    "Žabari",
    "Žagubica",
    "Zaječar",
    "Zlatibor",
    "Zrenjanin"]
  
  
  autocomplete(document.getElementById("town"), city);