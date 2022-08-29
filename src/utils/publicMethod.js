
import axios from 'axios'

/**
 *  
 * @param {*} thisObj  this
 * @param {*} url  url 
 * @param {*} param  参数 json 格式
 * @param {*} successFunction 成功回调
 * @param {*} errorFunction  失败回调
 */
export function httpRequest4Post(thisObj,url,param,successFunction,errorFunction){
    param = ((param === null) || param === '' || param === undefined) ? {} : param;
    thisObj.$http({
        method:'POST',
        url : url,
        data: param
    }).then((res) => {
        successFunction(res);
    }).catch((err) => {
        if(errorFunction !== null && errorFunction !== '' && errorFunction !== undefined) {
            errorFunction(err);
            console.log(err);
        } 
    })
}


export function httpRequest4Get(thisObj,url,param,successFunction,errorFunction){
    param = ((param === null) || param === '' || param === undefined) ? {} : param;

    thisObj.$http({
        method:'GET',
        url : url,
        data: param
    }).then((res) => {
        successFunction(res);
    }).catch((err) => {
        if(errorFunction !== null && errorFunction !== '' && errorFunction !== undefined) {
            errorFunction(err);
            console.log(err);
        } 
    })
}