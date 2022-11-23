import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const allFeedbacks = good + neutral + bad;
  const averageFeedbacks = (good - bad) / allFeedbacks;
  const positiveFeedbacks = `${(good / allFeedbacks) * 100} %`;

  if (allFeedbacks === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h3>statistics</h3>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={allFeedbacks} />
      <StatisticLine text="average" value={averageFeedbacks} />
      <StatisticLine text="positive" value={positiveFeedbacks} />
    </div>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h3>give feedback</h3>
      <div>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
