const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');
const iso88592 = require('iso-8859-2');

const fetchData = async() => {
    const result = await axios({
        method: 'post',
        url: 'https://www2.correios.com.br/sistemas/rastreamento/resultado.cfm',
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
        data: qs.stringify({
            acao: 'track',
            objetos: 'OK794388532BR',
            btnPesq: 'Buscar'
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=ISO-8859-1'
        }
    });
    return result.data;
}

const main = async() => {
    let content = await fetchData();
    content = iso88592.decode(content.toString('binary'));

    const $ = cheerio.load(content);

    let title = $('.ctrlcontent').html();
        console.log(title);
}

main();