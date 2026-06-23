import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth } from "../firebase";

export function useAuth() {
    const [ user, setUser ] = useState<User | null>(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u)
            setLoading(false)
        })
        return () => unsub()
    }, [])

    async function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
        console.log("Iniciando tentativa de login: ", email)
        try {
        const userCredential = await signInWithEmailAndPassword( auth, email, password )
        console.log("Login bem sucedido! Usuario: ", userCredential);

        return userCredential
        } catch(error) {
            console.error("Error capturado no login, codigo: ", error.code, "mensagem:", error.message);
            throw error;
        }
    }

    async function register(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    return { user, loading, login, register, logout }
}