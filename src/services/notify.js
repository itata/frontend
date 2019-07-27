
const processNotify = (type, title, message) => {
    window.toastr[type](message || '', title || '')
}

const showNotify = {
    success(title, message) {
        processNotify('success', title, message)
    },
    info(title, message) {
        processNotify('info', title, message)
    },
    warn(title, message) {
        processNotify('warning', title, message)
    },
    error(title, message) {
        processNotify('error', title, message)
    }
}

export default showNotify