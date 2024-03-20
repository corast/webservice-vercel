import React, {useState} from "react";
import axios from "axios";
import { Button, TextField, Typography, Paper} from "@mui/material";



const Transformation = () => {

    const [e, setE] = useState(0);
    const [n, setN] = useState(0);
    const [b, setB] = useState(0);
    const [l, setL] = useState(0);

    // const transformer = Transformer.from_crs("epsg:2056", "epsg:4326")
 
    const lv95towgs84 = async() => {
        try{
            const response = await axios.get(`/api/add?e=${e}&n=${n}`);
            const { E, N } = response.data;
    
            // const result = transformer.transform(E, N);
            setL(result[0]); 
            setB(result[1]);

        }
        catch{
            console.log("FEHLER")
        }
    }

    return(
        <>
            <Paper elevation={5} style={{padding: '15px', margin: '15px', maxWidth: '400px'}}> 
                <Typography variant="h5">Transformation von LV59-Koorinaten zu WGS84-Koordinaten</Typography>
                <TextField
                    label="E-Koordinate"
                    value={e}
                    onChange={(e) => setE(parseFloat(e.target.value) || 0)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="N-Koordinate"
                    value={n}
                    onChange={(e) => setN(parseFloat(e.target.value) || 0)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={lv95towgs84}>
                    Transformieren
                </Button>
                
                {l !== 0 && b !== 0 && (
                    <Typography variant="h6">
                        Das Resultat ist: {l}, {b}
                    </Typography>
                )}

            </Paper>
            
        </>
    )
}

export default Transformation;