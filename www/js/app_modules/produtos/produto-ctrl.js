angular.module('produto', [])
.controller('ProdutoCtrl', ['$scope','buscaProdutos','$stateParams', function ($scope,buscaProdutos,$stateParams) {
	
  $scope.produtos = [];	

 $scope.populateList = function() {

     if (!$scope.page){
          $scope.page = 1;
    }
	buscaProdutos.busca($stateParams.categoriaId,$scope.page)
		 .then(function(dados) {					
			$scope.produtos = $scope.produtos.concat(dados);
			
			for (var i in dados) {
              var item = dados[i];
               $scope.qtd_produtos = item.qtd_produtos;
            };

            if (!dados.length > 0){
		 	    $scope.qtd_produtos = 0;
		    }

			$scope.$broadcast('scroll.infiniteScrollComplete');
			//console.log($scope.page);
		 if (dados.length > 0){
		 	 $scope.page++;
		    }				 	
			 			
		    })
		   .catch(function(erro) {
				console.log(erro);
	  });

  }

  $scope.canWeLoadMoreContent = function() {
    return ($scope.produtos.length == $scope.qtd_produtos) ? false : true;
    return true;
  } 

}])
.controller('ProdutoShowCtrl', ['$scope','buscaProduto','$stateParams', function ($scope,buscaProduto,$stateParams) {
	
	 buscaProduto.busca($stateParams.produtoId)
		 .then(function(dados) {
			$scope.produto = dados;
		    })
		   .catch(function(erro) {
				console.log(erro);
	  });

}])
.controller('ProdutoShowEmpresaCtrl', ['$scope','buscaProdutosEmpresa','$stateParams', function ($scope,buscaProdutosEmpresa,$stateParams) {
	
	 buscaProdutosEmpresa.busca($stateParams.empresaId)
		 .then(function(dados) {
			$scope.produtos = dados;
		    })
		   .catch(function(erro) {
				console.log(erro);
	  });

}]);