import { useContext, useState } from 'react';
import ResultCard from './ResultCard';
import AppContext from '../utils/AppContext';
import SearchBar from '../components/SearchBar';


// Results component
// destructure data from props object
const Results = () => {
    const [currentMovie, setCurrentMovie] = useState('')

    const { data } = useContext(AppContext);
    let imgPlaceHolder = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'

    let dataContainer = null

    if (data?.length > 0) {
        console.log('Data Length: ', data.length)
        console.log('Data: ', data);
        dataContainer = (
            <>
                {/* Change logic to display "Search Another Movie" when on results page instead of "Welcome to FlickFinder" */}
                <SearchBar /> 
                <div className='results-container'>

                    {
                        data.map((result) => (
                            // conditionally render ResultCard component using ternary
                            result.i ? (
                                <ResultCard
                                    key={result.id}
                                    result={result}
                                    currentMovie={currentMovie}
                                    setCurrentMovie={setCurrentMovie}
                                />

                            ) : (
                                // render ResultCard with imgPlaceHolder prop for result without an imageUrl
                                <ResultCard
                                    key={result.id}
                                    result={result}
                                    currentMovie={currentMovie}
                                    setCurrentMovie={setCurrentMovie}
                                    imgPlaceHolder={imgPlaceHolder}
                                />
                            )
                        ))
                    }
                </div>
            </>
        );
    }

    return dataContainer
}

export default Results;