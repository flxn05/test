document.getElementById("authButton").addEventListener("click", async function () {
    if (!window.PublicKeyCredential) {
        document.getElementById("message").innerText = "WebAuthn wird nicht unterstützt 😞";
        return;
    }

    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32),
                userVerification: "required"
            }
        });

        console.log("✅ Authentifizierung erfolgreich!", credential);
        document.getElementById("message").innerText = "✅ Authentifizierung erfolgreich!";
    } catch (error) {
        console.error("❌ Authentifizierung fehlgeschlagen", error);
        document.getElementById("message").innerText = "❌ Authentifizierung fehlgeschlagen.";
    }
});
