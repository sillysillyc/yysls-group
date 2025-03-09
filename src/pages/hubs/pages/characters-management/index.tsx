import { memo } from 'react';

import { CharactersList, CharactersOperModal, CharactersSearch } from './components';

import './index.less';

const CharactersManagementPage = memo(() => {
  return (
    <div className="characters-management-container">
      <CharactersSearch />
      <CharactersList />
      <CharactersOperModal />
    </div>
  );
});
export default CharactersManagementPage;
