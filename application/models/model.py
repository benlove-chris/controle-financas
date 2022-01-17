from application import db

class Usuario(db.Model):
    
    idUsuario = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(60), nullable=False)
    usuario = db.Column(db.String(60), unique=True)

    
    
    def __str__(self):
        """
        Retorna os atributos da classe em forma de texto
        """
        return f"idUsuario: {self.idUsuario} \n nome: {self.nome} \n email: {self.email}\n usuario: {self.usuario} "

    
    def json(self):
        """
        Retorna os atributos da classe no formato json
        """   
        return{
            "idUsuario": self.idUsuario,
            "nome": self.nome,
            "email": self.email,
            "usuario": self.usuario
            
        }

class Conta(db.Model):
    """
    Criar o modelo database da conta
    """
    
    numeroConta = db.Column(db.Integer, primary_key=True)
    saldo = db.Column(db.Float)
    tipoConta = db.Column(db.String(255))
    instituicaoFinanceira = db.Column(db.String(255))

    usuario_conta = db.Column(db.Integer, db.ForeignKey(Usuario.idUsuario), nullable= False)
    usuario = db.relationship("Usuario", foreign_keys =  usuario_conta)

    def __str__(self):
        """
        Retorna os atributos da classe em forma de texto
        """
        return f"{self.numeroConta} \n {self.conta} \n {self.tipoConta} \n {self.instituicaoFinanceira} "

    
    def json(self):
        """
        Retorna os atributos da classe no formato json
        """
        return{
            "numeroConta": self.numeroConta,
            "saldo": self.saldo,
            "tipoConta": self.tipoConta,
            "instituicaoFinanceira": self.instituicaoFinanceira,
            "usuario": self.usuario.idUsuario
        }
	


class Despesa(db.Model):
    """
    Criar o modelo database da despesa
    """
    
    idDespesa = db.Column(db.Integer, primary_key=True)
    valor = db.Column(db.Float)
    dataPagamento = db.Column(db.String(255))
    dataPagamentoEsperado = db.Column(db.String(255))
    tipoDespesa = db.Column(db.String(255))

     
    conta_despesa = db.Column(db.Integer, db.ForeignKey(Conta.numeroConta), nullable= False)
    conta = db.relationship("Conta", foreign_keys =  conta_despesa)

    usuario_despesa = db.Column(db.Integer, db.ForeignKey(Usuario.idUsuario), nullable= False)
    usuario = db.relationship("Usuario", foreign_keys =  usuario_despesa)
    
    
    def __str__(self):
        """
        Retorna os atributos da classe em forma de texto
        """
        return f"idDespesa: {self.idDespesa} \n valor: {self.valor} \n data Pagamento: {self.dataPagamento} \n Data Pagamento Esperado: {self.dataPagamentoEsperado} \n tipo Despesa: {self.tipoDespesa} " 
        
    
    def json(self):
        """
        Retorna os atributos da classe no formato json
        """
        return{
            "idDespesa": self.idDespesa,
            "valor": self.valor,
            "dataPagamento": self.dataPagamento,
            "dataPagamentoEsperado": self.dataPagamentoEsperado,
            "tipoDespesa": self.tipoDespesa,
            "conta": self.conta.json(),
            "usuario": self.usuario.idUsuario
        }


class Receita(db.Model):
    """
    Criar o modelo database da receita
    """
    
    idReceita = db.Column(db.Integer, primary_key=True)
    valor = db.Column(db.Float)
    dataRecebimento = db.Column(db.String(255))
    dataRecebimentoEsperado = db.Column(db.String(255))
    tipoReceita = db.Column(db.String(255))
    descricao = db.Column(db.String(255))

    conta_receita = db.Column(db.Integer, db.ForeignKey(Conta.numeroConta), nullable= True)
    conta = db.relationship("Conta", foreign_keys =  conta_receita)

    usuario_receita = db.Column(db.Integer, db.ForeignKey(Usuario.idUsuario), nullable= False)
    usuario = db.relationship("Usuario", foreign_keys =  usuario_receita)

    def __str__(self):
        """
        Retorna os atributos da classe em forma de texto
        """
        return f"idReceita: {self.idReceita} valor: {self.valor} \n data Recebimento: {self.dataRecebimento} \n data Recebimento Esperado: {self.dataRecebimentoEsperado} \n tipoReceita: {self.tipoReceita} \n descricao: {self.descricao}"

    
    def json(self):
        """
        Retorna os atributos da classe no formato json
        """   
        return{
            "idReceita": self.idReceita,
            "valor": self.valor,
            "dataRecebimento": self.dataRecebimento,
            "dataRecebimentoEsperado": self.dataRecebimentoEsperado,
            "tipoReceita": self.tipoReceita,
            "descricao": self.descricao,
            "conta": self.conta.json(),
            "usuario": self.usuario.idUsuario
        }





