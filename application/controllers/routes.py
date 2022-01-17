from application.models.model import Conta, Despesa, Receita, Usuario
from flask import  request, jsonify, Blueprint

from application import app
from application import db

geral = app

@geral.route("/")
def inicio():
     return """
            Olá, seja bem vindo<br><br>
            Escolha uma opção para obter os dados em Json<br>
            <a href='/listar/Usuario'>Listar usuarios</a><br>
            <a href='/listar/Conta'>Listar contas</a><br>
            <a href='/listar/Despesa'>Listar despesas</a><br>
            <a href='/listar/Receita'>Listar receitas</a>
            """


# rota para listar todos os objetos da classe inserida como parametro
@geral.route("/listar/<string:classe>", methods=['GET'])
def listar(classe):

    if classe == "Conta":
        dados = db.session.query(Conta).all() 
    elif classe == "Despesa": 
        dados = db.session.query(Despesa).all() 
    elif classe == "Receita": 
        dados = db.session.query(Receita).all() 
    elif classe == "Usuario": 
        dados = db.session.query(Usuario).all()         
    
    lista_jsons = [ x.json() for x in dados ]

    resposta = jsonify(lista_jsons) 
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta


# rota para cadastar os dados da classe recebida como parametro
@geral.route("/cadastrar/<string:classe>", methods=['POST'])
def cadastrar(classe):
    resposta = jsonify({"resultado": "ok"})
    dados = request.get_json()
    if classe == "Conta":
        try:    
            nova_conta = Conta(**dados)
            db.session.add(nova_conta)
            db.session.commit()
        except Exception as e:
            resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
    
    elif classe == "Despesa":
        try:   
            nova_despesa = Despesa(**dados)
            db.session.add(nova_despesa)
            db.session.commit()
        except Exception as e:
            resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
            

    elif classe == "Receita":
        try:    
            nova_receita = Receita(**dados)
            db.session.add(nova_receita)
            db.session.commit()
        except Exception as e:
            resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
    
    elif classe == "Usuario":
        try:    
            novo_usuario = Usuario(**dados)
            db.session.add(novo_usuario)
            db.session.commit()
        except Exception as e:
            resposta = jsonify({"resultado":"erro", "detalhes":str(e)})         

    resposta.headers.add("Access-Control-Allow-Origin","*")

    return resposta



# rota para listar dados de uma despesa especifica
@geral.route("/listar_despesa_esp/<int:idDespesa>", methods=['GET'])
def dados_despesa_esp(idDespesa):
    
    dados = Despesa.query.get_or_404(idDespesa)
    return (dados.json())

# rota para editar uma despesa especifica
@geral.route("/editar_despesa/<int:idDespesa>",  methods=['POST'])
def editar_despesa(idDespesa):
   
    dados = request.get_json()
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try:
        despesa = Despesa.query.get_or_404(idDespesa)
            
        despesa.valor = dados["novo_valor"]
        despesa.dataPagamento = dados["nova_data_pagamento"]
        despesa.dataPagamentoEsperado = dados["nova_data_pagamento_esperado"]
        despesa.tipoDespesa = dados["novo_tipo_despesa"]
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


# rota para editar uma despesa especifica
@geral.route("/editar_usuario/<int:idUsuario>",  methods=['POST'])
def editar_usuario(idUsuario):
    dados = request.get_json()
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try:
        usuario = Usuario.query.get_or_404(idUsuario)

        if usuario.nome != dados["novo_nome"]:
            usuario.nome = dados["novo_nome"]
            db.session.commit()

        elif usuario.email != dados["novo_email"]:            
            usuario.email = dados["novo_email"]
            db.session.commit()

        elif usuario.usuario != dados["novo_usuario"]:
            usuario.usuario = dados["novo_usuario"]
            db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

# rota par deletar uma despesa especifica
@geral.route("/apagar_despesa/<int:idDespesa>", methods=['DELETE'])
def apagar_despesa(idDespesa):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: #Tentar realizar a exclusão
        despesa = Despesa.query.get(idDespesa)
        
        db.session.delete(despesa)
        db.session.commit()   
    
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta


