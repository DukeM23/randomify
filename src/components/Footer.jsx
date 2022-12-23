import React from 'react';
import logo from "../imgs/Spotify_Logo.png"
function Footer() {
    return(
        <div className='text-center'>
            <img className="mx-auto w-2/12 lg:w-40" src={logo} alt="Spotify Logo"/> 
            <footer className='text-sm sm:text-base text-emerald-100'>
                Made with &lt;3, <a className="hover:underline" href="https://portfolio-website-6cmhfakgn-dukem23.vercel.app/" target="_blank">Duke Maquiling</a>
            </footer>
        </div>
    );

}

export default Footer;