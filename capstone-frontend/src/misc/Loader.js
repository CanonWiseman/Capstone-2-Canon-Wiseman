import {Oval} from "react-loader-spinner";
import "./Loader.css";

export function Loader(){
    return(
        <div className="Loader">
            <div className="Loader-center">
                <Oval
                    height={100}
                    width={100}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        </div>
        
    )
}