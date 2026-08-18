import { Toaster } from "react-hot-toast";

export function useToast() {
    const success = (message: string) => {
        toast.success(message, {
            icon: '✅',
        })
    }

    const error = (message: string) => {
        toast.error(message, {
            icon: '❌',
        })
    }

    const info = (message: string) => {
        toast(message, {
            icon: 'ℹ️',
        })
    }

    const custom = (message: string, options?: any) => {
        toast(message, options)
    }

    return { success, error, info, custom }
}