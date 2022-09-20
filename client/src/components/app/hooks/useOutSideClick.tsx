import { useEffect } from 'react';

const useOutSideClick = (ref, callback) => {
  useEffect(() => {
    const clickHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    };

    window.addEventListener('mousedown', clickHandler);

    return () => window.removeEventListener('mousedown', clickHandler);
  }, [ref, callback]);
};

export default useOutSideClick;
