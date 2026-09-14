"use client"
import { signIn} from "next-auth/react"

const LoginButton = () => {
    return (
        <div>
            <button onClick={() => signIn()} className="btn">Login</button>
        </div>
    );
};

export default LoginButton;