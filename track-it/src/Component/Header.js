import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

export const Header = () => {

    const navigate = useNavigate();
    const userState = useContext(UserContext);    

    const handleLogout = () => {
        userState.setToken('');
        userState.setUserName('');
        userState.setEmail('');
        navigate('/login');
    };

    return (
        <div>
            <div className='flex justify-between text-xl p-4'>
                <div>Track it</div>
                <div>
                    <button className='p-2 text-xl w-full rounded-xl transition-colors text-slate-200 bg-slate-950 hover:text-slate-950 hover:bg-slate-200' onClick={handleLogout}>{(!userState.email || !userState.token) ? "Login" : "Logout"}</button>
                </div>
            </div>
        </div>
    )
}
