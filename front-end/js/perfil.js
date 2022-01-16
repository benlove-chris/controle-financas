
id_usuario = localStorage.getItem('usuario');
var link_backend = "http://localhost:5000";

$(document).ready(function(){

	$.ajax({
        url: link_backend+"/listar/Usuario",
        type: "GET",
        dataType: "json",
        success: listar_usuario,
        error: function(){
            alert("Erro ao receber os dados");
        }
    });
    function listar_usuario(usuarios){

    	for (var i in usuarios){
            if (usuarios[i].idUsuario == id_usuario) {

            	$("#novo_nome").val(usuarios[i].nome);
				$("#novo_email").val(usuarios[i].email);
				$("#novo_usuario").val(usuarios[i].usuario);

				document.getElementById("nome_usuario").innerHTML = usuarios[i].nome;

				document.getElementById("bem-vindo").innerHTML = usuarios[i].nome;

				
	

       
            }


 
        }
    }
    



    //cadastrar usario
    $("#cadastrar").click(function(){
    	

		var nome = $("#nome").val();
    	var email = $ ("#email").val();
    	var usuario = $("#usuario").val();
    	var senha = $("#senha").val();
    
		var dados = JSON.stringify({
	    	nome: nome,
			email: email,
			usuario: usuario,
			senha: senha
		});
			    
	    $.ajax({
            url : link_backend +'/cadastrar/Usuario',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: cadastrarUsuario,
	        error: erroCadastrarUsuario
	    });

	    function cadastrarUsuario(resposta){
	    	if (resposta.resultado == "ok"){
            	alert("usuario cadastrada com sucesso!");
            	document.location.reload(true);
            	
	        }else{
	            alert(resposta.resultado+ ":"+resposta.detalhes);
	        }
    	}

    	function erroCadastrarUsuario(){
        // erro na comunicação com o backend
        	alert("Erro ao enviar os dados");

    	}	        
	            
	}); 


    //editar usuario
	$("#salvar").click(function(){

		var novo_nome = $("#novo_nome").val();
    	var novo_email = $ ("#novo_email").val();
    	var novo_usuario = $("#novo_usuario").val();
    
		var dados = JSON.stringify({
	    	novo_nome: novo_nome,
			novo_email: novo_email,
			novo_usuario: novo_usuario
		});
			    
	    $.ajax({
            url : link_backend +'/editar_usuario/'+ id_usuario,
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: editarUsuario,
	        error: erroEditarUsuario
	    });

	    function editarUsuario(resposta){
	    	if (resposta.resultado == "ok"){
            	alert("usuario editada com sucesso!");
            	
	        }else{
	            alert(resposta.resultado+ ":"+resposta.detalhes);
	        }
    	}

    	function erroEditarUsuario(){
        // erro na comunicação com o backend
        	alert("Erro ao enviar os dados");

    	}	        
	            
	}); 

	//excluir esuario
	$("#excluir_usuario").click(function(){
		alert("sas");
		$.ajax({    
	        url: link_backend +'/apagar_usuario/'+id_usuario,
	        type: 'DELETE',
	        dataType: 'json', 
	        contentType: 'application/json',
	        data: JSON.stringify({ idUsuario: id_usuario}), 
	        success: function(resposta){
	            if (resposta.resultado == "ok") {
	                alert("Usuario apagada com sucesso!");
	                location.href = "../index.html";
	 
	                
	            
	            
	        }
	            else {
	                alert(resposta.resultado + " : " + resposta.detalhes);
	            }
	        },
	        error: function (){
	            alert("Deu ruim na comunicação com o backend");
	        }
	    });
	});
});




 




