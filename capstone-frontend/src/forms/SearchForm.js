import React, {useState, useContext, useRef} from "react";
import { fuseHelper } from "../helpers/fuseHelper";
import AppContext from "../helpers/AppContext";
import "./SearchForm.css";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import ClickOutside from "../helpers/ListenForOutsideClicks";

export function SearchForm(){

    const {allApps} = useContext(AppContext);
    const [searchResults, setSearchResults] = useState([]);
    const exceptionRef = useRef();

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
        
    }

    function handleClick(){
        setSearchResults([]);
        setFormData(INITIAL_VALUES);
    }

    function ShowResults({results}){
        return (
            <div className={`search-results ${searchResults.length > 0 ? "showRes" : "hideRes"}`}>
                {results.map(res => (
                    <Link onClick={() => handleClick()} className="search-results-link" to={`/app/${res.appId}`} key={uuidv4()}>{res.appName}</Link>
                ))}
            </div>
        )
    }

    return (
        <div className="SearchForm">
            <form className="" onSubmit={handleSubmit} autoComplete={"off"}>
                <input
                    ref={exceptionRef}
                    id="searchBar"
                    className="form-control"
                    name="appName"
                    type="text"
                    placeholder={`Search Games...`}
                    value={formData.appName}
                    onChange={handleChange}
                />
            </form>
            {searchResults?
                <ClickOutside onClick={() => handleClick()} exceptionRef={exceptionRef} children={<ShowResults results={searchResults} />}>
                    
                </ClickOutside>
            :null}
        </div>
    )
}