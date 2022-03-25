import Vue from 'vue'

export const baseApiUrl = 'https://localhost:3001'
//export const baseApiUrl = 'https://papamoscas.epagri.sc.gov.br:3001'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError }


