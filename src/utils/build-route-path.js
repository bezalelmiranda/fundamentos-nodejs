// /users/:id
export function buildRoutePath(path){
    // g - identifica que é um regex global, vai buscar todos o regex que batam 
    // com a operação definida
    const routeParametersRegex = /:([a-zA-Z]+)/g

    const pathWithParams = path.replaceAll(
        routeParametersRegex,
        '(?<$1>[a-z0-9-_]+)'
      );
    /**
     * ?<$1> - Obtém o nome do passado no parametro, referente ao regex, por exemplo,
     * `:id`. Então nesse caso `$1` se refere ao :id. Ele não só pega o nome do parametro,
     * mas também se houver outros parametros, ele pega os nomes desses demais parametro e 
     * cria uma lista nomeando cada parametro com seu respectivo nome
     */

    // test -> /\/users\/([a-z0-9\-_]+)/

    //console.log(Array.from(path.matchAll(routeParametersRegex)));

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

    /* O ? após os parenteses indica que o parametro pode conter ou não, sendo opcional.
    * O $ após o interrogação indica que deve terminar com a verficicação estabeleciada,
    * não podendo contar mais nada após a verificação.
    * As duas barras em \\?(.*) servem para escapar o ? que é referente ao inicio do query
    * parametrs, em seguida entre parentese, com . (qualquer caractere) e * (inumeras vezes)
    * pega todo o conteúdo da query.
    */
    return pathRegex;
}