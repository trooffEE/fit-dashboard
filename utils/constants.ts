// NOTE: Я понимаю, что это нужно скрыть за .env.local, но мне торопимся
export const BACKEND_ENDPOINT = 'http://79.133.181.7:8080/api'

export const backendApiString = (actualPath: `/${string}`) => `${BACKEND_ENDPOINT}${actualPath}`