import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    domain: "dev-povandkckxqn8g8m.us.auth0.com",
    clientId: "NjBZABrlmDMedN3stcrZhOhmrg94eW7j",
    authorizationParams: {
      redirect_uri: 'http://localhost:3000/callback'
    }
  })
  
  nuxtApp.vueApp.use(auth0)

  addRouteMiddleware('auth', () => {
    if (process.client) {
      auth0.checkSession()
      if (!auth0.isAuthenticated.value) {
        auth0.loginWithRedirect({
          appState: {
            target: useRoute().path,
          },
        })
      }
    }
  })
})