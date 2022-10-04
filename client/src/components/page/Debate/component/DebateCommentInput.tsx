import styled, { css } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getStoredUser } from '../../../../auth/user-storage';
import { AiOutlineSend } from 'react-icons/ai';
import { Text } from '../../../atom/Text';

const DebateCommentInput = ({
  type,
  isSelected,
  placeHolder,
  updateText,
  handler,
}) => {
  const underLineRef = useRef(null);
  const areaRef = useRef(null);
  const user = getStoredUser();

  const handleAreaBlur = () => {
    const underline = underLineRef.current;
    underline.className = 'underline';
    const textArea = areaRef.current;
    textArea.style.height = '25px';
  };

  const handleAreaFocus = () => {
    const underline = underLineRef.current;
    underline.className = 'underline focus';
    const textArea = areaRef.current;
    textArea.style.height = textArea.scrollHeight + 'px';
  };

  const handleResizeHeight = useCallback(() => {
    const textArea = areaRef.current;
    if (textArea.scrollHeight >= 39) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    } else {
      textArea.style.height = '25px';
    }
  }, []);

  if (!user && type === 'main')
    return (
      <StyledCommentInput selected={true} main={type}>
        <Text>⚠️ 로그인 후 댓글을 작성할 수 있습니다.</Text>
      </StyledCommentInput>
    );

  return (
    <StyledCommentInput selected={isSelected} main={type}>
      <img className="comment-input-profile" src={user?.profileImg} />
      <div className="input-comment">
        <textarea
          ref={areaRef}
          onBlur={handleAreaBlur}
          onFocus={handleAreaFocus}
          placeholder={placeHolder}
          onInput={handleResizeHeight}
          defaultValue={isSelected ? updateText : null}
        />
        <div ref={underLineRef} className="underline" />
        <div className="tempLine" />
      </div>
      <AiOutlineSend
        onClick={() => handler(areaRef.current.value, areaRef.current)}
        className="btn-comment"
      />
    </StyledCommentInput>
  );
};

export default DebateCommentInput;

const StyledCommentInput = styled.li<{ selected: boolean; main: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  ${(props) =>
    props.selected
      ? props.main !== 'main' &&
        css`
          animation: commentInputShow 0.3s;
        `
      : css`
          display: none;
        `};

  @keyframes commentInputShow {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
  @keyframes underline {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(0);
    }
  }

  & .comment-input-profile {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 5px;
  }

  & .btn-comment {
    height: 25px;
    width: 25px;
    cursor: pointer;
    color: ${({ theme }) => theme.mode.themeIcon};
  }

  & .btn-comment:hover {
    color: ${({ theme }) => theme.mode.hover};
  }

  & .input-comment {
    width: 100%;
    margin-right: 5px;

    & .tempLine {
      margin-top: -1px;
      height: 1px;
      background-color: ${({ theme }) => theme.mode.divider};
    }

    & .underline {
      display: block;
      content: '';
      margin-top: -2px;
      border-bottom: solid 2px ${({ theme }) => theme.mode.themeIcon};
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
      animation: underline 0.2s;
    }

    & .underline.focus {
      transform: scaleX(1);
    }

    & textarea {
      width: 100%;
      padding: 5px;
      border: none;
      background-color: inherit;
      color: ${({ theme }) => theme.mode.primaryText};
      height: 25px;
      min-height: 1rem;
      overflow-y: hidden;
      resize: none;
      transition: all 0.3s;
    }

    & textarea:focus {
      outline: none;
    }
  }
`;
