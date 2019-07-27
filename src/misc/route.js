import _ from 'lodash'

export const navigation = {
    types: {
        Header: 'Header',
        Link: 'Link'
    },
    _className: {
        Header: 'nav-category',
        Link: ''
    },
    _build(type, name, path, extras) {
        return {
            className: this._className[type],
            name,
            path,
            hide() {
                return false
            },
            ...extras
        }
    },
    registerHeader(name, extras) {
        return this._build(this.types.Header, name, null, extras)
    },
    registerLink(route, extras) {
        return this._build(this.types.Link, route.name, route.path, extras)
    },
    registerAction(name, action, extras) {
        return {
            ...this._build(this.types.Link, name),
            action,
            ...extras
        }
    }
}

export const route = {
    register(path, name, component, meta = {}, props) {
        props = props || function (route) {
            let p = {}
            if (_.isObject(route.query)) {
                for (let k in route.query) {
                    p[k] = route.query[k]
                }
            }
            if (_.isObject(route.params)) {
                for (let k in route.params) {
                    p[k] = route.params[k]
                }
            }
            return p
        }
        return {
            path,
            name,
            component,
            meta,
            props: props
        }
    },
    buildConfig(object) {
        let res = []
        if (_.isObject(object)) {
            for (let k in object) {
                res.push(object[k])
            }
        }
        return res
    },
    navigation: navigation
}

export default route