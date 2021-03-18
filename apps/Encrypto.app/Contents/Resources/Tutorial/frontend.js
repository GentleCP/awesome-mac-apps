
function add_event(el, event, func) {
    if (!el.addEventListener) {
        someElement.attachEvent(event, func);
    }
    else {
        el.addEventListener(event, func, false);
    }
}


var share_btn = $('.active .share_file_btn').css("background-position", "left -48px");

setTimeout('$(".slide-1").addClass("animation")', 100);

//var ua = navigator.userAgent.toString().toLowerCase();

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
        EncryptoTutorial = new EncryptoTutorial();
        __setIndex(0); // external
    });
} else {
    document.attachEvent('DOMContentLoaded', function () {
        EncryptoTutorial = new EncryptoTutorial();
        __setIndex(0); // external
    }, false);
}


function __gotopage( index ){
    EncryptoTutorial.goTo( index );
}

var EncryptoTutorial = function(){
    this.$$pagination = document.querySelectorAll('[data-to-page]');
    this.$nextButton = document.querySelector('[data-to-next]');
    this.$$slides = document.querySelectorAll('[data-slide]');
    this.currentIndex = 0;
    this.maxIndex = this.$$pagination.length - 1;
    this.transitionPropery = false;
    this.init();
}

EncryptoTutorial.prototype.init = function() {
    var self = this;
    var email = new Email();
    var $emailSubscribe = document.querySelector('.email-subscribre');
    var $skipSubscribe = document.querySelector('.skip-subscribe');
    var $subscribeForm = document.querySelector('.skip-subscribe');
    // pagination click
    [].forEach.call(self.$$pagination, function($pagination, index) {
        $pagination.addEventListener('click', function(e) {
            if (index != self.currentIndex) self.goTo(index);
        }, false);
    });

    // next button click
    self.$nextButton.addEventListener('click', function(e) {
        if (self.currentIndex < self.maxIndex) {
            self.goTo(self.currentIndex + 1);
        } else {
            $(".email-subscribre").val($.trim($(".email-subscribre").val()));
            email.validEmail();
            //__launch(); // external
        }
    }, false);
    $subscribeForm.addEventListener('click', function(e){
        e.preventDefault();
        email.validEmail();
    });
    // get supported prefixes
    self.transitionPropery = self.getPrefix().transition;
    $skipSubscribe.addEventListener('click', function(){
        __launch();
    });


    $emailSubscribe.addEventListener('keyup', function( e ){
        if ( e.keyCode == 13 ){
            e.preventDefault();
            email.validEmail();
        }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 39) {
            if (self.currentIndex < self.maxIndex) {
                self.goTo(self.currentIndex + 1);
            }
        }
    });
    $(document).keyup(function(e) {
            if (e.keyCode == 37) {
                if(self.currentIndex == 5) {
                 if($('.email-subscribre').val().length > 0) {
                    $('.email-subscribre').removeClass('push_on');
                } else {
                    $('.email-subscribre').addClass('push_on');
                }
            } else {
                $('.email-subscribre').addClass('push_on');
            }
            if (self.currentIndex != 0 && $('.email-subscribre').hasClass('push_on')) {
                $emailSubscribe.blur();
                self.goTo(self.currentIndex - 1);
            }
        }
    });

}

EncryptoTutorial.prototype.goTo = function(index) {
    var self = this;
    var animDirection;
    var $skipSubscribe = document.querySelector('.skip-subscribe');
    var $emailSubscribe = document.querySelector('.email-subscribre');

    if (index > self.currentIndex) {
        animDirection = {
            active_to: 'left',
            new_from: 'right'
        }
    } else {
        animDirection = {
            active_to: 'right',
            new_from: 'left'
        }
    }
    self.offSlide(index, animDirection.new_from, true);
    self.offSlide(self.currentIndex, animDirection.active_to, false);
    setTimeout(function(){
        self.onSlide(index);
    }, 0);

    self.currentIndex = index;

    // pagination
    [].forEach.call(self.$$pagination, function($pagination, index) {
        $pagination.classList.remove('active');
    });
    self.$$pagination[self.currentIndex].classList.add('active');
    if (self.currentIndex == self.maxIndex) {
        this.$nextButton.value = document.getElementById('label-launch').innerText;
        $skipSubscribe.style.display = 'block';
        setTimeout(function(){
            $emailSubscribe.focus();
        }, 500);
        
    } else {
        this.$nextButton.value = document.getElementById('label-next').innerText;
        $skipSubscribe.style.display = 'none';
        // $emailSubscribe.blur();
    }
    __setIndex(self.currentIndex); // external
}

