/* eslint-disable max-len */
import * as React from 'react';
import { IIcon } from '../Icons';

export function TrashCanIcon({
  fill = 'white',
  width = 25,
  height = 25
}: IIcon): React.ReactElement {
  return (
    <svg viewBox='0 0 15 17' fill={fill} width={width} height={height}>
      <path d='M4.545.5v.889H0v1.778h.91v11.555c0 .472.19.924.532 1.257.34.334.803.521 1.285.521h9.091a1.84 1.84 0 001.286-.52c.34-.334.532-.786.532-1.258V3.167h.91V1.389H10V.5H4.545zm0 4.444h1.819v8H4.545v-8zm3.637 0H10v8H8.182v-8z' />
    </svg>
  );
}
