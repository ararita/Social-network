import axios from "./axios";

export function receiveFriendsWannabes() {
    return axios.get("/friends/list").then(results => {
        console.log("results from /friendslist:", results);
        return {
            type: "RECEIVE_FRIENDS_WANNABEES",
            list: results.data.rows
        };
    });
}

export function acceptFriendRequest(wannabe_id) {
    return axios
        .post(
            "/initial-friendship-status/" +
                wannabe_id +
                "/accept-friend-request",
            {
                action: "ACCEPT FRIEND REQUEST"
            }
        )
        .then(results => {
            console.log("results from acceptFriendRequest: ", results);
            return {
                type: "ACCEPT_FRIEND_REQUEST",
                id: wannabe_id
            };
        });
}

export function unFriend(friend_id) {
    return axios
        .post("/initial-friendship-status/" + friend_id + "/unfriend", {
            action: "UNFRIEND"
        })
        .then(results => {
            console.log("results from unfriend: ", results);
            return {
                type: "UNFRIEND",
                id: friend_id
            };
        });
}