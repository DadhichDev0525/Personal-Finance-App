
const DropDown = ({selected,setSelected,Options,label}) => {
  return (
    <div className="flex flex-col gap-3 max-w-lg">
      <label htmlFor={label} className="text-zinc-700 font-medium">{label}</label>
      <select
        name={label.toLowerCase()}
        id={label}
        value={selected}
        onChange={setSelected}
        className='p-2 border border-gray-300 rounded-md w-full bg-white focus:outline-0' 
        required
      >
        <option value="" disabled hidden>
          Select a {label.toLowerCase()}
        </option>
        {Options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
