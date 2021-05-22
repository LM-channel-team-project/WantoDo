import { useState } from 'react';

const useInput = (initial) => {
  const [value, setValue] = useState(initial || '');

  const onChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    onChange,
    reset,
  };
};

export default useInput;
