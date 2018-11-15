// // Массив всех объектов	
// 	var data_obj = {
// 		'sa': ['Объект 1', 'Объект 2'],
// 		'zb': ['Объект 3', 'Объект 4', 'Объект 5'],
// 		'am': ['Объект 6', 'Объект 7', 'Объект 8']
// 	};
	
// 	colorRegion = '#E0E0E0'; // Цвет всех регионов
// 	focusRegion = '#FF9900'; // Цвет подсветки регионов при наведении на объекты из списка
// 	selectRegion = '#EB1C24'; // Цвет изначально подсвеченных регионов
	
// 	highlighted_states = {};
	
// 	// Массив подсвечиваемых регионов, указанных в массиве data_obj
// 	for(iso in data_obj){
// 		highlighted_states[iso] = selectRegion;
// 	}
	
// 	$(document).ready(function() {
// 		$('#vmap').vectorMap({
// 		    map: 'russia',
// 		    backgroundColor: '#ffffff',
// 			borderColor: '#ffffff',
// 			borderWidth: 2,
// 		    color: colorRegion,
// 			colors: highlighted_states,			
// 		    hoverOpacity: 0.9,		    
// 		    enableZoom: false,
// 		    showTooltip: true,
// 		    pins: { "ha" : "\u003cimg src=\"img/lucky_friday/little_santa.png\" /\u003e" },
//     		pinMode: 'content',			
			
// 			// Отображаем объекты если они есть
// 			onLabelShow: function(event, label, code){
// 				name = '<strong>'+label.text()+'</strong><br>';				
// 				if(data_obj[code]){
// 					list_obj = '<ul>';
// 					for(ob in data_obj[code]){					
// 						list_obj += '<li>'+data_obj[code][ob]+'</li>';
// 					}
// 					list_obj += '</ul>';
// 				}else{
// 					list_obj = '';
// 				}				
// 				label.html(name + list_obj);				
// 				list_obj = '';				
// 			},			
// 			// Клик по региону
// 			onRegionClick: function(element, code, region){
// 				alert(region+' - ' +code);
// 			}			
// 		});		
		
// 	});
// 	// Выводим список объектов из массива
// 	$(document).ready(function() {
// 		for(region in data_obj){
// 			for(obj in data_obj[region]){
// 				$('.list-object').append('<li><a href="'+selectRegion+'" id="'+region+'" class="focus-region">'+data_obj[region][obj]+' ('+region+')</a></li>');
// 			}
// 		}
// 	});
	
// 	// Подсветка регионов при наведении на объекты
// 	$(function(){
// 		$('.focus-region').mouseover(function(){			
// 			iso = $(this).prop('id');
// 			fregion = {};
// 			fregion[iso] = focusRegion;
// 			$('#vmap').vectorMap('set', 'colors', fregion);			
// 		});
// 		$('.focus-region').mouseout(function(){
// 			c = $(this).attr('href');			
// 			cl = (c === '#')?colorRegion:c;
// 			iso = $(this).prop('id');
// 			fregion = {};
// 			fregion[iso] = cl;
// 			$('#vmap').vectorMap('set', 'colors', fregion);
// 		});
// 	});	
 /*$(window).scroll(function() {
 	var scrollValue = $(window).scrollTop();
 	console.log(scrollValue);
 	var winWdith = $(window).width();
 	var winHeight = $(window).height();
 	var santa = scrollValue - winWdith;
     var santa = santa + 250;
 	if (scrollValue > 1){  
 	    $(".lucky-friday__img-santa").css('left',(winWdith / 2) + (santa  / 2 )+'px');
 	  } else if (scrollValue > 1000){
 	    $(".lucky-friday__img-santa").css('right',(scrollValue / 2)+'px');
 	  }	  
 	});
 */

$(document).ready(function() {
	//анимашка санты на главной
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){ 
			$('.lucky-friday__img-santa').removeClass("none");
			$('.lucky-friday__img-santa').addClass("right");
		}
		else if ($(this).scrollTop() < 800){
			$('.lucky-friday__img-santa').removeClass("right");
			$('.lucky-friday__img-santa').addClass("none");
		}
	});

	//проверка на дату
	

	var day = "15.11.2018", // дата в формате день.месяц.год 
		today = new Date()
		
	//двух строчек ниже можно избежать если сразу присылать дату в формате месяц/день/год
	day = day.split('.');
	day = day[1]+'/'+day[0]+'/'+day[2] ;

   // data = data.join('/').replace(/(^|\/)(\d)(?=\/)/g,"$10$2");


	day = new Date(Date.parse(day));
	day.setDate(day.getDate());

	var days;
	days = new Date(Date.parse(day));
	day.setDate(day.getDate() + 1);

	console.log(day);
	console.log(days);



	if (day.getTime()>=today.getTime() && today.getTime() <= days.getTime()) {
	 //показываем контент 
		console.log('ok');
		console.log(new Date());
	} else if (today.getTime() > day.getTime()){
	 //скрываем контент 
		console.log('more');
		console.log(new Date());
	} else {
		console.log('no');
		console.log(new Date());
	}
	// var period, 
	// 	today = new Date()
	// function checkDate(period) {
	// 	var periods = period.split(',');

	// 	if (today >= new Date(periods[0]) && today <= new Date(periods[1])){
	// 	    console.log('УРА!');

	// 	}else if (today > ){
	// 	    console.log('ЖАЛЬ :(');
	// 	}
	// }

	// checkDate('2018-11-15,2018-11-16');



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
            scrollTop: $(anchor.attr("href")).offset().top
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
});