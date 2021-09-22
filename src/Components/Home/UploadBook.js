import React, { useState } from "react";
import { TextField, makeStyles, Paper, Grid, Button } from "@material-ui/core";
import PortadaLibro from '../../Images/PortadaLibro.jpg'
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
    
    containerCategories:{
        padding: 20,
    },
    title:{
        margin:0,
        color:'black',
        fontSize:'3vmin',
        marginRight:10
    },
    imgPortada: {
        width:'100%', 
        objectFit: 'cover' 
    },
    text:{
        margin:0,
        color:'black',
        fontSize:'2.5vmin'
    },
    select:{
        width:600,
        height: 30
    },
    button:{
        backgroundColor:'red',
        width:'100%',
        height:50,
        color:'white',
        borderRadius:4,
        textAlign:'center',
        padding:8
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
export default function UploadBook() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [categoryName, setCategoryName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategoryName(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const addBook = () =>{
        enqueueSnackbar("Sucess", {variant: 'success'});

    };

    return (
        <Grid>

            <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={2} className={classes.containerCategories}>
                
                <Grid item xs={3}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item >
                            <p className={classes.title}>Título: </p>
                        </Grid>
                        <Grid item >
                            <TextField></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item >
                            <p className={classes.title}>Año: </p>
                        </Grid>
                        <Grid item >
                            <TextField></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item >
                            <p className={classes.title}>Editorial: </p>
                        </Grid>
                        <Grid item >
                            <TextField></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item >
                            <p className={classes.title}>Categorias: </p>
                        </Grid>
                        <Grid item >
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={categoryName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                className={classes.select}
                            >
                            {categories.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={categoryName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item >
                            <p className={classes.title}> Portada: </p>
                        </Grid>
                        <Grid item >
                            <input type="file"
                            id="portada" name="portada"
                            accept="image/png, image/jpeg, image/jpg" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item >
                            <p className={classes.title}> Libro: </p>
                        </Grid>
                        <Grid item >
                            <input type="file"
                            id="filesPDF" name="filesPDF"
                            accept=".pdf"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={12}>
                            <Button className={classes.button} onClick={addBook}> + Agregar</Button> 
                        </Grid>
                        <Grid item >
                        </Grid>
                    </Grid>
                </Grid>

            </Grid> 
        </Grid> 
    );
}