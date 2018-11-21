$(document).ready(function() {
	

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

	//плавный скрол страницы при клике на down
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


	//клик на "Напомнить"
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

			if ($(".checkbox").is(":checked")) {
				$('.error-non-check').addClass('hidden');
				return true;

			} else{
				$('.error-non-check').removeClass('hidden');
			}
		}

		function email(){
			var reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{1,4})+$/;
			var validateElement = document.getElementsByClassName('input-email');

			for (var i = 0; i < validateElement.length; i++) {
				if (validateElement[i].value == '') {
					$('.error-empty-field').removeClass('hidden');

				} else if (reg.test(validateElement[i].value) === false){
					$('.error-empty-field').addClass('hidden');
					$('.error-invalid-field').removeClass('hidden');

				} else {
					$('.error-empty-field').addClass('hidden');
					$('.error-invalid-field').addClass('hidden');
					return true;
				}
			}
		}

		if (email() == true && checkbox() == true) {
			 console.log( $( this ).serializeArray() );
			 
			$.ajax({
				type: $(this).attr('method'),
				url: $(this).attr('action'),
				data: $(this).serializeArray(),
				cache: false,
				success: function (res) {
					console.log(res);
					$('form__message').addClass('hidden');
					$('.popup-form .content').addClass('hidden');
					$('.popup-form .form').addClass('hidden');
					$('.popup-form .content__change').removeClass('hidden');
					$('.img_santa').removeClass("none");
					$('.img_santa').addClass("right");
				}
			})
		}	
	});

	function close(){
		$('.img_santa').removeClass("right");
		$('.img_santa').addClass("none");
		$('.popup-list .pop-up').addClass('hidden');
		$('.popup-form').addClass('hidden');
		$('body').css('overflow', 'auto');
		$('.luckyFriday').removeClass('blur-in');
		$('.luckyFriday').addClass('blur-out');
	}

	//клик на "Х" в popup
	$('.close, .content__change .link').click(function () { 
	    close();
	});

	$(document).keyup(function(e) {
	     if (e.keyCode == 27) { 
	     	close();
	    }
	});

});
