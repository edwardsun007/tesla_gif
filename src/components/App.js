import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Gallery, { openLightbox } from "react-grid-gallery";
const keys = require("../api/keys");

class App extends Component {
  state = {
    images: [],
    size: "small",
    term: "",
    limit: 10
  };

  onSearchChange = async (term, size) => {
    if (term === "") {
      this.setState({ images: [], term: "" });
      return;
    }

    // check cache first
    if (localStorage.hasOwnProperty(term)) {
      let value = JSON.parse(localStorage.getItem(term));
      if (value && value != undefined && value.length > 0) {
        this.setState({ images: value, size: size });
      }
    } else {
      // send API call
      const res = await axios.get(
        `${keys.baseURL}/v1/gifs/search?q=${term}&api_key=${
          keys.apikey
        }&limit=${this.state.limit}`
      );

      this.setState({
        images: res.data.data,
        size: size,
        term: term
      });

      // cache it
      localStorage.setItem(term, JSON.stringify(this.state.images));
    }
  };

  formatImg = () => {
    let formatted = [];

    this.state.images.map(image => {
      let size = null;
      switch (this.state.size) {
        case "small":
          size = image.images.fixed_height_small;
          break;
        case "large":
          size = image.images.original;
          break;
        default:
          size = image.images.fixed_height_small;
          break;
      }

      formatted.push({
        src: size.url,
        thumbnail: size.url,
        thumbnailWidth: parseInt(size.width, 10),
        thumbnailHeight: parseInt(size.height, 10)
      });
    });
    return formatted;
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onChange={this.onSearchChange} />
        {this.state.term !== "" && this.state.images.length === 0 ? (
          <div className="ui placeholder segment">
            <div className="ui icon header">
              <i className="image icon" />
              Sorry...No Gif Found Based On Your Query...
            </div>
          </div>
        ) : null}
        {this.state.term === "" && this.state.images.length === 0 ? (
          <div className="ui placeholder segment">
            <div className="ui icon header">
              <i className="rocket icon" />
              Start Explore and Find Your Gif !
            </div>
          </div>
        ) : null}
        <Gallery
          images={this.formatImg()}
          backdropClosesModal={true}
          onClickThumbnail={openLightbox}
        />
      </div>
    );
  }
}
export default App;
