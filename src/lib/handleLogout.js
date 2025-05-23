export default async function handleLogout() {
  const apiUrl = "https://billreturnmanagement.com/api/auth/logout";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
    });

    if (response.status === 200) {
      return { isLoggedOut: true };
    }
  } catch (error) {
    console.log(error.message);
  }
}
