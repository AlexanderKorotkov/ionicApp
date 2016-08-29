'use strict';

angular.module('app').factory('tokenHandler',  function ($http, appConfig, authService) {
    function getAuthorizationHeader() {
        return 'Bearer ' + authService.getAccessToken();
    }

    return {
        get: function () {
            return $http.get(appConfig.apiMainUrl + 'users', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getAll: function (id) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },

        //send to server POST
        login: function (data) {
            return $http.post(appConfig.apiMainUrl + 'auth', data);
        },
        createAccount: function (data) {
            return $http.post(appConfig.apiMainUrl + 'users', data);
        },
        connectUserPlatform: function (data, id) {
            return $http.post(appConfig.apiMainUrl + 'users/' + id + '/platforms', data);
        },
        createUserCreditCard: function (data, id) {
            return $http.post(appConfig.apiMainUrl + 'users/' + id + '/creditcards', data);
        },
        createUserCompanies: function (data, id) {
            return $http.post(appConfig.apiMainUrl + 'users/' + id + '/companies', data);
        },
        forgotPassword: function (data) {
            return $http.post(appConfig.apiMainUrl + 'users/reset-token', data);
        },
        resetPassword: function (data) {
            return $http.post(appConfig.apiMainUrl + 'users/reset-password', data);
        },
        createCampaign: function (data, id) {
            return $http.post(appConfig.apiMainUrl + 'users/' + id + '/campaigns', data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        sendMessage: function (userId, data) {
            return $http.post(appConfig.apiMainUrl + 'messages/' + userId, data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },

        //update data server PUT
        updateUserPlatform: function (id, id_platform, data) {
            return $http.put(appConfig.apiMainUrl + 'users/' + id + '/platforms/' + id_platform, data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        updateUserProfilePassword: function (userId, data) {
            return $http.put(appConfig.apiMainUrl + 'users/' + userId + '/password', data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        adminUpdateUserProfilePassword: function (userId, data) {
            return $http.put(appConfig.apiMainUrl + 'users/' + userId + '/set-password', data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        updateStatusCampaign: function (id, id_status, data) {
            return $http.put(appConfig.apiMainUrl + 'users/' + id + '/campaign-statuses/' + id_status, data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        copyCampaign: function (id, data) {
            return $http.put(appConfig.apiMainUrl + 'users/' + id + '/campaigns-batch', data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        editCampaign: function (id, id_campaign, data) {
            return $http.put(appConfig.apiMainUrl + 'users/' + id + '/campaigns/' + id_campaign, data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        updateUserProfile: function (userId, data) {
            return $http.put(appConfig.apiMainUrl + 'users-profile/' + userId, data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        setUsersProfileMedia: function (profileId, data) {
            return $http.put(appConfig.apiMainUrl + 'users-profile/' + profileId + '/media', data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },

        //delete data server DELETE
        deleteCampaign: function (id, data) {
            return $http(
                {
                    method: 'DELETE',
                    url: appConfig.apiMainUrl + 'users/' + id + '/campaigns-batch',
                    headers: {
                        'Authorization': getAuthorizationHeader()
                    },
                    data: data
                }
            );
        },

        //response server GET
        getUsersIndustries: function () {
            return $http.get(appConfig.apiMainUrl + 'industries');
        },
        getUsersCountries: function () {
            return $http.get(appConfig.apiMainUrl + 'countries');
        },
        getPlatforms: function () {
            return $http.get(appConfig.apiMainUrl + 'platforms');
        },
        getLocations: function () {
            return $http.get(appConfig.apiMainUrl + 'campaign-locations', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getLanguages: function () {
            return $http.get(appConfig.apiMainUrl + 'campaign-languages', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getCampaignParams: function (id) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/campaigns/defaults', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getCampaigns: function (id, date) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/campaigns' + date, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getCampaignId: function (id, id_campaign) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/campaigns/' + id_campaign, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getAllCampaigns: function (id) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/campaigns?pagination=false', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getNotifications: function (id) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/events', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getUserPlatforms: function (id) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/platforms', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getDashboardStatistic: function (id, date) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/statistics' + date, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getUserCampaign: function (id, id_campaign) {
            return $http.get(appConfig.apiMainUrl + 'users/' + id + '/campaigns/' + id_campaign, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getUserTransactions: function (userId) {
            return $http.get(appConfig.apiMainUrl + 'users/' + userId + '/transactions', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getLeadsCampaign: function (id_campaign) {
            return $http.get(appConfig.apiMainUrl + 'campaigns/' + id_campaign + '/leads', {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },
        getCampaignInfo: function (id_campaign) {
            return $http.get(appConfig.apiMainUrl + 'campaigns/' + id_campaign, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        },

        //PATCH
        patchUsersPersanlInformation: function (userId, data) {
            return $http.patch(appConfig.apiMainUrl + 'users/' + userId, data, {
                headers: {'Authorization': getAuthorizationHeader()}
            });
        }
    }
});

