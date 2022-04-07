# Controle de finanças

[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![made-with-js](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com/)

📜 Descrição do projeto


A lógica do projeto roda prioritariamente em Python, com requerimentos de dados pela parte gráfica, a qual optei por desenvolver em um ambiente WEB com JavaScript e jQuery.



## Tecnologias
*Tecnologias utilizadas*: HTML, CSS, BOOTSTRAP, Flask, Javascript e JQuery.      
*IDE*: Visual Studio Code.      
*Estruturação*: Estruturado em HTML, tendo seu back-end fundamentado em Flask e sua arquitetura sendo mais ou menos  parecido com o padrão MVC (Model-View-Controller), (mais ou menos porque o view foi desenvolvido de forma separado).    


## Funcionalidades
| Funcionalidade | Situação |
| ----------- | ----------- |
| Cadastro de Usuários, Contas, Receitas e Despesas| :heavy_check_mark: |
| Possibilidade de exclusão dos cadastrados| :heavy_check_mark: |
| Possibilidade de edição dos cadastrados| :heavy_check_mark: |
| Listar os dados cadastrados| :heavy_check_mark: |
| Filtar por intervalo de tempo| :heavy_check_mark: |
| Filtar por tipo | :heavy_check_mark: |
| Transferencia entre contas| :heavy_check_mark: |
| Login de usuário | :heavy_check_mark: |
| Acesso do usuário a seus dados pessoais | :heavy_check_mark: |
| Logout do usuários | :heavy_check_mark: |





## Requisitos para manipular código
* Instalação de todas as dependências especificadas no arquivo "requirements.txt", além de Python 3.8 

## Execução do sistema localmente
Sugiro instalar as dependências em um ambiente virtal
1. clone o repositório
```bash
git clone https://github.com/benlove-chris/desafiopubfuture.git
```
3. Na pasta raíz "desfiopubfuture", crie um ambiente virtual  
```bash
virtualenv nome_do_ambiente
```

obs: É necessário ter instalado o virtualenv


4. Na pasta raíz "desfiopubfuture", execute
```bash
. nome_do_ambiente/bin/activate
```

6. Com o ambiente ativado, execute o comando 
```bash
pip install -r requirements.txt
```
que fará a instalação de todas as dependências necessárias 

8. Na pasta raíz "desfiopubfuture", execute
```bash
python3 run_app.py
```
10. Na pasta "Frontend" navegue na nos arquivos html, iniciando pelo "index.html"
11. Para sair do ambiente
```bash
deactivate
```

