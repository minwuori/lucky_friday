
//анимашка санты на главной
$(window).scroll(function() {
	if ($(this).scrollTop() > 1){ 
		$('.luckyFriday-img_santa').removeClass("none");
		$('.luckyFriday-img_santa').addClass("right");
	}
	else if ($(this).scrollTop() < 800){
		$('.luckyFriday-img_santa').removeClass("right");
		$('.luckyFriday-img_santa').addClass("none");
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
$('.luckyFriday-img_down').click(function() {
	
	var hash=window.location.hash;
	var anchor=$(this);

	$("html, body").animate({
	    scrollTop: $(anchor.attr("href")).offset().top - 190
	}, 1000);
});

	//клик на карту
$('.region').click(function() {
	
	var region = $(this).data('region');

	$('.luckyFriday').removeClass('blur-out');
	$('.luckyFriday').addClass('blur-in');
	$('body').css('overflow', 'hidden');
	$('.popup-list .popup[data-popup~=' + region + ']').removeClass('hidden');

	//выборка по соответствию data-region в map с data-date в slider
	// $('.date:not([data-date~=' + region + '])').removeClass('active');
	// $('.date[data-date~=' + region + ']').addClass('active');

	// $('.marker:not([data-marker~=' + region + '])').removeClass('active');
	// $('.marker[data-marker~=' + region + ']').addClass('active');

	// $('.marker-full_30').css('display', 'none');
	// $('.marker-full_14').css('display', 'none');
	// $('.region').removeClass('full');
	// $('.marker').css('display', 'block');
	// $('.region').removeClass('active');
	// $(this).addClass('active');

	
});

//клик на календарь
$('.date').click(function(){
	var date = $(this).data('date');

	if (date == 14){
		// $('.region').addClass('full');
		// $('.marker').css('display', 'none');
		// $('.marker-full_30').css('display', 'none');
		// $('.marker-full_14').css('display', 'block');
		// $('.date').removeClass('active');
		// $(this).addClass('active');
	} else if (date == 30){
		// $('.region').addClass('full');
		// $('.marker').css('display', 'none');
		// $('.marker-full_14').css('display', 'none');
		// $('.marker-full_30').css('display', 'block');
		// $('.date').removeClass('active');
		// $(this).addClass('active');
	} else {
		// $('.region').removeClass('full');
		// $('.region:not([data-region~=' + date + '])').removeClass('active');
		// $('.region[data-region~=' + date + ']').addClass('active');

		// $('.marker').css('display', 'block');
		// $('.marker:not([data-marker~=' + date + '])').removeClass('active');
		// $('.marker[data-marker~=' + date + ']').addClass('active');
		// $('.marker-full_30').css('display', 'none');
		// $('.marker-full_14').css('display', 'none');

		// $('.marker').css('display', 'block');
		// $('.date').removeClass('active');
		// $(this).addClass('active');
		$('.luckyFriday').removeClass('blur-out');
		$('.luckyFriday').addClass('blur-in');
		$('body').css('overflow', 'hidden');
		$('.popup-list .popup[data-popup~=' + date + ']').removeClass('hidden');
	}

});

//клик на маркер
$('.marker').click(function(){
	var marker = $(this).data('marker');
	//выборка по соответствию data-marker в map с data-date в slider
	// $('.date:not([data-date~=' + marker + '])').removeClass('active');
	// $('.date[data-date~=' + marker + ']').addClass('active');

	// $('.region:not([data-region~=' + marker + '])').removeClass('active');
	// $('.region[data-region~=' + marker + ']').addClass('active');

	// $('.marker').removeClass('active');
	// $(this).addClass('active');

	$('.luckyFriday').removeClass('blur-out');
	$('.luckyFriday').addClass('blur-in');
	$('body').css('overflow', 'hidden');
	$('.popup-list .popup[data-popup~=' + marker + ']').removeClass('hidden');
});


//клик на "Напомнить"
$('.btn').click(function(){
	$('.luckyFriday').removeClass('blur-out');
	$('.luckyFriday').addClass('blur-in');
	$('body').css('overflow', 'hidden');
	$('.popup-form').removeClass('hidden');
});

//клик на чекбокс
$('.form__item').click(function(){
	if ($(this).attr('my')) {
		$(this).find('ckeckbox').toggleClass('not-checkbox');
		$(this).find('ckeckbox').toggleClass('yes-checkbox');
	} else if ($(this).attr('november')){
		$('checkbox').attr('november').toggleClass('not-checkbox');
		$('checkbox').attr('november').toggleClass('yes-checkbox');
	} else {
		$('checkbox').toggleClass('not-checkbox');
		$('checkbox').toggleClass('yes-checkbox');
	}
});

//клик на 'подписаться'
$('.btn__subscribe').click(function(){
	$('.img_santa').removeClass("none");
	$('.img_santa').addClass("right");
	$('.popup-form .content').addClass('hidden');
	$('.popup-form .form').addClass('hidden');
	$('.popup-form .content__change').removeClass('hidden');

});

//клик на "Х" в popup
$('.close, .content__change .link').click(function () { 
	$('.img_santa').removeClass("right");
	$('.img_santa').addClass("none");
	$('.popup-list .popup').addClass('hidden');
	$('.popup-form').addClass('hidden');
	$('body').css('overflow', 'auto');
	$('.luckyFriday').removeClass('blur-in');
	$('.luckyFriday').addClass('blur-out');
        
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
     	$('.img_santa').removeClass("right");
     	$('.img_santa').addClass("none");
     	$('.popup-list .popup').addClass('hidden');
     	$('.popup-form').addClass('hidden');
		$('body').css('overflow', 'auto');
		$('.luckyFriday').removeClass('blur-in');
		$('.luckyFriday').addClass('blur-out');
    }
});

//проверка на дату

var dayBegin = "2018-11-16T00:00:00", // дата в формате день.месяц.год (начало дня)
	today = new Date(),
	dayKlp = "2018-11-30T00:00:00",
	dayKlpEnd = "2018-11-30T23:59:59",
	dayX = "2018-12-14T00:00:00",
	dayXEnd = "2018-12-14T23:59:59"

	
//двух строчек ниже можно избежать если сразу присылать дату в формате месяц/день/год
// dayBegin = dayBegin.split('.');
// dayBegin = dayBegin[1]+'/'+dayBegin[0]+'/'+dayBegin[2] ;

dayBegin = new Date(Date.parse(dayBegin));
dayBegin.setDate(dayBegin.getDate());

var dayEnd; //(конец дня)i=
dayEnd = new Date(Date.parse(dayBegin));
dayEnd.setHours(dayBegin.getHours() + 23);
dayEnd.setMinutes(dayBegin.getMinutes() + 59);

dayKlp = new Date(Date.parse(dayKlp));
dayKlp.setDate(dayKlp.getDate());

dayKlpEnd = new Date(Date.parse(dayKlpEnd));
dayKlpEnd.setDate(dayKlpEnd.getDate());

dayX = new Date(Date.parse(dayX));
dayX.setDate(dayX.getDate());

dayXEnd = new Date(Date.parse(dayXEnd));
dayXEnd.setDate(dayXEnd.getDate());

console.log('начало дня: ' + dayBegin);
console.log('конец дня: ' + dayEnd);
console.log('cегодня: ' + today);


if (today.getTime() >= dayBegin.getTime() && today.getTime() <= dayEnd.getTime()) {
 //показываем контент 
	console.log('сегодня в нужном периоде');
	$('.text__changeable').addClass('hidden');
	$('.text__changeable_day').removeClass('hidden');
	$('.btn').css('display', 'none');
	$('.btn_go').css('display', 'block');

}else if (today.getTime() >= dayKlp.getTime() && today.getTime() <= dayKlpEnd.getTime()){
	console.log('сегодняшняя дата 30 ноября');
	$('.region').addClass('full');
	$('.marker').css('display', 'none');
	$('.marker-full_14').css('display', 'none');
	$('.marker-full_30').css('display', 'block');
	$('.text__changeable').addClass('hidden');
	$('.text__changeable_klp').removeClass('hidden');
	$('.btn').css('display', 'none');
	$('.btn_go').css('display', 'block');


}else if (today.getTime() >= dayX.getTime() && today.getTime() <= dayXEnd.getTime()){
	console.log('сегодняшняя дата 14');
	$('.region').addClass('full');
	$('.marker').css('display', 'none');
	$('.marker-full_14').css('display', 'block');
	$('.marker-full_30').css('display', 'none');
	$('.calendar').css('display', 'none');
	$('.text__changeable').addClass('hidden');
	$('.text__changeable_day-x').removeClass('hidden').css('margin-bottom', '60px');
	$('.btn').css('display', 'none');
	$('.btn_go').css('display', 'block');


}else if (today.getTime() > dayEnd.getTime()){
 //скрываем контент 
	console.log('сегодняшняя дата больше указанного периода');
	$('.text__changeable').addClass('hidden');
	$('.text__changeable_after-day').removeClass('hidden');

} else {
	console.log('сегодняшняя дата меньше указанного периода');
}