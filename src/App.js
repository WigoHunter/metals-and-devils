import React, { Component } from 'react';
import { chapters, title } from './doc.json';
import { Menu, Dropdown, Icon} from 'antd';
import './App.css';

const ChaptersMenu = ({ changeContent }) => (
  <Menu>
    {chapters.map((chapter, i) => (
      <Menu.Item key={i}>
        <p onClick={() => changeContent({ ...chapter, title: `Chapter ${i} - ${chapter.title}` })}>
          {`${i}: ${chapter.title}`}
        </p>
      </Menu.Item>
    ))}
  </Menu>
)

class App extends Component {
  state = {
    chapter: {
      ...chapters[0],
      title: `Chapter 0 - ${chapters[0].title}`
    },
    dropdownVisible: false,
  }

  changeContent = chapter => {
    this.setState({
      chapter,
      dropdownVisible: false,
    })
  }

  render() {
    return (
      <>
        <h1>{title}</h1>
        <Dropdown
          overlay={<ChaptersMenu changeContent={this.changeContent} />}
          trigger={['click']}
          visible={this.state.dropdownVisible}
        >
          <p className="ant-dropdown-link" onClick={() => this.setState({ dropdownVisible: true })}>
            章節 <Icon type="down" />
          </p>
        </Dropdown>
        <div className="content">
          <h3>{this.state.chapter.title}</h3>
          {this.state.chapter.content}
        </div>
      </>
    );
  }
}

export default App;
