/* eslint-disable max-len */
import * as React from 'react';
import { IIcon } from '../Icons';

export function CloseIcon({
  fill = 'white',
  width = 25,
  height = 25
}: IIcon): React.ReactElement {
  return (
    <svg viewBox='0 0 20 20' fill={fill} width={width} height={height}>
      <path d='M20 2.014L17.986 0 10 7.986 2.014 0 0 2.014 7.986 10 0 17.986 2.014 20 10 12.014 17.986 20 20 17.986 12.014 10 20 2.014z' />
    </svg>
  );
}
