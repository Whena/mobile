import { isNil, isEmpty } from 'ramda';
// import API from '../Services/Api'
import DeviceInfo from 'react-native-device-info';
import { Platform, PixelRatio, Dimensions, PermissionsAndroid, Alert } from 'react-native';
const moment = require('moment');
var uuid = require('react-native-uuid');

// export function formatRp(num, fixed = 0) {
// 	num = parseFloat(num);
// 	var p = num.toFixed(fixed).split('.');
// 	return (
// 		'Rp. ' +
// 		p[0]
// 			.split('')
// 			.reverse()
// 			.reduce(function(acc, num, i, orig) {
// 				return num == '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
// 			}, '') +
// 		(isNil(p[1]) ? '' : '.' + p[1])
// 	);
// }

export function getCalculateTime(date1, date2){
	//date1 is today
	// var today = new Date();
	// var Christmas = new Date("12-25-2012");
	// var diffMs = (Christmas - today); // milliseconds between now & Christmas
	// var diffDays = Math.floor(diffMs / 86400000); // days
	// var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	// var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
	// alert(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas 2009 =)");

	var diffMs = (date1-date2); //millisecond between now and last
	var diffDays = Math.floor(diffMs / 86400000); // days
	var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

	return diffMins
}

export async function getPermission(){
	try{
		const phone =  await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE ,
			{
			  'title': 'ReactNativeCode wants to READ_PHONE_STATE',
			  'message': 'ReactNativeCode App needs access to your personal data. '
			}
		);
		const camera =  await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA ,
			{
			  'title': 'ReactNativeCode wants to CAMERA',
			  'message': 'ReactNativeCode App needs access to your personal data. '
			}
		);
		const storage =  await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE ,
			{
			  'title': 'ReactNativeCode wants to READ_EXTERNAL_STORAGE',
			  'message': 'ReactNativeCode App needs access to your personal data. '
			}
		);
		const location = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION ,
			{
			  'title': 'ReactNativeCode wants to ACCESS_FINE_LOCATION',
			  'message': 'ReactNativeCode App needs access to your personal data. '
			}
		);
	
		if(phone === PermissionsAndroid.RESULTS.GRANTED && camera === PermissionsAndroid.RESULTS.GRANTED && 
			storage === PermissionsAndroid.RESULTS.GRANTED && location === PermissionsAndroid.RESULTS.GRANTED){
			return true;
		}
	}catch(e){
		console.warn(e)
		return false;
	}
}

export function getFileFromDirectory(path){
	RNFS.readDir(path) // /storage/emulated/0/Sulley
        .then((result) => {
        console.log('GOT RESULT', result);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
	}).then((statResult) => {
        if (statResult[0].isFile()) {
        return RNFS.readFile(statResult[1], 'utf8');
        }
        return 'no file';
	}).then((contents) => {
        console.log(contents);
        })
        .catch((err) => {
        console.log(err.message, err.code);
	});
}

export function getUUID(){
	return uuid.v4();
}

export function getTodayDate(format){
	var tgl = moment().format(format)
	return tgl;
}

export function convertTimestampToDate(timestamp, format){
	var dateString = moment(timestamp).format(format);
	// const formatted = moment(timestamp).format('L'); //MM/DD/YYYY
	return dateString;
}

export async function request_READ_PHONE_STATE() {
 
	try {
	  const granted = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE ,
		{
		  'title': 'ReactNativeCode wants to READ_PHONE_STATE',
		  'message': 'ReactNativeCode App needs access to your personal data. '
		}
	  )
	  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
   
		Alert.alert("Permission Granted.");
	  }
	  else {
   
		Alert.alert("Permission Not Granted");
   
	  }
	} catch (err) {
	  console.warn(err)
	}
  }

export function formatRp(num, fixed = 0) {
	num = parseFloat(num);
	var p = num.toFixed(fixed).split('.');
	return (
		'Rp ' +
		p[0]
			.split('')
			.reverse()
			.reduce(function (acc, num, i, orig) {
				return num == '-' ? acc : num + (i && !(i % 3) ? '.' : '') + acc;
			}, '') +
		(isNil(p[1]) ? '' : ',' + p[1])
	);
}

