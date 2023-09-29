import React, {useState, useEffect} from "react";
import SteamApis from "../api";

export function SteamIdForm({saveSteamId}){
    
    const INITIAL_VALUES = {
        steamId: ""
    }

    const [formData, setFormData] = useState(INITIAL_VALUES);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
        ...fData,
        [name]: value
        }));
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const checkValidPlayer = await SteamApis.getPlayerLevel(formData.steamId);
        if(checkValidPlayer.response.player_level !== "failed"){
            setFormData(INITIAL_VALUES);
            
        }
        
    }

    return (
        <div className="SteamIdForm">
            <form className="" onSubmit={handleSubmit}>
                <input
                    id="steamId"
                    name="steamId"
                    type="text"
                    placeholder={`Enter Steam Id`}
                    value={formData.steamId}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}