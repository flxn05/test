// Convert a base64 string to an ArrayBuffer
function base64ToArrayBuffer(base64) {
    let binaryString = atob(base64.replace(/_/g, '/').replace(/-/g, '+'));
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Convert an ArrayBuffer to a base64 string
function arrayBufferToBase64(buffer) {
    let binaryString = '';
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString).replace(/\//g, '_').replace(/\+/g, '-');
}

// Register Passkey
document.getElementById('registerButton').addEventListener('click', async () => {
    try {
        const options = {
            challenge: new Uint8Array(32).buffer, // Properly use ArrayBuffer
            rp: { name: "Passkey Demo" },
            user: {
                id: new Uint8Array(16), // Must be a Uint8Array
                name: "user@example.com",
                displayName: "User"
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "preferred"
            },
            timeout: 60000
        };

        const credential = await navigator.credentials.create({ publicKey: options });

        if (credential) {
            // Store only rawId as base64
            localStorage.setItem('passkey', arrayBufferToBase64(credential.rawId));
            document.getElementById('status').textContent = "Passkey registered successfully!";
        }
    } catch (err) {
        document.getElementById('status').textContent = "Registration failed: " + err.message;
    }
});

// Login with Passkey
document.getElementById('loginButton').addEventListener('click', async () => {
    try {
        const storedPasskey = localStorage.getItem('passkey');
        if (!storedPasskey) {
            document.getElementById('status').textContent = "No passkey registered!";
            return;
        }

        const options = {
            challenge: new Uint8Array(32).buffer, // Properly use ArrayBuffer
            allowCredentials: [{
                type: "public-key",
                id: base64ToArrayBuffer(storedPasskey) // Convert back to ArrayBuffer
            }],
            timeout: 60000,
            userVerification: "preferred"
        };

        const assertion = await navigator.credentials.get({ publicKey: options });

        if (assertion) {
            document.getElementById('status').textContent = "Login successful!";
        } else {
            document.getElementById('status').textContent = "Login failed.";
        }
    } catch (err) {
        document.getElementById('status').textContent = "Login failed: " + err.message;
    }
});
