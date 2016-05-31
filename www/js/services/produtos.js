angular.module('produto')
	.factory('buscaProdutos',function($http,$q){
  
       var items = [];
       var service = {};
        service.busca = function(categoria,page){
         return $q(function(resolve, reject) {
		    $http.get('http://107.170.54.89/buscaprodutos?categoria='+categoria+'&page='+page)
			  .success(function(produtos){
			  	items = produtos;
			  	resolve(items);
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
        });
     };

      return service;
      
   })
	.factory('buscaProduto',function($http,$q,$ionicSlideBoxDelegate){
  
       var service = {};
        service.busca = function(id){
		
         return $q(function(resolve, reject) {
		    $http.get('http://107.170.54.89/buscaproduto?produto_id='+id)
			  .success(function(produto){
			  	resolve(produto);
			  	$ionicSlideBoxDelegate.update();
                $ionicSlideBoxDelegate.$getByHandle('images-produto').update();
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
        });
     };

      return service;
      
   })
	.factory('buscaProdutosEmpresa',function($http,$q,$ionicSlideBoxDelegate){
  
       var service = {};
        service.busca = function(id){
		
         return $q(function(resolve, reject) {
		    $http.get('http://107.170.54.89/buscaprodutosempresa?empresa_id='+id)
			  .success(function(produtos){
			  	resolve(produtos);
			  	$ionicSlideBoxDelegate.update();
                $ionicSlideBoxDelegate.$getByHandle('images-produto-empresa').update();
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
        });
     };

      return service;
      
   })
  .factory('servicoFotosProduto',function($http,$q){
  
       var service = {};
        service.busca = function(id){		
         return $q(function(resolve, reject) {
		         $http.get('http://107.170.54.89/buscaFotoProduto?produto_id='+id)
		    //   $http.get('http://localhost:3000/buscaFotoProduto?produto_id='+id)
			  .success(function(fotoproduto){
			  	resolve(fotoproduto);
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
          });
       };

        service.delete = function(id){		
         return $q(function(resolve, reject) {
		     $http.get('http://107.170.54.89/deletaFotoProduto?id='+id)
		    //   $http.get('http://localhost:3000/deletaFotoProduto?id='+id)
			  .success(function(fotoproduto){
			  	resolve(fotoproduto);
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
          });
       };


   return service;
      
   });






