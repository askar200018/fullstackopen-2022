import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const allFeedbacks = good + neutral + bad;
  const averageFeedbacks = (good - bad) / allFeedbacks;
  const positiveFeedbacks = (good / allFeedbacks) * 100;

  return (
    <div>
      <h3>give feedback</h3>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h3>statistics</h3>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allFeedbacks}</p>
      <p>average {averageFeedbacks}</p>
      <p>positive {positiveFeedbacks} %</p>
    </div>
  );
};

export default App;
