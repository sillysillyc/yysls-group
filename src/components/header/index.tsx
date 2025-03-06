import { memo } from 'react';
import { UserInfo } from './components/user-info';

import './index.less';

export const Header = memo(() => {
  return (
    <div className="header-container">
      <div className="header-left">left</div>
      <div className="header-middle">middle</div>
      <div className="header-right">
        <UserInfo />
      </div>
    </div>
  );
});
