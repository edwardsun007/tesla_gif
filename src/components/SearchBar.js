import React, { Component } from "react";
import "./search.css";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      size: ""
    };
  }

  onSelectSize = event => {
    event.preventDefault();
    if (event.target.value !== "") {
      this.setState({ size: event.target.value });
      this.props.onChange(this.state.term, event.target.value);
    }
  };

  onTyping = event => {
    event.preventDefault();
    this.setState({ term: event.target.value });
    this.props.onChange(event.target.value, this.state.term);
  };

  render() {
    return (
      <div className="ui container center aligned">
        <div className="ui large header" id="head">
          Tesla Gif
        </div>

        <div className="ui two column stackable center aligned grid">
          <div className="middle aligned row">
            <div className="column">
              <div className="ui icon header">
                <i className="search icon" />
                Type your Term
              </div>
              <div className="field">
                <div className="ui search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      onChange={this.onTyping}
                      placeholder="Search term..."
                    />
                    <i className="search icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="ui icon header">
                <i className="resize horizontal icon" />
                Choose Gif Size
              </div>
              <div className="field">
                <div className="ui search">
                  <div className="ui icon input center aligned">
                    <select onChange={this.onSelectSize}>
                      <option value="">&nbsp;&nbsp;Select A Size</option>
                      <option value="small">&nbsp;&nbsp;&nbsp;Small Gif</option>
                      <option value="large">&nbsp;&nbsp;&nbsp;Large Gif</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
