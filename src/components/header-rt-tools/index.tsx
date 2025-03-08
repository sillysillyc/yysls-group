import { memo } from 'react';

import { PersonalCenter } from './components';

import './index.less';

export const HeaderRTTools = memo(() => {
  return (
    <div className="header-rt-tools-container">
      <PersonalCenter />
    </div>
  );
});
