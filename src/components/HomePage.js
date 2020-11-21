import React, { Component } from 'react';
import IconBoxes from './IconBoxes.js';
import About from './About.js';
import Divider from './Divider';
import Slider from './Slider.js';
import Gallery from './Gallery';
import Stats from './Stats';
import Shoes from './Shoes';

class HomePage extends Component {
  render() {
    return (
      <main>
        <Slider />
        <Divider />
        <IconBoxes />
        <Divider />
        <Gallery />
        <Divider />
        <Stats />
        <Divider />
        <Shoes />
        <Divider />
        <About />
        <Divider />
      </main>
    );
  }
}

export default HomePage;
