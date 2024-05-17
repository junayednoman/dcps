export function generateUniqueId() {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5); // Adjust length as needed
    return timestamp + randomString;
}
