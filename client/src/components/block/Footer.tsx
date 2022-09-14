import styled from 'styled-components';
import { Text } from '../atom/Text';

const Footer = () => {
  return (
    <StyledFooter>
      <div className="contents">
        <h2 className="title">
          <Text>COPYRIGHT © 2022 ALL RIGHT 작소인위</Text>
        </h2>
        <Text fontSize="md">FE: 지영준, 한상준 BE: 강다교, 최진아</Text>
      </div>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  height: 5rem;
  margin-top: auto;
  background: ${({ theme }) => theme.mode.background};
  padding: 10px 5rem;

  .content {
    width: 96%;
    max-width: 1100px;
    height: 100%;
    display: flex;
    margin: 0 auto;
  }

  .title span {
    font-weight: 400;
    font-size: 17px;
    color: ${({ theme }) => theme.mode.primaryText};
  }

  ${Text} {
    margin-top: 10px;
    color: ${({ theme }) => theme.mode.secondaryText};
  }
`;
