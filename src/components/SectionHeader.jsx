import React from 'react';
import { Header, Menu } from 'semantic-ui-react';

import AddButton from './Buttons/AddButton';
import CloseButton from './Buttons/CloseButton';

const SectionHeader = (props) => (
  <Menu borderless>
    <Menu.Item>
      <Header as="h2" textAlign="left">{props.sectionName}</Header>
    </Menu.Item>

    <Menu.Item>
      <AddButton onClick={props.openAddForm} />
    </Menu.Item>

    <Menu.Item>
      <CloseButton onClick={props.closeAddForm} />
    </Menu.Item>
  </Menu>
);

// class SectionHeader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <Menu borderless>
//         <Menu.Item>
//           <Header as="h2" textAlign="left">Contact</Header>
//         </Menu.Item>

//         <Menu.Item>
//           <AddButton onClick={this.props.openAddForm} />
//         </Menu.Item>

//         <Menu.Item>
//           <CloseButton onClick={this.props.closeAddForm} />
//         </Menu.Item>
//       </Menu>
//     )
//   }
// }

export default SectionHeader;