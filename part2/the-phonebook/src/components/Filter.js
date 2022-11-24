const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter show with a{' '}
      <input value={filter} onChange={onChange} />
    </div>
  );
};

export default Filter;
