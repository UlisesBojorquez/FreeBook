import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, Link, Button, makeStyles } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    containerForm:{
        backgroundColor: '#E4E4E4'
    },
    imgLogin: {
        width:'100%', 
        height: '100vh', 
        objectFit: 'cover' 
    },
    textfield:{
        border: 'solid 2px black',
        borderRadius: 0,
        backgroundColor:'#F7F7F7',
        padding: 10,
        width:300
    },
    textfieldError:{
        border: 'solid 2px red',
        borderRadius: 0,
        backgroundColor:'#F7F7F7',
        padding: 10,
        width:300
    },
    title:{
        marginBottom: 50
    },
    button:{
        backgroundColor:'black',
        width:300,
        height:50,
        color:'white',
        borderRadius:0,
        textAlign:'center',
    },
    link:{
        color:'red'
    },
    helper:{
        color:'red'
    }
}));
export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [usuario,setUsuario] = useState('');
    const [contraseña,setContraseña] = useState('');
    const [nombre,setNombre] = useState('');
    const [confContraseña,setConfContraseña] = useState('');
    const [usuarioHelper,setUsuarioHelper] = useState('');
    const [contraseñaHelper,setContraseñaHelper] = useState('');
    const [nombreHelper,setNombreHelper] = useState('');
    const [confContraseñaHelper,setConfContraseñaHelper] = useState('');
    const [flagUsuario,setFlagUsuario] = useState(true);
    const [flagContraseña,setFlagContraseña] = useState(true);
    const [flagNombre,setFlagNombre] = useState(true);
    const [flagConfContraseña,setFlagConfContraseña] = useState(true);

    const changeManager = (event) => {
        const currentValue=event.target.value;
        if(event.target.id==='usuario'){
            const re=/^[a-zA-Z0-9@._]{0,40}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setUsuario(currentValue.trimStart());
                setFlagUsuario(true);
            }
        }
        if(event.target.id==='nombre'){
            const re=/^[a-zA-Z0-9]{0,20}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setNombre(currentValue.trimStart());
                setFlagNombre(true);
            }
        }
        if(event.target.id==='contraseña'){
            const re=/^[a-zA-Z0-9]{0,20}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setContraseña(currentValue.trimStart());
                setFlagContraseña(true);
            }
        }
        if(event.target.id==='confcontraseña'){
            const re=/^[a-zA-Z0-9]{0,20}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setConfContraseña(currentValue.trimStart());
                setFlagConfContraseña(true);
            }
        }
    }

    function validateInputs(){
        var flag=true;
        if(usuario===''){
            setFlagUsuario(false);
            setUsuarioHelper('Ingrese un correo');
            flag=false;
        }else{
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(usuario)){
                setFlagUsuario(true);
            }else{
                setFlagUsuario(false);
                setUsuarioHelper('El correo electrónico capturado no es válido');
                flag=false;
            }
        }
        if(nombre===''){
            setFlagNombre(false);
            setNombreHelper('Ingrese un nombre de usuario');
            flag=false;
        }else{
            setFlagNombre(true);
        }
        if(contraseña===''){
            setFlagContraseña(false);
            setContraseñaHelper('Ingrese una contraseña');
            flag=false;
        }else{
            setFlagContraseña(true);
        }
        if(confContraseña===''){
            setFlagConfContraseña(false);
            setConfContraseñaHelper('Ingrese una contraseña');
            flag=false;
        }else{
            setFlagConfContraseña(true);
        }
        return flag;
    }

    const ingresar = () =>{
        if(validateInputs()){
            enqueueSnackbar("Sucess", {variant: 'success'});
        }else{
            enqueueSnackbar("Error", {variant: 'error'});
        }
    }

    const moveLogin = () =>{
        history.push({
            pathname:'/'
        })
    }
    
    return (
        <Grid >
            <Grid container direction="row" alignItems="flex-start" className={classes.containerForm}>
                <Grid item xs={12}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item className={classes.title}>
                            <h1>Registro</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id='nombre' 
                                margin='normal'
                                autoComplete='off' 
                                placeholder='Nombre de usuario' 
                                InputProps={{
                                    disableUnderline: true,
                                    classes:{
                                        root: flagNombre ? classes.textfield : classes.textfieldError,
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                          <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                                FormHelperTextProps={{
                                    className: classes.helper
                                }}
                                helperText={nombreHelper}
                                value={nombre}
                                onChange={changeManager}
                                />   
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id='usuario' 
                                margin='normal'
                                autoComplete='off' 
                                placeholder='Correo electrónico' 
                                InputProps={{
                                    disableUnderline: true,
                                    classes:{
                                        root: flagUsuario ? classes.textfield : classes.textfieldError,
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                          <AccountCircleIcon />
                                        </InputAdornment>
                                    )
                                }}
                                FormHelperTextProps={{
                                    className: classes.helper
                                }}
                                helperText={usuarioHelper}
                                value={usuario}
                                onChange={changeManager}
                                />   
                        </Grid>
                        <Grid item xs={6} >
                            <TextField 
                                id='contraseña' 
                                type='password'
                                margin='normal'
                                autoComplete='off' 
                                placeholder='Contraseña' 
                                InputProps={{
                                    disableUnderline: true,
                                    classes:{
                                        root: flagContraseña ? classes.textfield : classes.textfieldError,
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                          <VpnKeyIcon />
                                        </InputAdornment>
                                    )
                                }}
                                FormHelperTextProps={{
                                    className: classes.helper
                                }}
                                helperText={contraseñaHelper}
                                value={contraseña}
                                onChange={changeManager}
                                />   
                        </Grid>
                        <Grid item xs={6} style={{marginBottom:35}}>
                            <TextField 
                                id='confcontraseña' 
                                type='password'
                                margin='normal'
                                autoComplete='off' 
                                placeholder='Confirmar contraseña' 
                                InputProps={{
                                    disableUnderline: true,
                                    classes:{
                                        root: flagConfContraseña ? classes.textfield : classes.textfieldError,
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                          <VpnKeyIcon />
                                        </InputAdornment>
                                    )
                                }}
                                FormHelperTextProps={{
                                    className: classes.helper
                                }}
                                helperText={confContraseñaHelper}
                                value={confContraseña}
                                onChange={changeManager}
                                />   
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                            className={classes.button}
                            onClick={ingresar}>
                                <b>Registrar</b>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            
                            <h5>¿Ya tienes una cuenta?</h5>  
                            <h5><Link component="button" variant="body2" underline="hover" onClick={moveLogin}>Login</Link></h5>  

                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </Grid> 
    );
}