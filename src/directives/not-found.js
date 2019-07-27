import Vue from 'vue'
const NOT_FOUND_KEY = 'not-found-directive'
const notFoundTemplate = `<div data-key="${NOT_FOUND_KEY}" class="flex-content-container">
<div class="text-center push-50 push-50-t">
    <h1 class="font-s64 font-w300 text-city animated flipInX">404</h1>
    <h2 class="h4 font-w300 animated fadeInUp">Item not found.</h2>
</div>
</div>`

const processNotFound = (el, isNotFound) => {
    const $el = window.jQuery(el)
    el.__notFound = $el.next()
    if (el.__notFound.attr('data-key') !== NOT_FOUND_KEY) {
        el.__notFound = window.jQuery(notFoundTemplate)
        el.__notFound.insertAfter($el)
    }
    if (isNotFound) {
        el.__notFound.removeClass('hidden')
        $el.addClass('hidden')
    } else {
        el.__notFound.addClass('hidden')
        $el.removeClass('hidden')
    }
}

Vue.directive('not-found', {
    bind(el, binding) {
        processNotFound(el, binding.value)
    },
    update(el, binding) {
        processNotFound(el, binding.value)
    },
    unbind(el, binding) {
        el.__notFound.remove()
    }
})