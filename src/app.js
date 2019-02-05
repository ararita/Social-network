import React from "react";
import { Logo } from "./logo";
import axios from "./axios";
import { ProfilePic } from "./profilepic";
import Uploader from "./uploader";
import { Profile } from "./profile";
import OtherProfile from "./otherprofile";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.showUploader = this.showUploader.bind(this);
        this.updateProfileUrl = this.updateProfileUrl.bind(this);
        this.onUpdateBio = this.onUpdateBio.bind(this);
        this.state = {
            uploaderIsVisible: false
        };

        // this.changePictureUrl = this.changePictureUrl.bind(this);---pitaj sta znaci
    }

    //this is equivalent of vue mounted
    //a lifecycle method
    componentDidMount() {
        axios
            .get("/user")
            //umjesto first: response.data.first,
            // last: response.data.last,
            // id: response.data.id,
            // profilePicUrl: response.data.url mozda je bolje (({ data })) u setState
            .then(({ data }) => {
                console.log("data: ", data);
                //same as response.data, under
                this.setState(
                    {
                        //this is an object
                        //this is one way to do it, but we will use (({data}))
                        first: data.first,
                        last: data.last,
                        id: data.id,
                        profilePicUrl: data.url,
                        bio: data.bio
                    },
                    () => {
                        console.log("this.state: ", this.state);
                    }
                );
            })
            .catch(err => {
                console.log(err);
            });
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    updateProfileUrl(url) {
        this.setState({
            uploaderIsVisible: false,

            profilePicUrl: url
        });
    }

    onUpdateBio(newBio) {
        axios.post("/bio", { text: newBio }).then(() => {
            this.setState({
                bio: newBio
            });
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Logo />
                    <ProfilePic
                        className="profile-pic-small"
                        first={this.state.first}
                        last={this.state.last}
                        profilePicUrl={this.state.profilePicUrl}
                        showUploader={this.showUploader}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader updateProfileUrl={this.updateProfileUrl} />
                    )}
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                bio={this.state.bio}
                                first={this.state.first}
                                last={this.state.last}
                                profilePicUrl={this.state.profilePicUrl}
                                onUpdateBio={this.onUpdateBio}
                            />
                        )}
                    />
                    <Route path="/user/:id" component={OtherProfile} />
                </div>
            </BrowserRouter>
        );
    }
}

// <BrowserRouter>
//     <div>
//         <Route
//             exact
//             path="/"
//             render={() => (
//                 <Profile
//                     id={this.state.id}
//                     first={this.state.first}
//                     last={this.state.last}
//                     image={this.state.image}
//                     onClick={this.showUploader}
//                     bio={this.state.bio}
//                     setBio={this.setBio}
//                 />
//             )}
//         />
//         <Route path="/user/:id" component={OtherProfile} />
//     </div>
// </BrowserRouter>
