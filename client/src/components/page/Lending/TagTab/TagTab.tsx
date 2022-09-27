import styled from 'styled-components';
import { useLayoutEffect, useState } from 'react';
import { tagArr } from './TagTabData';
import { Text } from '../../../atom/Text';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { tagActions } from '../../../../store/tag-slice';
import { useNavigate } from 'react-router-dom';

export const TagTab = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(0);
  const currentTag = useSelector((state: RootState) => state.tag.currentTag);
  const navigate = useNavigate();
  const searchSignal = useSelector(
    (state: RootState) => state.url.searchSignal
  );

  useLayoutEffect(() => {
    dispatch(tagActions.setTag('all#@!'));
  }, [searchSignal]);

  const tagHandler = (tag: string) => {
    navigate('/');
    if (tag === currentTag) dispatch(tagActions.setTag('all#@!'));
    else dispatch(tagActions.setTag(tag));
  };

  const selectMenuHandler = (index) => {
    dispatch(tagActions.setTag('all#@!'));
    setCurrentTab(index);
  };

  return (
    <StyledTabContainer>
      <StyledTabMenu>
        {tagArr.map((el, idx) => {
          return (
            <li
              key={idx}
              className={currentTab === idx ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(idx)}
            >
              <Text fontSize="xl" fontWeight="bold">
                {el.tab}
              </Text>
            </li>
          );
        })}
      </StyledTabMenu>
      <StyledTag>
        {tagArr[currentTab].tag.map((tag, idx) => (
          <span
            key={idx}
            className={currentTag === tag ? 'tag focused' : 'tag'}
            onClick={() => tagHandler(tag)}
          >
            <Text fontSize="lg" fontWeight="regular">
              {tag}
            </Text>
          </span>
        ))}
      </StyledTag>
    </StyledTabContainer>
  );
};

export default TagTab;

const StyledTabContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  padding: 30px;
`;

const StyledTabMenu = styled.ul`
  background-color: inherit;
  border-bottom: 2px solid ${({ theme }) => theme.mode.divider};
  display: flex;

  ${Text} {
    cursor: pointer;
  }

  .submenu {
    width: 100%;
    padding: 15px 10px;
    cursor: pointer;
    border-radius: 10px;
  }

  .focused {
    background-color: ${({ theme }) => theme.mode.themeIcon};
    transition: 0.3s;

    ${Text} {
      color: ${({ theme }) => theme.mode.mainBackground};
    }
  }
`;

const StyledTag = styled.div`
  text-align: left;
  margin-top: 20px;

  .tag {
    display: inline-block;
    text-align: center;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border: 1px solid ${({ theme }) => theme.mode.themeIcon};
    border-radius: 20px;
    margin: 10px;
    cursor: pointer;
  }
  ${Text} {
    cursor: pointer;
  }

  .focused {
    background-color: ${({ theme }) => theme.mode.themeIcon};
    transition: 0.3s;

    ${Text} {
      color: ${({ theme }) => theme.mode.mainBackground};
    }
  }
`;
