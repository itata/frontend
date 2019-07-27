import {
    buildArrayConfig
} from './commons'
export const LANGUAGE = {
    undefined: 0,
    English: 1,
    Japanese: 2
}

export const LANGUAGE_NAME = {
    0: 'Undefined',
    1: 'English',
    2: 'Japanese'
}

export const LANGUAGE_FLAG = {
    0: '',
    1: 'img/flags/united-kingdom.png',
    2: 'img/flags/japan.png'
}

export const language = {
    getLanguagesInfo() {
        let res = buildArrayConfig(LANGUAGE, LANGUAGE_NAME, LANGUAGE.undefined, {
            icon: LANGUAGE_FLAG
        })
        return res
    }
}