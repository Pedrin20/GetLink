import { useAuth } from "../hooks/useAuth";
import { AuthForm } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            console.log("Usuario logado, redirecionado para /")
            navigate('/', { replace: true })
        }
    }, [user, navigate])
    
return <AuthForm />
}