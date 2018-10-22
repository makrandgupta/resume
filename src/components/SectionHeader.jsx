import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import AddButton from './Buttons/AddButton';
import CloseButton from './Buttons/CloseButton';

const SectionHeader = ({ sectionName, openAddForm, closeAddForm, isFormOpen }) => (
  <Menu borderless>
    <Menu.Item>
      <Header as="h2" textAlign="left">{sectionName}</Header>
    </Menu.Item>

    {!isFormOpen && (
      <Menu.Item>
        <AddButton onClick={openAddForm} />
      </Menu.Item>
    )}

    {isFormOpen && (
      <Menu.Item>
        <CloseButton onClick={closeAddForm} />
      </Menu.Item>
    )}
  </Menu>
);

export default SectionHeader;