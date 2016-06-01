angular.module('starter', ['ionic', 'starter.controllers', 'categoriaProduto','produto','user','ngFileUpload'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
   })

  .state('app.listaCategoria', {
      url: '/listaCategoria/:father_id',
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/categoriaProduto/lista.html",
          controller: 'CategoriaProdutoCtrl'
        }
      }
    })

    .state('app.produtos', {
      url: "/produtos/:categoriaId",
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/produtos/listaprodutos.html",
          controller: 'ProdutoCtrl'
        }
      }
    })

    .state('app.showproduto', {
      url: "/showproduto/:produtoId",
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/produtos/showproduto.html",
          controller: 'ProdutoShowCtrl'
        }
      }
    })

    .state('app.showprodutosempresa', {
      url: "/showprodutosempresa/:empresaId",
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/produtos/showprodutosempresa.html",
          controller: 'ProdutoShowEmpresaCtrl'
        }
      }
    })
    
    .state('app.login', {
      url: "/login",
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/user/login.html",
          controller: 'logarCtrl'
        }
      }
    })

    .state('app.cadastroproduto', {
      url: "/cadastroproduto",
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/produtos/cadastrarproduto.html",
          controller: 'CadastraProdutoCtrl'
        }
      }
    })

    .state('app.fotoproduto', {
      url: "/fotoproduto",
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/produtos/fotoproduto.html",
          controller: 'FotoProdutoCtrl'
        }
      }
    })

    .state('app.listaprodutosempresa', {
      url: "/listaprodutosempresa/:empresaId",
      views: {
        'menuContent': {
         templateUrl: "js/app_modules/produtos/listaprodutosempresa.html",
          controller: 'ProdutoShowEmpresaCtrl'
        }
      }
    })

  //daqui para baixo rotas gerada pelo ionic

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  // se não encontrou nenhuma roda acima mande para cá.
  $urlRouterProvider.otherwise('/app/produtos/9');
});
