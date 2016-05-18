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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ComicsCtrl', function($scope, $ionicModal, $ionicActionSheet){
  

  $scope.showModal = showModal;
  $scope.closeModal = closeModal;
  $scope.saveComic = saveComic;
  $scope.deleteComic = deleteComic;
  $scope.showOptions = showOptions;
  $scope.comic = {};
  $scope.modal = null;

  $ionicModal.fromTemplateUrl('templates/comic-modal.html', {
    scope: $scope
  })
  .then(function(modal){
    $scope.modal = modal;
  });

  $scope.comics = [
    {
      title: 'Mafalda',
      author: 'Quino',
      picture: 'mafalda.jpg',
      number: 23 
    },
    {
      title: 'Calvin and Hobbes',
      author: '‎Bill Watterson',
      picture: 'calvin.png',
      number: 46 
    },
    {
      title: 'Charlie Bronw',
      author: 'Charles M. Schulz',
      picture: 'charlie.png',
      number: 96 
    },
  ];


  function showModal(){
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

  function saveComic(){
    $scope.comic.picture = 'ionic.png';
    $scope.comics.push( $scope.comic );
    $scope.comic = {};
    $scope.modal.hide();
  }

  function deleteComic(index){
    $scope.comics.splice( index, 1 );
  }

  function showOptions( index ){
    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-share"></i> Share' },
        { text: '<i class="icon ion-edit"></i> Edit' }
      ],
      destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'Cancel',
      titleText: "Options",
      destructiveButtonClicked: function(){
        $scope.deleteComic( index );
        return true;
      },
      buttonClicked: function(index){
        console.log(index);
        return true;
      }
    });
  }

});
