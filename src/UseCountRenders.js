import { useRef } from 'react';
// function UseCountRenders() {
//   const renders = useRef(0);
//   return <>{console.log('renders: ', renders.current++)}</>;
// }

export const useCountRenders = () => {
  const renders = useRef(0);
  console.log('renders: ', renders.current++);
};