export function toTitleCase(str) {
	if (isNil(str) || isEmpty(str)) return '';
	let newstr = str.split('_').join(" ");
	return newstr.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

// export function uploadImage(type, to, data) {
// 	const api = API.create(type).api
// 	let urlUpload
// 	switch (to) {
// 		case "customer":
// 			urlUpload = "/customer.photo.post"
// 			break;
// 		case "ktp":
// 			urlUpload = "/customer.photo.ktp.post"
// 			break;
// 		case "npwp":
// 			urlUpload = "/customer.photo.npwp.post"
// 			break;
// 		case "kk":
// 			urlUpload = "/customer.photo.kk.post"
// 			break;
// 		case "logdeliv":
// 			urlUpload = "/deliverymanlog.photo.post.by.orderid.and.batchid"
// 			break;
// 		case "signdeliv":
// 			urlUpload = "/deliverymanlog.sign.post.by.orderid.and.batchid"
// 			break;
// 		case "order":
// 			urlUpload = "/order.photo.post"
// 			break;
// 		case "sk":
// 			urlUpload = "/order.photo.sk.post"
// 			break;

// 		default:
// 			break;
// 	}

// 	return api.post(urlUpload, data, {
// 		onUploadProgress: (e) => {
// 			const progress = e.loaded / e.total;
// 			// state({
// 			// 	progress: progress
// 			// });
// 		}
// 	})
// }

export function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export function formatRpWithoutRp(num, fixed = 0) {
	const brand = DeviceInfo.getBrand() == "unknown" ? "emulator" : DeviceInfo.getBrand();
	if (brand == "Xiaomi") return num.toString();

	num = parseFloat(num);
	var p = num.toFixed(fixed).split('.');
	return (
		p[0]
			.split('')
			.reverse()
			.reduce(function (acc, num, i, orig) {
				return num == '-' ? acc : num + (i && !(i % 3) ? '.' : '') + acc;
			}, '') +
		(isNil(p[1]) ? '' : ',' + p[1])
	);
}

export function parsingPathToMessage(msg) {
	return toTitleCase(msg.split(".").join(" ").split("/").join(""));
}

export function validateTelephone(hp) {
	var re = /^((?:\+62|62)|0)[2-9]{1}[0-9]+$/;
	return re.test(hp);
};


export function debounce(callback, wait, context = this) {
	let timeout = null;
	let callbackArgs = null;

	const later = () => callback.apply(context, callbackArgs);

	return function () {
		callbackArgs = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

const {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(size))
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
	}
}

export function getFormatDate(time) {
	var day = time.getDay();
	var month = time.getMonth();
	var date = time.getDate();
	var year = time.getFullYear();
	var minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
	var clock = time.getHours() + ":" + minute

	switch (day) {
		case 0:
			day = 'Minggu';
			break;
		case 1:
			day = 'Senin';
			break;
		case 2:
			day = 'Selasa';
			break;
		case 3:
			day = 'Rabu';
			break;
		case 4:
			day = 'Kamis';
			break;
		case 5:
			day = 'Jumat';
			break;
		case 6:
			day = 'Sabtu';
			break;
		case 7:
			day = 'Minggu';
			break;
	}

	switch (month) {
		case 0:
			month = 'Januari';
			break;
		case 1:
			month = 'Februari';
			break;
		case 2:
			month = 'Maret';
			break;
		case 3:
			month = 'April';
			break;
		case 4:
			month = 'Mei';
			break;
		case 5:
			month = 'Juni';
			break;
		case 6:
			month = 'Juli';
			break;
		case 7:
			month = 'Agustus';
			break;
		case 8:
			month = 'Sepember';
			break;
		case 9:
			month = 'Oktober';
			break;
		case 10:
			month = 'November';
			break;
		case 11:
			month = 'Desember';
			break;
	}

	return `${day}, ${date} ${month} ${year}, ${clock}`
}