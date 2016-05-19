angular.module('starter.services', [])

.factory('UserService', function( $http ){
	return {
		getAllUsers: function(){
			return $http.get('https://randuser.me/api/?results=50&gender=female');
		},
		createUser: function(){
			console.log(' createUser work!! ');
		}
	};
})

.factory('ComicService', function( $cordovaSQLite, $q ){
	return {
		createComic: function(title, author, cover, year){
			var query = "INSERT INTO comics (title, author, cover, year) VALUES (?,?,?,?)";
			$cordovaSQLite.execute(DB, query, [title, author, cover, year])
			.then(function( response ){
				console.log( response );
			})
			.catch(function( error ){
				console.log( error );
			});
		},
		getAllComics: function(){
			var comics = [];

			var query = "SELECT * FROM comics";
			return $cordovaSQLite.execute(DB, query)
			.then(function( response ){
				for (var i = 0; i < response.rows.length; i++) {
					comics.push({
						id: response.rows.item(i).id,
						title: response.rows.item(i).title,
						author: response.rows.item(i).author,
						cover: response.rows.item(i).cover,
						year: response.rows.item(i).year,
					});
				};
				return $q.when( comics );
			})
			.catch(function( error ){
				return $q.reject( error );
			});
		}
	}
});