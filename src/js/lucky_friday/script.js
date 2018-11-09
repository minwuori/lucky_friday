// Массив всех объектов	
	var data_obj = {
		'sa': ['Объект 1', 'Объект 2'],
		'zb': ['Объект 3', 'Объект 4', 'Объект 5'],
		'am': ['Объект 6', 'Объект 7', 'Объект 8']
	};
	
	colorRegion = '#E0E0E0'; // Цвет всех регионов
	focusRegion = '#FF9900'; // Цвет подсветки регионов при наведении на объекты из списка
	selectRegion = '#EB1C24'; // Цвет изначально подсвеченных регионов
	
	highlighted_states = {};
	
	// Массив подсвечиваемых регионов, указанных в массиве data_obj
	for(iso in data_obj){
		highlighted_states[iso] = selectRegion;
	}
	
	$(document).ready(function() {
		$('#vmap').vectorMap({
		    map: 'russia',
		    backgroundColor: '#ffffff',
			borderColor: '#ffffff',
			borderWidth: 2,
		    color: colorRegion,
			colors: highlighted_states,			
		    hoverOpacity: 0.9,		    
		    enableZoom: false,
		    showTooltip: true,			
			
			// Отображаем объекты если они есть
			onLabelShow: function(event, label, code){
				name = '<strong>'+label.text()+'</strong><br>';				
				if(data_obj[code]){
					list_obj = '<ul>';
					for(ob in data_obj[code]){					
						list_obj += '<li>'+data_obj[code][ob]+'</li>';
					}
					list_obj += '</ul>';
				}else{
					list_obj = '';
				}				
				label.html(name + list_obj);				
				list_obj = '';				
			},			
			// Клик по региону
			onRegionClick: function(element, code, region){
				alert(region+' - ' +code);
			}			
		});		
		
	});
	// Выводим список объектов из массива
	$(document).ready(function() {
		for(region in data_obj){
			for(obj in data_obj[region]){
				$('.list-object').append('<li><a href="'+selectRegion+'" id="'+region+'" class="focus-region">'+data_obj[region][obj]+' ('+region+')</a></li>');
			}
		}
	});
	
	// Подсветка регионов при наведении на объекты
	$(function(){
		$('.focus-region').mouseover(function(){			
			iso = $(this).prop('id');
			fregion = {};
			fregion[iso] = focusRegion;
			$('#vmap').vectorMap('set', 'colors', fregion);			
		});
		$('.focus-region').mouseout(function(){
			c = $(this).attr('href');			
			cl = (c === '#')?colorRegion:c;
			iso = $(this).prop('id');
			fregion = {};
			fregion[iso] = cl;
			$('#vmap').vectorMap('set', 'colors', fregion);
		});
	});	