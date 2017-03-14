var app = angular.module('myProj',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/profile/:id', {
		templateUrl: "profile.html",
		controller:'profilecontroller'
	})
	.when('/message/:id', {
		templateUrl: "message.html",
		controller:'messagecontroller'
	})
	.when('/logout', {
		template : "",
		controller:'logoutcontroller'
	})
	.when('/message/:id/view/:vid', {
		templateUrl: "messageview.html",
		controller:'messageviewcontroller'
	});
	
});

app.factory('localsto', function() {
	var nvalue1 = JSON.parse(localStorage.getItem("Dusername"));
		
	return {
			nvalue1 
		};
});

app.controller('homecontroller',['$scope','$rootScope','$location','$window','localsto', function($scope,$rootScope,$location,$window,localsto) {
	$rootScope.hidediv = $scope.hidediv;
	$rootScope.hidelog = $scope.hidelog;
	//$rootScope.propage = $scope.propage;
	$rootScope.uId = $scope.uId;;
	$rootScope.uPassword = $scope.uId;;
	$scope.signUp = function() {
		var len = localsto.nvalue1.length;
		
		for(var i=0;i<len;i++){
			if(localsto.nvalue1[i].username == $scope.uId && localsto.nvalue1[i].password == $scope.uPassword) {
				$scope.varid = i;
				$location.path("/profile/"+i);
			}
		}
	};
}]);

app.controller('profilecontroller',['$scope','$rootScope','localsto','$routeParams', function($scope,$rootScope,localsto,$routeParams) {
	$rootScope.hidediv = true;
	$rootScope.hidelog = true;
	//$rootScope.propage = true;
	$scope.userdetails = localsto.nvalue1[$routeParams.id];
	
	/* $scope.updateprof = function() {
		$scope.updiv = true;
		$scope.showerror1 = false; */
		$scope.uname = localsto.nvalue1[$routeParams.id].username;
		$scope.upass = localsto.nvalue1[$routeParams.id].password;
		$scope.uloc = localsto.nvalue1[$routeParams.id].ulocation;
		$scope.unum = localsto.nvalue1[$routeParams.id].phno;
		$scope.uemail = localsto.nvalue1[$routeParams.id].email;
	//}
	if($scope.showeprof==true) {
		$scope.showeprof=false;
	}
	$scope.saveupdate = function() {
		if($scope.uname!=''&&$scope.upass!=''&&$scope.uloc!=''&&$scope.unum!=''&&$scope.uemail!='') {
		var nvalobj = localsto.nvalue1;
		nvalobj[$routeParams.id].username = $scope.uname;
		nvalobj[$routeParams.id].password = $scope.upass;
		nvalobj[$routeParams.id].ulocation = $scope.uloc;
		nvalobj[$routeParams.id].phno = $scope.unum;
		nvalobj[$routeParams.id].email = $scope.uemail;
		localStorage.setItem("Dusername", JSON.stringify(nvalobj));
		$scope.updiv = false;
		$scope.showerror1 = false;
		$scope.showeprof = true;
		} else {
			$scope.showerror1 = true;
		}
	}
}]);
app.controller('messagecontroller',['$scope','$routeParams','localsto','$location', function($scope,$routeParams,localsto,$location) {
	var nvalobj = localsto.nvalue1;
	//console.log(nvalobj);
	//var nvalobj2 = localsto.nvalue1;
	$scope.messages = nvalobj[$routeParams.id].messag;
	console.log($scope.messages);
	//var messages1 = localsto.nvalue1[$routeParams.id].messag;
	
	$scope.showcomp = function() {
		
		if($scope.comppopup!=true) {
			$scope.comppopup = true;
			$scope.showerror = false;
		} else {
			$scope.comppopup = false;
		}
		
	};
	
	$scope.sendmessage = function() {
		if($scope.mesto!='' && $scope.sendmes!='' && $scope.messub) {
		var leng = nvalobj.length;
		for(var i=0;i<leng;i++){
			if(nvalobj[i].username == $scope.mesto) {
				var sampobj = nvalobj[i].messag;
				var meslen = sampobj.length;

				var obj = {
					from1:nvalobj[$routeParams.id].username,
					mes:$scope.sendmes,
					sub:$scope.messub,
					imp:0
				};
				
				sampobj.push(obj);
				nvalobj[i].messag = sampobj;
				localStorage.setItem("Dusername", JSON.stringify(nvalobj));
				
			}
		}
		$scope.comppopup = false;
		} else {
			$scope.showerror = true;
		}
	};
	
	$scope.deletefn = function(del) {
		 
		$scope.messages.splice(del.$index,1);
		nvalobj[$routeParams.id].messag = $scope.messages;
		localStorage.setItem("Dusername", JSON.stringify(nvalobj));
	
	}; 
	
	$scope.viewfn = function(vie) {
		/* if($scope.popup!=true) {
			$scope.popup = true;
			$scope.fr = $scope.messages[vie.$index].from1;
			$scope.subj = $scope.messages[vie.$index].sub;
			$scope.messa = $scope.messages[vie.$index].mes;
		} else {
			$scope.popup = false;
		} */
		var vid = vie.$index;
		$location.path("/message/"+$routeParams.id+"/view/"+vid);	
		
	};
	$scope.impfn = function(impo) {
		if($scope.messages[impo.$index].imp == 1) {
			$scope.messages[impo.$index].imp = 0;
		} else {
			$scope.messages[impo.$index].imp = 1;
		}
		//$scope.messages[impo.$index].imp = 1;
		nvalobj[$routeParams.id].messag = $scope.messages;
		localStorage.setItem("Dusername", JSON.stringify(nvalobj));
		
	};
}]);

app.controller('logoutcontroller',['$scope','$rootScope','$location', function($scope,$rootScope,$location) {
	$location.path("/");
	$rootScope.hidediv = false;
	$rootScope.hidelog = false;
	$rootScope.propage = false;
	$rootScope.uPassword = "";
	$rootScope.uId = "";
	
	
}]);

app.controller('messageviewcontroller',['$scope','$rootScope','$location','$routeParams','localsto', function($scope,$rootScope,$location,$routeParams,localsto) {
	var nvalobj = localsto.nvalue1;
	$scope.messages = nvalobj[$routeParams.id].messag;
	$scope.fr = $scope.messages[$routeParams.vid].from1;
	$scope.subj = $scope.messages[$routeParams.vid].sub;
	$scope.messa = $scope.messages[$routeParams.vid].mes;
	/* alert($routeParams.id);
	alert($routeParams.vid); */
	
	$scope.replyshow = function() {
		$scope.showerror1 = false;
		if($scope.rep!=true) {
			$scope.rep = true;
			
		} else {
			$scope.rep = false;
		}
	}
	
	$scope.backfn = function() {
		$location.path("/message/"+$routeParams.id);
	}
	
	$scope.sendmessage1 = function() {
		if($scope.sendmes!=null) {
		var leng = nvalobj.length;
		for(var i=0;i<leng;i++){
			if(nvalobj[i].username == $scope.fr) {
				var sampobj = nvalobj[i].messag;
				var meslen = sampobj.length;

				var obj = {
					from1:nvalobj[$routeParams.id].username,
					mes:$scope.sendmes,
					sub:$scope.subj,
					imp:0
				};
				
				sampobj.push(obj);
				nvalobj[i].messag = sampobj;
				localStorage.setItem("Dusername", JSON.stringify(nvalobj));
				
			}
		}
		$scope.rep = false;
		} else {
			$scope.showerror1 = true;
		}
	}

}]);