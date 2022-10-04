import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
`;

const Button = styled.button<{ isOpened: boolean }>`
  width: 100%;
  padding: 10px 30px 10px 20px;
  font-size: 20px;
  border: 1px solid ${({ theme }) => theme.mode.themeIcon};
  background-color: ${({ theme }) => theme.mode.background};
  color: ${({ theme }) => theme.mode.primaryText};
  border-radius: 3px;
  text-align: left;
  cursor: pointer;

  &::after {
    content: ${({ isOpened }) => (isOpened ? '"\\2191"' : '"\\2193"')};
    position: absolute;
    right: 20px;
  }
`;

const OptionList = styled.ul<{ isOpened: boolean }>`
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  z-index: 2;
`;

const Option = styled.li<{ isActive: boolean }>`
  padding: 10px 20px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.mode.themeIcon};
  background-color: ${({ theme }) => theme.mode.backgroundSub};
  color: ${({ theme }) => theme.mode.primaryText};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.mode.hoverBackground};
    color: ${({ theme }) => theme.mode.hover};
    border-color: ${({ theme }) => theme.mode.hover};
  }
`;

const Dropdown = ({ options, onChange, className }) => {
  const [isOpened, updateIsOpened] = useState(false);
  const [activeItem, updateActiveItem] = useState(options[0]);
  const optionsListRef = useRef(null);

  const handleOptionClick = (item) => {
    onChange(item);
    updateActiveItem(item);
    updateIsOpened(false);
  };

  const moveActiveItem = (changeBy) => {
    let activeItemIndex = options.indexOf(activeItem);
    activeItemIndex += changeBy;

    if (options[activeItemIndex]) {
      updateActiveItem(options[activeItemIndex]);
    }
  };

  const handleOptionKeyDown = (e) => {
    switch (e.keyCode) {
      // Up is pressed
      case 38:
        moveActiveItem(-1);
        break;
      // Down is pressed
      case 40:
        moveActiveItem(1);
        break;
      default:
        break;
    }
  };

  const handleButtonKeyDown = (e) => {
    // Enter is presed
    e.preventDefault();

    if (e.keyCode === 13) {
      updateIsOpened(!isOpened);
    }
  };

  useEffect(() => {
    if (isOpened) optionsListRef.current.focus();
  }, [isOpened]);

  useEffect(() => {
    updateActiveItem(options[0]);
  }, [options[0].value]);

  return (
    <Container className={className}>
      <Button
        type="button"
        isOpened={isOpened}
        onKeyDown={handleButtonKeyDown}
        onClick={() => updateIsOpened(!isOpened)}
        aria-label="Select your fruit dropdown"
        aria-haspopup="listbox"
        aria-expanded={isOpened}
      >
        {activeItem.label}
      </Button>
      <OptionList
        tabIndex={-1}
        ref={optionsListRef}
        isOpened={isOpened}
        role="listbox"
        aria-label="Options list"
        aria-activedescendant={activeItem.value}
        onKeyDown={handleOptionKeyDown}
      >
        {options.map((option) => (
          <Option
            id={option.value}
            key={option.value}
            isActive={option.value === activeItem.value}
            onClick={() => handleOptionClick(option)}
            role="option"
            aria-selected={activeItem.value === option.value}
          >
            {option.label}
          </Option>
        ))}
      </OptionList>
    </Container>
  );
};

export default Dropdown;
