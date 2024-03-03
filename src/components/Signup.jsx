import { signInWithGooglePopup } from "../firebase.js"
const Signup = () => {
const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
return (
        <div>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}
export default Signup;