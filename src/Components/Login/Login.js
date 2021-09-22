import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import LoginImage from "../../Images/Login.jpg"
import { TextField, Link, Button, makeStyles } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
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
        marginBottom: 80
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
export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [usuario,setUsuario] = useState('');
    const [contraseña,setContraseña] = useState('');
    const [usuarioHelper,setUsuarioHelper] = useState('');
    const [contraseñaHelper,setContraseñaHelper] = useState('');
    const [flagUsuario,setFlagUsuario] = useState(true);
    const [flagContraseña,setFlagContraseña] = useState(true);

    const changeManager = (event) => {
        const currentValue=event.target.value;
        if(event.target.id==='usuario'){
            const re=/^[a-zA-Z0-9@_.]{0,20}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setUsuario(currentValue.trimStart());
                setFlagUsuario(true);
            }
        }
        if(event.target.id==='contraseña'){
            const re=/^[a-zA-Z0-9]{0,20}$/;
            if (currentValue === '' || re.test(currentValue.trimStart()) ) {
                setContraseña(currentValue.trimStart());
                setFlagContraseña(true);
            }
        }
    }

    function validateInputs(){
        var flag=true;
        if(usuario===''){
            setFlagUsuario(false);
            setUsuarioHelper('Ingrese un usuario');
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
        if(contraseña===''){
            setFlagContraseña(false);
            setContraseñaHelper('Ingrese una contraseña');
            flag=false;
        }else{
            setFlagContraseña(true);
        }
        return flag;
    }

    const ingresar = () =>{
        if(validateInputs()){
            enqueueSnackbar("Sucess", {variant: 'success'});
            history.push({
                pathname:'/Main'
            })
            /*history.push({
                pathname:'/Home',
                state: { params: false },
            });*/
        }else{
            enqueueSnackbar("Error", {variant: 'error'});
        }
    }

    const moveRegiser = () =>{
        history.push({
            pathname:'/Register'
        })
    }

    const moveMenu = () =>{
        history.push({
            pathname:'/'
        })
    }

    
    return (
        <Grid >
            <Grid container direction="row" alignItems="flex-start" className={classes.containerForm}>
                <Grid item xs={6}>
                    <img src={LoginImage} className={classes.imgLogin}/>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item className={classes.title}>
                            <h1>FreeBook</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <h5><Link component="button" variant="body2" underline="hover" onClick={moveMenu} style={{color:'black'}}>Regresar al Menu</Link></h5>  
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
                        <Grid item xs={6} style={{marginBottom:35}}>
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
                        <Grid item xs={6}>
                            <Button 
                            className={classes.button}
                            onClick={ingresar}>
                                <b>Ingresar</b>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            
                            <h5>¿No tienes una cuenta?</h5>  
                            <h5><Link component="button" variant="body2" underline="hover" onClick={moveRegiser}>Crear cuenta</Link></h5>  

                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </Grid> 
    );
}