angular.module("Challenge", [])
	.controller("ChallengeController", ChallengeCtrl);

ChallengeCtrl.$inject = ["$http"];

function ChallengeCtrl($http) {
	var cCtrl = this;

	console.log(getTracking());
	cCtrl.welcomeMessage = "Welcome to the challenge! Trying my best over here";
}