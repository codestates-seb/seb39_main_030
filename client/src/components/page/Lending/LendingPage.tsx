import styled from 'styled-components';

const LendingPage = () => {
  return (
    <StyledLendingPage>
      <div className="contents">hi</div>
      <div className="contents">hi</div>
      <div className="contents">hi</div>
      <div className="contents">hi</div>
      <div className="contents">hi</div>
      <div className="contents">hi</div>
    </StyledLendingPage>
  );
};

export default LendingPage;

const StyledLendingPage = styled.div`
  display: flex;
  flex-direction: column;
  .contents {
    border: 1px solid orange;
    width: 400px;
    height: 600px;
  }
`;
