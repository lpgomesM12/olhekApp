angular.module('user')
      .factory('logar',function($http,$q){
      
       var service = {};
        service.login = function(usuario){		
         return $q(function(resolve, reject) {
		    $http.get('http://107.170.54.89/logar?email='+usuario.email+'&password='+usuario.password)
			  .success(function(user){
			  	resolve(user);
			  })
			  .error(function(erro){
			  	reject({erro});
			  });
        });
     };
      
      return service;
      
   });