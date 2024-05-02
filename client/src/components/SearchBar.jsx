import React, { useState, useContext } from 'react';
import AppContext from '../utils/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';


// SearchBar component
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { setData } = useContext(AppContext);

    const location = useLocation();
    const currentPage = location.pathname;

    // store useNavigate function in a const to use later to change the URL path after API fetch
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchData() // call fetchData function to get API data
        console.log(`Searching for: ${searchTerm}`);
    };

    // Function to fetch data from the server's api fetched data using searchTerm
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/results/${searchTerm}`);
            const jsonData = await response.json();

            // update data state value
            setData(jsonData);
            // change URL path to /results
            navigate('/results', { searchData: jsonData })

        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    return (
        <>
            <div>
                <div className="search-container">
                    {currentPage === '/' ? <h1>Welcome to Flick Finder</h1> : <h1>Search Another Movie</h1>}
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search for movies or TV shows"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                {/* <Results /> */}
            </div>
        </>
    );
}

export default SearchBar;