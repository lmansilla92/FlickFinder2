import AppContext from '../utils/AppContext';
import React, { useContext, useEffect } from 'react';

const CurrentMovie = () => {

    const { data, setData, favorites, setFavorites } = useContext(AppContext);
    console.log('current movie data: ', data);

    const addToFavorites = (e) => {
        e.preventDefault();

        // Extract movie details from button attributes
        const title = e.target.getAttribute('title');
        const year = e.target.getAttribute('year');
        const plot = e.target.getAttribute('plot');

        // Iterate through favorites to check if movie is a duplicate
        const isDuplicate = favorites.some(movie => (
            movie.title === title && movie.year === year && movie.plot === plot
        ));

        // If movie is not a duplicate, update favorites state value
        if (!isDuplicate) {
            // Create a new favorite movie object
            const newFavorite = { title, year, plot };

            // Update favorites state value
            setFavorites(prevFavorites => [...prevFavorites, newFavorite]);
            console.log('movie added to favorites!')
        } else {
            console.log("This movie is already in favorites.");
        }

    }
// Log favorites in a useEffect hook to see updated values
useEffect(() => {
    console.log('Updated favorites:', favorites);
}, [favorites]); // Log whenever favorites changes   

    return (
        <div className='results-container'>
            <div className='current-movie-card'>
                <header>
                    <h1>{data.originalTitleText.text}</h1>
                    <p>
                        <span>
                            {data.releaseYear.year} &#183; {data.certificate.rating} &#183; {data.runtime.displayableProperty.value.plainText}
                        </span>
                    </p>
                </header>
                <section className='card-content'>
                    <img
                        className='current-movie-img'
                        src={data.primaryImage.url}
                        alt={`Poster for ${data.originalTitleText.text}`}
                    />
                    <section className='trailer-container'>
                        <iframe
                            className='iframe'
                            title="IMDb Video"
                            width="560"
                            height="315"
                            src={data.primaryVideos.edges[0].node.playbackURLs[0].url}
                            autoPlay
                            allowFullScreen
                        ></iframe>
                    </section>
                </section>
                <section className='card-info'>
                    <p>{data.plot.plotText.plainText}</p>
                    {/* data.directors */}
                    {/* Need to figure out how to go through nested array of objects */}
                    <hr></hr>
                    <p>Director: {data.directors[0].credits[0]?.name.nameText.text}</p>
                    {/* Conditionally render \u00B7 by checking if the writer/star is the last one in the array */}
                    <p>Writers: {data.writers[0].credits.map((writer, index) => (
                        <React.Fragment key={writer.name.nameText.text}>
                            {writer.name.nameText.text}
                            {index < data.writers[0].credits.length - 1 && ' \u00B7 '}
                        </React.Fragment>
                    ))}</p>
                    <p>Stars: {data.principalCredits[2].credits.map((star, index) => (
                        <React.Fragment key={star.name.nameText.text}>
                            {star.name.nameText.text}
                            {index < data.principalCredits[2].credits.length - 1 && ' \u00B7 '}
                        </React.Fragment>
                    ))}</p>
                </section>
                <button
                    title={data.originalTitleText.text}
                    year={data.releaseYear.year}
                    plot={data.plot.plotText.plainText}
                    onClick={addToFavorites}
                >
                    Add to Favorites
                </button>
            </div>
        </div>
    )

}

export default CurrentMovie;