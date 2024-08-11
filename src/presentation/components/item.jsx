import { NavLink, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material"
import { Person } from "@mui/icons-material";
import { useState } from "react";

import { formatter } from "presentation/helpers/convertisseur"

const CardItem = ({ data }) => {
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <Card
            elevation={0}
            className="mui-card"
            style={{
                cursor: "pointer",
            }}
        >
            {imageLoading == true && (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height={140}
                >
                    <CircularProgress
                        sx={{
                            color: "#429F5F"
                        }}
                    />
                </Box>
            )}
            <CardMedia
                component="img"
                height={imageLoading ? "0" : "140"}
                src={`/images/20230309100053062603401.jpg`}
                onLoad={() => setImageLoading(false)}
                onClick={() => {
                    navigate("/admin/construction/" + data.numcons);
                }}
            />
            <CardContent>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Person sx={{
                        backgroundColor: data.reste == 0 ? "green" : "#fff",
                        width: "25px",
                        color: "#BBBBBB",
                        mr: 1,
                        borderRadius: 2
                    }} />

                    <Typography sx={{
                        fontSize: "0.9rem"
                    }} variant="body1" fontWeight="bold">
                        {data.proprietaire}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                    }}>
                    <Typography
                        sx={{
                            fontSize: "0.8rem"
                        }}
                    >{data.surface} m² ({data.niveau} niv)</Typography>
                    {
                        localStorage.getItem("mode") == "gestion" &&
                        <Typography
                            sx={{
                                fontSize: "0.8rem"
                            }}
                        >IFPB: {data.impot} Ar</Typography>
                    }
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    <Typography
                        sx={{
                            fontSize: "0.8rem"
                        }}
                    >Impôt: {formatter(data.impot)} Ar</Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "0.8rem"
                    }}
                >
                    Adresse: {data.adresse}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "0.8rem"
                    }}
                >
                    Fokontany: {data.fokontany}
                </Typography>
                <NavLink to={`/map/idfoko=${data.idfoko}/numcons=${data.numcons}`}><i className="fa fa-thumb-tack"></i></NavLink>
            </CardContent>
        </Card>
    )
}

export default CardItem