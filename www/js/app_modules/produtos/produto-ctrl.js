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
			
          if ($scope.produtos.length > 0){
          	 $scope.listavazia = false;
          }else{
          	 $scope.listavazia = true;
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
.controller('ProdutoShowCtrl', ['$scope','buscaProduto','$stateParams','$ionicPopup', function ($scope,buscaProduto,$stateParams, $ionicPopup) {

	 buscaProduto.busca($stateParams.produtoId)
		 .then(function(dados) {
			$scope.produto = dados;
		    })
		   .catch(function(erro) {
				console.log(erro);
	  });

   $scope.showAlert = function(endereco) { 

      var alertPopup = $ionicPopup.alert({
         title: 'Endereço',
         template: endereco
      });

      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };



}])
.controller('ProdutoShowEmpresaCtrl', ['$scope','buscaProdutosEmpresa','$stateParams', function ($scope,buscaProdutosEmpresa,$stateParams) {
	
	 buscaProdutosEmpresa.busca($stateParams.empresaId)
		 .then(function(dados) {
			$scope.produtos = dados;
		    })
		   .catch(function(erro) {
				console.log(erro);
	  });

}])
.controller('CadastraProdutoCtrl', ['$scope','$stateParams','buscaCategoria','$ionicModal', function ($scope,$stateParams, buscaCategoria, $ionicModal) {	

  $scope.produto = {};
  $scope.produto.nomeCategoria = "Selecione uma categoria";

  $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
       $scope.buscaCategoria(9);
    });

  $scope.buscaCategoria = function(id){
     buscaCategoria.busca(id)
		 .then(function(dados) {
			$scope.categorias = dados;					
		    })
		   .catch(function(erro) {
				console.log(erro);
	   });
    }
  
  $scope.setaCategoria = function(id, nome){
   
   $scope.produto.idCategoria = id;
   $scope.produto.nomeCategoria = nome; 
   $scope.modal.hide();
  }

   $scope.createContact = function(u) {        
     $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
     $scope.modal.hide();
   };

}])
.controller('FotoProdutoCtrl', ['$scope','Upload', function ($scope,Upload) {
  $scope.upload = function(file){
    Upload.upload({
      url: 'http://localhost:3000/salvarfoto',
      method: 'GET',
      fields: { 
        'fotoproduto[produto_id]': 2
      },
      file: file,
      fileFormDataName: 'fotoproduto[image]'
    });
  };

}]);

