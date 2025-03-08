console.log('2nd 11:07')
document.getElementById("authButton").addEventListener("click", async function () {
    if (!window.PublicKeyCredential) {
        document.getElementById("message").innerText = "WebAuthn wird nicht unterstützt 😞";
        return;
    }

    try {
        // Windows Hello explizit verwenden ohne Passkeys
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32),
                allowCredentials: [],
                userVerification: "required",
                authenticatorSelection: { authenticatorAttachment: "platform" } // Nutzt Windows Hello direkt
            }
        });

        console.log("✅ Authentifizierung erfolgreich!", credential);
        document.getElementById("message").innerText = "✅ Authentifizierung erfolgreich!";
    } catch (error) {
        console.error("❌ Authentifizierung fehlgeschlagen", error);
        document.getElementById("message").innerText = "❌ Authentifizierung fehlgeschlagen.";
    }
});
