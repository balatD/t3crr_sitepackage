"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Navigation = function Navigation() {
  _classCallCheck(this, Navigation);

  _defineProperty(this, "toggleNavigation", function () {
    var header = document.querySelector('header'),
        menuItem = Array.from(header.querySelectorAll('.nav-list > li'));
    console.log(menuItem);
    menuItem.forEach(function (item) {
      var trigger = item.querySelector('span');

      if (trigger) {
        trigger.addEventListener('click', function (Event) {
          var sub = item.querySelector('ul');
          Array.from(document.querySelectorAll('.nav-dropdown')).forEach(function (each) {
            if (sub !== each) {
              each.classList.remove('active');
              each.previousElementSibling.classList.remove('close-sub');
            }
          });
          sub.classList.toggle('active');
          trigger.classList.toggle('close-sub');
        });
      }
    });
  });

  this.toggleNavigation();
};
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormValidation = /*#__PURE__*/function () {
  /**
   * @type {HTMLFormElement}
   */

  /**
   * @type {HTMLDivElement}
   */

  /**
   * @type {HTMLButtonElement}
   */
  function FormValidation() {
    _classCallCheck(this, FormValidation);

    _defineProperty(this, "form", null);

    _defineProperty(this, "recaptcha", null);

    _defineProperty(this, "submitButton", null);

    this.initialize();
  }

  _createClass(FormValidation, [{
    key: "initialize",
    value: function initialize() {
      if (document.querySelector('.validate')) {
        this.initializeForm();
      }
    }
  }, {
    key: "initializeSubmitButton",
    value: function initializeSubmitButton() {
      this.submitButton = this.form.querySelector('button[type="submit"]');
    }
  }, {
    key: "initializeForm",
    value: function initializeForm() {
      this.form = document.querySelector('.validate');
      this.form.addEventListener('submit', this.formSubmit.bind(this));
      this.initializeSubmitButton();
      this.initializeRecaptcha();
      var inputs = this.form.querySelectorAll('input, textarea, select');

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', this.validateOnChange.bind(this));
        inputs[i].addEventListener('change', this.validateOnChange.bind(this));
        inputs[i].addEventListener('keyup', this.validateOnChange.bind(this));
      }
    }
  }, {
    key: "formSubmit",
    value: function formSubmit(event) {
      if (!this.validateFormData(this.form)) {
        event.preventDefault();
        this.focusFirstErrorField(this.form);
      }
    }
  }, {
    key: "getFormData",
    value: function getFormData(form) {
      var formData = new FormData(form);
      formData.append(this.submitButton.name, this.submitButton.value);
      return formData;
    }
  }, {
    key: "validateFormData",
    value: function validateFormData(form) {
      var inputs = form.querySelectorAll('input:not(.invisible), textarea, select'),
          formError = false;

      for (var i = 0; i < inputs.length; i++) {
        formError = this.validateSingleInput(inputs[i]) || formError;
      }

      return !formError;
    }
  }, {
    key: "focusFirstErrorField",
    value: function focusFirstErrorField(form) {
      var inputs = form.querySelectorAll('input:not(.invisible), textarea, select'),
          formError = false;

      for (var i = 0; i < inputs.length; i++) {
        if (this.validateSingleInput(inputs[i]) || formError) {
          inputs[i].focus();
          break;
        }
      }
    }
  }, {
    key: "validateOnChange",
    value: function validateOnChange(event) {
      this.validateSingleInput(event.target);
    }
  }, {
    key: "validateSingleInput",
    value: function validateSingleInput(input) {
      var rule = input.dataset['rule'],
          exp,
          inputError = false,
          emailExp = /^[^\s()<>@,;:\/]+@\w[\w.-]+\.[a-z]{2,}$/i,
          phoneExp = /^[0-9]{2,5}( )?([0-9]{4,9})$/i;

      if (rule !== undefined) {
        var _rule$split = rule.split(':');

        var _rule$split2 = _slicedToArray(_rule$split, 2);

        rule = _rule$split2[0];
        exp = _rule$split2[1];

        switch (rule) {
          case 'required':
            if (input.value === '') {
              inputError = true;
            }

            break;

          case 'minlen':
            if (input.value.length < parseInt(exp)) {
              inputError = true;
            }

            break;

          case 'email':
            if (!emailExp.test(input.value)) {
              inputError = true;
            }

            break;

          case 'phone':
            if (input.value.length > 0 && !phoneExp.test(input.value)) {
              inputError = true;
            }

            break;

          case 'checked':
            if (!input.checked) {
              inputError = true;
            }

            break;

          case 'radiochecked':
            if (input.classList.contains('.additionalInput')) {
              var subInputs = input.parentElement.querySelectorAll('.radio-input input');

              for (var i = 0; i < subInputs.length; i++) {
                subInputs[i].addEventListener('blur', this.validateOnChange.bind(this));
                subInputs[i].addEventListener('change', this.validateOnChange.bind(this));
                subInputs[i].addEventListener('keyup', this.validateOnChange.bind(this));
                subInputs[i].addEventListener('click', this.validateOnChange.bind(this));
              }
            }

            var radioGroup = Array.from(document.querySelectorAll("[name=\"".concat(input.name, "\"]")));
            inputError = true;
            radioGroup.forEach(function (radio) {
              if (radio.checked) {
                inputError = false;
              }
            });
            break;

          case 'selected':
            var value = input.options[input.selectedIndex].value;

            if (value === '') {
              inputError = true;
            }

            break;

          case 'regexp':
            exp = new RegExp(exp);

            if (!exp.test(input.value)) {
              inputError = true;
            }

            break;
        }

        if (inputError) {
          this.showError(input);
        } else {
          this.hideError(input);
        }
      }

      return inputError;
    }
  }, {
    key: "showError",
    value: function showError(input) {
      var error;

      if (input.dataset['rule'] === 'checked' || input.dataset['rule'] === 'radiochecked') {
        var fieldset = input.parentElement;
        fieldset.classList.add('invalid');
        error = fieldset.querySelector('.error');
      } else {
        var _fieldset = input.parentElement;

        _fieldset.classList.add('invalid');

        error = _fieldset.querySelector('.error');
      }

      if (error !== undefined && error !== null) {
        error.className = error.className.replace(/ d-none/g, '');
      } else {
        error = document.createElement('div');
        error.className = 'error';
        error.setAttribute('role', 'alert');
        error.innerText = input.dataset['msg'] !== undefined ? input.dataset['msg'] : 'wrong Input';

        if (input.dataset['rule'] === 'checked' && input.nextElementSibling || input.dataset['rule'] === 'radiochecked' && input.nextElementSibling) {
          this.insertAfter(error, input.parentElement);
        } else if (input.dataset['rule'] === 'required' && input.nextElementSibling) {
          this.insertAfter(error, input.nextElementSibling);
        } else {
          this.insertAfter(error, input);
        }
      }
    }
  }, {
    key: "hideError",
    value: function hideError(input) {
      var error;

      if (input.dataset['rule'] === 'checked' || input.dataset['rule'] === 'radiochecked') {
        var fieldset = input.parentElement;
        fieldset.classList.remove('invalid');
        error = fieldset.querySelector('.error');
      } else {
        var _fieldset2 = input.parentElement;

        _fieldset2.classList.remove('invalid');

        error = _fieldset2.querySelector('.error');
      }

      if (error !== undefined && error !== null) {
        error.className = error.className.replace(/ d-none/g, '');
        error.className += ' d-none';
      }
    }
  }, {
    key: "initializeRecaptcha",
    value: function initializeRecaptcha() {
      var _this = this;

      window.grecaptcha.ready(function () {
        _this.recaptcha = _this.form.querySelector('.g-recaptcha');

        if (_this.recaptcha) {
          if (_this.recaptcha.childElementCount === 0) {
            window.grecaptcha.render(_this.recaptcha, _this.recaptcha.dataset);
          }

          window.recaptchaCallback = _this.setCaptchaValue.bind(_this);
          window.recaptchaExpiredCallback = _this.unsetCaptchaValue.bind(_this);
        }
      });
    }
  }, {
    key: "setCaptchaValue",
    value: function setCaptchaValue() {
      var input = this.getRecapchaField();

      if (input) {
        input.value = '1';
      }

      this.validateSingleInput(input);
    }
  }, {
    key: "unsetCaptchaValue",
    value: function unsetCaptchaValue() {
      var input = this.getRecapchaField();

      if (input) {
        input.value = '';
      }

      this.validateSingleInput(input);
    }
  }, {
    key: "getRecapchaField",
    value: function getRecapchaField() {
      var field,
          grecaptchaElement = this.form.querySelector('.g-recaptcha');

      if (grecaptchaElement) {
        field = document.getElementById(grecaptchaElement.dataset['fieldId']);
      }

      return field;
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(newNode, existingNode) {
      if (existingNode.parentNode && !existingNode.parentNode.querySelector('.error')) {
        existingNode.parentNode.append(newNode);
      }
    }
  }]);

  return FormValidation;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App = /*#__PURE__*/function () {
  function App() {
    var _this = this;

    _classCallCheck(this, App);

    _defineProperty(this, "getSectionsGbcr", function () {
      _this.animationDone = false;
      var counters = Array.from(document.querySelectorAll('section.counter'));

      if (counters.length > 0) {
        counters.forEach(function (counter) {
          var between = _this.checkIsBetween(counter);

          window.addEventListener('scroll', function (Event) {
            var isBetween = between.inViewport(Event); // {boolean}

            if (isBetween && !_this.animationDone) {
              _this.animationDone = true;
              $('.counter-number').each(function () {
                var $this = $(this);
                $({
                  Counter: 0
                }).animate({
                  Counter: $this.attr('data-stop')
                }, {
                  duration: parseInt($this.attr('data-duration')),
                  easing: 'swing',
                  step: function step(numberToIncrease) {
                    if ($this.attr('data-number-type') === 'float') {
                      $this.text(new Decimal(numberToIncrease).toFixed(2).replace('.', ','));
                    } else if ($this.attr('data-number-type') === 'int') {
                      var num_parts = Math.ceil(numberToIncrease).toString().split('.');
                      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                      $this.text(num_parts.join('.'));
                    }
                  },
                  complete: function complete() {
                    $this.removeClass('pulse');
                  }
                });
              });
            }
          });
        });
      }
    });

    _defineProperty(this, "checkIsBetween", function (selector) {
      return new IsBetweenValuesInViewport(selector, {
        position: 'top',
        top: 0,
        bottom: 80,
        class: 'isBetween-CustomClass',
        onLoad: 'onLoad',
        onScroll: 'onScroll'
      }, false);
    });

    this.swiper2();
    this.getSectionsGbcr();
    this.openUcLink();
    new FormValidation();
    new Navigation();
  }

  _createClass(App, [{
    key: "swiper1",
    value: function swiper1() {
      return new Swiper('.mySwiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination'
        }
      });
    }
  }, {
    key: "swiper2",
    value: function swiper2() {
      return new Swiper('.mySwiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          300: {
            spaceBetween: 15
          },
          990: {
            spaceBetween: 30
          }
        }
      });
    }
  }, {
    key: "openUcLink",
    value: function openUcLink() {
      var uc = document.getElementById('ucLink');
      uc.addEventListener('click', function (event) {
        event.preventDefault();
        UC_UI.showSecondLayer("sikYCzRJl");
      });
    }
  }]);

  return App;
}();

new App();