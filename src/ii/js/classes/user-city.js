function UserCity(params) {

    this.url = params.url;

    this.city = params.city;
    this.cityId = params.cityId;
    this.reloadPage = params.reloadPage;

    this.popup = new Popup('.popup-city', 'city');
    this.$yourCity = $("#yourCity");
    this.$input = $('#citySearch');
    this.$list = $('.citySuggest');
    this.$step1Block = $('.popup-city').find('.step1');
    this.$step2Block = $('.popup-city').find('.step2');

    this.citySelector = params.citySelector;
    this.shortCitySelector = params.shortCitySelector;

    this.timer;
}

/*UserCity.prototype.getGeoPosition = function(callbacks) {
    var that = this;
    if( !navigator.geolocation ) {
        if (callbacks.error) callbacks.error('no-geolocation');
        // нет геопозиционирования в браузере
        that.agree();
        return false;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $.ajax({
            tyle: "POST",
            url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false&language=ru",
            success: function (data) {
                res = data.results[0].address_components;
                $.each(res, function (index, key) {
                    if ($.inArray("locality", key.types) >= 0) {
                        that.setSecondStep(key.long_name);
                        that.show();
                    }
                });
            },
            error: function(err) {
                if (callbacks.error) callbacks.error('ajax error');
            }
        });
    }, function(err) {
        // нет геопозиционирования в браузере
        that.agree();
        if (callbacks.error) callbacks.error('geolocation error');
    });
}*/

UserCity.prototype.saveCity = function() {
    /********************************************
     *    if user is auth, save to profile and
     *    the ID in the profile if it is
     ********************************************/
    var that = this;
    if (parseInt(this.cityId) > 0) {
        /*$.ajax({
            type: "POST",
            url: this.url,
            data: {
                city: this.cityId
            },
            success: function () {
                if (that.reloadPage) {
                    location.reload();
                }
            }
        });*/
        //var setsity = api.city.set(this.cityId);
        var setsity = true;
        console.log(setsity);
        if (setsity) { //that.reloadPage
            location.reload();
        }
    }
}

UserCity.prototype.checkCity = function() {
    if (typeof $.cookie('cityName') == 'undefined') {
        this.setFirstStep();
        this.show();
        this.timer = setTimeout(this.agree.bind(this), 6000);
    }
    else {
        this.city = $.cookie('cityName');
        this.cityId = $.cookie('cityId');
        this.changeAllCityText();
    }
}

UserCity.prototype.setCity = function(isAuth) {
    $.cookie('cityName', this.city, {path: '/', domain: '.chitai-gorod.ru'});
    $.cookie('cityId', this.cityId, {path: '/', domain: '.chitai-gorod.ru'});
    this.changeAllCityText();
    this.saveCity();
    //if (isAuth) this.saveCity();
    //else location.reload();
}

UserCity.prototype.findCity = function(city) {
    var that = this;
    /** send ajax to search page and return html list of cities*/

    var cityList = [
        {
            coords: { lat: 55, lon: 37 },
            id: 213,
            name: "Москва"
        },{
            coords: { lat: 55, lon: 37 },
            id: 214,
            name: "Санкт-Петербург"
        },{
            coords: { lat: 55, lon: 37 },
            id: 215,
            name: "Подольск"
        }
    ];


    $('.citySuggest').html('');
    cityList.map(function (val, index, array) {
        $('.citySuggest').append('<li onclick="userCity.autoloadCityListSelect(\''+val.name+'\','+val.id+')">'+val.name+'</li>');
    });
        

    /*$.ajax({
        url: this.url,
        method: "GET",
        data: {
            "token":"123",
            "action":"read",
            "data":{
                "query":city
            }
        },
        beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa("dev:ddevss")); },
        success: function (data) {
            console.log(data); return;
            that.clearList();
            that.$list.append(data);
        }
    });*/
}

UserCity.prototype.agree = function() {
    /** when the user agrees to the shown city*/
    this.setCity();
    this.changeAllCityText();
    this.hide();
}

UserCity.prototype.hide = function() {
    this.popup.hide();
}

UserCity.prototype.show = function() {
    this.popup.show();
}

UserCity.prototype.setFirstStep = function() {
    this.$yourCity.text(this.city);
    this.$step2Block.removeClass('activeStep');
    this.$step1Block.addClass('activeStep');
}

UserCity.prototype.setSecondStep = function(cityName) {
    this.$step1Block.removeClass('activeStep');
    this.$step2Block.addClass('activeStep');
    this.$list.slideDown();
    clearTimeout(this.timer);
    if (cityName) this.$input.val(cityName).keyup();
}

UserCity.prototype.changeAllCityText = function() {
    var city = this.city
    /** first change on full city name*/
    $(this.citySelector).each(function () {
        $(this).text(city || "Ваш город");
    });
    /** then change on short city name if has class jsUserCityShort*/
    $(this.shortCitySelector).each(function () {
        $(this).text(city.substr(0, 20) + "...");
    });
}

UserCity.prototype.autoloadCityListSelect = function (city_name, city_id) {
    /** click event on the city from the autoload list*/
    this.city = city_name;
    this.cityId = city_id;

    this.hide();
    this.$input.val("");
    this.clearList();

    this.setCity();
}

UserCity.prototype.autoloadNewCityListSelect = function (city_name) {
    var that = this;
    $.ajax({
        url: this.url,
        data: {
            city: city_name, 
            check_city: true
        },
        dataType: 'json',
        success: function (data) {
            if (data.name) {
                that.city = data.name;
                that.cityId = data.id;

                that.hide();
                that.$input.val("");
                that.clearList();

                that.setCity();
            } else console.log('select new city error', data);
        }
    });
}

UserCity.prototype.clearList = function() {
    this.$list.find('li').remove();
}