/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes,videoCodes} from '../components/Tool/Tool'
import {
    START_CSE_LIST,
    END_CSE_LIST,
    START_CSE_SAVE,
    END_CSE_SAVE,
    START_CSE_DETAIL,
    END_CSE_DETAIL,
    END_AREA_LIST
} from '../constants/index'

export function getSysManagerCSEList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case START_CSE_LIST:
            state = {...state, fetching: true};
            return state;
        case END_CSE_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function cseSave(state = {data: {}, fetching: false,areaList:[]}, action) {
    switch (action.type) {
        case START_CSE_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_CSE_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        case END_AREA_LIST:
            state = {areaList:action.json};
            return state;
        default:
            return state;
    }
}

export function cseDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_CSE_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_CSE_DETAIL:
            var server={
                hostName:action.json.cssVo.hostName,
                serverIp:action.json.cssVo.serverIp,
                osType:action.json.cssVo.osType,
                cpuInfo:action.json.cssVo.cpuInfo,
                gpuInfo:action.json.cssVo.gpuInfo,
                memory:action.json.cssVo.memory,
            }

            var engine={
                cssVersion:action.json.cssVo.cssVersion,
                serviceType:action.json.cssVo.serviceType,
                serverPort:action.json.cssVo.serverPort,
                maxConnect:action.json.cssVo.maxConnect,
                currentConnect:action.json.cssVo.currentConnect,
                targetBitrate:action.json.cssVo.targetBitrate,
                videoBitrate:action.json.cssVo.videoBitrate,
                frameRate:action.json.cssVo.frameRate,
                audioCodec:audioCodes(action.json.cssVo.audioCodec),
                videoCodec:videoCodes(action.json.cssVo.videoCodec),
                gopSize:action.json.cssVo.gopSize,
                ermIpPort:action.json.cssVo.ermIp+':'+action.json.cssVo.ermPort,
            }

            var application={
                appId:action.json.cssVo.appId,
                appName:action.json.cssVo.appName,
                webUrl:action.json.cssVo.webUrl,
                videoWidthHeight:action.json.cssVo.videoWidth+'*'+action.json.cssVo.videoHeight,
                audio:action.json.cssVo.audio == 1 ? '启用' : '未启用',
                loadTime:action.json.cssVo.loadTime,
            }
            var status={
                areaName:action.json.cssVo.areaName,
                location:action.json.cssVo.location,
                groupId:action.json.cssVo.groupId,
                status:action.json.cssVo.status,
                regDate:action.json.cssVo.regDate
            }
            state = {fetching: false, data: action.json, server: server, engine: engine, application: application, status: status};
            return state;
        default:
            return state;
    }
}
