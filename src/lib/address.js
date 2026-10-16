export const EMPTY_ADDRESS = { name: "", phone: "", pincode: "", line1: "", city: "", state: "" };

export function loadAddress(email) {
  try {
    return JSON.parse(localStorage.getItem(`fs.address.${email}`)) || null;
  } catch {
    return null;
  }
}

export function saveAddress(email, address) {
  try {
    localStorage.setItem(`fs.address.${email}`, JSON.stringify(address));
    return true;
  } catch {
    return false;
  }
}

export function validateAddress(a) {
  const e = {};
  if (a.name.trim().length < 2) e.name = "Enter the name of the person receiving the order";
  if (!/^[6-9]\d{9}$/.test(a.phone)) e.phone = "Enter a 10-digit mobile number";
  if (!/^[1-9]\d{5}$/.test(a.pincode)) e.pincode = "Enter a 6-digit pincode";
  if (a.line1.trim().length < 6) e.line1 = "Add house number and street";
  if (!a.city.trim()) e.city = "Enter your city";
  if (!a.state.trim()) e.state = "Enter your state";
  return e;
}
