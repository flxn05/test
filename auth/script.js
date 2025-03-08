async function register() {
    if (!window.PublicKeyCredential) {
        alert("WebAuthn not supported on this browser.");
        return;
    }

    try {
        const publicKey = {
            challenge: new Uint8Array(32),
            rp: { name: "My Website" },
            user: {
                id: new Uint8Array(16),
                name: "testuser",
                displayName: "Test User"
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
            authenticatorSelection: { userVerification: "required" },
            timeout: 60000
        };

        const credential = await navigator.credentials.create({ publicKey });
        console.log("Registration successful!", credential);
        document.getElementById("message").innerText = "Registration successful!";
    } catch (err) {
        console.error("Registration failed", err);
        document.getElementById("message").innerText = "Registration failed.";
    }
}

async function login() {
    try {
        const publicKeyCredentialRequestOptions = {
            challenge: new Uint8Array(32),
            allowCredentials: [{
                type: "public-key",
                id: new Uint8Array(16),
                transports: ["internal"]
            }],
            timeout: 60000,
            userVerification: "required"
        };

        const credential = await navigator.credentials.get({ publicKey: publicKeyCredentialRequestOptions });
        console.log("Login successful!", credential);
        document.getElementById("message").innerText = "Login successful!";
    } catch (err) {
        console.error("Login failed", err);
        document.getElementById("message").innerText = "Login failed.";
    }
}

document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("loginBtn").addEventListener("click", login);
