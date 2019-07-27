import Vue from 'vue'
import templateHtml from './youtube.html'

const modal = $(templateHtml)
const modalTitle = modal.find('[py-target="title"]')
const modalContent = modal.find('[py-target="content"]')
modal.on('hidden.bs.modal', () => {
    modalContent.empty()
})
$('body').append(modal)

function getYoutubeId(url = '') {
    return url.replace(/.*?(.*)\?v=([^&]+)(&.*)?/, '$2')
}

function viewYoutubeAction(e, title, youtubeId) {
    e.preventDefault()
    modalTitle.text(title)
    modalContent.empty()
    let iframe = $('<iframe py-target="iframe" width="560" height="315" frameborder="0" allow="autoplay; encrypted-media" style="width: 100%;background: #000;"allowfullscreen></iframe>')
    modalContent.append(iframe)
    iframe.attr('src', `https://www.youtube.com/embed/${youtubeId}?rel=0&amp;showinfo=0`)
    modal.modal('show')
}

function viewYoutube(el) {
    let $el = $(el)
    $el.attr('href')
    let title = $el.text()
    let youtubeId = getYoutubeId($el.attr('href'))
    $el.off('click')
    $el.on('click', e => viewYoutubeAction(e, title, youtubeId))
}

Vue.directive('youtube', {
    bind: function (el, binding) {
        viewYoutube(el, binding.value)
    },
    update: function (el, binding) {
        viewYoutube(el, binding.value)
    }
})