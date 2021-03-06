import React from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import TechnologyImage from '../../Images/Technology.jpg'
import MatemathicsImage from '../../Images/Matemathics.jpg'
import GeographyImage from '../../Images/Geography.jpg'
import HistoryImage from '../../Images/History.jpg'
import ScienceImage from '../../Images/Science.jpg'
import EnglishImage from '../../Images/English.jpg'


const useStyles = makeStyles((theme) => ({
    paperTechnology:{
        backgroundImage:`url(${TechnologyImage})`,
        height:200,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        pointerEvents:true
    },
    paperMatemathics:{
        backgroundImage:`url(${MatemathicsImage})`,
        height:200,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        pointerEvents:true
    },
    paperGeography:{
        backgroundImage:`url(${GeographyImage})`,
        height:200,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        pointerEvents:true
    },
    paperHistory:{
        backgroundImage:`url(${HistoryImage})`,
        height:200,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        pointerEvents:true
    },
    paperScience:{
        backgroundImage:`url(${ScienceImage})`,
        height:200,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        pointerEvents:true
    },
    paperEnglish:{
        backgroundImage:`url(${EnglishImage})`,
        height:200,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        pointerEvents:true
    },
    containerCategories:{
        padding: 20,
    },
    textCategory:{
        textAlign: 'center',
        paddingTop: 80,
        margin:0,
        color:'white',
        fontSize:'6vmin'
        
    },
}));
export default function Category(props) {
    const classes = useStyles()

    function categoryManger(event, id){
        props.category(id)
    }

    return (
        <Grid>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid item xs={4}>
                    <h1>Selecciona una categor??a</h1>
                </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={2} className={classes.containerCategories}>
                <Grid item xs={4} onClick={(e) => categoryManger(e, 'TECNOLOGIA')} id="technology" style={{cursor:'pointer'}}>
                    <Paper elevation={3} className={classes.paperTechnology} >
                        <Grid>
                            <h2 className={classes.textCategory}> Tecnolog??a </h2>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} onClick={(e) => categoryManger(e, 'MATEMATICAS')} id="matemathics" style={{cursor:'pointer'}}>
                    <Paper elevation={3} className={classes.paperMatemathics} >
                        <Grid>
                            <h2 className={classes.textCategory}> Matem??ticas </h2>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} onClick={(e) => categoryManger(e, 'GEOGRAFIA')} id="geography" style={{cursor:'pointer'}}>
                    <Paper elevation={3} className={classes.paperGeography} >
                        <Grid>
                            <h2 className={classes.textCategory}> Geograf??a </h2>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} onClick={(e) => categoryManger(e, 'HISTORIA')} id="history" style={{cursor:'pointer'}}>
                    <Paper elevation={3} className={classes.paperHistory} >
                        <Grid>
                            <h2 className={classes.textCategory}> Historia </h2>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} onClick={(e) => categoryManger(e, 'CIENCIA')} id="science" style={{cursor:'pointer'}}>
                    <Paper elevation={3} className={classes.paperScience} >
                        <Grid>
                            <h2 className={classes.textCategory}> Ciencia </h2>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} onClick={(e) => categoryManger(e, 'INGLES')} id="english" style={{cursor:'pointer'}}>
                    <Paper elevation={3} className={classes.paperEnglish} >
                        <Grid>
                            <h2 className={classes.textCategory}> Ingl??s </h2>
                        </Grid>
                    </Paper>
                </Grid>
           </Grid>
        </Grid> 
    );
}