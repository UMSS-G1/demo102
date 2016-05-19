angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, UserService, $ionicLoading) {
  
  $scope.users = [];

  $ionicLoading.show();

  UserService.getAllUsers()
  .then(function(response){
    $scope.users = response.data.results;
    $ionicLoading.hide();
  })
  .catch(function(){
    $ionicLoading.hide();
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ComicsCtrl', function($scope, $ionicModal, $ionicActionSheet, ComicService){


  $scope.showModal = showModal;
  $scope.closeModal = closeModal;
  $scope.saveComic = saveComic;
  $scope.deleteComic = deleteComic;
  $scope.showOptions = showOptions;
  $scope.editComic = editComic;
  $scope.isNew = true;
  $scope.comic = {};
  $scope.modal = null;
  $scope.comics = [];

  $ionicModal.fromTemplateUrl('templates/comic-modal.html', {
    scope: $scope
  })
  .then(function(modal){
    $scope.modal = modal;
  });

  ComicService.getAllComics()
  .then(function( comics ){
    $scope.comics = comics;
  });

  

  

  function showModal(){
    $scope.isNew = true;
    $scope.comic = {};
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

  function saveComic(){
    if($scope.isNew){
      $scope.comic.picture = 'ionic.png';
      $scope.comics.push( $scope.comic );
      ComicService.createComic( $scope.comic.title, $scope.comic.author, $scope.comic.cover, $scope.comic.year );
      $scope.comic = {};
    }
    $scope.modal.hide();
  }

  function deleteComic(index){
    $scope.comics.splice( index, 1 );
  }

  function showOptions( indexComic ){
    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-share"></i> Share' },
        { text: '<i class="icon ion-edit"></i> Edit' }
      ],
      destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'Cancel',
      titleText: "Options",
      destructiveButtonClicked: function(){
        $scope.deleteComic( indexComic );
        return true;
      },
      buttonClicked: function(indexButton){
        if(indexButton == 1){
          $scope.editComic( indexComic );
        }
        return true;
      }
    });
  }

  function editComic( index ){
    $scope.isNew = false;
    $scope.comic = $scope.comics[index];
    $scope.modal.show();
  }

});
