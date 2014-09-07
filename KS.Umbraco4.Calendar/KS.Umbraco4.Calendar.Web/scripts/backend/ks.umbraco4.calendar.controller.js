﻿angular.module('KS.Calendar', [])
 .controller('KS.CalendarController', function ($scope, $http) {

     $(document).ready(function () {
         $('#dtStartDate').datetimepicker({
             format: 'Y-m-d H:i:00',
             lang: 'no',
             onChangeDateTime: function (dp, $input) {
                 $scope.data.startDate = $("#dtStartDate").val();
                 if ($scope.data.startDate != "" && $scope.data.endDate != "") {
                     if (convertDateTime($scope.data.endDate).getTime() < convertDateTime($scope.data.startDate)) {
                         $scope.data.endDate = $scope.data.startDate;
                         $("#dtEndDate").val($scope.data.startDate);
                     }
                 }
                 $("#hidCalendar").val(angular.toJson($scope.data));
             }
         });
         $('#dtEndDate').datetimepicker({
             format: 'Y-m-d H:i:00',
             lang: 'no',
             onChangeDateTime: function () {
                 $scope.data.endDate = $("#dtEndDate").val();
                 if ($scope.data.startDate != "" && $scope.data.endDate != "") {
                     if (convertDateTime($scope.data.endDate).getTime() < convertDateTime($scope.data.startDate)) {
                         $scope.data.endDate = $scope.data.startDate;
                         $("#dtEndDate").val($scope.data.startDate);
                     }
                 }
                 $("#hidCalendar").val(angular.toJson($scope.data));
             }
         });
     });
 	//using this as default data
     if ($("#hidCalendar").val() == "") {
         var emptyModel = '{ recurrence: "1", weekInterval: "1", monthYearOption: "1", interval: "1", weekDay: "1", month: "1", monthOption: "1", startDate: "", endDate: "" }';
         $scope.data = eval('(' + emptyModel + ')');
     }
     else {
         $scope.data =eval('(' +  $("#hidCalendar").val() + ')');
     }

 	$http.get("/scripts/backend/language/en-GB.js")
		  .then(function (d) {
		  	return populateVars(d.data);
		  });

 	$scope.$watch('data', function () {
 	    $("#hidCalendar").val(angular.toJson($scope.data));
 	}, true);

 	$scope.toggleDay = function (id) {
 		if (typeof $scope.data.days == 'undefined') {
 			$scope.data.days = [];
 		}

 		var i = $scope.data.days.indexOf(id);
 		if (i < 0) {
 			$scope.data.days.push(id);
 		}
 		else {
 			$scope.data.days.splice(i, 1);
 		}
 	};

 	$scope.toggleMonth = function (id) {
 	    if (typeof $scope.data.months == 'undefined') {
 	        $scope.data.months = [];
 	    }

 	    var i = $scope.data.months.indexOf(id);
 	    if (i < 0) {
 	        $scope.data.months.push(id);
 	    }
 	    else {
 	        $scope.data.months.splice(i, 1);
 	    }
 	};
 	
 	$scope.selectMonthYearOption = function (id) {
 		$scope.data.monthYearOption = id;
 	};

 	$scope.selectMonthOption = function (id) {
 	    $scope.data.monthOption = id;
 	};

 	$scope.$watch('data.recurrence', function () {
 	    validateEndDate($scope);
 	});

 	$scope.$watch('data.endDate', function () {
 	    validateEndDate($scope);
 	});

 	$scope.$watch('data.startDate', function () {
 	    validateEndDate($scope);
 	});

 	function populateVars(lang) {
 		$scope.language = lang;

 		$scope.days = [
			{
				id: '1',
				name: lang.monday
			},
			{
				id: '2',
				name: lang.tuesday
			},
			{
				id: '3',
				name: lang.wednesday
			},
			{
				id: '4',
				name: lang.thursday
			},
			{
				id: "5",
				name: lang.friday
			},
			{
				id: "6",
				name: lang.saturday
			},
			{
				id: "0",
				name: lang.sunday
			}
 		];

 		$scope.weeks = [
			{
				id: '1',
				name: lang.single
			},
			{
				id: '2',
				name: lang.second
			},
			{
				id: '3',
				name: lang.third
			},
			{
				id: '4',
				name: lang.fourth
			},
			{
				id: '5',
				name: lang.fifth
			}
 		];

 		$scope.months = [
			{
				id: "1",
				name: lang.january
			},
			{
				id: "2",
				name: lang.february
			},
			{
				id: "3",
				name: lang.march
			},
			{
				id: "4",
				name: lang.april
			},
			{
				id: "5",
				name: lang.may
			},
			{
				id: "6",
				name: lang.june
			},
			{
				id: "7",
				name: lang.july
			},
			{
				id: "8",
				name: lang.august
			},
			{
				id: "9",
				name: lang.september
			},
			{
				id: "10",
				name: lang.october
			},
			{
				id: "11",
				name: lang.november
			},
			{
				id: "12",
				name: lang.december
			}
 		];

 		$scope.options = [
			{
				id: "1",
				name: lang.none
			},
			{
				id: "2",
				name: lang.daily
			},
			{
				id: "3",
				name: lang.weekly
			},
			{
				id: "4",
				name: lang.monthly
			},
			{
				id: "5",
				name: lang.yearly
			}
 		];

 		$scope.intervals = [
			{
				id: '1',
				name: lang.first
			},
			{
				id: '2',
				name: lang.second
			},
			{
				id: '3',
				name: lang.third
			},
			{
				id: '4',
				name: lang.fourth
			},
			{
				id: '5',
				name: lang.fifth
			},
			{
				id: '6',
				name: lang.last
			}
 		];

 		$scope.monthYearOptions = [
			{
				id: '1',
				name: lang.useStartDate
			},
			{
				id: '2',
				name: lang.specify
			}
 		];

 		$scope.monthOptions = [
            {
                id: '1',
                name: lang.everyMonth
            },
            {
                id: '2',
                name: lang.chooseMonth
            }
 		];
 	}
 });

function validateEndDate($scope) {
    if ($scope.data.endDate != "" && $scope.data.startDate != "") {
        if (convertDateTime($scope.data.endDate).getTime() < convertDateTime($scope.data.startDate).getTime()) {
            $scope.data.endDate = $scope.data.startDate;
        }
    }
    else if(1 < $scope.data.recurrence && $scope.data.endDate == ""){
        $scope.data.endDate = $scope.data.startDate;
    }
    else if ($scope.data.endDate != "") {
        if (isNaN(convertDateTime($scope.data.endDate).getTime())) {
            $scope.data.endDate = $scope.data.startDate;
        }
    }

    if (1 < $scope.data.recurrence && $scope.data.endDate == "") {
        if ($scope.data.startDate != "") {
            $scope.data.endDate = $scope.data.startDate;
        }
    }
}

function convertDateTime(dt) {
    var dateTime = dt.split(" ");

    var date = dateTime[0].split("-");
    var yyyy = date[0];
    var mm = date[1] - 1;
    var dd = date[2];

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]); //get rid of that 00.0;

    return new Date(yyyy, mm, dd, h, m, s);
}