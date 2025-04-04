import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

console.log('Initializing Echo with:', {
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    scheme: import.meta.env.VITE_REVERB_SCHEME
});

window.Echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY, // "heoxaoyb9qxxc3hl5ifk"
    wsHost: import.meta.env.VITE_REVERB_HOST, // "localhost"
    wsPort: import.meta.env.VITE_REVERB_PORT, // 8080
    wssPort: import.meta.env.VITE_REVERB_PORT, // 8080 (not used with http)
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https", // false
    enabledTransports: ["ws"], // http scheme, so only ws
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Echo initialized:", window.Echo);

    window.Echo.channel("notifications").listen(".notification.sent", (e) => {
        console.log("Event received:", e);
        alert("Notification sent: " + e.message);
    });
});