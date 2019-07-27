import _ from 'lodash'

export const STATUS = {
    ids: {
        undefined: 0,
        enable: 1,
        disable: 2
    },
    name: {
        0: 'undefined',
        1: 'enable',
        2: 'disable'
    },
    icon: {
        0: 'fa fa-question',
        1: 'fa fa-check',
        2: 'fa fa-times'
    },
    class_name: {
        0: 'text-warning',
        1: 'text-success',
        2: 'text-gray-dark'
    }
}
export const PAGING_DEFAULT = {
    size: 20,
    min_page: 1,
    page: 1,
    total: 0,
    num_items: 4
}