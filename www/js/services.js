angular.module('starter.services', [])

.factory('UserService', function( $http ){
	return {
		getAllUsers: function(){
			return $http.get('https://randomuser.me/api/?results=50&gender=female');
		},
		createUser: function(){
			console.log(' createUser work!! ');
		}
	};
});