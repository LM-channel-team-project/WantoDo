export default function generateId() {
  const randomNumber = Date.now() * Math.floor(Math.random() * 100);
  return randomNumber.toString(16);
}
