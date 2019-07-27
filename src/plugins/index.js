// import plugins
import jquery from 'jquery'
window.$ = window.jQuery = jquery

window.toastr = require('../assets/vendor/toastr/toastr.min.js')
window.toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': true,
  'progressBar': true,
  'positionClass': 'toast-top-right',
  'preventDuplicates': true,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

const tether = require('../assets/vendor/tether/dist/js/tether.min')
window.Tether = tether

import 'popper.js'
require('../assets/vendor/bootstrap/dist/js/bootstrap.min.js')
require('../assets/vendor/swiperjs/js/swiper.min.js')