EncryptoTutorial.prototype.onSlide = function(index) {
    var self = this;
    var $slide = self.$$slides[index];
    self.forceSlide(index, false);
    $slide.classList.remove('push-right');
    $slide.classList.remove('push-left');
    $slide.classList.add('active');
    $slide.classList.add('active_anim');
    if($('.slide-3').hasClass('active')) {
        setTimeout('$(".slide-3").addClass("animation")', 1800);
    } else if($('.slide-4').hasClass('active')) {
        setTimeout('$(".slide-4").addClass("animation")', 1700);
    } 
}

EncryptoTutorial.prototype.offSlide = function(index, direction, isForced) {
    var self = this;
    var $slide = self.$$slides[index];
    var dirClass = direction == 'left' ? 'push-left' : 'push-right';
    self.forceSlide(index, isForced);
    $slide.classList.remove('active');
    $slide.classList.remove('animation');
    $slide.classList.remove('push-right');
    $slide.classList.remove('push-left');
    $slide.classList.add(dirClass);
}

EncryptoTutorial.prototype.forceSlide = function(index, isForced) {
    var self = this;
    var $slide = self.$$slides[index];
    if (isForced) {
        $slide.style[self.transitionPropery] = 'none';
    } else {
        $slide.removeAttribute('style');
    }
}

EncryptoTutorial.prototype.getPrefix = function() {
    var el = document.createElement('div');
    var transformProps = 'transition WebkitTransition MozTransition msTransition'.split(' ');
    function support(properties) {
        for (var i = 0; i < properties.length; i++) {
            if (typeof el.style[properties[i]] !== 'undefined') {
                return properties[i];
            }
        }
    }

    return {
        transition: support(transformProps)
    }
}

var Email = function(opt) {
    this.email = '';
    this.init();
}

Email.prototype.init = function() {
    var self = this;
    this.$field = document.querySelector('.email-subscribre');
    this.$button = document.querySelector('.subscribe-button');
//	var newValidEmail = this.validEmail.bind( this );
    this.$field.addEventListener('click', function( e ) {
        self.setErrorClass('remove');
    });
    this.$field.addEventListener('keyup', function(){
        self.setErrorClass('remove');
    });
};

Email.prototype.validEmail = function() {
    var email = this.$field.value;
    var regEmail = /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+[\+a-z0-9]*@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i;
    if (regEmail.test( email )) {
        this.setErrorClass( 'remove');
        this.sendEmail( email );
    } else{
        this.setErrorClass( 'add');
    }
    this.$field.focus();
}

Email.prototype.sendEmail = function (email) {
    if (document.getElementById('email-progress')) document.getElementById('email-progress').classList.add('progress');
    __sendEmail(email);
}

function subscribeHandler (type) {
    var $field = document.querySelector('.email-subscribre');
    var $okMessage = document.querySelector('.thank-you-message.ok')
    var $falseMessage = document.querySelector('.thank-you-message.error');
    $field.parentNode.classList.add('successful-subscribe');

    if (document.getElementById('email-progress')) document.getElementById('email-progress').classList.remove('progress');

    if (type === 'ok') {
        $falseMessage.style.display = "none";
        $okMessage.style.display = "block";
    } else if ( type === 'error') {
        $okMessage.style.display = "none";
        $falseMessage.style.display = "block";
    }
}


Email.prototype.setErrorClass = function(type) {
    if (type === 'add') {
        document.querySelector('.email-subscribre').classList.add('error-email');
    } else if (type === 'remove') {
        this.$field.classList.remove('error-email');
    }
}

function __setIndex(index) {
    if (typeof(controller) !== 'undefined') controller.selectPage_(index);
}

function __launch() {
    if (typeof(controller) !== 'undefined') controller.launchAfterSkip();
}

function __sendEmail(email) {
    if (typeof(controller) !== 'undefined') controller.email_(email);
}
