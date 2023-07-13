import { useEffect } from "react";

export default function useToken() {
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        if ((!token || token === "") && hash) {
        token = hash
            .substring(1)
            .split("&")
            .find((elem) => elem.startsWith("access_token"))
            .split("=")[1];

        setTimeout(() => {
            window.alert(
            "You have exceeded the 1 hour activity. Please login again."
            );
            window.localStorage.removeItem("token");
            window.location.reload();
        }, 3600 * 1000);

        window.location.hash = "";
        window.localStorage.setItem("token", token);
        }
    })
} 