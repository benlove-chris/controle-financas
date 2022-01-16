link_backend = "http://localhost:5000"

$(document).ready(function(){

    // listar receitas ao carregar o docemento
    
    $.ajax({
        url: link_backend+"/listar/Receita",
        type: "GET",
        dataType: "json",
        success: listar_receitas,
        error: function(){
            alert("As receitas não puderam ser listadas \nVerifique o backend");
        }
    });
    function listar_receitas(receitas){

        for (var i in receitas){
            if (receitas[i].usuario == id_usuario) {
                linha = "<tr id= 'tr_Receita" +  receitas[i].idReceita+"' >" + 
                        "<td>" + receitas[i].conta.numeroConta+ "</td>" + 
                        "<td>" + receitas[i].valor+ "</td>" + 
                        "<td>" + receitas[i].dataRecebimento+ "</td>" +
                        "<td>" + receitas[i].dataRecebimentoEsperado+ "</td>" +  
                        "<td>" + receitas[i].tipoReceita+ "</td>" + 
                        "<td>" + receitas[i].descricao+ "</td>" +

                        // btn btn-primary btn-sm rounded-0 - edit/Editar class
                        // btn btn-danger btn-sm rounded-0 - delet/Deletar class
                        
                        "<td>"+                             
                            '<ul class="list-inline m-0">'+
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-pencil-fill" data-toggle="modal" data-target="#modalEditarReceita" type="button" data-toggle="tooltip" data-placement="top" title="Editar"  onclick="chamarModalEditarReceita('+receitas[i].idReceita+ '); "></i>'+
                                '</li> '+
                  

                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#modalReceitaDelete" type="button" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="chamarModalReceitaDelete('+receitas[i].idReceita+ '); "></i>'+
                                '</li>'+
                                
                            '</ul>'+
                        "</td>"+
                        
                    "</tr>"
            $("#corpoReceita").append(linha)
        }

 
        }
    }
    // aparecer para digitar outros
    
    $('#outras').click(function(){
        $('#aparecerDigitar').removeClass('d-none');
    });
     $('.n_outros').click(function(){
        $('#aparecerDigitar').addClass('d-none');
    });
     
     
     //listar total de receita
     /*$.ajax({
        url: link_backend+"/listar_total_valor/Receita/"+ id_usuario,
        type: "GET",
        dataType: "json",
        success: listar_total_receita,
        error: function(){
            // erro na comunicação com o backend
            alert("Total receita não pôde ser listado \nVerifique o backend");
        }
    });
     function listar_total_receita(total){
        a = total.valor_total;
        b = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(a);
        document.getElementById("totalReceita").innerHTML = b;
        
        }*/
    /*function listar_total_receita(total){
        
        linha = "<tr id= 'tr_total' >" + 
                    "<td>" + total.valor_total+ "</td>" + 
                "</tr>"
        $("#totalReceita").append(linha);


    }*/
    
});

function filtrarPeriodoReceita(){

    var data_inicio = $("#data_inicio").val();
    var data_fim = $("#data_fim").val();

    var dados = JSON.stringify({data_inicio: data_inicio, data_fim: data_fim});
    

    $.ajax({
        url: link_backend+"/listar_periodo/Receita",
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        data: dados,
        success: listar_receita_periodo,
        error: function(){
            // erro na comunicação com o backend
            alert("O periodo não pôde ser filtrado \nVerifique o backend");
        }
    });
    function listar_receita_periodo(receitas){
        linhas = "";

        for (var i in receitas){
            if (receitas[i].usuario == id_usuario) {
                lin = "<tr id= 'tr_Receita" +  receitas[i].idReceita+"' >" + 
                        "<td>" + receitas[i].conta.numeroConta+ "</td>" + 
                        "<td>" + receitas[i].valor+ "</td>" + 
                        "<td>" + receitas[i].dataRecebimento+ "</td>" + 
                        "<td>" + receitas[i].dataRecebimentoEsperado+ "</td>" + 
                        "<td>" + receitas[i].tipoReceita+ "</td>" + 
                        // editar e deletar
                        "<td>"+                             
                            '<ul class="list-inline m-0">'+
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-pencil-fill" data-toggle="modal" data-target="#modalEditarReceita" type="button" data-toggle="tooltip" data-placement="top" title="Editar"  onclick="chamarModalEditarReceita('+receitas[i].idReceita+ '); "></i>'+
                                '</li> '+
                  

                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#modalReceitaDelete" type="button" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="chamarModalReceitaDelete('+receitas[i].idReceita+ '); "></i>'+
                                '</li>'+
                                
                            '</ul>'+
                        "</td>"+
                        
                    "</tr>"
                linhas = linhas + lin
            
        }

        $("#corpoReceita").html(linhas)
    }
}
}


