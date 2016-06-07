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
.controller('ProdutoShowEmpresaCtrl', ['$scope','buscaProdutosEmpresa','$stateParams','$ionicPopup','$rootScope', function ($scope,buscaProdutosEmpresa,$stateParams,$ionicPopup,$rootScope) {
	
  $scope.buscaProdutos = function() {
   buscaProdutosEmpresa.busca($stateParams.empresaId)
		 .then(function(dados) {
			$scope.produtos = dados;
		    })
		   .catch(function(erro) {
				console.log(erro);
	  });
};

  $scope.showAlert = function() { 
      var alertPopup = $ionicPopup.alert({
         title: 'Aviso',
         template: 'Em desenvolvimento'
      });

      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };

$scope.buscaProdutos();

}])
.controller('PesquisaEmpresaCtrl', ['$scope','buscaEmpresas','$stateParams','$ionicPopup','$rootScope', function ($scope,buscaEmpresas,$stateParams,$ionicPopup,$rootScope) {
  
  $scope.buscaEmpresaPorPagina = function(nomepagina) {
   buscaEmpresas.busca(nomepagina)
     .then(function(dados) {
      $scope.empresas = dados;
        })
       .catch(function(erro) {
        console.log(erro);
    });
};

}])
.controller('CadastraProdutoCtrl', ['$scope','$stateParams','buscaCategoria','$ionicModal','$rootScope','servicoProduto','$location', function ($scope,$stateParams, buscaCategoria, $ionicModal, $rootScope,servicoProduto,$location) {	

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
   
   $scope.produto.categoriaproduto_id = id;
   $scope.produto.nomeCategoria = nome; 
   $scope.modal.hide();
  }

  $scope.createContact = function(u) {        
     $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
     $scope.modal.hide();
   };

   $scope.cadastrarProduto = function(){   
        $scope.produto.empresa_id = $rootScope.userIdEmpresa
        $scope.produto.userId = $rootScope.userId;
        servicoProduto.cadastrar($scope.produto)
         .then(function(dados){
            if(dados){
            $location.path('/app/fotoproduto/'+dados.id);
            }else{
             $location.path('/app/produtos/9');
            }
         })
         .catch(function(erro) {
        console.log(erro);
     });
   }
}])
.controller('FotoProdutoCtrl', ['$scope','Upload','servicoFotosProduto','$ionicPopup','$ionicLoading','$stateParams', function ($scope,Upload,servicoFotosProduto,$ionicPopup,$ionicLoading,$stateParams) {
 

  var produtoid = $stateParams.produtoId;

  $scope.showConfirm = function(id) {  
    $scope.idFoto = id;
     var confirmPopup = $ionicPopup.confirm({
       title: 'Deletar',
       template: 'Deseja realmente excluir esta foto?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.delete($scope.idFoto);
         $scope.idFoto = 0;
       } else {
         $scope.idFoto = 0;
       }
     });
   };

$scope.BuscaFotoProduto = function (){
    servicoFotosProduto.busca($stateParams.produtoId)
       .then(function(dados) {
        $scope.fotosproduto = dados;
          })
         .catch(function(erro) {
          console.log(erro);
    });      
}
 
 $scope.onChange = function (file){
    if(file == undefined) return;
    $scope.fileExt = file.name.split(".").pop();

    if($scope.fileExt.match(/^(jpg|jpeg|gif|png)$/))
    {
        $scope.upload(file) 
    }
 }

 $scope.upload = function(file){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

      Upload.upload({
        // url: 'http://localhost:3000/fotoprodutos',
        url: 'http://107.170.54.89/fotoprodutos',
        method: 'POST',
        fields: { 
         'fotoproduto[produto_id]': produtoid
        },
        file: file,
        fileFormDataName: 'fotoproduto[image]'
      }).then(function (resp) {
        console.log('Success uploaded. Response');
        $ionicLoading.hide();
        $scope.BuscaFotoProduto();
        }, function (evt) {
         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
         console.log('progress: ' + progressPercentage + '% ' + "foto");
        });
    };

  $scope.delete = function(id){
      servicoFotosProduto.delete(id)
         .then(function(dados) {
            $scope.BuscaFotoProduto();
           console.log("Foto excluida com sucesso.")
            })
           .catch(function(erro) {
            console.log(erro);
      });     
    };

  $scope.BuscaFotoProduto();

}]);

