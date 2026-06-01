export function errorCatch(error: any) {
  return error
}
// export function errorCatch(error: any) {
//   const message = error.response.data.message

//   return message
//     ? typeof error.response.data.message === 'object'
//       ? message[0]
//       : message
//     : error.message
// }
