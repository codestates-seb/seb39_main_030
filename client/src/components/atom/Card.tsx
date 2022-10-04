import styled from 'styled-components';

const Card = styled.section`
  margin: 1rem auto;
  border: 1px solid ${({ theme }) => theme.mode.themeIcon};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.mode.card};
  padding: 2rem;
  width: 330px;
  height: 350px;
  max-width: 40rem;
`;

export default Card;
