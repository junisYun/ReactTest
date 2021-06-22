import './App.css';
import React, { Component } from 'react';
import Category from './components/Category'
import Content from './components/Content'
import Subject from './components/Subject'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!!' },
      category: [
        { id: 1, title: 'HTML', sub: 'HTML is HyperText Markup Language' },
        { id: 2, title: 'CSS', sub: 'CSS is Cascading Style Sheets' },
        { id: 3, title: 'JavaScript', sub: 'JavaScript is Programming Language base on Object-Oriented Programming(OOP)' }
      ]
    }
  }
  render() {
    console.log('App render');
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
        var i = 0;
        while(i < this.state.category.length) {
          var data = this.state.category[i];
          if(data.id === this.state.selected_content_id) {
            _title = data.title;
            _desc = data.sub;
            break;
          }
          i++;
        }
    }
    console.log('render', this);
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}>
        </Subject>
        <Category data={this.state.category}
          onChangePage={function (id) {
            this.setState(
              {mode:'read', selected_content_id:Number(id)});
          }.bind(this)}>
          </Category>
        <Content title={_title} sub={_desc}></Content>
      </div>
    );
  }
}

export default App;
