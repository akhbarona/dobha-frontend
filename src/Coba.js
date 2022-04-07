import { useState, useMemo, memo, useRef, useEffect } from 'react';
import { CobaAnak } from './CobaAnak';
function Coba() {
  const [count, setCount] = useState(0);
  const textInput = useRef();
  const getTextBox = () => {
    console.log(textInput.current.type);
  };
  return (
    <>
      <div>Komponen App</div>
      <div>Counter : {count}</div>
      <input ref={textInput} type="text" />
      <CobaAnak status={() => setCount((val) => val + 1)} getTextBox={getTextBox} />
    </>
  );
}

export default memo(Coba);
