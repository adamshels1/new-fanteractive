import { server } from '@constants';
import axios from 'axios'
import qs from 'qs'


const login = async ({ username = '', password = '' }) => {


    var data = qs.stringify({
        username,
        password
    });
    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/sign-in`,
        headers: {
            'Accept': 'application/json'
        },
        data: data
    };

    const res = await axios(config)
    console.log('res', res)
    return res
};



const signup = async ({ email = '', password = '', username = '' }) => {

    var data = qs.stringify({
        username,
        email,
        password,
        password_confirmation: password
    });
    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/sign-up`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        data: data
    };

    const res = await axios(config)
    console.log('res', res)
    return res
};


const verificationEmailCode = async (token, { verificationCode = '' }) => {

    var data = qs.stringify({
        token: verificationCode,
    });
    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/sign-up/verification`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data
    };

    const res = await axios(config)
    console.log('res', res)
    return res
};

const resendVerificationEmailCode = async (token, { email }) => {
    var data = qs.stringify({
        email
    });
    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/sign-up/resend`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
    };
    console.log(config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getCountries = async (token) => {
    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}location/country`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };
    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const singUpMainInformation = async (token, {
    fullName,
    phone,
    postcode,
    state,
    city,
    street,
    selectedCountry
}) => {

    var data = JSON.stringify({
        "full_name": fullName,
        "phone_number": `1${phone}`.replace(/[^0-9]/g, ''),
        "country": selectedCountry?.code,
        "postcode": postcode,
        "state": state,
        "city": city,
        "street": street
    });

    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/sign-up/main-information`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};

const singUpIntroduceYourself = async (token, {
    sportIds,
    teamIds,
    aboutMe
}) => {

    var data = JSON.stringify({
        "sport_ids": sportIds,
        "team_ids": teamIds,
        "about": aboutMe
    });

    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/sign-up/introduce-yourself`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const uploadAvatar = async (token, { file }) => {

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    };


    let formData = new FormData();
    formData.append('thumbnail', {
        uri: file.path,
        type: file.mime,
        name: file.filename
        // name: 'file.jpeg',
    });

    const params = {
        method: 'POST',
        headers,
        body: formData
    };
    const url = `${server.BASE_URL_API}file/thumbnail`;
    console.log(url, params);
    const response = await fetch(url, params);
    console.log('response', response)
    const res = await response.json();
    console.log('data', res)

    return res
};


const getTeams = async (token, { searchValue = '' }) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}team?name=${searchValue}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await axios(config)
    console.log('res', res)
    return res
};


const getSports = async (token) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}sport`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await axios(config)
    console.log('res', res)
    return res
};

const getUser = async (token) => {

    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/user`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getUserOdds = async (token, { userId }) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}profile/user/${userId}/odds`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getUserAnalyses = async (token, { userId }) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}profile/user/1119/analyses`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getActivityPlayes = async (limit = 40) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}activity/players`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: { limit }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};

const getPlayerSummary = async (id) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}players/scouting/report/summary/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};

const getStadiumSummary = async (id) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}stadium-rating/summary/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getPlayerReports = async (id) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}players/scouting/report/detail/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};

const getStadiumReports = async (id) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}stadium-rating/details/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};

const getArticles = async (id) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}article`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};

const getActivityStadiums = async (limit = 50) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}activity/stadiums?limit=${limit}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getActivityGames = async (limit = 50) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}activity/games?limit=${limit}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getStadiumCharacteristics = async (token) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}stadium-rating/characteristics`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};



const addStadiumRating = async (token, { stadiumId, comment, eventName, date, sportId, images, characteristics }) => {

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    };


    let formData = new FormData();
    formData.append('general_comment', comment)
    formData.append('event_name', eventName)
    formData.append('visited_at', date)
    formData.append('sport_id', sportId)
    formData.append('characteristics', characteristics)

    images.forEach(i => {
        formData.append('images[]', {
            uri: i.path,
            type: i.mime,
            name: i.filename
            // name: 'file.jpeg',
        });
    });


    const params = {
        method: 'POST',
        headers,
        body: formData
    };
    const url = `${server.BASE_URL_API}stadium-rating/add/${stadiumId}`;
    console.log(url, params);
    const response = await fetch(url, params);
    console.log('response', response)
    return response
    // const res = await response.json();
    // console.log('data', res)

    // return res
};


