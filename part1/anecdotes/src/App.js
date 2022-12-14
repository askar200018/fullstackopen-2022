import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const initialPoints = anecdotes.reduce((acc, _, index) => {
    acc[index] = 0;
    return acc;
  }, {});

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initialPoints);

  const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length);

  const [mostVoteIndex, mostVotes] = Object.entries(points).reduce(
    (acc, curr) => {
      if (curr[1] > acc[1]) {
        return curr;
      }
      return acc;
    }
  );

  const handleNext = () => {
    setSelected(getRandomIndex());
  };

  const handleVote = () => {
    setPoints({ ...points, [selected]: points[selected] + 1 });
  };

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} vote</p>

      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[mostVoteIndex]}</p>
      <p>has {mostVotes} vote</p>
    </div>
  );
};

export default App;
