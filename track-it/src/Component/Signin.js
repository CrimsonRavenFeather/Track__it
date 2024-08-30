import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/Context'

export const Signin = () => {
    const userState = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleSignIn = async () => {
        try {
            const response = await fetch('https://track-it-ehgv.onrender.com/signin', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: pwd,
                    name: name
                })
            })
            const result = await response.json();
            if (response.ok) {
                console.log(result)
                userState.setEmail(email)
                userState.setUserName(name)
                navigate('/login')
            }
            else {
                console.log('Error', result)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const toogleVisiblePwd = ()=>{
        let tar = document.getElementById('pwd1')
        if(tar.type === 'password')
        {
            tar.type = 'text'
        }
        else
        {
            tar.type = 'password'
        }
    }

    return (
        <div className='h-screen'>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center' style={{ width: "70vw" }}>
                    <div className='text-3xl text-center p-8'>
                        SignIn
                    </div>
                    <div className='p-4 border border-slate-200 my-2'>
                        <div>Name</div>
                        <input type="text" className='w-full' placeholder='name' onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className='p-4 border border-slate-200 my-2'>
                        <div>Email</div>
                        <input type="text" className='w-full' placeholder='email' onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='p-4 border border-slate-200 my-2'>
                        <div>Password</div>
                        <input type="password" id='pwd1' className='w-full' placeholder='password' onChange={(e) => { setPwd(e.target.value) }} />
                        <input type='checkbox' onClick={toogleVisiblePwd}/> show
                    </div>

                    <button className='p-4 rounded-xl transition-colors text-slate-200 bg-slate-950 hover:text-slate-950 hover:bg-slate-200' onClick={handleSignIn}>Signin</button>
                    <div className='py-2'>
                        Already have an account ?
                        <button className='transition-all duration-300 ease-in-out hover:underline hover:underline-offset-8' onClick={() => { navigate('/login') }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
