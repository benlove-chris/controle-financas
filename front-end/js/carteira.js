link_backend = "http://localhost:5000"
var numeroConta = document.location.search.replace(/^.*?\=/,'');

$(document).ready(function(){
    document.getElementById("numero_conta").innerHTML = numeroConta;
    
    
    $.ajax({
        url: link_backend+'/saldo_conta/'+numeroConta,
        method: 'GET',
        dataType: 'json',
        success: listar_saldo,
        error: function(){
            alert("Erro \nverifique o backend");}
    });

    //listar saldo 
    function listar_saldo(saldo){
        a = saldo.saldo;
        b = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(a);
        document.getElementById("saldoTotal").innerHTML = b;
        
        }

    // para selecionar
    $.ajax({
        url: link_backend+'/listar/Conta',
        method: 'GET',
        dataType: 'json',
        success: listar_contas,
        error: function(){
            alert("As contas não puderam ser listadas:) \nverifique o backend");}
    });
    function listar_contas(contas){
        for (var i in contas) {  
            if (contas[i].usuario == id_usuario) {
                if (numeroConta != contas[i].numeroConta) {
                    option = "<option value= '" + contas[i].numeroConta+"'>"+ contas[i].numeroConta + "</option>";
                    $("#selectConta").append(option);

                }          
            }


        }
            
        }

    });

    

function realizarTransferencia(){

    valor_transfer = $("#valor_transfer").val();     
    numero_destino = $("#selectConta").val();


    dados = JSON.stringify({
        valor_transfer: valor_transfer,
        numero_origem: numeroConta, // numero da conta de origem - localizado na página
        numero_destino: numero_destino}) //numero da conta de destino - inserido pelo usuário
    

    $.ajax({
            url : link_backend +'/transferir',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados, 
            success: transferenciaRealizado,
            error: erroTransferenciaRealizado
    });

    function transferenciaRealizado(resposta){
        if (resposta.resultado == "ok") {
            //mensagem de sucesso
            alert('Transferência realizado com sucesso');
            document.location.reload(true);

        } else{
            alert(resposta.detalhes);

        }
    }
 
    function erroTransferenciaRealizado(){
        alert("Operação não realizado! verifique a comunicação com o backend");
    }

}



