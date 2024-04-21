import { getAuth, signOut } from "firebase/auth";
import "../App.css";
import "../components/css/singup.css";
import { signInWithGooglePopup } from "../firebase.js";

import { useNavigate } from "react-router-dom";
const Signup = () => {
  const SignOutUser = () => {
    const auth = getAuth();
    signOut(auth);
  };
  const navigate = useNavigate();
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
      .then((result) => {
        // Get user data
        const user = result.user;

        // Check if the email address ends with "@somaiya.edu"
        if (user.email.endsWith("@somaiya.edu")) {
          // Allow the user to proceed
          console.log("User signed in successfully");
          navigate("/details");
        } else {
          // Deny access
          console.log(
            "Access denied. Only @somaiya.edu addresses are allowed."
          );
          // You might want to sign the user out at this point
          firebase.auth().signOut();
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during sign-in:", error);
      });
    console.log(response);
  };

  return (
    <div>
      <div>
        <a href="#">
          <img className="logo" src="../AcademicSync2.png" alt="logo" />
        </a>
      </div>
      <div className="bt">
        <button onClick={logGoogleUser}>Sign In With Google</button>
      </div>
    </div>
  );
};
export default Signup;
