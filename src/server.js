import http from 'node:http';
import { json } from './middleware/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
 
    await json(req, res);

    const route = routes.find(route => {
        //console.log("route.method", route.method, "method", method);
        //console.log("route.url", route.path, "url", url);
        //console.log("test(url): ", route.path.test(url));

        return route.method === method && route.path.test(url);     
        // todo método RegExp possui um método test()
    })

    
    if(route){
        // Executa a Regex na URL para retornar quais os dados a regex encontrou ao testar a url    
        const routeParams = req.url.match(route.path);
        
        //console.log(extractQueryParams(routeParams.groups.query));

        // query ==> query parametrs / params ==> route parametrs
        const { query, ...params } = routeParams.groups;

        req.params = params;
        req.query = query ? extractQueryParams(query) : {};

        return route.handler(req, res);
    }

    return res.writeHead(404).end();
});

server.listen(3333);