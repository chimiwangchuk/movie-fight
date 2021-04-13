const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94c19ac7',
            s: searchTerm
        }
    })
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
       <label> <b>Search for a movie</b></label>
       <input type="text" class="input">
       <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
            `;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = debounce(async event => {
    const movies = await fetchData(event.target.value);
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${movie.Poster}" alt="poster"/>
            ${movie.Title}
        `;
        resultsWrapper.appendChild(option);
    }
}, 500)
input.addEventListener('input', onInput)

