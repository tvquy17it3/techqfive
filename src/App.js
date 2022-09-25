import React, { Component } from 'react';
import Menu from './components/Menu';
import Music from './screens/Music';

const MENUS= [
  { text: 'Discovery', url: '' },
  { text: 'Trending', url: '' },
];

class App extends Component {
  render() {
    return (
      <div>
        {/* <Menu menus={MENUS} /> */}
        <Music/>
      </div>
    );
  }
}
export default App;
