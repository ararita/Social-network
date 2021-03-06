import _ from "lodash";
import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import SearchBar from "./search_bar";
import VideoDetail from "./video_detail";
const API_KEY = "AIzaSyAhvGeIDq7_Bjfvco8GmNups8bOkPZrOYs";

class MusicPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce(term => {
            this.videoSearch(term);
        }, 300);

        return (
            <div className="video-div">
                <VideoDetail
                    className="video"
                    video={this.state.selectedVideo}
                />
                <SearchBar onSearchTermChange={videoSearch} />
            </div>
        );
    }
}

export default MusicPlayer;
