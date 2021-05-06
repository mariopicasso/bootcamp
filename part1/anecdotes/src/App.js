import {useState} from "react";

const Button = ({handleClick, text}) => {
    return(
    <button onClick = {handleClick}>{text}</button>
    );
}

const MostVoted = ({votes, anecdotes}) => {
    const mostVotedIndex = votes.reduce((maxIndex, currentValue, currentIndex, arr) => arr[currentIndex] > arr[maxIndex] ? currentIndex : maxIndex, 0);
    if (votes.reduce((sum, x, i, a) => sum + x, 0) === 0){
        return(
            <div>
                <h1>Anecdote with most votes</h1>
                <div>Not voted yet</div>
            </div>
        );
    }
    
    return(
        <div>
            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[mostVotedIndex]}</div>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    ];
    const points = new Uint8Array(anecdotes.length);

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(points);
    

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random()*(anecdotes.length)));
    }
    const clickVote = () => {
        const newVotes = [...votes];
        newVotes[selected] = newVotes[selected]+1;
        setVotes(newVotes);
    }

    

    return(
        <>
            <h1>Anecdote of the day</h1> 
            <div>{anecdotes[selected]}</div>
            <p>has {votes[selected]} votes</p>
            <Button handleClick = {nextAnecdote} text={"next anecdote"}/>
            <Button handleClick = {clickVote} text={"vote"}/>
            <MostVoted votes = {votes} anecdotes = {anecdotes}/>
        </>
    );
};

export default App;
