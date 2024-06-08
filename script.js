const clientId = '5e5b81a2b59b4cac89e6f894f4ce82c1';
const redirectUri = 'https://webfunsparktv.github.io/NovaMusic'; // Where Spotify will redirect after authentication
const scopes = 'user-read-private user-read-email'; // The scopes for which access is needed

const playlistElement = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');

// Function to get access token from Spotify
function getAccessToken() {
    // Implement your code here to get the access token using OAuth 2.0 flow
}

// Function to fetch user's playlists from Spotify
async function fetchPlaylists() {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();
        displayPlaylists(data.items);
    } catch (error) {
        console.error('Error fetching playlists:', error.message);
    }
}

// Function to display user's playlists
function displayPlaylists(playlists) {
    playlistElement.innerHTML = '';
    playlists.forEach(playlist => {
        const listItem = document.createElement('li');
        listItem.textContent = playlist.name;
        listItem.addEventListener('click', () => {
            playPlaylist(playlist.id);
        });
        playlistElement.appendChild(listItem);
    });
}

// Function to play a playlist
async function playPlaylist(playlistId) {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch playlist tracks');
        }

        const data = await response.json();
        const track = data.items[0].track; // Get the first track from the playlist
        audioPlayer.src = track.preview_url; // Set the track preview URL
        audioPlayer.play(); // Start playing the track
    } catch (error) {
        console.error('Error playing playlist:', error.message);
    }
}

// Fetch user's playlists when the page loads
fetchPlaylists();
