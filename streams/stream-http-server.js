import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        
        console.log(transformed);

        callback(null, Buffer.from(String(transformed)));
    }
}

// req => Readable Stream 
// res => Writeable Stream 

const server = http.createServer( async (req, res) => {
    const buffers = [];

    /* 
    * Essa sintax permite percorrer cada pedaço(chunk) da stream(req)
    * E adicionar cada pedaço dentro do array, para ter todos os dados
    * da stream antes de processa-los; 
    */
    for await (const chunk of req){
        buffers.push(chunk);
    }

    // Une todos os pedaços de buffers e tranforma em string
    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent);
});

server.listen(3334);