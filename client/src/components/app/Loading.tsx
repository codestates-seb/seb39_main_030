import styled from 'styled-components';

const Loading = ({ sub }) => {
  return (
    <StyledLoading sub={sub}>
      <div className="spinner"></div>
    </StyledLoading>
  );
};

export default Loading;

const StyledLoading = styled.div<{ sub }>`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spinner {
    box-sizing: border-box;
    position: ${(props) => (props.sub ? 'relative' : 'absolute')};
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.mode.themeIcon};
    border-bottom-color: ${({ theme }) => theme.mode.themeIcon};
    animation: spin 0.8s ease infinite;
  }
`;
