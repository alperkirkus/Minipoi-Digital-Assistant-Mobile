export function usernameValidator(username) {
  if (!username) return "Username can't be empty."
  if (username.length < 4) return 'Username must be at least 4 characters long.'
  return ''
}

// export function usernameValidator2(username) {
//   if (!username) return "Username can't be empty."
//   if (username.length < 4) return 'Username must be at least 4 characters long.'
//   return ''
// }

// export function usernameValidator4(username) {
//   if (!username) return "Username can't be empty."
//   if (username.length < 4) return 'Username must be at least 4 characters long.'
//   return ''
// }

// export function usernameValidator5(username) {
//   if (!username) return "Username can't be empty."
//   if (username.length < 4) return 'Username must be at least 4 characters long.'
//   return ''
// }
