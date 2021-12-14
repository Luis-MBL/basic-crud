## Funcionalidades:

### CRUD de Produtos

É possível cadastrar, listar com filtros, listar todos (com cache), buscar por id, atualizar e ativar/inativar um produto

## Como começar:

1 - Clone o repositório em sua máquina local </br>
2 - Crie na raiz do projeto um arquivo `.env`utilizando os mesmos valores do arquivo `.env.example` </br>
3 - Rode os comandos `docker-compose build` e em seguida `docker-compose up` para montar e inicar os ambientes nos containers do docker </br>
4 - Importe a colection do Postman disponível no link https://documenter.getpostman.com/view/14673478/UVR7L8LP para chamar os endpoints </br>
5 - Dentro do Workspace do Postman crie um environment e adicione uma variável `url` com o valor: `http://localhost:3020` e uma variável `token`com o valor em branco </br>
Obs.: O valor da variável `token` deve ser preenchido com o retorno do Request `POST: /session`

Caso tenha dúvidas entre em contato comigo: </br>
https://www.linkedin.com/in/luis-mbl/ </br>
2001lmbl@gmail.com.br </br>
(37) 99815-3343 </br>
