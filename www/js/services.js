angular.module('starter.services', [])

.factory('api', function ($http,config){
    var service = {
        getAll: _getAll,
        get: _get,
        create: _create,
        update: _update,
        updateInfo: _updateInfo,
        remove: _remove,
        getInfos: _getInfos,
        getInfo: _getInfo,
        changeSit: _changeSit
    };
    return service;

    function _changeSit(id) {
        return $http.get(config.baseUrl + "/users/sit/" + id);
    }
    function _getInfo(id) {
        return $http.get(config.baseUrl + "/users/info/" + id);
    }
    function _getInfos() {
        return $http.get(config.baseUrl + "/users/info");
    }
    function _remove(id) {
        return $http.delete(config.baseUrl + "/users/" + id);
    }
    function _updateInfo(data) {
        return $http.post(config.baseUrl + "/users/info",data);
    }
    function _update(data) {
        return $http.put(config.baseUrl + "/users", data);
    }
    function _create(data) {
        return $http.post(config.baseUrl + "/users",data);
    }
    function _get(id) {
        return $http.get(config.baseUrl + "/users/" + id);
    }
    function _getAll() {
        return $http.get(config.baseUrl + "/users");
    }
});