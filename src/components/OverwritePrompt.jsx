import axios from "axios";
import React, {useState} from "react";
import overwritePlaylist from "../functions/overwritePlaylist";

function OverwritePrompt({token, artists, setExists}) {
    const [open, setOpen] = useState(false);
    
    function handleCancel() {
        setExists(false);
    }
    
    async function handleOverwrite() {
        let trackUris = [];
        artists.forEach(track => {
            let uriString = track.uri;
            trackUris = [...trackUris, uriString ];
        });

        overwritePlaylist(token, trackUris);

        setExists(false);
    } 

    return(
        // <div className="absolute z-2 bg-white top-1/4 left-1/4">
            <div className="fixed w-6/12 h-1/6 sm:w-1/2 sm:h-1/4 top-2/4 left-1/4 border-2 border-gray-900 bg-white rounded-xl p-2">
                <div className="flex flex-col justify-center gap-y-2 text-gray-900 h-full">
                    <h3 className="text-base font-bold">A Randomify playlist already exists!</h3>
                    <p className="text-sm">Would you like to overwrite your existing songs?</p>
                    <div className="flex justify-between">
                        <button className="border-2 text-xs sm:text-2xl font-semibold rounded-full border-emerald-500 text-gray-900 px-3 py-2" onClick={handleCancel} >Cancel</button>
                        <button className="border-2 text-xs sm:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" onClick={handleOverwrite} >Overwrite</button>
                    </div>
                </div>
            </div>
        // </div>
    );
}

export default OverwritePrompt