const getGameStatsOveral = async (token, { gameId, teamId }) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}game/${gameId}/stats-overall?team_id=${teamId}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};

const getGameStatsOveralPlayer = async (token, { gameId, teamId }) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}game/${gameId}/stats-overall-player?team_id=${teamId}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getGame = async (gameId) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}game/${gameId}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getGameReports = async (id) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}game/${id}/detail?limit=20`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getTeamRoster = async (teamId) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}team/${teamId}/roster`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};


const getGameCharacteristics = async (token, { gameId }) => {

    var config = {
        method: 'get',
        url: `${server.BASE_URL_API}game/${gameId}/characteristics`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    console.log('_____', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};




const addGameReport = async (token, {
    gameId,
    teamId,
    playerId,
    ratings,
    players,
    analyzes,
}) => {

    var data = JSON.stringify({
        "team_id": teamId,
        "player_id": playerId,
        "ratings": ratings,
        "players": players,
        "analyzes": analyzes
    });

    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}game/${gameId}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data
    };

    console.log('config', config)
    const res = await axios(config)
    console.log('res', res)
    return res
};




const getRestaurants = async () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/getrestaurants`;
    console.log(url)
    const response = await fetch(url, params);
    const data = await response.json();
    console.log(data)

    return data;
};

const getRestaurant = async (restaurantId) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/restaurant?id=${restaurantId}`
    console.log('url', url)
    const response = await fetch(url, params)
    const data = await response.json()
    console.log('data', data)

    return data;
};


const addQRScan = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/scan/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};


const getPage = async ({ title }) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/getpage?title=${title}`;
    console.log('url', url);
    const response = await fetch(url, params);
    console.log('response', response)
    const data = await response.json();
    console.log('data', data)

    return data;
};





const getRestaurantWeeks = async () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/restaurant_weeks/`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();

    return data;
};

const getCities = async () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/filter_cities/`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();

    return data;
};

const getDates = async () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/filter_dates/`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getEvents = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_events/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};


const getEvent = async (eventId) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/event/?id=${eventId}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getEventRestaurants = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_restaurants/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getSponsors = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };
    const paramsUrl = new URLSearchParams(object).toString();
    const url = `${server.BASE_URL_API}/get_sponsors/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getSponsor = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };
    const paramsUrl = new URLSearchParams(object).toString();
    const url = `${server.BASE_URL_API}/sponsor/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const acceptPointsBySponsorView = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };
    const paramsUrl = new URLSearchParams(object).toString();
    const url = `${server.BASE_URL_API}/accept_points_by_sponsor_view/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getFeeds = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_articles/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};


const getFeed = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/article/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getDailyPoints = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_daily_points/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const acceptDailyPoints = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/accept_daily_points/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getRewards = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_rewards/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getMyRewards = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_user_rewards/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const buyRewards = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/buy_reward/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getHistoryPoints = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_user_history_points/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getEventHistoryPoints = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_user_current_event_history_points/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getLeaderboard = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_leaderboard/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const changePassword = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/password_change/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const saveFcmToken = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();
    //set_firebase_token/?user_id=33&token=707ab45630&fbtoken=aaabbbccc
    const url = `${server.BASE_URL_API}/set_firebase_token/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};



