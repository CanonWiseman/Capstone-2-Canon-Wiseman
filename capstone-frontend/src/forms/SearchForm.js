import React, {useState, useContext} from "react";
import { fuseHelper } from "../helpers/fuseHelper";
import AppContext from "../helpers/AppContext";

export function SearchForm(){
    const {allApps} = useContext(AppContext);

    const INITIAL_VALUES = {
        appName: ""
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
        await fuseHelper(formData.appName, allApps);
    }

    return (
        <div className="SearchForm">
            <form className="" onSubmit={handleSubmit}>
                <input
                    id="appName"
                    name="appName"
                    type="text"
                    placeholder={`Search...`}
                    value={formData.appName}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}