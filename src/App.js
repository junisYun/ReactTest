import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Category from './components/Category'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent';
import Subject from './components/Subject'
import Control from './components/Control'
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
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
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.category.length) {
        var data = this.state.category[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.sub;
          break;
        }
        i++;
      }
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>
    }
    else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        // setState -> add content to this.state.contents
        console.log(_title, _desc);
        this.max_content_id += 1;
        console.log(this.max_content_id);
      
        // this.state.category.push({id:this.max_content_id, title:_title, sub:_desc});
        var _contents = this.state.category.concat(
          {id:this.max_content_id, title:_title, sub:_desc}
        );
        this.setState(
          {category:_contents}
        );
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update') {
      _article = <UpdateContent onSubmit={function(_title, _desc) {
        this.setState(
          
        )
      }.bind(this)}></UpdateContent>
    } else if(this.state.mode === 'delete') {

    }
    return (
      <div className="App">
        <div class="ps-3">
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
                { mode: 'read', selected_content_id: Number(id) });
            }.bind(this)}>
          </Category>
          <Control onChangeMode={function (_mode) {
            this.setState(
              { mode: _mode }
            )
          }.bind(this)}></Control> 
          {_article}
        </div>
      </div>
    );
  }
}

export default App;
