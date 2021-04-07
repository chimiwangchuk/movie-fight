const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94c19ac7',
            s: searchTerm
        }
    })
}


const debounce = (func) => {
    let timeOutId;
    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            func.apply(null, args);
        }, 1000)
    }

}

const onInput = debounce(event => {
    fetchData(event.target.value);
})
const input = document.querySelector('input').addEventListener('input', onInput)

