import React from 'react';

function Splash({authEndpoint, clientId, redirectUri, responseType, scope}) {
    return(
    <div className="flex justify-center truncate">
        <div className='my-28 text-center'>
            <div className="text-emerald-500 font-semibold text-5xl">
                <p className="py-8">In need change of pace?</p>
                <p className="py-8">Or are you craving for a different kind of buzz?</p>
                <p className="py-8">Try to <span className='underline decoration-solid'>Randomify</span> your playlists!</p>
            </div>
            <div className='flex justify-center my-10'>
                <a className='border-2 text-4xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 my-2 px-5 py-4' href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`}>Login to Spotify</a>
            </div>
        </div>
    </div>);
}

export default Splash;