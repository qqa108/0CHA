import React, { MouseEventHandler } from 'react';

type IconSvgProps = {
  Ico: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width: string;
  height: string;
  color?: string;
  cursor?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
  display?: string;
  margin?: string;
};

const IconSvg: React.FC<IconSvgProps> = ({ Ico, width, height, color, cursor, margin, display, onClick }) => {
  return (
    <Ico
      style={{ cursor: cursor, margin: margin, display: display }}
      width={width}
      height={height}
      fill={color}
      cursor={cursor}
      onClick={onClick}
    />
  );
};

export default IconSvg;
