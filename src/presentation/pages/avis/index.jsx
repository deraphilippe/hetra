import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import convert from "../../helpers/convertisseur"
import { Box } from "@mui/material"
import { Spinner } from "../../components/loader"
import api from "data/api/api"


const Tableau = ({ data, id, printed }) => {
    const [typehab, setTypehab] = useState({ "HP": 0, "HT": 0, "AUP": 0, "AUT": 0 })
    const date = new Date()

    const adresse = ([(data.adress != null && data.adress != "") ? (data.adress + ", ") : "", (data.boriboritany != null && data.boriboritany != "") ? (", " + data.boriboritany) : "", data.fokontany.nomfokontany]).join(", ").replaceAll(", ,", "").replaceAll(" , ", ", ").trim()

    function formatter(number) {
        const numberString = String(number);
        let formattedNumber = '';

        for (let i = numberString.length - 1; i >= 0; i--) {
            formattedNumber = numberString[i] + formattedNumber;

            if ((numberString.length - i) % 3 === 0 && i !== 0) {
                formattedNumber = ' ' + formattedNumber;
            }
        }
        return formattedNumber;
    }

    const handleLogement = () => {
        let type = { "HP": 0, "HT": 0, "AUP": 0, "AUT": 0 }
        data.logs.map((logement) => {
            if (logement.typelog == "Habitat") {
                if (logement.typeoccup == "Propriétaire" || logement.typeoccup == "Occupant gratuit") {
                    type.HP += Math.round(logement.impotPerYearWithoutTaux)
                }
                else {
                    type.HT += Math.round(logement.impotPerYearWithoutTaux)
                }
            }
            else {
                if (logement.typeoccup == "Propriétaire" || logement.typeoccup == "Occupant gratuit") {
                    type.AUP += Math.round(logement.impotPerYearWithoutTaux)
                }
                else {
                    type.AUT += Math.round(logement.impotPerYearWithoutTaux)
                }
            }
        })
        setTypehab(type)
    }

    useEffect(() => {
        handleLogement()
    }, [data])

    return (
        <div className="avis-content">
            <div className="avis">
                <div className="header-avis">
                    <div className="hcontent">
                        <div className='center fw-bold' style={{ width: 30, height: 35 }}>
                            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={`/image/logo_cua.jpg`} alt="" />
                        </div>
                    </div>
                </div>
                <div className="header-avis">
                    <div className="hcontent">
                        <div>
                            REPOBLIKAN'I MADAGASIKARA
                        </div>
                        <div className='tarigetra'>
                            Fitiavana - Tanindrazana - Fandrosoana
                        </div>
                        <div className='bold'>
                            <span className='underline'>AVIS D'IMPOSITION</span>
                        </div>
                    </div>
                </div>
                <div className="header-avis">
                    <div className="hcontent">
                        {printed == false ? <div><NavLink to={"/admin/construction/" + data.numcons} className='btn btn-success'>Modifier</NavLink> </div> : null}
                        <div>N° <span className='bold'> {data.numfiche} / {date.getFullYear()} </span>
                        </div>
                        <div> Code : <span className='bold'>206082101</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header-text'>
                Suivant les éléments de recensement en possession du Service, votre imposition au titre de l'année <span className='bold'>2023</span>, est arrêtée comme suit :
            </div>
            <div className='flex'>
                <table className="table-avis">
                    <thead>
                        <tr>
                            <th className='center'>Article</th>
                            <th className='center'>Nom/Adresse/Emplacement</th>
                            <th className='center'>I.F.P.B</th>
                            <th className='center'>Impot à payer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='padded'>
                                <div className="center">
                                    {
                                        ((data.article != "null" && data.article != null) && data.article)

                                    }
                                </div>
                                <div className="center bold">
                                    {data.newarticle}
                                </div>
                            </td>
                            <td className='padded'>
                                <div>
                                    {data.proprietaire == null ? "Propriétaire inconnu" : data.proprietaire.nomprop + " " + (data.proprietaire.prenomprop || "")}
                                </div>
                                <div>
                                    {adresse}
                                </div>
                                <div>
                                    AMBALAVAO
                                </div>
                                <div>
                                    {data.numcons}
                                </div>
                            </td>
                            <td>
                                <div className='padded'>
                                    <div className='center'>
                                        Valeur locative
                                    </div>
                                    <div className='flex'>
                                        <div className='center'>
                                            <div>
                                                HP
                                            </div>
                                            <div>
                                                {formatter(typehab["HP"])}
                                            </div>
                                        </div>
                                        <div className='center'>
                                            <div>
                                                HT
                                            </div>
                                            <div>
                                                {formatter(typehab["HT"])}
                                            </div>
                                        </div>
                                        <div className='center'>
                                            <div>
                                                AUP
                                            </div>
                                            <div>
                                                {formatter(typehab["AUP"])}
                                            </div>
                                        </div>
                                        <div className='center'>
                                            <div>
                                                AUT
                                            </div>
                                            <div>
                                                {formatter(typehab["AUT"])}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-center bordered-top padded'>
                                    <div className='center'>
                                        <div>
                                            Total IFPB
                                        </div>
                                        <div className='bold'>
                                            {formatter(data.impot)}
                                        </div>
                                    </div>
                                </div>

                            </td>
                            <td>
                                <div className='padded'>
                                    <div className='center'>
                                        Ar.
                                    </div>
                                    <div className='center bold'>
                                        <div>
                                            {formatter(data.impot)}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='footer-text' style={id !== 4 ? { width: "100%", marginBottom: 5, borderBottom: "2px dashed black" } : {}}>
                <div>
                    Arrêté le présent avis d'imposition à la somme de : <span style={{ fontWeight: "bolder" }}> {convert(data.impot)} ariary </span>
                </div>
                <div>
                    Date de mise en recouvrement :
                </div>

                <div style={{ height: 8 }}>

                </div>
            </div>
        </div >
    )
}


const AvisImposition = () => {
    const { id } = useParams()
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(1);

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemPerPage] = useState(50)
    const [printed, setPrinted] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetch = async () => {
        var response = await api.get("data/construction-more-list.json")
        if (id !== undefined) {
            let data = response.data.filter((construction) => construction.numcons == id)
            data = data[0]
            setTotal(1)
        }
        else {
            setTotal(response.data.length)
            setData(response.data)
        }
        setLoading(false)
    }

    const print = () => {
        setPrinted(true)
    }

    useEffect(() => {
        if (printed) {
            window.print()
            setPrinted(false)
        }
    }, [printed])

    useEffect(() => {
        fetch()
    }, [itemsPerPage, currentPage])

    return (
        <div printed={printed}>
            {
                !printed &&
                <Box
                    display="flex"
                    justifyContent="space-between"
                    p={4}
                    mb={5}
                >
                    <div></div>
                    <button onClick={print} className='btn btn-success'><i className='fa fa-print'></i> Imprimer</button>
                </Box>
            }
            <div className={!printed ? "container" : ""}>

                {loading ? <Spinner /> : Array(Math.ceil(data.length / 5))
                    .fill()
                    .map((_, groupIndex) => (
                        <div className="page" key={groupIndex} style={!printed ? {
                            boxShadow: "0 0 5px rgba(159, 159, 159, 0.3)",
                            backgroundColor: "white",
                            padding: "20px"
                        } : { padding: 0, boxShadow: "none", paddding: 0 }}>
                            {data.slice(groupIndex * 5, groupIndex * 5 + 5).map((value, index) => (
                                <Tableau key={groupIndex + "" + index} printed={printed} data={value} id={index} />
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AvisImposition