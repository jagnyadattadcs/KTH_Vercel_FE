import { ArrowRight, Play } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext'; // Adjust path based on your folder structure

export const Button = ({ text, icon, style = {}, onClick }) => {
  const { theme } = useTheme();

  return (
    <StyledWrapper theme={theme} style={style}>
      <button className='flex items-center justify-center' onClick={onClick}>
        {icon === "play" && <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
        {text}
        {icon === "arrow" && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    position: relative;
    padding: 10px 20px;
    border-radius: 7px;
    border: 1px solid ${props => props.style?.borderColor || props.theme.accent};
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${props => props.style?.backgroundColor || 'transparent'};
    color: ${props => props.style?.color || props.theme.accent};
    overflow: hidden;
    box-shadow: 0 0 0 0 transparent;
    transition: all 0.2s ease-in;
    cursor: pointer;
  }

  button:hover {
    background: ${props => props.style?.backgroundColor || props.theme.accent};
    color: ${props => props.theme.textPrimary};
    box-shadow: 0 0 30px 5px ${props => props.theme.accent}80;
    transition: all 0.2s ease-out;
  }

  button:hover::before {
    animation: sh02 0.5s 0s linear;
  }

  button::before {
    content: '';
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0%;
    opacity: 0;
    background: ${props => props.theme.textPrimary};
    box-shadow: 0 0 50px 30px ${props => props.theme.textPrimary};
    transform: skewX(-20deg);
  }

  @keyframes sh02 {
    from {
      opacity: 0;
      left: 0%;
    }

    50% {
      opacity: 1;
    }

    to {
      opacity: 0;
      left: 100%;
    }
  }

  button:active {
    box-shadow: 0 0 0 0 transparent;
    transition: box-shadow 0.2s ease-in;
  }
`;

export default Button;