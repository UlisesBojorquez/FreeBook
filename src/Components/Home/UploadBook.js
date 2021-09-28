import React, { useState } from "react";
import { TextField, makeStyles, Grid, Button } from "@material-ui/core";
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useSnackbar } from 'notistack';
import Axios from 'axios'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const useStyles = makeStyles((theme) => ({
    
    containerCategories:{
        padding: 20,
    },
    title:{
        margin:0,
        textAlign:'left',
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
        width:'100%',
        height: '100%',
        border: 'solid 2px black',
        
        
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
    textfield:{
        border: 'solid 2px black',
        borderRadius: 4,
        backgroundColor:'#F7F7F7',
        height:50,
        padding:8,
        width:'100%'
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
    'Tecnologia',
    'Matematicas',
    'Geografia',
    'Historia',
    'Ciencia',
    'Ingles',
];


export default function UploadBook() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    //Variables
    const [categoryName, setCategoryName] = useState([]);
    const [urlPortada, setUrlPortada] = useState('');
    const [urlLibro, setUrlLibro] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [editorial, setEditorial] = useState('');
    const [authors, setAuthors] = useState('');
    const [isbn, setISBN] = useState('');

    //API's
    const API_ENDPOINT = 'https://2zfseslqb7.execute-api.us-east-1.amazonaws.com/default/getPresignedImageURL'
    const API_ENDPOINT2 = 'https://gcgbdvlouk.execute-api.us-east-1.amazonaws.com/default/getPresignedPDFURL'
    const API_ENDPOINT_INSERT_BOOK = 'https://75bvpa6yfb.execute-api.us-east-1.amazonaws.com/book'


    //Events
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategoryName(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeStatus = ({ meta, remove }, status) => {
        console.log(status, meta)
        if(status==='removed'){
            setUrlPortada('')
        }
    }

    const handleChangeStatus2 = ({ meta, remove }, status) => {
        console.log(status, meta)
        if(status==='removed'){
            setUrlLibro('')
        }
    }

    const handleSubmit = async(files) =>{

        const f = files[0]
        //console.log(f['file'])
        //GET request: presigned URL
        const response = await Axios({
            method: 'GET',
            url: API_ENDPOINT
        })
        //console.log('Response: ', response)
        //PUT request: upload file to S3
        const result = await fetch(response.data.uploadURL, {
            method: 'PUT',
            headers:{
                "Content-Type":"image/png, image/jpg, image/jpeg"
            },
            body: f['file']
          })
          //console.log('Result: ', result)

        const urlFinal = result.url.split('?')[0]
        //console.log(urlFinal)
        setUrlPortada(urlFinal)
        

    }

    const handleSubmit2 = async(files) =>{

        const f = files[0]
        //console.log(f['file'])
        //GET request: presigned URL
        const response = await Axios({
            method: 'GET',
            url: API_ENDPOINT2
        })
        //console.log('Response: ', response)
        //PUT request: upload file to S3
        const result = await fetch(response.data.uploadURL, {
            method: 'PUT',
            headers:{
                "Content-Type":"application/pdf"
            },
            body: f['file'],
            
          })
          //console.log('Result: ', result)

        const urlFinal = result.url.split('?')[0]
        //console.log(urlFinal)
        setUrlLibro(urlFinal)
        

    }

    const handleInsertBook = async() =>{

        if(validateInputs()){
            const authorsArray = authors.split(',');
        
            const bodyStr={
                "isbn": isbn,
                "title": title,
                "year": year,
                "editorial": editorial,
                "url": urlLibro,
                "coverurl": urlPortada,
                "authors": authorsArray,
                "categories": categoryName
            }

            Axios.post(API_ENDPOINT_INSERT_BOOK, bodyStr).then(response => console.log(response))
            enqueueSnackbar("Se envio el libro correctamente, entra en modo de espera para ser aceptado.", {variant: 'success'});


        }else{
            enqueueSnackbar("Faltan datos por capturar", {variant: 'error'});
        }
    }

    //Methods
    const changeManager = (event) => {
        const currentValue=event.target.value;
        if(event.target.id==='title'){
            const re=/^[a-zA-z0-9áéíóú_,.\s]{0,100}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setTitle(currentValue.trimStart());
            }
        }
        if(event.target.id==='year'){
            const re=/^[0-9]{0,4}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setYear(currentValue.trimStart());
            }
        }
        if(event.target.id==='editorial'){
            const re=/^[a-zA-z0-9áéíóú_.\s]{0,50}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setEditorial(currentValue.trimStart());
            }
        }
        if(event.target.id==='authors'){
            const re=/^[a-zA-záéíóú_,.\s]{0,200}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setAuthors(currentValue.trimStart());
            }
        }
        if(event.target.id==='isbn'){
            const re=/^[0-9]{0,13}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setISBN(currentValue.trimStart());
            }
        }
    }

    const validateInputs = () =>{
        var res=true
        if(title === ''){
            res=false
        }
        if(year === ''){
            res=false
        }
        if(editorial === ''){
            res=false
        }
        if(isbn === ''){
            res=false
        }
        if(categoryName.length === 0){
            res=false
        }
        if(urlLibro === ''){
            res=false
        }
        if(urlPortada === ''){
            res=false
        }
        return res;
    }


    return (
        <Grid>

            <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={2} className={classes.containerCategories}>
                
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={2}>
                            <p className={classes.title}>Título: </p>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                            id='title' 
                            margin='normal'
                            autoComplete='off' 
                            placeholder='Escribe el titulo del libro' 
                            style={{width:'100%', margin:0, padding:0}}
                            InputProps={{
                                disableUnderline: true,
                                classes:{
                                    root: classes.textfield,
                                },
                            }}
                            value={title}
                            onChange={changeManager}
                            /> 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={2}>
                            <p className={classes.title}>Año: </p>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                            id='year' 
                            margin='normal'
                            autoComplete='off' 
                            placeholder='Escribe el año' 
                            style={{width:'100%', margin:0, padding:0}}
                            InputProps={{
                                disableUnderline: true,
                                classes:{
                                    root: classes.textfield,
                                },
                            }}
                            value={year}
                            onChange={changeManager}
                            /> 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={2}>
                            <p className={classes.title}>Editorial: </p>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                            id='editorial' 
                            margin='normal'
                            autoComplete='off' 
                            placeholder='Escribe una editorial' 
                            style={{width:'100%', margin:0, padding:0}}
                            InputProps={{
                                disableUnderline: true,
                                classes:{
                                    root: classes.textfield,
                                },
                            }}
                            value={editorial}
                            onChange={changeManager}
                            /> 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={2}>
                            <p className={classes.title}>ISBN: </p>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                            id='isbn' 
                            margin='normal'
                            autoComplete='off' 
                            placeholder='Escribe un isbn' 
                            style={{width:'100%', margin:0, padding:0}}
                            InputProps={{
                                disableUnderline: true,
                                classes:{
                                    root: classes.textfield,
                                },
                            }}
                            value={isbn}
                            onChange={changeManager}
                            /> 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs ={2}>
                            <p className={classes.title}>Categorias: </p>
                        </Grid>
                        <Grid item xs={4}>
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
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={2}>
                            <p className={classes.title}>Autor(es): </p>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                            id='authors' 
                            margin='normal'
                            autoComplete='off' 
                            placeholder='Escribe el autor(es)' 
                            style={{width:'100%', margin:0, padding:0}}
                            InputProps={{
                                disableUnderline: true,
                                classes:{
                                    root: classes.textfield,
                                },
                            }}
                            value={authors}
                            onChange={changeManager}
                            /> 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={2}>
                            <p className={classes.title}> Portada: </p>
                        </Grid>
                        <Grid item xs={4}>
                            <Dropzone
                                onChangeStatus={handleChangeStatus}
                                onSubmit={handleSubmit}
                                maxFiles={1}
                                multiple={false}
                                canCancel={false}
                                accept="image/png, image/jpg, image/jpeg"
                                inputContent="Seleccionar un archivo de imagen"
                                styles={{
                                    dropzone: { width: '100%', height: '100%'},
                                    dropzoneActive: { borderColor: 'green' },
                                    submitButton: {backgroundColor:'red'},
                                    inputLabel: {color:'black'},


                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={2}>
                            <p className={classes.title}> Libro: </p>
                        </Grid>
                        <Grid item xs={4}>
                            <Dropzone
                                onChangeStatus={handleChangeStatus2}
                                onSubmit={handleSubmit2}
                                maxFiles={1}
                                multiple={false}
                                canCancel={false}
                                accept=".pdf"
                                inputContent="Seleccionar un archivo PDF"
                                styles={{
                                    dropzone: { width: '100%', height: '100%'},
                                    dropzoneActive: { borderColor: 'green' },
                                    submitButton: {backgroundColor:'red'},
                                    inputLabel: {color:'black'}
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} style={{padding:0}}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
                        <Grid item xs={12}>
                            <Button className={classes.button} onClick={handleInsertBook}> + Agregar</Button> 
                        </Grid>
                        <Grid item >
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </Grid> 
    );
}