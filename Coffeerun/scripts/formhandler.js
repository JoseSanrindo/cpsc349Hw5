(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector); //Not working right now *** B U G ***
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            })
            console.log(data);
            fn(data)
                .then(function () {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function (fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var message = '';
            if (fn(emailAddress)) {
                $(event.target).setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!(enter @who.com)'
                $(event.target).setCustomValidity(message);
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);