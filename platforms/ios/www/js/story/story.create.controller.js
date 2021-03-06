core.controller('StoryCreateCtrl', function($scope, StoryFactory, $state, $localStorage, loggedInUser, allUsers, UserFactory) {

	$scope.story = {};
	$scope.currentUser = loggedInUser;
	$scope.allUsers = allUsers;
	$scope.clicked = false;
	$scope.collaborators = [];
	$scope.collabAdded = false;

	$scope.createNewStory = function(){
		if (!$localStorage.user) {
			$state.go('login');
		} else {
			$scope.story.owner = $localStorage.user._id;

			var friends = [];
			
			$scope.collaborators.forEach(function(collabr) {
				friends.push(collabr._id);
			});

			$scope.story.friends = friends;
			console.log('CTRL story in scope being passed into StoryFactory.createNewStory: ', $scope.story);
			StoryFactory.createNewStory($scope.story)
			.then(function(story) {
				console.log('CTRL story returned after StoryFactory.createNewStory: ', story)
				$scope.allUsers.forEach(function(user) {
					user.collabr = false;
				});
				$scope.story = {};
				$scope.clicked = false;
				$scope.collaborators = [];
				$scope.collabAdded = false;
				// $state.go('story', {storyId: story._id});
				$state.go('camera',{storyId: story._id});
			});	
		}
	};

	$scope.showAllUsers = function() {
		$scope.clicked = true;
	};

	$scope.addFriend = function(user) {
		$scope.collabAdded = true;
		$scope.collaborators.push(user);
		user.collabr = true;
	};

	$scope.removeCollabr = function(user) {
		var userId = user._id;
		var collabArr = [];
		$scope.collaborators.forEach(function(collbr) {
			collabArr.push(collbr._id);
		});
		var index = collabArr.indexOf(userId);
		$scope.collaborators.splice(index, 1);
		user.collabr = false;
	};


});

