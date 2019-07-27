import Vue from 'vue'

const LOADING_CLASS_NAME = {
    panel: 'ld-loading',
    button: 'fa fa-circle-o-notch fa-spin',
    icon: 'fa-spin'
}

const loadingProcess = {
    apply(el, loading) {
        //let $ele = $(el)
        this.panel(el, loading)
        // if ($ele.hasClass('panel')) {
        //     this.panel(el, loading)
        // } else if ($ele.hasClass('btn')) {
        //     this.button(el, loading)
        // } else if ($ele.hasClass('fa')) {
        //     this.icon(el, loading)
        // }
    },
    icon(el, loading) {
        let icon = $(el)
        if (loading) {
            icon.addClass(LOADING_CLASS_NAME.icon)
        } else {
            icon.removeClass(LOADING_CLASS_NAME.icon)
        }
    },
    panel(el, loading) {
        let panel = $(el)
        let loader = panel.find('>.loader')
        if (!loader.length) {
            loader = $('<div class="loader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>')
            panel.prepend(loader)
        }
        if (loading) {
            panel.addClass(LOADING_CLASS_NAME.panel)
        } else {
            panel.removeClass(LOADING_CLASS_NAME.panel)
        }
    },
    button(el, loading) {
        let panel = $(el)
        let loader = panel.find('.lds-ellipsis')
        if (!loader.length) {
            loader = $('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>')
            panel.prepend(loader)
        }
        if (loading) {
            panel.addClass(LOADING_CLASS_NAME.button)
        } else {
            panel.removeClass(LOADING_CLASS_NAME.button)
        }
    }
}

// const processPanel = (el, loading) => {
//     let panel = $(el)
//     let loader = panel.find('.loader')
//     if (!loader.length) {
//         loader = $('<div class="loader"><div class="loader-bar"></div></div>')
//         panel.prepend(loader)
//     }
//     if (loading) {
//         panel.addClass(LOADING_CLASS_NAME.panel)
//     } else {
//         panel.removeClass(LOADING_CLASS_NAME.panel)
//     }
// }

Vue.directive('loading', {
    bind: function (el, binding) {
        loadingProcess.apply(el, binding.value)
    },
    update: function (el, binding) {
        loadingProcess.apply(el, binding.value)
    }
})