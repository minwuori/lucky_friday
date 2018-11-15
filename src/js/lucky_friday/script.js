

//анимашка санты на главной
$(window).scroll(function() {
	if ($(this).scrollTop() > 1){ 
		$('.lucky-friday__img-santa').removeClass("none");
		$('.lucky-friday__img-santa').addClass("right");
	}
	else if ($(this).scrollTop() < 800){
		$('.lucky-friday__img-santa').removeClass("right");
		$('.lucky-friday__img-santa').addClass("none");
		$(".menu__item").removeClass('active');
		$(".menu__item:eq(0)").addClass('active');
	}
});

//плавный скрол страницы при клике на меню header
$('.menu__item').click(function() {

	$(".menu__item").removeClass('active');
	$(this).addClass('active');
	var hash=window.location.hash;
	var anchor=$(this);

	if(hash){
	    $(".menu__item").removeClass("active");
	    anchor.addClass("active");
	}

	$("html, body").animate({
	    scrollTop: $(anchor.attr("href")).offset().top - 190
	}, 1000);
});

//плавный скрол страницы при клике на меню header
$('.lucky-friday__img-down').click(function() {
	
	var hash=window.location.hash;
	var anchor=$(this);

	$("html, body").animate({
	    scrollTop: $(anchor.attr("href")).offset().top - 190
	}, 1000);
});

	//клик на карту
$('.region').click(function() {
	
	var region = $(this).data('region');
	//выборка по соответствию data-region в map с data-date в slider
	$('.date:not([data-date~=' + region + '])').removeClass('active');
	$('.date[data-date~=' + region + ']').addClass('active');

	$('.marker:not([data-marker~=' + region + '])').removeClass('active');
	$('.marker[data-marker~=' + region + ']').addClass('active');

	$('.marker-full_30').css('display', 'none');
	$('.marker-full_14').css('display', 'none');
	$('.region').removeClass('full');
	$('.marker').css('display', 'block');

	$('.region').removeClass('active');
	$(this).addClass('active');
});

//клик на календарь
$('.date').click(function(){
	var date = $(this).data('date');

	if (date == 14){
		$('.region').addClass('full');
		$('.marker').css('display', 'none');
		$('.marker-full_30').css('display', 'none');
		$('.marker-full_14').css('display', 'block');
		$('.date').removeClass('active');
		$(this).addClass('active');
	} else if (date == 30){
		$('.region').addClass('full');
		$('.marker').css('display', 'none');
		$('.marker-full_14').css('display', 'none');
		$('.marker-full_30').css('display', 'block');
		$('.date').removeClass('active');
		$(this).addClass('active');
	} else {
		$('.region').removeClass('full');
		$('.region:not([data-region~=' + date + '])').removeClass('active');
		$('.region[data-region~=' + date + ']').addClass('active');

		$('.marker').css('display', 'block');
		$('.marker:not([data-marker~=' + date + '])').removeClass('active');
		$('.marker[data-marker~=' + date + ']').addClass('active');
		$('.marker-full_30').css('display', 'none');
		$('.marker-full_14').css('display', 'none');

		$('.marker').css('display', 'block');
		$('.date').removeClass('active');
		$(this).addClass('active');
	}

});

//клик на маркер
$('.marker').click(function(){
	var marker = $(this).data('marker');
	//выборка по соответствию data-marker в map с data-date в slider
	$('.date:not([data-date~=' + marker + '])').removeClass('active');
	$('.date[data-date~=' + marker + ']').addClass('active');

	$('.region:not([data-region~=' + marker + '])').removeClass('active');
	$('.region[data-region~=' + marker + ']').addClass('active');

	$('.marker').removeClass('active');
	$(this).addClass('active');
});


//проверка на дату

var day_a = "2018-11-15", // дата в формате день.месяц.год (начало дня)
	today = new Date()
	
//двух строчек ниже можно избежать если сразу присылать дату в формате месяц/день/год
// day_a = day_a.split('.');
// day_a = day_a[1]+'/'+day_a[0]+'/'+day_a[2] ;

day_a = new Date(Date.parse(day_a));
day_a.setDate(day_a.getDate());

var day_b; //(конец дня)
day_b = new Date(Date.parse(day_a));
day_b.setHours(day_a.getHours() + 23);
day_b.setMinutes(day_a.getMinutes() + 59);

console.log('начало дня: ' + day_a);
console.log('конец дня: ' + day_b);
console.log('cегодня: ' + today);


var btn = document.getElementsByClassName('btn'),
	btnGo = document.getElementsByClassName('btn__go');
	console.log(btnGo);
	console.log(btn);

if (today.getTime() >= day_a.getTime() && today.getTime() <= day_b.getTime()) {
 //показываем контент 
	console.log('сегодня в нужном периоде');

	btn.style.display =  "none";
	btnGo.style.display =  "block";

} else if (today.getTime() > day_b.getTime()){
 //скрываем контент 
	console.log('сегодняшняя дата больше указанного периода');
} else {
	console.log('сегодняшняя дата меньше указанного периода');
}