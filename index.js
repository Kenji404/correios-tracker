const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

const fetchData = async() => {
    const result = await axios({
        method: 'post',
        url: 'https://www2.correios.com.br/sistemas/rastreamento/resultado.cfm',
        data: qs.stringify({
            acao: 'track',
            objetos: 'OK794388532BR',
            btnPesq: 'Buscar'
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
    return result.data;
}

const main = async() => {
    const content = await fetchData();
    const $ = cheerio.load(content);

    const title = $('table').text();
    console.log(title);
}

main();