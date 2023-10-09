import React from "react";
import { v4 as uuidv4 } from 'uuid';
import "./GameAchievments.css";

export function GameAchievements({schema}){
    if(schema.length > 0){
        return(
            <div className="col-lg-12 GameAchievments d-flex justify-content-center align-items-center flex-column">
                <h2 className="GameAchievments-title">Achievements</h2>
                <table className="GameAchievments-table">
                    <thead>
                        <tr>
                            <th>Achievement Name</th>
                            <th>Description</th>
                            <th>Icons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schema.map(achievement => (
                            <tr key={uuidv4()}>
                                <td>{achievement.displayName}</td>

                                {achievement.description ?
                                <td>{achievement.description}</td>
                                : <td>hidden</td>}

                                <td><img src={achievement.icon} alt={achievement.displayName}/> <img src={achievement.icongray} alt={achievement.displayName}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        )
    }
    else{
        return(
            <div className="col-lg-12 GameAchievments">
                <h2 className="GameAchievments-title">Achievements</h2>
                <h5 className="data-unavailable">No achievements available</h5>
            </div>
        )
    }
}