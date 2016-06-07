angular.module('categoriaProduto')
      .factory('buscaCategoria',function($http,$q){     
       var service = {};

        service.busca = function(father_id){
		
         return $q(function(resolve, reject) {
		    $http.get('http://107.170.54.89/buscacategoria?father_id='+father_id)
		     // $http.get('http://localhost:3000/buscacategoria?father_id='+father_id)
			  .success(function(categorias){
			  	resolve(categorias);
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
        });
     };
      
      return service;
      
   });
