import Vue from 'vue'

Vue.directive('preview-photo', {
    bind(el, binding) {
        window.jQuery(el).magnificPopup({
            items: {
                src: binding.value
            },
            image: {
                titleSrc: function (item) {
                    return `<h4>${el.title || ''}</h4>`
                }
            },
            type: 'image'
        })
    },
    update(el, binding) {
        window.jQuery(el).magnificPopup({
            items: {
                src: binding.value
            },
            image: {
                titleSrc: function (item) {
                    return `<h4>${el.title || ''}</h4>`
                }
            },
            type: 'image'
        })
    }
})