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
$(document).ready(function() {

	$('.region').click(function() {
		
		var region = $(this).data('region');
		console.log(region);
    //выборка по соответствию data-region в map с data-date в slider
		$('.lucky-friday__slider:not([data-date~=' + region + '])').removeClass('active');
		$('.lucky-friday__slider[data-date~=' + region + ']').addClass('active');
		$('.region').removeClass('active');
		$('.marker[data-marker~=' + region + ']').css('fill-opacity', '1');
		$(this).addClass('active');
	});

	$('.date').click(function(){
		$('.lucky-friday__slider').removeClass('active');
		$(this).addClass('active');
	});
	$('.marker').click(function(){
		console.log($(this).data('marker'));
	});
});