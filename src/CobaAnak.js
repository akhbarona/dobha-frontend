import { useRef } from 'react';
import { memo } from 'react';
// import { useCountRenders } from './UseCountRenders';
export const CobaAnak = ({ status, getTextBox }) => {
  const renders = useRef(0);
  console.log('renders: ', renders.current++);
  // console.log('apa: ', apa);

  return (
    <>
      <button onClick={status}>Tambah Count</button>
      <button onClick={getTextBox}>Get TextInput</button>
    </>
  );
};

// export default CobaAnak;
