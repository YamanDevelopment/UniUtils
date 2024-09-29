import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin(nuxtApp => {
  const auth0 = createAuth0({
    domain: 'dev-povandkckxqn8g8m.us.auth0.com',
    client_id: 'NjBZABrlmDMedN3stcrZhOhmrg94eW7j',
    redirect_uri: window.location.origin
  })

  nuxtApp.vueApp.use(auth0)
})