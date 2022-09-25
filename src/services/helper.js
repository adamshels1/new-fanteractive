import _ from "lodash";
import AlertAsync from "react-native-alert-async";

export default {
    sleep: (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    },
    isEmail: (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    alertErrors: async (errors = [], message = '') => {
        let alertMessages = message + '\n';
        _(errors).forEach(i => {
            alertMessages += i + '\n';
        });
        await AlertAsync('', alertMessages);
    },
    getYoutubeVideoId(url) {
        try {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return (match && match[7].length == 11) ? match[7] : false;
        } catch (e) {
            return null
        }
    },
    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
};
