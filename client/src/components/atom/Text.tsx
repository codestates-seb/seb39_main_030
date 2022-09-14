import styled from 'styled-components';

interface IText {
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  isClick?: boolean;
}

export const Text = styled.span<IText>`
  display: inline-block;
  color: ${({ theme, textColor }) =>
    (textColor && theme.mode[textColor]) || theme.mode.primaryText};
  font-size: ${({ theme, fontSize }) =>
    (fontSize && (theme.fontSizes[fontSize] || fontSize)) ||
    theme.fontSizes.md};
  font-weight: ${({ theme, fontWeight }) =>
    (fontWeight && theme.fontWeights[fontWeight]) || theme.fontWeights.regular};
  line-height: ${({ lineHeight }) => lineHeight};
  cursor: ${({ isClick }) => (isClick ? 'pointer' : 'default')};
`;
