angular.module('user', [])
.controller('logarCtrl', function ($scope,logar,$stateParams,$location,$rootScope) {


	
$scope.usuario = {};

 console.log(sessionStorage.userLogado); 
 console.log(sessionStorage.nome); 

//$scope.nomeUsuario = sessionStorage.nome;

$scope.logar = function() {
       logar.login($scope.usuario)
         .then(function(dados){
            if(!dados){
             console.log("login invalido");
            }else{
            console.log("Logou");
            console.log(dados.id);
            console.log(dados.nome);
            console.log(dados.empresa_id);

            sessionStorage.setItem('userId',dados.id);
            sessionStorage.setItem('userNome',dados.nome);
            sessionStorage.setItem('userIdEmpresa',dados.empresa_id);
            sessionStorage.setItem('userLogado',true);
            
            $rootScope.userLogado = true;
            $rootScope.userId = dados.id;
            $rootScope.nomeUsuario = dados.nome;
            $rootScope.userIdEmpresa = dados.empresa_id


            $location.path('/app/produtos/9');

            }
         })
         .catch(function(erro) {
				console.log(erro);
	   });
    }

 $scope.deslogar = function() {
        sessionStorage.clear();
        sessionStorage.setItem('userLogado',false); 
        $scope.logado = false;
        $location.path('/app/login');
    }
});
