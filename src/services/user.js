import { api, securedApi } from './config'

export const login = async (identifiant, password) =>
	api.post('/auth', { identifiant, password })

export const logout = async () => securedApi.post('/logout')
