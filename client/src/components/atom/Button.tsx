import styled from 'styled-components';

interface IButton {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  borderColor?: string;
  bold?: string;
  paddingSize?: string;
  disabled?: boolean;
  isClick?: boolean;
}

const Button = styled.button<IButton>`
  background-color: ${({ theme, backgroundColor }) =>
    (backgroundColor && theme.mode[backgroundColor]) ||
    theme.mode.defaultButtonBackground};
  color: ${({ theme, color }) =>
    (color && theme.mode[color]) || theme.mode.defaultButtonColor};
  font-size: ${({ theme, fontSize }) =>
    (fontSize && theme.fontSizes[fontSize]) || theme.fontSizes.md};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  border-radius: 10px;
  border: 1px solid
    ${({ theme, borderColor }) =>
      (borderColor && theme.mode[borderColor]) ||
      theme.mode.defaultButtonColor};
  text-align: center;
  padding: ${({ paddingSize }) => (paddingSize ? paddingSize : '10px 25px')};
  height: 100%;

  &:hover,
  &:active {
    background: ${({ theme }) => theme.mode.hover};
    border-color: ${({ theme }) => theme.mode.hover};
  }
`;

export default Button;
