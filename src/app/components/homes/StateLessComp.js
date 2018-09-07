import React from 'react'
import {Loading} from 'element-react'

const StateLessComp = ({birds, isLoading}) => {
    return(
        <div>
            {isLoading && 
                <Loading fullscreen={true} text='Coin coin ...'/>
            }
            <ul>
                {birds.length > 0 && 
                    birds.map(bird => {
                        return (
                            <li key={bird._id}>{bird.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


export default StateLessComp