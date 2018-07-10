angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope, $ionicModal, api) {

    var modalInsta;
  $scope.openModalAdd = function () {
      $ionicModal.fromTemplateUrl('templates/modalAdd.html', {
          scope: $scope
      }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
      });
  };
  $scope.changeHierarq = function (args) {
      console.log("Hierarquia: ", args);
  };

  $scope.user = {
      role: 1
    };

    $scope.roles = [
        {
            cod: 0,
            name: "MISSINGNO"
        },
        {
            cod: 1,
            name: "Usuário"
        },
        {
            cod: 2,
            name: "Moderador"
        },
        {
            cod: 3,
            name: "Administrador"
        }
    ];

  $scope.createUser = function(u) {
      // console.log("Novo usuário: ", u);
      // $scope.users.push({ name: u.firstName + ' ' + u.lastName });
      // $scope.modal.remove();
      // u.role = '1';
      api.create(u).then(function (response) {
          console.log("Usuário criado: ", u);
          $scope.users.push(u);
          $scope.modal.remove();
          $scope.user = {
              role: 1
          };
      }, function (error) {
          console.log("Usuário não criado: ", u);

          $scope.user = {
              role: 1
          };
          $scope.modal.remove();
      });
  };
  $scope.editUser = function(u) {
      // console.log("Usuário editado: ", u);
      // $scope.users.push({ name: u.firstName + ' ' + u.lastName });

      api.update(u).then(function (response) {
          console.log("Usuário editado: ", u);
          for (var i in $scope.users) {
              if ($scope.users[i].idcli == u.idcli) {
                  $scope.users[i] = u;
                  break;
              }
          }
          $scope.modal.remove();
      }, function (error) {
          console.log("Usuário não editado: ", u);
          $scope.modal.remove();
      });
  };

  $scope.refresh = function () {
      api.getAll().then(function (response) {
          console.log(response);
          $scope.users = response.data.data;
          alert("Atualizado!");
      },function (error) {
          console.error(error);
      });
  };

  $scope.remove = function (user) {
      api.remove(user.idcli).then(function (response) {
          console.log(response);
          $scope.users.splice($scope.users.indexOf(user), 1);
          alert("Removido!");
      },function (error) {
          console.error(error);
      })
  };

  $scope.openModalEdit = function (user) {
      console.log("Editar usuário!");
      console.log(user);
      $scope.userEdit = user;
      $ionicModal.fromTemplateUrl('templates/modalEdit.html', {
          scope: $scope
      }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
      });
  };


});