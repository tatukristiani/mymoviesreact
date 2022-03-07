

export default function validatePassword(password) {
   return password.length >= 4 && password.length <= 20;
}