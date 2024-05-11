export default async function handleLogout() {

    const apiUrl = "http://localhost:3000/api/auth/logout";
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
        });

        if (response.status === 200) {
            return { isLoggedOut: true }
        }
    } catch (error) {
        console.log(error.message);
    }
}