const getWelcomeScreens = async () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/welcome_screen/`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const getFaq = async () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const url = `${server.BASE_URL_API}/faq`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const getNotifications = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_notifications/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const notificationAction = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/notification_action/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const getPostComments = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_post_comments/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const sendPostComment = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/send_comment/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const likeComment = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/comment_like/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
};

const recoverPassword = async ({ email }) => {


    var data = qs.stringify({
        email,
    });
    var config = {
        method: 'post',
        url: `${server.BASE_URL_API}auth/sign-in/reset-password`,
        headers: {
            'Accept': 'application/json'
        },
        data: data
    };

    const res = await axios(config)
    console.log('res', res)
    return res
};

const getAvailableDailyPoints = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/available_daily_points/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const getProfile = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/profile/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const acceptReferralCode = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/accept_referral_code/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const sendBecomeSponsor = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/become_sponsor_send/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const likeExplore = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/article_like/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const removeAccount = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/remove_account/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}


const updateAccount = async (data) => {
    const headers = {
        "Content-Type": "multipart/form-data"
    };


    let formData = new FormData();
    formData.append('user_id', data.user_id);
    formData.append('token', data.token);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    if (data.file) {
        formData.append('file', {
            uri: data.file.uri,
            type: data.file.type,
            name: data.file.fileName
            // name: 'file.jpeg',
        });
    }

    const params = {
        method: 'POST',
        headers,
        body: formData
    };
    const url = `${server.BASE_URL_API}/update_account/`;
    const response = await fetch(url, params);
    console.log(url, params);
    const res = await response.json();
    console.log('data', res)

    return res
}

const getPuzzles = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_puzzles/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}


const getPuzzle = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/puzzle/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const getPuzzlePoints = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_puzzle_points/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const buyPuzzle = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/buy_puzzle/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const getShowingSponsor = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/showing_sponsor/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}


const getTriviaList = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_trivia/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const getTrivia = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/trivia/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}

const getTriviaPoints = async (object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'GET',
        headers,
    };

    const paramsUrl = new URLSearchParams(object).toString();

    const url = `${server.BASE_URL_API}/get_trivia_points/?${paramsUrl}`;
    console.log('url', url);
    const response = await fetch(url, params);
    const data = await response.json();
    console.log('data', data)

    return data;
}


const setFacebookToken = async (facebookToken) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const params = {
        method: 'POST',
        headers,
        body: JSON.stringify({ token: facebookToken })
    };


    const url = `${server.BASE_URL_API}/set_fb_token/`;
    console.log(url, params);
    const response = await fetch(url, params);
    console.log(response)
    const data = await response.json();
    console.log('data', data)

    return data;
}


export default {
    getRestaurants,
    signup,
    login,
    verificationEmailCode,
    resendVerificationEmailCode,
    getPage,
    getCountries,
    singUpMainInformation,
    singUpIntroduceYourself,
    uploadAvatar,
    getSports,
    getUser,
    getUserOdds,
    getUserAnalyses,
    getActivityPlayes,
    getPlayerSummary,
    getPlayerReports,
    getStadiumReports,
    getArticles,
    getActivityStadiums,
    getStadiumSummary,
    getActivityGames,
    getStadiumCharacteristics,
    addStadiumRating,
    getGame,
    getGameStatsOveral,
    getGameStatsOveralPlayer,
    getGameReports,
    getTeamRoster,
    getGameCharacteristics,
    addGameReport,



    getRestaurant,
    getRestaurantWeeks,
    getCities,
    getDates,
    getEvents,
    getEvent,
    getEventRestaurants,
    getSponsors,
    getSponsor,
    acceptPointsBySponsorView,
    getFeeds,
    getFeed,
    getDailyPoints,
    acceptDailyPoints,
    getRewards,
    getMyRewards,
    buyRewards,
    getHistoryPoints,
    getEventHistoryPoints,
    getLeaderboard,
    addQRScan,
    changePassword,
    saveFcmToken,
    getWelcomeScreens,
    getFaq,
    getNotifications,
    notificationAction,
    getPostComments,
    sendPostComment,
    likeComment,
    recoverPassword,
    getAvailableDailyPoints,
    getProfile,
    acceptReferralCode,
    sendBecomeSponsor,
    likeExplore,
    removeAccount,
    updateAccount,
    getPuzzles,
    getPuzzle,
    getPuzzlePoints,
    buyPuzzle,
    getShowingSponsor,
    getTriviaList,
    getTrivia,
    getTriviaPoints,
    setFacebookToken,
    getTeams,
};