import { memo } from 'react';

import { Genders } from '@/helpers/services';
import { genderMap } from '@/helpers/constants';

import { AndroidOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';

interface IGenderIconProps {
  gender: Genders;
}

export const GenderIcon = memo((props: IGenderIconProps) => {
  switch (props.gender) {
    case genderMap.male:
      return <ManOutlined />;
    case genderMap.female:
      return <WomanOutlined />;
    default:
      return <AndroidOutlined />;
  }
});
