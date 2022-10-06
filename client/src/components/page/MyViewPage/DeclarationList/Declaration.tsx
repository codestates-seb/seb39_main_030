import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { useNavigate } from 'react-router-dom';

export default function Declaration(props: any) {
  const navigate = useNavigate();

  const onClickContactItem = () => {
    console.log(props);
    navigate(`/myview/declaration/${props.declarationCode}`, {
      state: props,
    });
  };

  return (
    <StyledDeclaration onClick={onClickContactItem}>
      <img className="img" src={props.profileImg} />
      <Text className="declarationTitle " fontSize="lg">
        {props.ddeclarationReason}
      </Text>
      <Text className="discussiondate" fontSize="lg">
        {props.declarationCreateDate}
      </Text>
    </StyledDeclaration>
  );
}

const StyledDeclaration = styled.div`
  display: flex;
  height: 70px;

  border-bottom: solid 1px;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;

  ${Text} {
    cursor: pointer;
  }

  .declarationTitle {
    margin-right: auto;
    margin-left: 1rem;
  }

  .img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;
