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
    },
    formatAvarageNumber(value) { // min and max included 
        if (!value) return null
        let a = value.toString().split('')
        if (a.length === 1) {
            return `0.${a[0]}`
        } else if (a.length === 2) {
            return `${a[0]}.${a[1]}`
        } else {
            return `${a[0]}${a[1]}.${a[2]}`
        }
    },
    fixAlphabetical(val) {
        if ((!val) && (val !== 0)) {
            return null;
        }
        let value = val;
        if (typeof val === "string") {
            value = parseFloat(val);
        }
        if (value < 0.5) {
            return 'N/R';
        } else if (value < 1.5) {
            return 'F';
        } else if (value < 2.5) {
            return 'D';
        } else if (value < 3.5) {
            return 'C';
        } else if (value < 4.5) {
            return 'C+';
        } else if (value < 5.5) {
            return 'B-';
        } else if (value < 6.5) {
            return 'B';
        } else if (value < 7.5) {
            return 'B+';
        } else if (value < 8.5) {
            return 'A-';
        } else if (value < 9.5) {
            return 'A';
        }
        return 'A+';
    }
};
