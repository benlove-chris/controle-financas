
### Sistema de controle de finanças pessoais desenvolvido para a terceira etapa de seleção do programa PUBFUTURE!



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
1. clone do repositório
2. Na pasta raíz "desfiopubfuture", crie um ambiente virtual  
`virtualenv -p python ambiente_virtual`
obs: É necessŕaio ter instalado o virtualenv
3. Dentro do ambiente virtual, execute o comando `pip install -r requeriments.txt` que fará a instalação de todas as dependências necessárias   
3.1 O acesso ao ambiente pode ser feito digitando na raíz o comando `. ambiente_virtual/bin/activate`, fazendo o ambiente ativar  
3.1.1 Para desativar: `deactivate`
4. Com todas as dependências instaladas, basta executar o script "run_app.py" que contém o inicializador do sistema e do servidor  
5. Com o servidor inicializado: basta abrir o arquivo "index.html" e navegar pelo sistema.