# rota par deletar um usuario
@geral.route("/apagar_usuario/<int:idUsuario>", methods=['DELETE'])
def apagar_usuario(idUsuario):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: #Tentar realizar a exclusão
        receitas = db.session.query(Receita).all()
        for receita in receitas:
            if receita.usuario.idUsuario == idUsuario:
                # apagar as receitas da usuario 
                db.session.delete(receita)
                db.session.commit()

        despesas = db.session.query(Despesa).all()
        for despesa in despesas:
            if despesa.usuario.idUsuario == idUsuario:
                # apagar as despesas da usuario 
                db.session.delete(despesa)
                db.session.commit()

        contas = db.session.query(Conta).all()
        for conta in contas:
            if conta.usuario.idUsuario == idUsuario:
                # apagar as contas da usuario 
                db.session.delete(conta)
                db.session.commit()                

        # apagar usuario
        usuario = Usuario.query.get(idUsuario)
        
        db.session.delete(usuario)
        db.session.commit()
        
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta



# rota para listar dados de uma receita especifica
@geral.route("/listar_receita_esp/<int:idReceita>", methods=['GET'])
def dados_receita_esp(idReceita):
    dados = Receita.query.get_or_404(idReceita)
    return (dados.json())


# rota para listar dados de uma receita especifica
@geral.route("/listar_conta_esp/<int:numeroConta>", methods=['GET'])
def dados_conta_esp(numeroConta):
    dados = Conta.query.get_or_404(numeroConta)
    return (dados.json())


# rota para editar uma receita especifica
@geral.route("/editar_receita/<int:idReceita>",  methods=['POST'])
def editar_receita(idReceita):
    dados = request.get_json()
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try:
        receita = Receita.query.get_or_404(idReceita)
            
        receita.valor = dados["novo_valor"]
        receita.dataRecebimento = dados["nova_data_recebimento"]
        receita.dataRecebimentoEsperado = dados["nova_data_recebimento_esperado"]
        receita.tipoReceita = dados["novo_tipo_receita"]
        receita.descricao = dados["nova_descricao"]
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

#rota para editar uma conta especifica
@geral.route("/editar_conta/<int:numeroConta>",  methods=['POST'])
def editar_conta(numeroConta):
   
    dados = request.get_json()
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try:
        conta = Conta.query.get_or_404(numeroConta)
    
        conta.saldo = dados["novo_saldo"]
        conta.tipoConta = dados["novo_tipo_conta"]
        conta.instituicaoFinanceira = dados["nova_instituicao"]
        
        db.session.commit()

    
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
    
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


# rota para deletar uma receita especifica
@geral.route("/apagar_receita/<int:idReceita>", methods=['DELETE'])

def apagar_receita(idReceita):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: #Tentar realizar a exclusão
        receita = Receita.query.get(idReceita)    
        db.session.delete(receita)
        db.session.commit()
        
            
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta


# rota para deletar uma conta especifica
@geral.route("/apagar_conta/<int:numeroConta>", methods=['DELETE'])

def apagar_conta(numeroConta):
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    try: #Tentar realizar a exclusão

        receitas = db.session.query(Receita).all()
        for receita in receitas:
            if receita.conta_receita == numeroConta:
                # apagar as receitas da conta excluida
                db.session.delete(receita)
                db.session.commit()

        despesas = db.session.query(Despesa).all()
        for despesa in despesas:
            if despesa.conta_despesa == numeroConta:
                # apagar as despesas da conta excluida
                db.session.delete(despesa)
                db.session.commit()

        conta = Conta.query.get(numeroConta)
        # excluir a conta
        db.session.delete(conta)
        db.session.commit()
        
    
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta




# rota para calcular e listar o saldo final de uma conta
@geral.route("/saldo_conta/<int:numeroConta>", methods=['GET'])
def saldo_conta(numeroConta):
    
    #total da conta
    conta = Conta.query.get_or_404(numeroConta)
    soma_conta = conta.json()["saldo"]

    # total das despesas registradas na conta
    despesas = db.session.query(Despesa).all()
    soma_despesa = 0
    for despesa in despesas:
        if despesa.conta_despesa == numeroConta:
            soma_despesa += despesa.valor

    # total das receitas registradas na conta
    receitas = db.session.query(Receita).all()
    soma_receita = 0
    for receita in receitas:
        if receita.conta_receita == numeroConta:
            soma_receita += receita.valor
            
    
    # calculara saldo final
    saldo_final = soma_conta + soma_receita - soma_despesa
    resposta = jsonify({"total_conta": soma_conta, "total_despesa": soma_despesa, "total_receita":soma_receita, "saldo": saldo_final})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


    

