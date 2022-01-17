link_backend = "http://localhost:5000"
//var id_usuario = document.location.search.replace(/^.*?\=/,'');
///var id_usuario = localStorage.getItem('usuario');
$(document).ready(function(){
    
    // listar contas ao carregar o docemento
    
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
                lin =   "<tr id= 'tr_Conta" +  contas[i].numeroConta+"' >" + 
                    "<td>"+ contas[i].numeroConta + "</td>"+      
                    "<td>"+ contas[i].instituicaoFinanceira + "</td>"+      
                    "<td>"+ contas[i].tipoConta + "</td>"+                  
                    "<td>"+                             
                        '<ul class="list-inline m-0">'+
                            '<li class="list-inline-item ">'+
                              '<i class="bi bi-pencil-fill" data-toggle="modal" data-target="#modalEditarConta" type="button" data-toggle="tooltip" data-placement="top" title="Editar"  onclick="chamarModalEditarConta('+contas[i].numeroConta+ '); "></i>'+
                            '</li> '+
                            
                    


                            '<li class="list-inline-item ">'+
                              '<i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#modalContaDelete" type="button" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="chamarModalContaDelete('+contas[i].numeroConta+ '); "></i>'+
                            '</li>'+
                            
                        '</ul>'+
                    "</td>"+
                    "<td>"+ 
                        '<a href="../html/carteira.html?numeroConta='+ contas[i].numeroConta+'"> <i class="bi bi-eye-fill"></i></a>'+
                    "</td>"+
                    
            
                "</tr>"
            option = "<option value= '" + contas[i].numeroConta+"'>"+ contas[i].numeroConta + "</option>";
            $("#selectConta").append(option);


            
           $("#corpoConta").append(lin); 
            }

            
        }
            
        }



    });


function cadastrarConta(){

    numeroConta = $("#numeroConta").val();
    saldo = $("#saldoConta").val(); 
    tipoConta = $("#tipoConta").val();
    instituicaoFinanceira = $("#instituicaoFinanceira").val();
    

    dados = JSON.stringify({
        numeroConta: numeroConta,
        saldo:saldo,
        tipoConta: tipoConta,
        instituicaoFinanceira: instituicaoFinanceira,
        usuario_conta: id_usuario})



    $.ajax({
            url : link_backend +'/cadastrar/Conta',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: contaCadastrado,
            error: erroContaCadastrado
    });

    function contaCadastrado(resposta){
        if (resposta.resultado == "ok") {
            //alert
            alert('Conta cadastrada com sucesso!');
            document.location.reload(true);

        } else{
            alert(resposta.detalhes);

        }
    }
 
    function erroContaCadastrado(){
        alert("Erro na comunicação com o backend");
    }

}




//editar receita
function chamarModalEditarConta(numeroConta){
    $("#btnEditarConta").attr('onClick', ("editarConta('"+numeroConta+"')"));
    
    $.ajax({
        url: link_backend+"/listar_conta_esp/"+numeroConta,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            // pegar os dados para editar
            // não permite editar a conta da receita
            $("#numeroContaEditar").val(resposta.numeroConta);
            $("#saldoContaEditar").val(resposta.saldo); 
            $("#tipoContaEditar").val(resposta.tipoConta);
            $("#instituicaoFinanceiraEditar").val(resposta.instituicaoFinanceira);
            
        
            
        },
        error: function(){
            alert("Erro ao receber os dados :) \nverifique o backend!");
        }
    });
    
}



function editarConta(numeroConta) {
    
    //editar
    
    var novo_numero = $("#numeroContaEditar").val();
    var novo_saldo = $("#saldoContaEditar").val();
    var novo_tipo_conta = $("#tipoContaEditar").val();
    var nova_instituicao = $("#instituicaoFinanceiraEditar").val();
    
    
    var dados = JSON.stringify({
        novo_numero: novo_numero,
        novo_saldo: novo_saldo,
        novo_tipo_conta: novo_tipo_conta,
        nova_instituicao: nova_instituicao});
        
    
   

    $.ajax({
        url: link_backend + '/editar_conta/' + numeroConta,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: contaEditada,
        error: erroContaEditada
    });

    function contaEditada(resposta){
        
        if (resposta.resultado == "ok"){
            alert("Conta editada com sucesso!");
            document.location.reload(true);

        }else{
            alert(resposta.resultado+ ":"+resposta.detalhes);
        }
    };


    function erroContaEditada(resposta){
        //mensagem de erro 
        alert("Erro ao receber os dados :) \nverifique o backend! ");


    };

}
//editar conta -end

//apagar conta 

function chamarModalContaDelete(numeroConta){
    $("#modalContaDeleteBtn").attr('onClick', ("apagarConta('"+numeroConta+"')"));
    


}

function apagarConta(numeroConta){
    
    $.ajax({    
        url: link_backend +'/apagar_conta/'+numeroConta,
        type: 'DELETE',
        dataType: 'json', 
        contentType: 'application/json',
        data: JSON.stringify({ numeroConta: numeroConta}), 
        success: function(resposta){
            if (resposta.resultado == "ok") {
                $("#tr_Conta" + numeroConta).fadeOut(600, function(){ 
                alert("Conta deletada com sucesso!");
                document.location.reload(true);
            });
            
        }
            else {
                alert(resposta.resultado + " : " + resposta.detalhes);
            }
        },
        error: function (){
            alert("Deu ruim na comunicação com o backend");
        }
    });
}
//apagar conta - end

