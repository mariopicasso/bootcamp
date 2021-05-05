import React, { useState } from "react";

const Button = ({handleClick, text}) => {
    return(
        <button onClick = {handleClick}> {text} </button>
    );
}
const Statistic = ({text, value}) => {
    return( 
        <tr>
            <td>{text}</td> 
            <td>{value}</td>
        </tr>
    );
}

const Statistics = (props) => {
    if(props.good === 0 && props.neutral === 0 && props.bad === 0){
        return(
            <div>
                <h1>statistics</h1>
                <div>
                    <p>No feedback given</p>
                </div>
            </div>
        );
    }
    
    return(
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistic text = {"good"} value = {props.good}/>
                    <Statistic text = {"neutral"} value = {props.neutral}/>
                    <Statistic text = {"bad"} value = {props.bad}/>
                    <Statistic text = {"all"} value = {props.bad + props.neutral + props.good}/>
                    <Statistic text = {"average"} 
                    value = {((props.good - props.bad)/(props.bad + props.neutral + props.good)).toFixed(2)}/>
                    <Statistic text = {"positive"} 
                    value = {(props.good/(props.good + props.bad + props.neutral)).toFixed(2)+"%"}/>
                </tbody>
            </table>
        </div>
    );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => {
        setGood(good+1);
    }
    const handleNeutralClick = () => {
        setNeutral(neutral+1);
    }
    const handleBadClick = () => {
        setBad(bad+1);
    }
    return( 
        <div>
            <h1>give feedback</h1>
            <Button handleClick = {handleGoodClick} text = "good" />
            <Button handleClick = {handleNeutralClick} text = "neutral" />
            <Button handleClick = {handleBadClick} text = "bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
};

export default App;
