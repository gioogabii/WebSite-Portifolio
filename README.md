🎨 ArtPort – Portfólio Digital para Criativos
📌 Sobre o Projeto
O ArtPort é uma plataforma online para designers de diversas áreas, como design gráfico, interiores, moda, arquitetura, engenharia e estética. Aqui, os usuários podem publicar seus trabalhos, adicionar descrições e títulos às suas criações. Outros usuários podem visualizar esses projetos, criando um ambiente de networking e inspiração.

🚀 Funcionalidades
✅ Cadastro e login de usuários
✅ Upload de projetos com imagens e descrições
✅ Exploração de projetos de outros criativos
✅ Ambiente para interações e networking
✅ Integração com banco de dados MySQL

🎯 Objetivo
Criar um espaço acessível e colaborativo para que designers possam expor seus trabalhos, se conectar e ganhar visibilidade no mercado.

⚙️ Como Rodar o Projeto?
🛠️ Pré-requisitos
Para rodar o projeto localmente, você precisa ter instalado:

XAMPP (ou outro servidor local compatível com PHP e MySQL)

Um navegador web (Google Chrome, Firefox, Edge, etc.)

🚀 Passo a Passo para Rodar o Projeto
1️⃣ Baixar e configurar o XAMPP

Instale o XAMPP e inicie os serviços Apache e MySQL através do Painel de Controle do XAMPP.

2️⃣ Clonar ou baixar o projeto

Faça o download do repositório ou clone usando o Git:
git clone https://github.com/giogabi/projeto-portifolio.git
 Mover o projeto para a pasta correta

Após baixar/clonar, copie a pasta do projeto e cole dentro da pasta htdocs do XAMPP (exemplo: C:\xampp\htdocs\projeto-portifolio).

4️⃣ Configurar o banco de dados

Abra o navegador e acesse o phpMyAdmin através do link:
http://localhost/phpmyadmin
Crie um banco de dados com o nome Banco de Dados - Portifólio

Cole no Banco de Dados criado o seguinte código:
CREATE DATABASE portifolio;
USE portifolio;
CREATE TABLE cadastroUser (
    codUser INT PRIMARY KEY AUTO_INCREMENT,
    nomeUser VARCHAR(50) NOT NULL,
    emailUser VARCHAR(30),
    senha VARCHAR(15)
);

CREATE TABLE AnexarImg (
	CodImg INT PRIMARY KEY AUTO_INCREMENT,
    nomeAutor VARCHAR(30),
	tituloImg VARCHAR(30),
    categoria VARCHAR(20),
    descricao VARCHAR(50),
    pathImg VARCHAR(256)
);

5️⃣ Rodar o projeto no navegador

No navegador, acesse:
http://localhost/SignUp_LogIn_Form

Pronto! O projeto estará rodando localmente.

🛠️ Tecnologias Utilizadas
Front-end: HTML, CSS, JavaScript

Back-end: PHP

Banco de Dados: MySQL

Servidor Local: XAMPP

