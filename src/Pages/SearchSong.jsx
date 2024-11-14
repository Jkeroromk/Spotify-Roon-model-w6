import React, { useState, useEffect } from "react";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getAccessToken from "../auth";
import PageButton from "../Components/PageButton";

const FeaturedSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false); // Modify loading to control spinner visibility
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTracks, setTotalTracks] = useState(0);
  const [sortCriteria, setSortCriteria] = useState("");

  // Function to calculate the limit dynamically based on screen size
  const calculateLimit = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const itemHeight = 200; // Adjust this based on actual item height in pixels

    const itemsPerRow =
      screenWidth > 1200
        ? 5
        : screenWidth > 992
        ? 4
        : screenWidth > 768
        ? 3
        : 2;

    const rowCount = Math.floor(screenHeight / itemHeight);
    return itemsPerRow * rowCount;
  };

  // Function to fetch the songs based on sorting and pagination
  const fetchTopHits = async (accessToken, offset = 0) => {
    const limit = calculateLimit(); // Use calculated limit

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?limit=1`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch featured playlist");
      const data = await response.json();
      const playlistId = data.playlists.items[0].id;

      const tracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!tracksResponse.ok) throw new Error("Failed to fetch top hits");
      const tracksData = await tracksResponse.json();
      const allTracks = tracksData.items.map((item) => item.track);
      const totalTracks = tracksData.total;

      if (!allTracks.length) throw new Error("No songs retrieved");
      return { songs: allTracks, total: totalTracks };
    } catch (error) {
      console.error("Error fetching top hits:", error);
      setError("An error occurred while fetching featured songs.");
      return { songs: [], total: 0 };
    }
  };

  // Function to sort songs based on the selected criteria
  const sortSongs = (songs, criteria) => {
    switch (criteria) {
      case "artist_name":
        return songs.sort((a, b) =>
          a.artists[0].name.localeCompare(b.artists[0].name)
        );
      case "album_name":
        return songs.sort((a, b) => a.album.name.localeCompare(b.album.name));
      case "popularity":
        return songs.sort((a, b) => b.popularity - a.popularity);
      default:
        return songs;
    }
  };

  // Function to handle sort change
  const handleSort = (e) => {
    setSortCriteria(e.target.value);
    setCurrentPage(1); // Reset to page 1 when sorting
  };

  // Fetch songs when the component mounts or when sort criteria/page changes
  useEffect(() => {
    const getSongs = async () => {
      setLoading(true); // Show the spinner

      // Delay the results to simulate loading for 1 second
      setTimeout(async () => {
        try {
          const accessToken = await getAccessToken();
          const offset = (currentPage - 1) * calculateLimit();
          const { songs, total } = await fetchTopHits(accessToken, offset);

          // Sort songs based on selected criteria
          const sortedSongs = sortSongs(songs, sortCriteria);

          setSongs(sortedSongs);
          setTotalTracks(total); // Set total tracks from the API response
          setLoading(false); // Hide the spinner after the data is fetched
        } catch (error) {
          setError("Failed to fetch songs.");
          setLoading(false); // Hide the spinner if an error occurs
        }
      }, 1000); // Wait for 1 second before displaying the results
    };

    getSongs();

    // Re-calculate the limit if the window is resized
    const handleResize = () => {
      setLoading(true); // Show the spinner on resize

      getSongs();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage, sortCriteria]);

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage * calculateLimit() < totalTracks) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Calculate total pages based on totalTracks
  const totalPages = Math.ceil(totalTracks / calculateLimit());

  return (
    <>
      <section className="songs-section">
        <div className="songs-container">
          <div className="songs-row">
            <h2 className="songs-title">
              <span id="result-type">{"Top Featured Songs"}</span>
            </h2>
            <div className="songs-title-wrapper">
              <div className="title-and-filter">
                <h2 className="filter-icon">
                  <FontAwesomeIcon icon="fa-solid fa-filter" />
                </h2>
                <div className="filter-dropdown">
                  <select
                    id="filterOptions"
                    onChange={handleSort}
                    value={sortCriteria}
                  >
                    <option value="" disabled>
                      Sort by
                    </option>
                    <option value="artist_name">Artist Name</option>
                    <option value="album_name">Album Name</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="sepre"></div>
            <div className="results-container">
              {loading ? (
                <div id="songs-loading">
                  <FontAwesomeIcon
                    icon="fa-solid fa-hourglass-half"
                    className="fa-solid fa-hourglass-half"
                  />
                </div>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className="results-row">
                  {songs.map((song) => (
                    <div className="results-lists" key={song.id}>
                      <div className="results-lists-wrapper">
                        <img
                          src={song.album.images[0].url}
                          className="songs-img"
                        />
                      </div>
                      <div className="column-info column-title">
                        <a
                          href={`spotify:track:${song.id}`} // Spotify URI for the track
                          className="link-hover-effect link-hover-effect-black link-hover-effect--white"
                          target="_blank"
                          onClick={(e) => {
                            const userAgent = navigator.userAgent.toLowerCase();
                            // Check if Spotify is installed based on user agent or platform
                            const isSpotifyAppInstalled =
                              userAgent.includes("spotify");

                            if (!isSpotifyAppInstalled) {
                              // If Spotify app is not installed, open in browser
                              window.open(song.external_urls.spotify, "_blank");
                            }
                          }}
                        >
                          {song.name}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <PageButton
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          loading={loading} // Pass loading state
        />
      </section>
    </>
  );
};

export default FeaturedSongs;
