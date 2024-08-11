import { useCallback, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'data/api/axios'
import { Spinner } from 'presentation/components/loader'
import { typeconstruction, typelogement, typeproprietaire } from 'data/constants/typedata'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { formatter } from 'presentation/helpers/convertisseur'
import { Box, Button, ButtonGroup, Typography, Grid } from '@mui/material'

import Formulaire from "./components/formulaire"
import Detail from "presentation/components/details"
import api from 'data/api/api'

const AboutConstruction = () => {
    const { id, geometry } = useParams()
    const [construction, setConstruction] = useState()
    const [fieldConstruction, setFieldConstruction] = useState(typeconstruction)
    const [loading, setLoading] = useState(true)

    const [showDetail, setShowDetail] = useState(false)

    const navigation = useNavigate()

    const getConstruction = async () => {
        var response = await api.get("data/construction-more-list.json")

        let data = response.data.filter((construction) => construction.numcons == id)
        data = data[0]

        setFieldConstruction((prevField) => ({
            ...prevField,
            "idfoko": data
        }))

        if (data.proprietaire == null) {
            data.proprietaire = {}
            Object.keys(typeproprietaire).forEach((value) => {
                data.proprietaire[value] = ""
            })
            data.proprietaire["numcons"] = data.numcons
        }

        if (data.logements == null) {
            data.logements = []
        }

        data.logs.map((item) => {
            if (item.confort == null) {
                item.confort = ""
            }
            return item
        })

        data.logements = data.logs
        setConstruction(data)
        setLoading(false)
    }

    useEffect(() => {
        getConstruction()
    }, [id, geometry])

    const fileRef = useRef()
    const [file, setFile] = useState()

    const handleImageChange = async (e) => {
        let form = new FormData()

        form.append("image", e.target.files[0])
        form.append("numcons", construction.numcons)
        await axios.post("/api/addimage", form)
            .then((response) => {
                toast.success("Image changé")
                setFile(e.target.files[0])
            })
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />
            <Box
                mt={5}
                p={5}
            >
                {loading ? <Spinner /> :
                    <Box>
                        {
                            construction.numcons != undefined &&
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={5}
                                flexDirection={{ xs: 'column', md: 'row' }}
                            >
                                <Box>
                                    <Box
                                        mb={2}
                                    >
                                        <ButtonGroup variant='contained' color='inherit' size='small' >
                                            <Button sx={{ textTransform: "none", pt: 1 }} onClick={() => { fileRef.current.click() }} >
                                                <Typography>Changer image</Typography>
                                            </Button>
                                            <Button sx={{ textTransform: "none", pt: 1 }} onClick={() => { setShowDetail(!showDetail) }}>
                                                <Typography>Detail {showDetail ? "de la construction" : "du calcul"} </Typography>

                                            </Button>

                                            <Button sx={{ textTransform: "none", pt: 1 }} onClick={() => {
                                                navigation("/avis/" + (construction.numcons || id))
                                            }}>
                                                <Typography>Voir avis d'imposition </Typography>
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                    <Box>
                                        <Typography variant='h5'>IFPB: {construction.impot != null && formatter(construction.impot) + " Ariary"} </Typography> <Typography>ID: {construction.numcons}</Typography>

                                        <Box>
                                            Loyer mensuel:  {construction.loyer}
                                        </Box>
                                    </Box>

                                </Box>
                                <img alt='Image de la construction' src={`/images/20230309100053062603401.jpg`} />
                                <input onChange={handleImageChange} accept='image/*' ref={fileRef} type='file' style={{ display: "none" }} />

                            </Box>
                        }
                        <Grid container spacing={2}>
                            {
                                showDetail ? (construction != null && <>

                                    <Detail data={construction.logements} />

                                </>) :
                                    construction != null &&
                                    <Grid item xs={12} sm={12} lg={12} md={12}>
                                        <Formulaire
                                            icon="fa fa-home"
                                            id="numcons"
                                            data={construction}
                                            parameter={fieldConstruction}
                                            file={file}
                                            title="Construction"
                                            col={3}
                                            refresh={getConstruction}
                                            url="/construction"
                                        />
                                    </Grid>
                            }
                            {
                                construction.numcons != undefined && !showDetail && <>

                                    <Grid item xs={12} sm={12} lg={12} md={12}>
                                        <Formulaire
                                            icon="fa fa-user"
                                            id="numprop"
                                            data={construction.proprietaire}
                                            parameter={typeproprietaire}
                                            refresh={getConstruction}
                                            col={12}
                                            title="Propriétaire"
                                            url="/proprietaire"
                                        />
                                    </Grid>
                                    {
                                        construction.logs.map(
                                            (value, key) =>

                                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                                    <Formulaire
                                                        id="numlog"
                                                        icon="fa fa-folder"
                                                        key={key}
                                                        data={value}
                                                        col={3}
                                                        index={key}
                                                        parameter={typelogement}
                                                        refresh={getConstruction}
                                                        title="Logement"
                                                        url="/logement"
                                                    />
                                                </Grid>
                                        )
                                    }

                                </>
                            }
                        </Grid>
                    </Box>
                }
            </Box>
        </>
    )
}

export default AboutConstruction