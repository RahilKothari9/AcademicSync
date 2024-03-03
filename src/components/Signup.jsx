import { signOut, getAuth } from "firebase/auth";
import { signInWithGooglePopup } from "../firebase.js"
const Signup = () => {

const SignOutUser = () => {
    const auth = getAuth();
    signOut(auth)
}
const logGoogleUser = async () => {
        const response = await signInWithGooglePopup().then((result) => {
            // Get user data
            const user = result.user;
        
            // Check if the email address ends with "@somaiya.edu"
            if (user.email.endsWith("@somaiya.edu")) {
              // Allow the user to proceed
              console.log("User signed in successfully");
            } else {
              // Deny access
              console.log("Access denied. Only @somaiya.edu addresses are allowed.");
              // You might want to sign the user out at this point
              firebase.auth().signOut();
            }
          })
          .catch((error) => {
            // Handle errors
            console.error("Error during sign-in:", error);
          });;
        console.log(response);
    }
return (
        <div>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <button onClick={SignOutUser}>Sign Out</button>
        </div>
    )
}
export default Signup;