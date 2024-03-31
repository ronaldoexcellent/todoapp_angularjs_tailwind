var app = angular.module("myApp", []);
app.controller('myCtrl', ($scope, $timeout) => {
    $timeout(() => $scope.lOpacity = 50, 4000);
    $timeout(() => $scope.lOpacity = 0, 6000);
    $timeout(() => $scope.loader = true, 7000);
    $scope.theme = {bg : "", text: ""};
    $scope.darkTheme = () => {
        $scope.gTheme = "dark";
        $scope.theme.bg = "black";
        $scope.theme.text = "white";
        $scope.searchColor = null, $scope.searchThickness = null;
    };
    $scope.lightTheme = () => {
        $scope.gTheme = "light";
        $scope.theme.bg = "white";
        $scope.theme.text = "black";
        $scope.searchColor = "purple", $scope.searchThickness = 700;
    }; $scope.lightTheme();
    $scope.tasks = {active: [], completed : []};
    $scope.tasks.all = $scope.tasks.active.concat($scope.tasks.completed);
    $scope.status = () => {
        $scope.msg = $scope.task.length == -1 ? null: "Typing...", $scope.statusColor = "blue";
    };
    $scope.escape = () => $scope.msg = " ";
    $scope.allItems = () => Number($scope.tasks.active.length) + Number($scope.tasks.completed.length);
    $scope.addS = () => {
        if ($scope.myTasks == "all") {
            $scope.items = eval($scope.allItems()) + " total";
            $scope.ss = eval($scope.allItems()) > 1 ? 's' : '';
        } else {
            $scope.ss = ($scope.items > 1) ? 's' : '';
        }
    };
    $scope.add = () => {
        $scope.msg = "";
        if (!$scope.task) {
            $scope.msg = "Please add something...", $scope.statusColor = "yellow"; return;
        }
        else if ($scope.tasks.active.indexOf($scope.task) == -1) {
            $scope.tasks.active.unshift($scope.task);
            $scope.task = "";
            $scope.msg = "Added Successfully!";
            $scope.statusColor = "green";
            $scope.items = $scope.myTasks == "completed" ? $scope.tasks.completed.length : $scope.items +1;
            $scope.addS();
        } else {
            $scope.msg = "This task already exists...";
            $scope.statusColor = "purple";
        }
    };
    $scope.moveToCompleted = (e) => {
        $scope.tasks.completed.unshift($scope.tasks.active[e]);
        $scope.tasks.active.splice(e, 1);
        $scope.msg = `Moved To Completed!`;
        $scope.disallow = false;
        $scope.items = $scope.tasks.active.length;
        $scope.addS();
    };
    $scope.moveToActive = (e) => {
        $scope.tasks.active.unshift($scope.tasks.completed[e]);
        $scope.tasks.completed.splice(e, 1);
        $scope.msg = `Moved To Active!`;
        $scope.disallow = false;
        $scope.items = $scope.tasks.completed.length;
        $scope.addS();
    };
    $scope.delFromActive = (e) => {
        $scope.tasks.active.splice(e, 1);
        $scope.msg = "Removed Successfully!";
        $scope.statusColor = "gray";
        if ($scope.items == 0) {return 0} else {$scope.items--} $scope.addS();
    };
    $scope.delFromCompleted = (e) => {
        $scope.tasks.completed.splice(e, 1);
        $scope.msg = "Removed Successfully!";
        $scope.statusColor = "gray";
        if ($scope.items == 0) {return 0} else {$scope.items--} $scope.addS();
    };
    $scope.all =  () => {
        $scope.myTasks = "all";
        $scope.taskGroup = "All Tasks";
        $scope.cBtn = $scope.showCheckBtn = $scope.allCheck = false;
        $scope.addS();
    };
    $scope.active = () => {
        $scope.myTasks = "active";
        $scope.taskGroup = "Active Tasks";
        $scope.cBtn = $scope.showCheckBtn = true;
        $scope.allCheck = $scope.check = false;
        $scope.items = $scope.tasks.active.length;
        $scope.addS();
    }; $scope.active();
    $scope.completed = () => {
        $scope.myTasks = "completed";
        $scope.taskGroup = "Completed Tasks";
        $scope.cBtn = false;
        $scope.check = $scope.checkBtn = $scope.showCheckBtn = $scope.allCheck = true;
        $scope.items = $scope.completed < 0 ? 0 : $scope.items;
        $scope.items = $scope.tasks.completed.length;
        $scope.addS();
    };
    $scope.sorted = "", $scope.changeOrder = () => {
        switch ($scope.sortBy) {
            case "asc":
                $scope.sorted.sort();
                break;
            case "dsc":
                $scope.sorted.reverse();
                break;
            case "rnd":
                $scope.sorted.sort(()=>{return 0.5 - Math.random()});
                $scope.sorting = true;
        }
    }, $scope.order = () => {
        $scope.sorted = $scope.myTasks == "active"? $scope.tasks.active : $scope.tasks.completed;
        $scope.sorting = false;
        $scope.reload = true;
        $scope.changeOrder();
        $timeout(()=>$scope.reload=false, 2000);
    };
    $scope.checkAll = () => {
        $scope.check = !$scope.check;
        $scope.statusColor = "indigo";
        if ($scope.myTasks == "active") {
            for (e in $scope.tasks.active) {
                $scope.tasks.completed.unshift($scope.tasks.active[e]);
            }
            $scope.tasks.active = [], $scope.msg = "Moved all to Completed Tasks...", $scope.items = $scope.tasks.active.length;
        } else if ($scope.myTasks == "completed") {
            for (e in $scope.tasks.completed) {
               $scope.tasks.active.unshift($scope.tasks.completed[e]);
            }
            $scope.tasks.completed = [];
            $scope.msg = "Moved all to Active Tasks...";
            $scope.items = $scope.tasks.completed.length;
        } $scope.disallow = false;
        $scope.addS();
    };
    $scope.clear = () => {
        $scope.tasks.completed = [], $scope.msg = "Completed tasks are cleared!";
        $scope.items = $scope.myTasks == "all" ? $scope.items = eval($scope.allItems()) + " total" : 0;
        $scope.ss = eval($scope.allItems()) > 1 ? 's' : '';
    };
    $scope.year = new Date().getFullYear();
});