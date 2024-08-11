import api from "data/api/api";
import { useEffect, useState } from "react";


function useFindConstruction(page, search) {
    const [montant, setMontant] = useState(0)
    const [constructions, setConstructions] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const refetch = async () => {
        setIsLoading(true)
        
        await api.get("data/constructions-simple-list.json")
            .then((response) => {
                setIsLoading(false)
                setMontant(response.data.montant)
                setConstructions(response.data.construction)
                setTotal(response.data.total)
                localStorage.setItem("page", response.data.currentPage)
                localStorage.setItem("search", search)
            })

    }

    useEffect(() => {
        refetch()
    }, [])

    return { isLoading, montant, constructions, total, refetch }
}

export default useFindConstruction