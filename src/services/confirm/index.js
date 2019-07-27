const confirmDialog = window.jQuery(require('./confirm-modal.html'))
window.jQuery(document.body).append(confirmDialog)
const confirmDialogForm = confirmDialog.find('form[name=confirm-form]')
const confirmDialogFormSubmitAction = confirmDialogForm.find('[type=submit]')
const confirmDialogTitle = confirmDialog.find('#confirm-title')
const confirmDialogMessage = confirmDialog.find('#confirm-message')

confirmDialog.on('shown.bs.modal', () => {
    confirmDialogFormSubmitAction.focus()
})

export const processConfirm = (title, msg) => {
    return new Promise(resolve => {
        confirmDialogTitle.html(title || '')
        confirmDialogMessage.html(msg || '')
        confirmDialogForm.off('submit').on('submit', (e) => {
            e.preventDefault()
            resolve(true)
            confirmDialog.modal('hide')
        })
        confirmDialog.off('hidden.bs.modal')
        confirmDialog.on('hidden.bs.modal', () => {
            resolve(false)
            confirmDialogTitle.html('')
            confirmDialogMessage.html('')
        })
        confirmDialog.modal('show')
    })
}

export const confirm = {
    default: processConfirm,
    remove: (typeName, name) => processConfirm(`Delete ${typeName}`, `Are you sure you want to delete ${typeName} <strong>${name || ''}</strong> ?`),
    removeSimple: (typeName) => processConfirm(`Delete ${typeName}`, 'Are you sure ?')
}

export default confirm