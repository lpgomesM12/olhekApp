angular.module('categoriaProduto', [])
.controller('CategoriaProdutoCtrl', function ($scope,buscaCategoria,$stateParams) {
	
 buscaCategoria.busca($stateParams.father_id)
		 .then(function(dados) {
			$scope.categorias = dados;						
		    })
		   .catch(function(erro) {
				console.log(erro);
	   });
});

