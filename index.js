const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94c19ac7',
            s: searchTerm
        }
    })
}
let timeOutId;
const onInput = event => {
    if (timeOutId) {
        clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
        fetchData(event.target.value);
    }, 1000);
    console.log(timeOutId)
}
const input = document.querySelector('input').addEventListener('input', onInput)

