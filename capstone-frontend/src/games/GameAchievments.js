import React from "react";
import { v4 as uuidv4 } from 'uuid';

export function GameAchievements({schema}){
    if(schema.length > 0){
        return(
            <table>
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
        )
    }
    else{
        return(
            <p>No achievements available</p>
        )
    }
}