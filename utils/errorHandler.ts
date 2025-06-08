export function handleRegistrationError(message: string) {
  alert(message);
  throw new Error(message);
}
