import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../atom/Text';
import Button from '../../atom/Button';
import Dropdown from '../../atom/Dropdown';
import { media } from '../../../style/media';
import useModal from '../../app/hooks/useModal';
import { tagArr } from '../Lending/TagTab/TagTabData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { tagActions } from '../../../store/tag-slice';
import { NavigationGuard } from '../../app/NavigationGuard';
import { signal } from '../../../store/uiSlice/modal-slice';

const categoryDropDownList = tagArr.map((el) => ({
  value: el.tab,
  label: el.tab,
}));

interface LocationState {
  title: string;
  content: string;
  discussionCode: number;
}

const AddDebatePage = () => {
  const [preventPage, setPreventPage] = useState<boolean>(true);
  const location = useLocation();
  const data = (location.state as LocationState) ?? {
    title: '',
    content: '',
    discussionCode: '',
  };

  const dispatch = useDispatch();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { userCode } = useSelector((state: RootState) => state.user.userInfo);
  const [inputs, setInputs] = useState({
    title: data.title,
    content: data.content,
  });
  const category = useSelector((state: RootState) => state.tag.category);
  const tagName = useSelector((state: RootState) => state.tag.tag);
  const videoModalSignal = useSelector(
    (state: RootState) => state.modal.signal
  );

  useEffect(() => {
    if (videoModalSignal) setPreventPage(() => false);
    dispatch(signal(false));
  }, [videoModalSignal]);

  const tagDropDownList = (data?: string) =>
    tagArr
      .filter((el) => el.tab === (data || category))
      .flatMap((el) => el.tag)
      .map((el) => ({
        value: el,
        label: el,
      }));

  const { title, content } = inputs;

  const confirmHandler = () => {
    setPreventPage(() => false);
    openModal({
      type: 'addDebate',
      props: {
        discussionTitle: title,
        discussionContents: content,
        userCode: userCode,
        discussionCategory: category,
        discussionTag: tagName,
      },
    });
  };

  const updateHandler = () => {
    setPreventPage(() => false);
    openModal({
      type: 'updateDebate',
      props: {
        discussionCode: data.discussionCode,
        discussionTitle: title,
        discussionContents: content,
        userCode: userCode,
        discussionCategory: category,
        discussionTag: tagName,
      },
    });
  };

  const categoryHandler = (item) => {
    const tagList = tagDropDownList(item.label);
    dispatch(tagActions.changeCategory(item.label));
    dispatch(tagActions.changeTag(tagList[0].label));
  };

  const tagNameHandler = (item) => {
    dispatch(tagActions.changeTag(item.label));
  };

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
  };

  return (
    <StyledAddDebatePage>
      <form onSubmit={formHandler}>
        <label htmlFor="add-title">
          <Text fontSize="lg">토론 주제</Text>
        </label>
        <input
          type="text"
          name="title"
          id="add-title"
          placeholder="토론주제 입력"
          onChange={inputHandler}
          value={title}
        />
        <div className="dropdown">
          <div>
            <Text className="dropdown-label" fontSize="lg">
              분류
            </Text>
            <Dropdown
              className="firstDropbox"
              options={categoryDropDownList}
              onChange={categoryHandler}
            />
          </div>
          <div>
            <Text className="dropdown-label" fontSize="lg">
              태그
            </Text>
            <Dropdown
              className="secondDropbox"
              options={tagDropDownList()}
              onChange={tagNameHandler}
            />
          </div>
        </div>
        <textarea
          name="content"
          placeholder="하고싶은 토론에 대한 소개를 적어주세요."
          onChange={inputHandler}
          value={content}
        />
        {location.state ? (
          <Button type="button" className="confirm" onClick={updateHandler}>
            수정
          </Button>
        ) : (
          <Button type="button" className="confirm" onClick={confirmHandler}>
            등록
          </Button>
        )}
        <Button
          type="button"
          className="cancel"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </Button>
      </form>
      <NavigationGuard
        message={`입력한 글이 저장되지 않습니다.   정말 이동하실건가요?🧐`}
        when={preventPage}
      />
    </StyledAddDebatePage>
  );
};

export default AddDebatePage;

const StyledAddDebatePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  & .dropdown-label {
    margin-bottom: 5px;
  }

  & .dropdown {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;

    ${media.custom('768px')} {
      flex-direction: column;
      margin-left: 10px;
    }
  }
  & .dropdown > div {
    margin-right: 1rem;
  }

  & .firstDropbox {
    ${media.custom('768px')} {
      margin-bottom: 1rem;
    }
  }

  & .secondDropbox {
    ${media.custom('768px')} {
      margin-bottom: 1rem;
    }
  }

  & form {
    width: 80%;
    max-width: 800px;
  }

  & label {
    display: block;
    margin-top: 3rem;
    margin-bottom: 10px;
  }

  & #add-title {
    width: 100%;
    font-size: 25px;
    border-radius: 20px;
    padding: 5px 20px;
    border: 1px solid ${({ theme }) => theme.mode.searchBar};
    background-color: ${({ theme }) => theme.mode.background};
    color: ${({ theme }) => theme.mode.primaryText};
  }

  & textarea {
    margin-top: 1rem;
    width: 100%;
    font-size: 25px;
    height: 30rem;
    border-radius: 10px;
    padding: 10px;
    background-color: ${({ theme }) => theme.mode.background};
    border: 1px solid ${({ theme }) => theme.mode.searchBar};
    color: ${({ theme }) => theme.mode.primaryText};

    ${media.custom('768px')} {
      height: 10rem;
    }
  }

  & .cancel,
  .confirm {
    margin-top: 10px;
    float: right;
    width: 7rem;
  }

  & .confirm {
    margin-left: 1rem;
  }
`;
