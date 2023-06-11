import React,{useState,useContext} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TitleAndInfoForm from '../TitleAndInfoForm'
import axios from 'axios'
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs'
import AppWrap from '../../wrapper/AppWrap'
import {images} from '../../constants/index'
import { userDetailsContext } from '../../UserDetailsProvide';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useContext(userDetailsContext);
    const [passwordShown, setPasswordShown] = useState(false);
    const [ShowErrorLogin, setShowErrorLogin] = useState(false)
    const {register,setValue,handleSubmit, formState:{errors}} = useForm({defaultValues:{
        Name: '',
        Password:''
    }})
    const [sentSuccess,setSentSuccess] = useState(false);

    const sendLoginPostRequest = async (sendingData) =>{
       await axios.post("http://localhost:5000/api/user/login",{sendingData})
        .then((res) => {
            setUserDetails({
                ...userDetails,
                Name: res.data.Name,
                isAdmin: res.data.isAdmin
            });
            setShowErrorLogin(false);
            // when user successfully enter , redirect him to DashBoard page 
            setSentSuccess(true);
            setTimeout(() => {
                localStorage.setItem("Name",sendingData.Name)
                localStorage.setItem("isAdmin",res.data.isAdmin)
                navigate("/DashBoard",{state:{Name: sendingData.Name, isAdmin : res.data.isAdmin}})
             }, 1)
        }).catch((error) => {
            //show error message - your name/password is wrong
            setShowErrorLogin(true);
        })
    }
  return (
    <>
    <TitleAndInfoForm 
        title="Login to your Account"
        info="Welcome back! select method to log in"
    />
    <form className='form-login' onSubmit={handleSubmit((data) => {
        sendLoginPostRequest(data)
        }
        )}>
        <div className='Form__section__login'>
            <div className='section-name'>
                <img className='icon-input' src={images.envelope} alt="envelope"/>
                <input {...register("Name",{required:'חובה להכניס שם משתמש'})} name="Name" placeholder="UserName"/>
            </div>
            <div className='section-password'>
            <img className='icon-input' src={images.shieldSlash} alt="envelope"/>
                <input type={passwordShown ? "text" : "password"} {...register("Password",{required:'חובה להכניס סיסמה ' , minLength:{value:6, message:'הסיסמה חייבת להכיל מעל 6 אותיות'}})} name="Password" placeholder="Password"/>
                    {passwordShown ?   
                        <button  className='eye-btn' onClick={() =>setPasswordShown(!passwordShown)}>
                            <BsEyeFill/>
                        </button>:
                        <button className='eye-btn' onClick={() =>setPasswordShown(!passwordShown)}>
                          <BsEyeSlashFill/>
                        </button>
                    }                    
                 
            </div>    
        </div>
        <div className='errorSection'>
            <p className='errorMsg'>{errors.Name?.message}</p>
            <p className='errorMsg'>{errors.Password?.message}</p>

            {ShowErrorLogin ? <p>שם משתמש/הסיסמה שגוייה</p> : ""}
        </div>
        
        <input className="btnSubmit padding-2" type="submit" value="LOG IN"/>

    </form>
    </>
  )
}

export default AppWrap(LoginForm,'login',images.BgLogin)