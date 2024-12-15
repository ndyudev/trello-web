let apiRoot = ''

console.log('import.meta.env:',import.meta.env)
console.log('process:',process.env)

if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
    apiRoot = 'https://trello-api-ndyudev-mern-stack.onrender.com'
}
console.log(apiRoot)
export const API_ROOT = apiRoot
// export const API_ROOT ='https://trello-api-ndyudev-mern-stack.onrender.com'
