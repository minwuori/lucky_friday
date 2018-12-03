$(document).ready(function() {
	

    //анимашка санты на главной
	$(window).scroll(function() {

		var first = $('.luckyFriday-first').outerHeight(true);
		var second = $('.luckyFriday-im').outerHeight(true);

		var sale20 = $('.luckyFriday-im .vertical-text');
		var im = $('.luckyFriday-im');

		var sale30 = $('.luckyFriday-klp .vertical-text');
		var klp = $('.luckyFriday-klp');

	    var topIm = im.offset().top;
	    var bottomIm = topIm + im.outerHeight(true) - 650;

	    var topKlp = klp.offset().top;
	    var bottomKlp = first + second + second/5;
	    
	    if ($(document).scrollTop() > first/1.5) { sale20.css('position','fixed').css('display', 'flex'); }
	    else { sale20.css('display','none'); }
	    if ($(document).scrollTop()  >bottomIm) { sale20.css('top', bottomIm + $(document).scrollTop()).css('display','none'); }
	    else { sale20.css('top', '48%'); }

	    if ($(document).scrollTop() > second + first/2) {  sale30.css('position','fixed').css('display', 'flex'); }
	    else { sale30.css('display','none'); }
	    if ($(document).scrollTop() > bottomKlp) { sale30.css('top', bottomKlp + $(document).scrollTop()).css('display','none'); }
	    else { sale30.css('top', '48%'); }

		if ($(this).scrollTop() > 1){ 
			$('.luckyFriday-img_santa').removeClass('none');
			$('.luckyFriday-img_santa').addClass('right');
		}
		else if ($(this).scrollTop() < 800){
			$('.luckyFriday-img_santa').removeClass('right');
			$('.luckyFriday-img_santa').addClass('none');
			$('.menu__item').removeClass('active');
		} 
	
	});

	//плавный скрол страницы при клике на меню header
	$('.menu__item').click(function() {

		$('.menu__item').removeClass('active');
		$(this).addClass('active');
		var hash=window.location.hash;
		var anchor=$(this);

		if(hash){
		    $('.menu__item').removeClass('active');
		    anchor.addClass('active');
		}

		$('html, body').animate({
		    scrollTop: $(anchor.attr('href')).offset().top - 190
		}, 1000);
	});

	//плавный скрол страницы при клике на down
	$('.luckyFriday-img_down').click(function() {
		
		var hash=window.location.hash;
		var anchor=$(this);

		$('html, body').animate({
		    scrollTop: $(anchor.attr('href')).offset().top - 190
		}, 1000);
	});

	

	//клик на карту
	$('.region').click(function() {
		
		var region = $(this).data('region');
		
		$('.luckyFriday').removeClass('blur-out');
		$('.luckyFriday').addClass('blur-in');
		$('body').css('overflow', 'hidden');
		$('.popup-list .pop-up[data-popup~=' + region + ']').removeClass('hidden');
		
	});

	//клик на календарь
	$('.date').click(function(){
		var date = $(this).data('date');

		$('.luckyFriday').removeClass('blur-out');
		$('.luckyFriday').addClass('blur-in');
		$('body').css('overflow', 'hidden');
		$('.popup-list .pop-up[data-popup~=' + date + ']').removeClass('hidden');
	});

	//клик на маркер
	$('.marker').click(function(){
		var marker = $(this).data('marker');

		$('.luckyFriday').removeClass('blur-out');
		$('.luckyFriday').addClass('blur-in');
		$('body').css('overflow', 'hidden');
		$('.popup-list .pop-up[data-popup~=' + marker + ']').removeClass('hidden');
	});


	//клик на 'Напомнить'
	$('.btn').click(function(){
		$('.luckyFriday').removeClass('blur-out');
		$('.luckyFriday').addClass('blur-in');
		$('body').css('overflow', 'hidden');
		$('.popup-form').removeClass('hidden');
	});



	//клик на 'подписаться'
	$('form').submit(function(e){

		e.preventDefault();

		function checkbox(){

			if ($('.checkbox').is(':checked')) {
				$('.error-non-check').addClass('hidden');
				return true;

			} else{
				$('.error-non-check').removeClass('hidden');
				return false;

			}
		}

		function email(){
			var reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{1,4})+$/;
			var validateElement = document.getElementsByClassName('input-email');

			for (var i = 0; i < validateElement.length; i++) {
				if (validateElement[i].value == '') {
					$('.error-empty-field').removeClass('hidden');
					return false;

				} else if (reg.test(validateElement[i].value) === false){
					$('.error-empty-field').addClass('hidden');
					$('.error-invalid-field').text("Введите корректный email").removeClass('hidden');
					return false;

				} else {
					$('.error-empty-field').addClass('hidden');
					$('.error-invalid-field').addClass('hidden');
					return true;
				}
			}
		}
		var validForm = checkbox();
		if (validForm == true) {
			validForm = email();
		} else {
			email();
		}
		if (validForm == true) {
			 
			$.ajax({
				type: $(this).attr('method'),
				url: $(this).attr('action'),
				data: $(this).serializeArray(),
				cache: false,
				success: function (res) {
					if (res.error)  {
						$('.error-invalid-field').text('Что-то пошло не так').removeClass('hidden');
						return;
					}
					$('form__message').addClass('hidden');
					$('.popup-form .content').addClass('hidden');
					$('.popup-form .form').addClass('hidden');
					$('.popup-form .content__change').removeClass('hidden');
					$('.img_santa').removeClass('none');
					$('.img_santa').addClass('right');
				}
			})
		}	
	});

	function close(){
		$('.img_santa').removeClass('right');
		$('.img_santa').addClass('none');
		$('.popup-list .pop-up').addClass('hidden');
		$('.popup-form').addClass('hidden');
		$('body').css('overflow', 'auto');
		$('.luckyFriday').removeClass('blur-in');
		$('.luckyFriday').addClass('blur-out');
	}

	//клик на 'Х' в popup
	$('.close, .content__change .link').click(function () { 
	    close();
	});

	$(document).keyup(function(e) {
	     if (e.keyCode == 27) { 
	     	close();
	    }
	});

	//проверка на дату

	api.city.sale(function(res) {
		if (res.result) {
			var dayBegin = res.result, // дата в формате день.месяц.год (начало дня)
			today = new Date(),
			dayKlp = '2018-11-30T00:00:00',
			dayKlpEnd = '2018-11-30T23:59:59',
			dayX = '2018-12-14T00:00:00',
			dayXEnd = '2018-12-14T23:59:59'
			
			//преобразование пришедшей даты в формат ГГГГ.ММ.ДД
			dayBegin = dayBegin.split('.');
			dayBegin = dayBegin[2]+'/'+dayBegin[1]+'/'+dayBegin[0] ;

		 	dayBegin = new Date(Date.parse(dayBegin));
			dayBegin.setDate(dayBegin.getDate());
		 	var dayEnd; //(конец дня)
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

			function activeMap(){ 
				//отметить день акции на календаре
				$('.date').removeClass('active');
				$('.date').each(function(elem){
					if ($(this).data('date') == dayBegin.getDate()) {
						$(this).addClass('active');
					} 
				});

				//отметить активный регион на карте
				$('.region').removeClass('active'); 
				$('.region').each(function(elem){
					if ($(this).data('region') == dayBegin.getDate()) {
						$(this).addClass('active');
					} 
				});

				//отметить активный маркер на карте
				$('.marker').removeClass('active');
				$('.marker').each(function(elem){
					if ($(this).data('marker') == dayBegin.getDate()) {
						$(this).addClass('active');
					} 
				});

				$('.text_date').html(dayBegin.getDate() + ' декабря');
			}

			//если 30 ноября
			if (today.getTime() >= dayKlp.getTime() && today.getTime() <= dayKlpEnd.getTime()){ 
				$('.luckyFriday-map').addClass('hidden');
				$('.luckyFriday-map_30nov').removeClass('hidden');

				$('.text__changeable').addClass('hidden');
				$('.text__changeable_klp').removeClass('hidden');

				$('.btn').addClass('hidden');
				$('.btn__go').removeClass('hidden');

				$('.date').removeClass('active');
				$('.date').each(function(elem){
					if ($(this).data('date') == 30) {
						$(this).addClass('active');
					} 
				});
				$('.text_date').html(dayBegin.getDate() + ' декабря');


			// если 14 декабря
		 	}else if (today.getTime() >= dayX.getTime() && today.getTime() <= dayXEnd.getTime()){ 
				$('.luckyFriday-map').addClass('hidden');
				$('.luckyFriday-map_30nov').addClass('hidden');
				$('.luckyFriday-map_14dec').removeClass('hidden');

				$('.calendar').css('display', 'none');

				$('.luckyFriday-im .text:eq(1)').css('display', 'none');
				$('.luckyFriday-im .text:eq(0)').css('display', 'none');

				$('.text__changeable').addClass('hidden');
				$('.text__changeable_day-x').removeClass('hidden').css('margin-bottom', '60px');

				$('.btn').addClass('hidden');
				$('.btn__go').removeClass('hidden');

				$('.date').removeClass('active');
				$('.date').each(function(elem){
					if ($(this).data('date') == 14) {
						$(this).addClass('active');
					} 
				});

				
			// после 30 ноября
			}else if (today.getTime() > dayKlp.getTime()) { 

				//день акции
				if (today.getTime() >= dayBegin.getTime() && today.getTime() <= dayEnd.getTime()) {
					$('.text__changeable').addClass('hidden');
					$('.text__changeable_day').removeClass('hidden');

					$('.btn').addClass('hidden');
					$('.btn__go').removeClass('hidden');

					$('.luckyFriday-map').removeClass('hidden');
					$('.luckyFriday-map_30nov').addClass('hidden');
					$('.luckyFriday-map_14dec').addClass('hidden');

					activeMap();

				//день акции прошел
				}else if (today.getTime() > dayEnd.getTime()){ 
					$('.luckyFriday-map').addClass('hidden');
					$('.luckyFriday-map_30nov').addClass('hidden');
					$('.luckyFriday-map_14dec').removeClass('hidden');

					$('.text__changeable').addClass('hidden');
					$('.text__changeable_after-day').removeClass('hidden');

					$('.btn__go').addClass('hidden');
					$('.btn').removeClass('hidden');

					$('.form__item:eq(0)').css('display', 'none');
					$('.form__item:eq(1)').css('display', 'none');

					$('.date').removeClass('active');
					$('.date').each(function(elem){
						if ($(this).data('date') == 14) {
							$(this).addClass('active');
						} 
					});

				//день акции еще не наступил
			 	} else { 
					$('.text__changeable').addClass('hidden');
					$('.text__changeable_not-day').removeClass('hidden');

					$('.luckyFriday-map').removeClass('hidden');
					$('.luckyFriday-map_30nov').addClass('hidden');
					$('.luckyFriday-map_14dec').addClass('hidden');

					$('.btn__go').addClass('hidden');
					$('.btn').removeClass('hidden');

					$('.form__item:eq(0)').css('display', 'none');
					
					activeMap();
				}
			
			
			// до 30 ноября
			} else {
				activeMap();
			}

		}else {
		
		}
	});
	 	
	 	
});
