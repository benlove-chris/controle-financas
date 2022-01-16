from application.models.model import Conta, Despesa, Receita, Usuario



from application import db


def test_add():    
    db.drop_all()
    db.create_all()    
    # testes - cadastro -model
    
    usuario1 = Usuario(nome="Carlos Eduardo", email="carlos@sis.com", senha="1234", usuario="carlao")
    usuario2 = Usuario(nome="Pedro Augusto", email="pedros@sis.com", senha="1234", usuario="guto")
    conta1 = Conta(numeroConta = 12345, saldo=1000.0, tipoConta = "Conta corrente", instituicaoFinanceira = "Viacredi", usuario=usuario1)
    conta2 = Conta(numeroConta = 54321, saldo=1000.0, tipoConta = "Conta poupança", instituicaoFinanceira = "Itau", usuario=usuario2)
    
    despesa1 = Despesa(valor=100.0,  dataPagamento = "2022-02-17",dataPagamentoEsperado="2022-02-17", tipoDespesa="Conta de luz", conta=conta1, usuario=usuario1 )
    despesa2 = Despesa(valor=120.0,  dataPagamento = "2022-03-17",dataPagamentoEsperado="2022-03-17", tipoDespesa="Conta de agua", conta=conta1, usuario=usuario1 )
    despesa3 = Despesa(valor=110.0,  dataPagamento = "2022-04-17",dataPagamentoEsperado="2022-04-17", tipoDespesa="Conta de telefone", conta=conta1, usuario=usuario1 )
    despesa4 = Despesa(valor=113.0,  dataPagamento = "2022-05-17",dataPagamentoEsperado="2022-05-17", tipoDespesa="Conta de telefone", conta=conta1, usuario=usuario1 )
    despesa5 = Despesa(valor=113.0,  dataPagamento = "2022-06-17",dataPagamentoEsperado="2022-06-17", tipoDespesa="Conta de telefone", conta=conta2, usuario=usuario2 )

    receita1 = Receita(valor=120.0, dataRecebimento = "2022-02-17", dataRecebimentoEsperado="2022-02-17", tipoReceita="salario", descricao ="salario do mes", conta=conta1, usuario=usuario1)
    receita2 = Receita(valor=120.0, dataRecebimento = "2022-03-17", dataRecebimentoEsperado="2022-03-17", tipoReceita="salario", descricao ="salario do mes",conta=conta1, usuario=usuario1)
    receita3 = Receita(valor=120.0, dataRecebimento = "2022-04-17", dataRecebimentoEsperado="2022-04-17", tipoReceita="salario", descricao ="salario do mes",conta=conta1, usuario=usuario1)
    receita4 = Receita(valor=120.0, dataRecebimento = "2022-05-17", dataRecebimentoEsperado="2022-05-17", tipoReceita="premio", descricao ="premiação", conta=conta1, usuario=usuario1)
    receita5 = Receita(valor=120.0, dataRecebimento = "2022-06-17", dataRecebimentoEsperado="2022-06-17", tipoReceita="Prêmio", descricao ="premiação", conta=conta2, usuario=usuario2)
    

    db.session.add_all([usuario1, usuario2, conta1, conta2, despesa1, despesa2, despesa3, despesa4, despesa5, receita1, receita2, receita3, receita4, receita5])
  
    db.session.commit()
    
    
    