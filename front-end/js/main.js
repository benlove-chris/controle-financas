id_usuario = localStorage.getItem('usuario');
var link_backend = "http://localhost:5000";
$(document).ready(function(){
	//login required
    /*if (id_usuario == null){
		alert("Necessita fazer login");
		location.href = "../index.html";
	}*/

	//listar conta total
	$.ajax({
        url: link_backend + "/listar_total_valor/Conta/"+ id_usuario,
        type: "GET",
        dataType: "json",
        success: listar_total_conta,
        error: function(){
            // erro na comunicação com o backend
            alert("Total despesa não pôde ser listado \nVerifique o backend");
        }
    });
     function listar_total_conta(total){
     	
        contas = total.valor_total;
        contashtml = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contas);
        document.getElementById("totalConta").innerHTML = contashtml;
        //
        
        }


	//listar despesa total
	$.ajax({
        url: link_backend + "/listar_total_valor/Despesa/"+ id_usuario,
        type: "GET",
        dataType: "json",
        success: listar_total_despesa,
        error: function(){
            // erro na comunicação com o backend
            alert("Total despesa não pôde ser listado \nVerifique o backend");
        }
    });
     function listar_total_despesa(total){
     	
        despesas = total.valor_total;
        despesashtml = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesas);
        document.getElementById("totalDespesa").innerHTML = despesashtml;
        //
        
        }


       //listar receita total
       $.ajax({
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
        receitas = total.valor_total;
        receitashtml = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receitas);
        document.getElementById("totalReceita").innerHTML = receitashtml;
        //
        
        }
	


    $("#sair").click(function(){
		// Fazendo com que as informações do individuo desapareça quando clicar em logout
		
		localStorage.clear(); // Limpa os dados da sessionSotrage
		location.href = "../index.html"; // Redireciona para outra página
	});

});