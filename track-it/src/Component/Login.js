import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../Context/Context'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export const Login = () => {
    const userState = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const loaderRef = useRef(null)
    const animationRef = useRef(null); 
    const navigate = useNavigate()

    const LoaderAnimation = () => {
        animationRef.current = gsap.to(loaderRef.current, {
            rotation: 360,
            duration: 1.5,
            ease: "linear",
            repeat: -1, // Infinite repeat
        });
    }

    const KillLoaderAnimation = () => {
        if (animationRef.current) {
            animationRef.current.kill(); // Stop the GSAP animation
        }
    }


    const handleLogin = async () => {
        try {
            setLoading(true)
            LoaderAnimation()
            const response = await fetch('https://track-it-backend-crimsonravens-projects.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: pwd
                })
            })
            const result = await response.json();
            if (response.ok) {
                console.log(result)
                userState.setToken(result.token)
                userState.setUserName(result.name)
                userState.setEmail(email)
                navigate('/plan')
            }
            else {
                setLoading(false)
                KillLoaderAnimation()
                console.log('Error', result)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const toogleVisiblePwd = () => {
        let tar = document.getElementById('pwd1')
        if (tar.type === 'password') {
            tar.type = 'text'
        }
        else {
            tar.type = 'password'
        }
    }

    return (
        <div className={loading ? 'h-screen opacity-50' : 'h-screen'}>
            <div ref={loaderRef} className={loading ? 'h-16 w-16 bg-black absolute left-2/4 top-2/4' : 'hidden'}></div>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center' style={{ width: "70vw" }}>
                    <div className='text-3xl text-center p-8'>
                        Login
                    </div>
                    <div className='p-4 border border-slate-200 my-2'>
                        <div>Email</div>
                        <input className='w-full' type="text" placeholder='email' onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='p-4 border border-slate-200 my-2'>
                        <div>Password</div>
                        <input className='w-full' id='pwd1' type="password" placeholder='password' onChange={(e) => { setPwd(e.target.value) }} />
                        <input type='checkbox' onClick={toogleVisiblePwd} /> show
                    </div>
                    <button className='p-4 rounded-xl transition-colors text-slate-200 bg-slate-950 hover:text-slate-950 hover:bg-slate-200' onClick={handleLogin}>submit</button>
                    <div>
                        Don't have any account ? <button className='transition-all duration-300 ease-in-out hover:underline hover:underline-offset-8' onClick={() => { navigate('/') }}>SignIn</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
