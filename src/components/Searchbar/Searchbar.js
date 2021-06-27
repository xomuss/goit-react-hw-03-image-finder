import React, { Component } from 'react';
import './index.css';

class Searchbar extends Component {
  state = { query: '' };

  hendleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);

    this.setState({ query: '' });
  };

  hendleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  // Your API key: 21316694-ed9f7523baf223edee906888b

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.hendleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.hendleChange}
            value={this.state.query}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
