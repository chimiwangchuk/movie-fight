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
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }
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
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            getMoreInfo(movie);
        })
    }
}, 500)
input.addEventListener('input', onInput)


document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
        dropdown.classList.remove('is-active')
    }
})

const getMoreInfo = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94c19ac7',
            i: movie.imdbID
        }
    })
    console.log(response.data);
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}


const movieTemplate = movieDetails => {
    return `
        <article class="media"> 
            <figure class="media-left">
            <p class="image">
            <img src="${movieDetails.Poster}" alt="">
</p>
</figure>
            <div class="media-content">
            <div class="content">
            <h1>${movieDetails.Title}</h1>
            <h4>${movieDetails.Genre}</h4>
            <p>${movieDetails.Plot}</p>
            </div>
            </div>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetails.Awards}</p>
        <p class="subtitle">Awards</p>
</article>
<article class="notification is-primary">
        <p class="title">${movieDetails.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
</article>
<article class="notification is-primary">
        <p class="title">${movieDetails.Metascore}</p>
        <p class="subtitle">Metascore</p>
</article>
<article class="notification is-primary">
        <p class="title">${movieDetails.imdbRating}</p>
        <p class="subtitle">imdbRating</p>
</article>
<article class="notification is-primary">
        <p class="title">${movieDetails.imdbVotes}</p>
        <p class="subtitle">imdbVotes</p>
</article>
    `
}
