angular.module('user', [])
.controller('logarCtrl', function ($scope,logar,$stateParams,$location) {
	
$scope.usuario = {};

$scope.logado = sessionStorage.userLogado;
$scope.nomeUsuario = sessionStorage.nome;

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
            
            $scope.logado = true;
            $scope.nomeUsuario = dados.nome;

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
