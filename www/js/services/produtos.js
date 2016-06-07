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
		    // $http.get('http://localhost:3000/buscaprodutosempresa?empresa_id='+id)
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
  .factory('buscaEmpresas',function($http,$q){	      
	       var service = {};
	        service.busca = function(nomepagina){
	         return $q(function(resolve, reject) {
			    $http.get('http://107.170.54.89/buscaempresas?nomepagina='+nomepagina)
			     // $http.get('http://localhost:3000/buscaempresas?nomepagina='+nomepagina)
				  .success(function(categorias){
				  	resolve(categorias);
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
		       // $http.get('http://localhost:3000/buscaFotoProduto?produto_id='+id)
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
      
   })
  	.factory('servicoProduto',function($http,$q,$ionicSlideBoxDelegate){
  
       var service = {};
        service.cadastrar = function(produto){
		
         var params = "nome="+produto.nome + "&";
          params = params + "tituloanuncio="+produto.tituloanuncio + "&";
          params = params + "precoatacado="+produto.precoatacado + "&";
          params = params + "descricao="+produto.descricao + "&";
          params = params + "qtd_atacado="+produto.qtd_atacado + "&";
          params = params + "categoriaproduto_id="+produto.categoriaproduto_id + "&";
          params = params + "empresa_id="+produto.empresa_id + "&";
          params = params + "user_id="+produto.userId;

         return $q(function(resolve, reject) {
		    $http.get('http://107.170.54.89/cadastrarProduto?'+params)
		       // $http.get('http://localhost:3000/cadastrarProduto?'+params)
			  .success(function(produtos){
			  	resolve(produtos);
			  	//$ionicSlideBoxDelegate.update();
                //$ionicSlideBoxDelegate.$getByHandle('images-produto-empresa').update();
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
        });
     };

      return service;
      
   });






