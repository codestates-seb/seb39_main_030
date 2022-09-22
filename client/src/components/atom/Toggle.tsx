import { useState } from 'react';
import styled from 'styled-components';

const Toggle = ({ className, ToggleHandler }) => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn((prev) => !prev);
    ToggleHandler(!isOn);
  };

  return (
    <ToggleContainer className={className} onClick={toggleHandler}>
      <div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`} />
      <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`} />
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #8b8b8b;
    transition: all 0.2s ease;

    &.toggle--checked {
      background-color: ${({ theme }) => theme.mode.searchBar};
    }
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fafafa;
    transition: all 0.25s ease;

    &.toggle--checked {
      left: 27px;
    }
  }
`;
