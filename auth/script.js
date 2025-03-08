document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.getElementById("authBtn");
    const registerButton = document.getElementById("registerBtn");
    const statusMessage = document.getElementById("status");
    const body = document.body;

    async function registerPasskey() {
        const publicKey = {
            challenge: new Uint8Array(32),
            rp: { name: "My Secure App" },
            user: {
                id: new Uint8Array(16),
                name: "user@example.com",
                displayName: "User",
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
            authenticatorSelection: { authenticatorAttachment: "platform" },
        };

        try {
            const credential = await navigator.credentials.create({ publicKey });
            console.log("Passkey erstellt:", credential);
            statusMessage.innerHTML = "✅ Passkey successfully registered!";
            statusMessage.classList.add("success");
            body.classList.remove("greyscale");
            navigator.vibrate(500); // Langes Vibrieren auf dem Handy
        } catch (err) {
            console.error("Fehler bei der Registrierung:", err);
            statusMessage.innerHTML = "❌ Registration failed.";
            statusMessage.classList.add("error");
            body.classList.remove("greyscale");
            navigator.vibrate([100, 50, 100]); // Kurzes Vibrieren für Fehler
        }
    }

    async function authenticate() {
        body.classList.add("greyscale"); // Bildschirm grau während Authentifizierung
        statusMessage.innerHTML = "🔄 Authenticating...";
        statusMessage.classList.remove("success", "error");

        try {
            const publicKey = { challenge: new Uint8Array(32) };
            const credential = await navigator.credentials.get({ publicKey });

            console.log("Authenticated:", credential);
            statusMessage.innerHTML = "✅ Authentication successful!";
            statusMessage.classList.add("success");
            navigator.vibrate(500);
        } catch (err) {
            console.error("Authentication failed:", err);
            statusMessage.innerHTML = "❌ Authentication failed.";
            statusMessage.classList.add("error");
            navigator.vibrate([100, 50, 100]);
        } finally {
            body.classList.remove("greyscale");
        }
    }

    registerButton.addEventListener("click", registerPasskey);
    authButton.addEventListener("click", authenticate);
});
