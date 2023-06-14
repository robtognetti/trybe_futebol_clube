<h2>Funcionalidades</h2>
<p>O objetivo do TFC é ser um site informativo sobre partidas e classificações de futebol. Para adicionar uma partida, é necessário ter um token e a pessoa deve estar logada para fazer as alterações. Há um relacionamento entre as tabelas de times e partidas para fazer as atualizações das partidas.</p>
<h2>Instalação</h2>
<p>Para executar o projeto, é necessário ter instalado na máquina o Node.js versão 16, Docker e Docker-compose versão 1.29.2 ou superior. Após clonar o repositório, rode o comando npm install nas pastas backend e frontend.</p>
<h2>Tecnologias</h2>
<ul>
  <li>Node.js</li>
  <li>Docker</li>
  <li>MySQL</li>
  <li>Sequelize</li>
</ul>
<h2>Estrutura do projeto</h2>
<p>O projeto é composto por um banco de dados, um back-end, um front-end e um arquivo docker-compose.yml.</p>
<h3>Banco de dados</h3>
<p>O banco de dados é um container docker MySQL já configurado no docker-compose através de um serviço definido como db. Durante a execução dos testes, é sempre acessado pelo sequelize e via porta 3002 do localhost. Também é possível conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver, etc), colocando as credenciais configuradas no docker-compose no serviço db.</p>
<h3>Back-end</h3>
<p>O back-end é onde é realizado a maior parte das implementações exigidas. Deve rodar na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão. A aplicação deve ser inicializada a partir do arquivo app/backend/src/server.ts. É importante garantir que o express é executado e que a aplicação ouve a porta que vem das variáveis de ambiente. Todas as dependências extras, como joi, boom, express-async-errors, devem ser listadas em app/backend/packages.npm.</p>
<h3>Front-end</h3>
<p>O front-end do projeto já está completo e não requer modificações adicionais. No entanto, o Dockerfile precisará ser configurado para que o projeto funcione corretamente. O front-end se comunica com o serviço de back-end através da URL http://localhost:3001, utilizando os endpoints que foram construídos de acordo com os requisitos do projeto.</p>
<h3>Docker</h3>
<p>O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando npm run compose:up. Para inicializar a aplicação, é necessário configurar corretamente os arquivos Dockerfile nas raízes do front-end e back-end.</p>
<h2>Contribuição</h2> <p>Contribuições são bem-vindas! Se você deseja contribuir com o projeto, siga estes passos:</p> <ol> <li>Faça um fork deste repositório.</li> <li>Crie uma branch com suas alterações (git checkout -b minha-branch).</li> <li>Faça commit de suas alterações (git commit -m ‘Adicionei uma funcionalidade’).</li> <li>Envie suas alterações para seu fork (git push origin minha-branch).</li> <li>Abra um pull request.</li> </ol>
