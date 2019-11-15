import React from "react";
import styled from "styled-components";

const Display = styled.div`
  position: relative;
  width: ${props => props.boxSize}px;
  height: ${props => props.boxSize}px;
  background-color: ${props => props.primaryColor};

  .secondary {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 ${props => props.boxSize}px ${props => props.boxSize}px;
    border-color: transparent transparent ${props => props.secondaryColor}
      transparent;
  }
`;

const ColorsDisplay = ({ primaryColor, secondaryColor, size = 32 }) => {
  return (
    <Display
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      boxSize={size}
    >
      <div className="secondary"></div>
    </Display>
  );
};

export default ColorsDisplay;
