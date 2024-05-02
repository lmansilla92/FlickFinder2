import { useContext, useState } from 'react';
import ResultCard from './ResultCard';
import AppContext from '../utils/AppContext';
import SearchBar from '../components/SearchBar';


// Results component
// destructure data from props object
const Results = () => {
    const [currentMovie, setCurrentMovie] = useState('')

    const { data } = useContext(AppContext);

    let dataContainer = null

    if (data?.length > 0) {
        console.log('Results: ', data);
        dataContainer = 
            <>
                <SearchBar />
                <div className='results-container'>

                    {
                        data.map((result) => (
                            <ResultCard
                                key={result.id}
                                result={result}
                                currentMovie={currentMovie}
                                setCurrentMovie={setCurrentMovie}
                            />
                        ))
                    }
                </div>
            </>
        ;
    }

    return dataContainer
}

export default Results;