function filtrarTipoReceita(){

    var tipo_receita = $("#filtra_tipo").val();
    

    var dados = JSON.stringify({tipo: tipo_receita});

    

    $.ajax({
        url: link_backend+"/listar_tipo/Receita",
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        data: dados,
        success: listar_receitas_tipo,
        error: function(){
            // erro na comunicação com o backend
            alert("As receitas não puderam ser filtradas \nVerifique o backend");
        }
    });
    function listar_receitas_tipo(receitas){
        linhas = "";
        for (var i in receitas){
            if (receitas[i].usuario == id_usuario) {
                lin = "<tr id= 'tr_Receita" +  receitas[i].idReceita+"' >" + 
                        "<td>" + receitas[i].conta.numeroConta+ "</td>" + 
                        "<td>" + receitas[i].valor+ "</td>" + 
                        "<td>" + receitas[i].dataRecebimento+ "</td>" + 
                        "<td>" + receitas[i].dataRecebimentoEsperado+ "</td>" + 
                        "<td>" + receitas[i].tipoReceita+ "</td>" + 
                        // editar e deletar
                        "<td>"+                             
                            '<ul class="list-inline m-0">'+
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-pencil-fill" data-toggle="modal" data-target="#modalEditarReceita" type="button" data-toggle="tooltip" data-placement="top" title="Editar"  onclick="chamarModalEditarReceita('+receitas[i].idReceita+ '); "></i>'+
                                '</li> '+
                  

                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#modalReceitaDelete" type="button" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="chamarModalReceitaDelete('+receitas[i].idReceita+ '); "></i>'+
                                '</li>'+
                                
                            '</ul>'+
                        "</td>"+
                        
                    "</tr>"
                linhas = linhas +lin
            
            }

            $("#corpoReceita").html(linhas)
        }
    }

}


// listar/filtrar - end


// cadastar receita
function cadastrarReceita(){
    
    var valor = $("#valorReceita").val(); 
    var dataRecebimento = $("#dataRecebimento").val();
    var dataRecebimentoEsperado = $("#dataRecebimentoEsperado").val();
    var descricao = $("#descricao").val();
    if ($('input[name="tipoReceita"]:checked').val() == "outras"){
        tipoReceita = $("#outrasReceitas").val();

    }else{
        tipoReceita = $('input[name="tipoReceita"]:checked').val();

    };
    
    var numeroConta = $("#selectConta").val();

    var dados = JSON.stringify({
        valor: valor,
        dataRecebimento: dataRecebimento,
        dataRecebimentoEsperado:  dataRecebimentoEsperado,
        tipoReceita: tipoReceita,
        descricao: descricao,
        conta_receita: numeroConta,
        usuario_receita: id_usuario})



    $.ajax({
            url : link_backend +'/cadastrar/Receita',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: receitaCadastrado,
            error: erroReceitaCadastrado
    });

    function receitaCadastrado(resposta){
        if (resposta.resultado == "ok") {
            //mensagem
            alert('Receita cadastrado com sucesso! ');
            document.location.reload(true);

        } else{
            alert(resposta.detalhes);

        }
    }
 
    function erroReceitaCadastrado(){
        alert("Erro backend");
    }

}



// cadastar receita - end


//editar receita
function chamarModalEditarReceita(idReceita){
    $("#btnEditarReceita").attr('onClick', ("editarReceita('"+idReceita+"')"));
    
    $.ajax({
        url: link_backend+"/listar_receita_esp/"+idReceita,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            // pegar os dados para editar
            // não permite editar a conta da receita
            
            $("#valorReceitaEditar").val(resposta.valor);
            $("#dataRecebimentoEditar").val(resposta.dataRecebimento);
            $("#dataRecebimentoEsperadoEditar").val(resposta.dataRecebimentoEsperado);
            $("#tipoReceitaEditar").val(resposta.tipoReceita);
            $("#descricaoEditar").val(resposta.descricao); 
            
        },
        error: function(){
            alert("Erro ao receber os dados :) \nverifique o backend! \n chamarModalEditarReceita");
        }
    });
    
}



function editarReceita(idReceita) {
    
    //editar
    
    var novo_valor = $("#valorReceitaEditar").val();
    var nova_data_recebimento = $("#dataRecebimentoEditar").val();
    var nova_data_recebimento_esperado = $("#dataRecebimentoEsperadoEditar").val();
    var novo_tipo_receita = $("#tipoReceitaEditar").val();
    var nova_descricao = $("#descricaoEditar").val();

    var dados = JSON.stringify({novo_valor: novo_valor,
    nova_data_recebimento: nova_data_recebimento,
    nova_data_recebimento_esperado: nova_data_recebimento_esperado,
    novo_tipo_receita: novo_tipo_receita,
    nova_descricao: nova_descricao});
        
    
   

    $.ajax({
        url: link_backend +'/editar_receita/'+idReceita,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: receitaEditada,
        error: erroReceitaEditada
    });

    function receitaEditada(resposta){
        
        if (resposta.resultado == "ok"){
            alert("Receita editada com sucesso!");
            document.location.reload(true);

        }else{
            alert(resposta.resultado+ ":"+resposta.detalhes);
        }
    };


    function erroReceitaEditada(resposta){
        //mensagem de erro 
        alert("Erro ao receber os dados :) \nverifique o backend! \n erroReceitaEditada");


    };

}
//editar receita -end

//apagar receita 

function chamarModalReceitaDelete(idReceita){
    $("#modalReceitaDeleteBtn").attr('onClick', ("apagarReceita('"+idReceita+"')"));
    


}

function apagarReceita(idReceita){
    
    $.ajax({    
        url: link_backend +'/apagar_receita/'+idReceita,
        type: 'DELETE',
        dataType: 'json', 
        contentType: 'application/json',
        data: JSON.stringify({ idReceita: idReceita}), 
        success: function(resposta){
            if (resposta.resultado == "ok") {
                $("#tr_Receita" + idReceita).fadeOut(600, function(){ 
                alert("Receita apagada com sucesso!");
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
//apagar receita - end