# rota para transferir saldo de uma conta para outra
@geral.route("/transferir", methods=["POST"])
def transferir():
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    # receber os dados para fazer transferencia
    dados = request.get_json()

    valor_transfer = float(dados["valor_transfer"])
    numero_origem = dados["numero_origem"]
    numero_destino = dados["numero_destino"]

    try:
        conta_origem = Conta.query.get_or_404(numero_origem)
        conta_destino = Conta.query.get_or_404(numero_destino)
        if conta_origem.saldo >= valor_transfer: # verificar se há saldo suficiente para transferir
            conta_origem.saldo -= valor_transfer
            conta_destino.saldo += valor_transfer
            db.session.commit()
            # transferencia efetuada
        else:
            # não houve transferencia
            resposta = jsonify({"resultado":"erro_saldo", "detalhes": "Saldo insuficiente"})


        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta



# rota para filtrar o periodo da classe inserida como parametro
@geral.route("/listar_periodo/<string:classe>", methods=['GET', 'POST'])
def listar_periodo(classe):
    dados = request.get_json()
    data_inicio = dados["data_inicio"]
    data_fim = dados["data_fim"]
    if classe == "Despesa":
        despesas = db.session.query(Despesa).filter(Despesa.dataPagamento.between(str(data_inicio),str(data_fim) ))

        lista_jsons = [ x.json() for x in despesas ]
    
        resposta = jsonify(lista_jsons) 
        
        resposta.headers.add("Access-Control-Allow-Origin", "*") 
        return resposta

    if classe == "Receita":
        receitas = db.session.query(Receita).filter(Receita.dataRecebimento.between(str(data_inicio),str(data_fim) ))
        lista_jsons = [ x.json() for x in receitas ]
    

        resposta = jsonify(lista_jsons) 
        
        resposta.headers.add("Access-Control-Allow-Origin", "*") 
        return resposta


    
# rota para filtrar o tipo da classe inserida como parametro
@geral.route("/listar_tipo/<string:classe>", methods=['GET', 'POST'])
def listar_tipo(classe):
    dados = request.get_json()
    tipo = dados["tipo"]

    if classe == "Despesa":
        despesas = db.session.query(Despesa).filter(Despesa.tipoDespesa == str(tipo))
        
        lista_jsons = [ x.json() for x in despesas ]
        
        resposta = jsonify(lista_jsons) 
        
        resposta.headers.add("Access-Control-Allow-Origin", "*") 
        return resposta

    elif classe == "Receita":
        receitas = db.session.query(Receita).filter(Receita.tipoReceita == str(tipo))
        
        lista_jsons = [ x.json() for x in receitas ]
        
        resposta = jsonify(lista_jsons) 
        
        resposta.headers.add("Access-Control-Allow-Origin", "*") 
        return resposta   




 # rota para listar o valor total da classe inserida como parametro
@geral.route("/listar_total_valor/<string:classe>/<int:id_usuario>", methods=['GET'])
def listar_total_valor(classe, id_usuario):

    
    if classe == "Despesa":     
        despesas = db.session.query(Despesa).all()
        valor_total = 0
        for despesa in despesas:
            if despesa.usuario.idUsuario == id_usuario:
                valor_total += despesa.valor
    
        
    elif classe == "Receita": 
        receitas = db.session.query(Receita).all()
        valor_total = 0
        for receita in receitas:
            if receita.usuario.idUsuario == id_usuario:
                valor_total += receita.valor

    elif classe == "Conta": 
        contas = db.session.query(Conta).all()
        valor_total = 0
        for conta in contas:
            if conta.usuario.idUsuario == id_usuario:
                valor_total += conta.saldo
        
    
    resposta = jsonify({"valor_total": valor_total})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta




@geral.route("/logar_usuario", methods=['GET', 'POST'])
def logar_usuario():
    dados = request.get_json()
    resposta = jsonify({"resultado": "erro", "detalhes": "Usuário não encontrado"})

    usuario = db.session.query(Usuario).filter((Usuario.email == dados["usuario"]) | (Usuario.usuario == dados["usuario"])).first()
    

    if usuario.senha == dados["senha"]:
        resposta = jsonify({"resultado": usuario.idUsuario, "retorno": "OK"})
    else:
        resposta = jsonify({"resultado":  "Erro"})

    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 



@geral.route("/movimentacoes/<string:numeroConta>", methods=['GET'])
def movimentacoes(numeroConta):
    pass 
