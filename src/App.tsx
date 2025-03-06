import { Link, Outlet, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import './App.css';

function App() {
  const location = useLocation();
  return (
    <div className="app-container">
      <Tabs
        activeKey={location.pathname}
        centered
        items={[
          // {
          //   label: <Link to="/guild">百业大厅</Link>,
          //   key: '/guild',
          // },
          {
            label: <Link to="/team">组队大厅</Link>,
            key: '/team',
          },
        ]}
      />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
