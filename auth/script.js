document.getElementById("authButton").addEventListener("click", async function () {
    document.body.classList.add("greyscale"); // Website in Graustufen setzen
    document.getElementById("loadingBar").style.transform = "scaleX(1)"; // Ladebalken starten
    document.getElementById("authButton").disabled = true;

    if (!window.PublicKeyCredential) {
        showError("WebAuthn is not supported.");
        return;
    }

    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Fake Ladezeit für Realismus

        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32),
                allowCredentials: [],
                userVerification: "required",
                authenticatorSelection: { authenticatorAttachment: "platform" }
            }
        });

        console.log("✅ Authentication successful!", credential);
        showSuccess("✅ Access Granted!");
    } catch (error) {
        console.error("❌ Authentication failed", error);
        showError("❌ Authentication failed.");
    }
});

function showError(message) {
    document.body.classList.remove("greyscale"); // Farben zurücksetzen
    document.getElementById("loadingBar").style.transform = "scaleX(0)"; // Ladebalken ausblenden
    document.getElementById("authButton").disabled = false;

    const container = document.querySelector(".login-container");
    container.classList.add("error");

    document.getElementById("message").innerText = message;
    setTimeout(() => container.classList.remove("error"), 300);
}

function showSuccess(message) {
    document.body.classList.remove("greyscale"); // Farben zurücksetzen
    document.getElementById("loadingBar").style.transform = "scaleX(0)"; // Ladebalken ausblenden

    const popup = document.getElementById("successPopup");
    popup.classList.add("show-popup");

    document.getElementById("message").innerText = message;

    setTimeout(() => {
        popup.classList.remove("show-popup");
        document.getElementById("authButton").disabled = false;
    }, 2000);

    // Vibrations-Feedback für Mobile
    if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
    }
}
