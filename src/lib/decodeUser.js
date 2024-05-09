export default function decodeUser(token) {
    try {
        // Split the token into its parts
        if (token) {
            const tokenParts = token.split('.');

            // Extract the payload part
            const encodedPayload = tokenParts[1];

            // Decode Base64-encoded payload
            const decodedPayload = atob(encodedPayload);

            // Parse the decoded payload as JSON
            const payload = JSON.parse(decodedPayload);

            // Extract and return the role from the payload
            return { emis: payload.emis, role: payload.role };
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null if there's an error decoding the token
    }
}