async function getToken() {
    const clientID = "737fab007a734c07901cfff100822bd2";
    const clientSecret = "67de60a61a9a428198024884d3337f2c";
    const url = "https://accounts.spotify.com/api/token";
    const basicAuth = btoa(`${clientID}:${clientSecret}`)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Basic " + basicAuth,
                "Content-Type": "application/x-www-form-urlencoded",
            },

            body: "grant_type=client_credentials",

        })

        const data = await response.json();

        console.log("token", data.access_token)
        return data.access_token;

    } catch (error) {
        console.log("Don't get Token Form API", error)
    }
}

async function getPlaylistItem(playlistID) {
    const token = await getToken();

    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })

        const data = await response.json();

        console.log(data)
        return data;
    } catch (error) {
        console.log("Don't get Playlist from API", error);
    }
}

async function getTracks(trackID) {
    try {
        const token = await getToken();
        const url = `https://api.spotify.com/v1/tracks/${trackID}`;

        const response = await fetch(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        const data = await response.json();

        console.log("tracks", data.name)
        return data;
    } catch (error) {
        console.log("Don't get Tracks API", error)
    }
}

async function getTopTracks(type = "tracks", timeRange = 'long_term', limit = 5) {
    try {
        const token = await getToken();
        const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`;

        const response = await fetch(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("TOP TRACKS", data)
    } catch (error) {
        console.log("Dont GET TOPTRACK", error);
    }
}


export {
    getToken,
    getPlaylistItem,
    getTracks,
    getTopTracks
}
