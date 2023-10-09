import {Grid} from "react-loader-spinner";
import "./Loader.css";

export function Loader(){
    return(
        <div className="Loader">
            <div className="Loader-center">
                <Grid
                    height={100}
                    width={100}
                    color="#101e23"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='grid-loading'
                />
            </div>
        </div>
        
    )
}