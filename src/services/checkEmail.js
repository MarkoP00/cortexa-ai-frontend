export default function checkEmail(email) {
  let emailValid = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailValid = false;
    return emailValid;
  }

  return emailValid;
}
