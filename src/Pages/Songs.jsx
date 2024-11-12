import React, { useState } from 'react'
import '../index.css'



const Songs = () => {

    const [searchQuery, setSearchQuery] = useState(''); // Store the search query

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const displayMessage = searchQuery
        ? `Here is your search results for: "${searchQuery}"`
        : 'Top featured songs';
    return (
        <>
            <section className="songs-section">
                <div className="songs-container">
                    <div className="songs-row">
                        <h2 className="songs-title">
                            <span id="result-type">
                                <span id="search-query"></span>
                            </span>
                        </h2>
                        <div className="songs-title-wrapper">
                            <div className="title-and-filter">
                                <h2 className="filter-icon"><i className="fa-solid fa-filter"></i></h2>
                                <div className="filter-dropdown">
                                    <select id="filterOptions">
                                        <option value="" disabled selected>Sort by</option>
                                        <option value="ArtistName">Artist Name</option>
                                        <option value="AlbumName">Album Name</option>
                                        <option value="Duration">Duration</option>
                                        <option value="Popularity">Popularity</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="sepre"></div>
                        <div className="results-container">
                            <div className="results-row">

                            </div>
                            <div id="songs-loading">
                                <i className="fa-solid fa-hourglass-half"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Songs