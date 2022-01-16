var link_backend = "http://localhost:5000";
//var id_usuario =1;


$(document).ready(function(){
    
    // listar despesas ao carregar o documento
    $.ajax({
        url: link_backend + "/listar/Despesa",
        type: "GET",
        dataType: "json",
        success: listar_despesas,
        error: function(){
            // erro na comunicação com o backend
            alert("As despesas não puderam ser listadas \nVerifique o backend");
        }
    });
    function listar_despesas(despesas){
        

        for (var i in despesas){
            
            if (despesas[i].usuario == id_usuario) {
                
                linha = "<tr id= 'tr_Despesa" +  despesas[i].idDespesa+"' >" + 
                        "<td>" + despesas[i].conta.numeroConta+ "</td>" + 
                        "<td>" + despesas[i].valor+ "</td>" + 
                        "<td>" + despesas[i].dataPagamento+ "</td>" + 
                        "<td>" + despesas[i].dataPagamentoEsperado+ "</td>" + 
                        "<td>" + despesas[i].tipoDespesa+ "</td>" + 
                        //editar e delete
                        "<td>"+                             
                            '<ul class="list-inline m-0">'+
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-pencil-fill" data-toggle="modal" data-target="#modalEditarDespesa" type="button" data-toggle="tooltip" data-placement="top" title="Editar"  onclick="chamarModalEditarDespesa('+despesas[i].idDespesa+ '); "></i>'+
                                '</li> '+
                                
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#modalDespesaDelete" type="button" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="chamarModalDespesaDelete('+despesas[i].idDespesa+ '); "></i>'+
                                '</li>'+
                                
                            '</ul>'+
                        "</td>"+
                        
                    "</tr>"
                $("#corpoDespesa").append(linha)

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
     
     
     //listar total de despesa
     /*$.ajax({
        url: link_backend + "/listar_total_valor/Despesa/"+ id_usuario,
        type: "GET",
        dataType: "json",
        success: listar_total_despesa,
        error: function(){
            // erro na comunicação com o backend
            alert("Total despesa não pôde ser listado \nVerifique o backend");
        }
    });*/
     function listar_total_despesa(total){
        a = total.valor_total;
        b = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(a);
        document.getElementById("totalDespesa").innerHTML = b;
        
        }
    /*function listar_total_despesa(total){
        
        linha = "<tr id= 'tr_total' >" + 
                    "<td>" + total.valor_total+ "</td>" + 
                "</tr>"
        $("#totalDespesa").append(linha);


    }*/


    
});

function filtrarPeriodoDespesa(){

    var data_inicio = $("#data_inicio").val();
    var data_fim = $("#data_fim").val();

    var dados = JSON.stringify({data_inicio: data_inicio, data_fim: data_fim});
    

    $.ajax({
        url: link_backend + "/listar_periodo/Despesa",
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        data: dados,
        success: listar_despesa_periodo,
        error: function(){
            // erro na comunicação com o backend
            alert("O periodo não pôde ser filtrado \nVerifique o backend");
        }
    });
    function listar_despesa_periodo(despesas){
        linhas = "";

        for (var i in despesas){
            if (despesas[i].usuario == id_usuario) {
                lin = "<tr id= 'tr_Despesa" +  despesas[i].idDespesa+"' >" + 
                        "<td>" + despesas[i].conta.numeroConta+ "</td>" + 
                        "<td>" + despesas[i].valor+ "</td>" + 
                        "<td>" + despesas[i].dataPagamento+ "</td>" + 
                        "<td>" + despesas[i].dataPagamentoEsperado+ "</td>" + 
                        "<td>" + despesas[i].tipoDespesa+ "</td>" + 
                        // editar e deletar
                       "<td>"+                             
                            '<ul class="list-inline m-0">'+
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-pencil-fill" data-toggle="modal" data-target="#modalEditarDespesa" type="button" data-toggle="tooltip" data-placement="top" title="Editar"  onclick="chamarModalEditarDespesa('+despesas[i].idDespesa+ '); "></i>'+
                                '</li> '+
                                
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#modalDespesaDelete" type="button" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="chamarModalDespesaDelete('+despesas[i].idDespesa+ '); "></i>'+
                                '</li>'+
                                
                            '</ul>'+
                        "</td>"+
                        
                    "</tr>"
                linhas = linhas + lin
        
        }

        $("#corpoDespesa").html(linhas)
    }
    }
}


function filtrarTipoDespesa(){

    var tipo_despesa = $("#filtra_tipo").val();
    

    var dados = JSON.stringify({tipo: tipo_despesa});

    

    $.ajax({
        url: link_backend + "/listar_tipo/Despesa",
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        data: dados,
        success: listar_despesas_tipo,
        error: function(){
            // erro na comunicação com o backend
            alert("As despesas não puderam ser filtradas \nVerifique o backend");
        }
    });
    function listar_despesas_tipo(despesas){
        linhas = "";

        for (var i in despesas){
            if (despesas[i].usuario == id_usuario) {
                lin = "<tr id= 'tr_Despesa" +  despesas[i].idDespesa+"' >" + 
                        "<td>" + despesas[i].conta.numeroConta+ "</td>" + 
                        "<td>" + despesas[i].valor+ "</td>" + 
                        "<td>" + despesas[i].dataPagamento+ "</td>" + 
                        "<td>" + despesas[i].dataPagamentoEsperado+ "</td>" + 
                        "<td>" + despesas[i].tipoDespesa+ "</td>" + 
                        // editar e deletar
                       "<td>"+                             
                            '<ul class="list-inline m-0">'+
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-pencil-fill" data-toggle="modal" data-target="#modalEditarDespesa" type="button" data-toggle="tooltip" data-placement="top" title="Editar"  onclick="chamarModalEditarDespesa('+despesas[i].idDespesa+ '); "></i>'+
                                '</li> '+
                                
                                '<li class="list-inline-item ">'+
                                  '<i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#modalDespesaDelete" type="button" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="chamarModalDespesaDelete('+despesas[i].idDespesa+ '); "></i>'+
                                '</li>'+
                                
                            '</ul>'+
                        "</td>"+
                        
                    "</tr>"
                linhas = linhas + lin
        
        }

        $("#corpoDespesa").html(linhas)
    }
    }
}


// listar/filtrar - end

// cadastar despesa
function cadastrarDespesa(){
    
    var valor = $("#valorDespesa").val(); 
    var dataPagamento = $("#dataPagamento").val();
    var dataPagamentoEsperado = $("#dataPagamentoEsperado").val();
    if ($('input[name="tipoDespesa"]:checked').val() == "outras"){
        var tipoDespesa = $("#outrasDespesas").val();

    }else{
        var tipoDespesa = $('input[name="tipoDespesa"]:checked').val();

    }
    
    var numeroConta = $("#selectConta").val();

    var dados = JSON.stringify({
        valor: valor,
        dataPagamento: dataPagamento,
        dataPagamentoEsperado:  dataPagamentoEsperado,
        tipoDespesa: tipoDespesa,
        conta_despesa: numeroConta,
        usuario_receita: id_usuario
    })


    
    $.ajax({
            url : link_backend + '/cadastrar/Despesa',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: despesaCadastrado,
            error: errodespesaCadastrado
    });

    function despesaCadastrado(resposta){
        if (resposta.resultado == "ok") {
            //mensagem
            alert('Despesa cadastrada com sucesso! ');
            document.location.reload(true);

        } else{
            alert(resposta.detalhes);

        }
    }
 
    function errodespesaCadastrado(){
        // erro na comunicação com o backend
        alert("Erro backend");
    }

}



// cadastar despesa - end


//editar despesa
function chamarModalEditarDespesa(idDespesa){
    
    $("#btnEditarDespesa").attr('onClick', ("editarDespesa('"+idDespesa+"')"));
    
    $.ajax({
        url: link_backend + "/listar_despesa_esp/"+idDespesa,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            // pegar os dados para editar
            // não permite editar a conta da despesa
            $("#valorDespesaEditar").val(resposta.valor);
            $("#dataPagamentoEditar").val(resposta.dataPagamento);
            $("#dataPagamentoEsperadoEditar").val(resposta.dataPagamentoEsperado);
            $("#tipoDespesaEditar").val(resposta.tipoDespesa); 
            
        },
        error: function(){
            // erro na comunicação com o backend
            alert("Erro ao receber os dados :) \nverifique o backend! \n chamarModalEditarDespesa");
        }
    })
    
}



function editarDespesa(idDespesa) {

    
    //editar
    
    var novo_valor = $("#valorDespesaEditar").val();
    var nova_data_pagamento = $("#dataPagamentoEditar").val();
    var nova_data_pagamento_esperado = $("#dataPagamentoEsperadoEditar").val();
    var novo_tipo_despesa = $("#tipoDespesaEditar").val();

    var dados = JSON.stringify({novo_valor: novo_valor,
    nova_data_pagamento: nova_data_pagamento,
    nova_data_pagamento_esperado: nova_data_pagamento_esperado,
    novo_tipo_despesa: novo_tipo_despesa});
        
    
   

    $.ajax({
        url: link_backend + '/editar_despesa/'+idDespesa,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: despesaEditada,
        error: erroDespesaEditada
    });

    function despesaEditada(resposta){
        
        if (resposta.resultado == "ok"){
            alert("Despesa editada com sucesso!");
            document.location.reload(true);

        }else{
            alert(resposta.resultado+ ":"+resposta.detalhes);
        }
    };


    function erroDespesaEditada(resposta){
        // erro na comunicação com o backend
        alert("Erro ao receber os dados :) \nverifique o backend! \n erroDespesaEditada");


    };

}
//editar despesa -end

//apagar despesa 

function chamarModalDespesaDelete(idDespesa){
    $("#modalDespesaDeleteBtn").attr('onClick', ("apagarDespesa('"+idDespesa+"')"));
}

function apagarDespesa(idDespesa){
    $.ajax({    
        url: link_backend + '/apagar_despesa/'+idDespesa,
        type: 'DELETE',
        dataType: 'json', 
        contentType: 'application/json',
        data: JSON.stringify({ idDespesa: idDespesa}), 
        success: function(resposta){
            if (resposta.resultado == "ok") {
                $("#tr_Despesa" + idDespesa).fadeOut(600, function(){ 
                alert("Despesa apagada com sucesso!");
                document.location.reload(true);
            });
            
        }
            else {
                alert(resposta.resultado + " : " + resposta.detalhes);
            }
        },
        error: function (){
            // erro na comunicação com o backend
            alert("erro backend");
        }
    });
}
//apagar despesa - end

