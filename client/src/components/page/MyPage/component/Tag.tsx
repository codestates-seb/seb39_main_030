import styled from 'styled-components';

export const Tag = ({ inputTag, setInputTag }) => {
  const removeTags = (indexToRemove) => {
    setInputTag(inputTag.filter((_, index) => index !== indexToRemove));
  };
  const addTags = (event) => {
    const filtered = inputTag
      .filter((el) => el === event.target.value)
      .slice(1);
    if (event.target.value !== '' && filtered.length === 0) {
      setInputTag([...inputTag, event.target.value]);
      event.target.value = '';
    }
  };

  return (
    <>
      <TagsInput>
        <ul id="tags">
          {inputTag.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        <input
          disabled={inputTag.length === 3}
          className="tag-input"
          type="text"
          onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
          placeholder={
            inputTag.length === 3
              ? '최대 3개의 태그를 설정할 수 있습니다.'
              : '태그를 입력해주세요'
          }
        />
      </TagsInput>
    </>
  );
};

export const TagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 70%;
  padding: 0 8px;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: #4000c7;
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: #4000c7;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    background: ${({ theme }) => theme.mode.mainBackground};
    color: ${({ theme }) => theme.mode.primaryText};
    :focus {
      outline: transparent;
    }
  }

  &:focus-within {
    border: 1px solid #4000c7;
  }
`;
