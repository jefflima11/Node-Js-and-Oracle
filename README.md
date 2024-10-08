# NODE-JS-AND-ORACLE
Este projeto é uma aplicação Node.js projetada para integrar com um banco de dados Oracle. Inclui funcionalidades para executar consultas SQL, inserir dados e formatar consultas.

## Estrutura do Projeto
- src/conn.js: Contém a função para estabelecer uma conexão com o banco de dados Oracle.
- src/mt-query.js: Fornece funções para executar consultas SQL.
- src/mt-exec.js: Inclui funções para inserir dados no banco de dados usando procedimentos PL/SQL.
- src/f-query.js: Define funções para formatar consultas SQL.
  
## Configuração
Edite o arquivo **src/conn.js** para configurar os parâmetros de conexão com o banco de dados.
~~~javascript
const config = {
  user: '', // Usuario do banco
  password: '', //Senha do banco
  connectString: '' // String de conexão formato: endereço_do_host:porta/nome_do_serviço
};

oracledb.initOracleClient({ libDir: '' }); // Diretório do instant cliente
~~~

## Configuração e Uso
1. Clone o repositório:
~~~bash
git clone https://github.com/seu-usuario/seu-repositorio.git
~~~
2. Navegue até o diretório do projeto:
~~~bash
cd seu-repositorio
~~~
3. Instale as dependências:
~~~bash
npm install oracledb
~~~
4. Execute os scripts:

- Para executar consultas, use:
~~~bash
node src/mt-query.js
~~~
- Para inserir dados, use:
~~~bash
node src/mt-exec.js
~~~
- Para formatar consultas, use:
~~~bash
node src/f-query.js
~~~

## Contribuindo
Se você deseja contribuir para este projeto, por favor, faça um fork do repositório, crie uma branch para suas alterações e envie um pull request com uma descrição detalhada das suas mudanças.

## Licença
Este projeto está licenciado sob a Licença MIT.

