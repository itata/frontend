import Vue from 'vue'
import commons from './commons'
import security from './security'

function registerComponent(components) {
    if (components) {
        components.forEach(comp => {
            Vue.component(comp.name, comp)
        })
    }
}
registerComponent([
    ...commons,
    ...security,
])