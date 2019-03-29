function showslide(slidenumber) {
	if (!$(`[data-slide=`+ slidenumber +`]`).hasClass(`item-current`) && !$(`.item-current`).hasClass(`trans`) ) {	
		$(`[data-slide=`+ slidenumber +`]`).addClass(`item-next`);
		$(`.item-next`).addClass(`trans`);
		$(`.item-current`).addClass(`trans`);
	setTimeout(function(){ 
		$(`.item-current`).removeClass(`item-current`);
		$(`.item-next`).removeClass(`item-next`).addClass(`item-current`);
		$(`.trans`).removeClass(`trans`);   
	}, 1000);		
	}		
}

$( `.previmg` ).click(function() {
	showslide($(this).attr(`data-goto`));
});


//Automatski slider
var TotalSlides = $(`.previmg`).length;
var autoslide = true;
var slideinterval=6000;  // sekunde izmedju slajdova
var intervals=[];
var timeouts=[];
var ki=-1;
var kt=-1;

function slideslide() {
	if (autoslide) {
		for (let i=1; i<TotalSlides;i++) {
		intervals[++ki]=setInterval(function(){ showslide(0); }, TotalSlides*slideinterval); 
			timeouts[++kt] = setTimeout(function(){ showslide(i);}, slideinterval*i);
			timeouts[++kt]  = setTimeout(function(){ 
				intervals[++ki]=setInterval(function(){ showslide(i); }, TotalSlides*slideinterval);  
			}, i*slideinterval);
		}
	$(`.stop`).removeClass(`hidden`);
	$(`.play`).addClass(`hidden`);
	}
}

$( `.stop` ).click(function() {
	intervals.forEach(clearInterval);
	timeouts.forEach(clearTimeout);
	$(`.stop`).addClass(`hidden`);
	$(`.play`).removeClass(`hidden`);
});
$( `.play` ).click(function() {
	showslide(0);
    slideslide();
});

$( `.zoom` ).click(function() {
	let uvecajme = $(`.item-current  div  img`).attr(`src`);
	$(`.vidisme`).attr(`src`,  uvecajme);
	$(`.enlarged`).addClass(`show`);
	$(`body`).addClass(`noscroll`);
});
$( `.close-carousel` ).click(function() {
	$(`.enlarged`).removeClass(`show`);
	$(`body`).removeClass(`noscroll`);
});

$( `.rihgt` ).click(function() {
   let vidise = $(`.vidisme`).attr(`src`);   
   let x = parseInt($(`.glavna-slika div img[src='`+ vidise +`']`).parent().parent().parent().attr(`data-slide`));
   let next = (x+1)%TotalSlides;
   let novisrc = $(`[data-slide=`+ next +`] div img`).attr(`src`);
	$(`.videcesme`).attr(`src`,novisrc);
    $(`.videcesme`).addClass(`prelaz`);
    $(`.vidisme`).addClass(`prelaz`);
	setTimeout(function(){ 
		$(`.vidisme.prelaz`).addClass(`videcesme`).removeClass(`prelaz`).removeClass(`vidisme`); 
		$(`.videcesme.prelaz`).addClass(`vidisme`).removeClass(`prelaz`).removeClass(`videcesme`);   
	}, 1000);   	
});
$( `.left` ).click(function() {
   let vidise = $(`.vidisme`).attr(`src`);   
   let x = parseInt($(`.glavna-slika div img[src='`+ vidise +`']`).parent().parent().parent().attr(`data-slide`));
   let next = (x-1+TotalSlides)%TotalSlides;
   let novisrc = $(`[data-slide=`+ next +`] div img`).attr(`src`);
	$(`.videcesme`).attr(`src`,novisrc);
    $(`.videcesme`).addClass(`prelaz`);
    $(`.vidisme`).addClass(`prelaz`);
	setTimeout(function(){ 
		$(`.vidisme.prelaz`).addClass(`videcesme`).removeClass(`prelaz`).removeClass(`vidisme`); 
		$(`.videcesme.prelaz`).addClass(`vidisme`).removeClass(`prelaz`).removeClass(`videcesme`);   
	}, 1000);   	
});

slideslide();









