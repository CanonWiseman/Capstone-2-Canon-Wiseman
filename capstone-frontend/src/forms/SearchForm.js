import React, {useState, useContext} from "react";
import { fuseHelper } from "../helpers/fuseHelper";
import AppContext from "../helpers/AppContext";
import "./SearchForm.css";

export function SearchForm(){

    const {allApps} = useContext(AppContext);
    const [searchResults, setSearchResults] = useState([]);

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
        const searchRes = await fuseHelper(formData.appName, allApps);
        let searchResArr = [];
        for(let res of searchRes){
            const result = {appId: res.item.appid, appName: res.item.name}
            searchResArr.push(result);
        }
        setSearchResults(searchResArr);
        setFormData(INITIAL_VALUES);
    }

    function ShowResults({results}){
        return (
            <div className={`search-results ${searchResults.length > 0 ? "showRes" : "hideRes"}`}>
                {results.map(res => (
                    <p>{res.appName}</p>
                ))}
            </div>
        )
    }

    return (
        <div>
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
                {searchResults?
                    <ShowResults results={searchResults}/>
                :null}
            </div>
        </div>
    )
}