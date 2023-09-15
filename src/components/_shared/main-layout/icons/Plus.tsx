import React from 'react';
import { MenuSvgPath } from './MenuSvgPath';

export const PlusIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <MenuSvgPath
      active={active}
      d="M20 1.59998C9.84745 1.59998 1.60001 9.84742 1.60001 20C1.60001 30.1525 9.84745 38.4 20 38.4C30.1526 38.4 38.4 30.1525 38.4 20C38.4 9.84742 30.1526 1.59998 20 1.59998ZM20 3.19998C29.2879 3.19998 36.8 10.7121 36.8 20C36.8 29.2878 29.2879 36.8 20 36.8C10.7121 36.8 3.20001 29.2878 3.20001 20C3.20001 10.7121 10.7121 3.19998 20 3.19998ZM19.2 10.4V19.2H10.4V20.8H19.2V29.6H20.8V20.8H29.6V19.2H20.8V10.4H19.2Z"
    />
  </svg>
);
