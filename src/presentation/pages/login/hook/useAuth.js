import { useState } from "react";
import { useNavigate } from "react-router-dom";


function useAuth(data, helpers) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true)
        setTimeout(() => {
            navigate("/admin/dashboard")
        }, [2000])
    }

    return { isLoading, handleLogin }
}

export default useAuth