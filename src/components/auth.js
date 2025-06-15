import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "firebase/auth";

import { auth } from "./firebase"; // Import initialized auth from firebase.js


// Google Sign-In
const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope("profile"); // Request profile information
        provider.addScope("email");   // Request email information
        const result = await signInWithPopup(auth, provider);
        // Wait for Firebase to update the user state
        await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                    unsubscribe();
                }
            });
        });
        console.log("User Info:", result.user); // Debugging: Check user info
    } catch (error) {
        console.error("Error signing in:", error.message);
    }
};


// Function to update the user menu dynamically
function updateUserMenu(user) {
    const userEmail = document.getElementById("user-email");
    const userPic = document.getElementById("user-pic");
    const userName = document.getElementById("user-name");


    if (user && userEmail && userName && userPic) {
        // User is signed in
        userEmail.textContent = user.email || "No Email";
        userPic.src = user.photoURL || "User Image";
        userName.textContent = user.displayName || "No Name";
    } else if (userName && userEmail && userPic) {
        // User is signed out
        userEmail.textContent = "Not logged in";
        userPic.textContent = "User Image";
        userName.textContent = "Guest";
    }
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User Info:", user);
        console.log("Photo URL:", user.photoURL || "User Image"); // 👈 Check this in the console
        // Save to state
      } else {
        console.log("No user is signed in.");
      }
    updateUserMenu(user);
});


export { signInWithGoogle };
