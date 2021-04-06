const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94c19ac7',
            s: 'avengers'
        }
    })
    console.log(response.data);
}

fetchData();
