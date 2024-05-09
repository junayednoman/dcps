import axios from "axios"

export default function handleLogout() {
    const apiUrl = "http://localhost:3000/api/auth/logout";
    axios.post(apiUrl)
        .then(res => {
            if (res.status === 200) {
                return window.location = "/";
            }
        }).catch(error => {
            console.log(error.message);
        })
}
