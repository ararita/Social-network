import axios from "./axios";

export function receiveFriendsWannabes() {
    return axios.get("/friends/list").then(results => {
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

// SOCKET.IO ONLINE USERS

export function allOnlineUsers(onlineUsers) {
    console.log("AllOnlineUsers Action running: ", onlineUsers);
    return {
        type: "ONLINE_USERS",
        onlineUsersList: onlineUsers
    };
}

export function userWhoJoined(joinedUser) {
    return {
        type: "USER_WHO_JOINED",
        joined: joinedUser
    };
}

export function userWhoLeft(leftUser) {
    return {
        type: "USER_WHO_LEFT",
        leftUser: leftUser
    };
}

//chat stuff:

export function getChatMessages(messages) {
    return {
        type: "GET_CHAT_MESSAGES",
        messages: messages
    };
}

export function loadChatMessage(newMessage) {
    return {
        type: "LOAD_CHAT_MESSAGE",
        newMessage: newMessage
    };
}

//Wall posts:
export function getWallMessages(posts) {
    return {
        type: "GET_WALL_POSTS",
        posts: posts
    };
}

export function addWallMessage(post) {
    console.log("add post to the wall: ", post);
    return {
        type: "ADD_WALL_POST",
        post: post
    };
}

