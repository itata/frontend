import template from './alert/index.html'

const _instance = {
    container: $(template),
    titleEl: null,
    msgEl: null,
    animating: 400,
    showing: 600,
    timeoutId: null,
    init() {
        this.container.addClass('hidden')
        $('body').append(this.container)
        this.titleEl = this.container.find('[a-data=title]')
        this.msgEl = this.container.find('[a-data=msg]')
    }
}

_instance.init()

export default function show(title = '', msg = '') {
    if (!title && !msg) {
        return
    }
    _instance.container.removeClass('hidden')
    _instance.container.css('opacity', 0)
    if (title) {
        _instance.titleEl.removeClass('hidden')
        _instance.titleEl.html(title)
    } else {
        _instance.titleEl.addClass('hidden')
    }
    if (msg) {
        _instance.msgEl.removeClass('hidden')
        _instance.msgEl.html(msg)
    } else {
        _instance.msgEl.addClass('hidden')
    }
    _instance.container.off()
    _instance.container.animate({
        opacity: 1
    }, _instance.animating, () => {
        if (_instance.timeoutId !== null) {
            clearTimeout(_instance.timeoutId)
        }
        _instance.timeoutId = setTimeout(() => {
            _instance.container.animate({
                opacity: 0
            }, _instance.animating, () => {
                _instance.container.addClass('hidden')
            })
        }, _instance.showing, () => {
            _instance.timeoutId = null
        })
    })
}