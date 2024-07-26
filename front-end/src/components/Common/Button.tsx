import React from 'react';
import styled from 'styled-components';

const btn = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-weight: 900;
  size: ${(props) => props.size};
  border-radius: 10px;
  margin: ${(props) => props.margin};
  display: ${(props) => props.display};
`;
const s = {
  Mainbutton: styled(btn)`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
  `,
  Subbutton: styled(btn)`
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.mainColor};
    border: 1px solid ${(props) => props.theme.mainColor};
  `,
};

interface ButtonProps {
  width?: string;
  height?: string;
  size?: string;
  margin?: string;
  type?: string;
  display?: string;
  onClick: Function;
  children: React.ReactNode;
}
const Button = (props: ButtonProps): JSX.Element => {
  const { width, height, size, type, children, margin, display, ...rest } = props;
  return (
    <>
      {type === 'main' ? (
        <s.Mainbutton width={width} height={height} size={size} margin={margin} display={display} {...rest}>
          {children}
        </s.Mainbutton>
      ) : (
        <s.Subbutton width={width} height={height} size={size} margin={margin} display={display} {...rest}>
          {children}
        </s.Subbutton>
      )}
    </>
  );
};

export default Button;
