import {combineReducers} from 'redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {changeTopMenu, changeLeftMenu} from '../reducers/MenuReducer'
import {changeSearch1Type} from '../reducers/SearchReducer'
import {getSysManagerCSRList, createSysManagerCSR, detailSysManagerCSR} from '../reducers/SystemManagerCSRReducer'
import {getSysManagerSOList, soSave, soDetail} from '../reducers/SystemManagerSOReducer'
import {login} from '../reducers/LoginReducer'
import {groupList, groupDetail, groupSave} from '../reducers/SystemManagerGroupReducer'
import {getSysManagerCSEList, cseSave, cseDetail} from '../reducers/SystemManagerCSEReducer'
import {getSysManagerGWList, gwSave, gwDetail} from '../reducers/SystemManagerGWReducer'
import {getSysManagerSubappList, subappSave, subappDetail} from '../reducers/SystemManagerSubappReducer'
import {getStreamingTemplateList, getStreamingTemplateDetail} from '../reducers/StreamingTemplateReducer'
import {getAppByConsulDetail, getAppByConsulList} from '../reducers/AppManagementByConsulReducer'
import {
    getSysManagerDedicatedList,
    dedicatedDetail,
    dedicatedSave,
    commonRouterList,
    commonRouterSave,
    commonRouterDetail,
    visitControlList,
    blacklistList,
    blacklistDetail
} from '../reducers/SystemManagerDedicatedReducer'
import {permissionSave, getSysManagerPermissionList} from '../reducers/SystemManagerPermissionReducer'
import {serverResourceList} from '../reducers/MonitorReducer'
import {getAdminList, adminSave, adminDetail} from '../reducers/AdminReducer'
import {getAlarmHistoryList} from '../reducers/AlarmReducer'
import {sedDetail, sedSave, getSysManagerSEDList} from '../reducers/SystemManagerSEDReducer'
import {thresholdDetail, thresholdSave, getSysManagerThresholdList} from '../reducers/SystemManagerThresholdReducer'
import {commonReducer, getMutipleConditoinList, getDetailSession} from '../reducers/CommonReducer'
import {getJobHistoryList} from '../reducers/JobHistoryReducer'
import {getDeviceTypeList, deviceTypeSave, deviceTypeDetail} from '../reducers/DeviceTypeReducer'
import {
    getSysManagerCSEGroupList,
    cseGroupSave,
    cseGroupDetail,
    getCSEOfGroupList
} from '../reducers/SystemManagerCSEGroupReducer'
import {
    getSysManagerServiceGroupList,
    serviceGroupDetail,
    serviceGroupSave
} from '../reducers/SystemManagerServiceGroupReducer'
import {getTerminalPositionList, terminalPositionSave,terminalPositionDetail} from '../reducers/TerminalPositionReducer'

/*rebish reducer start*/
import {getCityList,getCityOfOrganizationList} from '../reducers/CitySettingReducer'
import {getClassConfList,getClassConfDetail} from '../reducers/ClassConfReducer'
import {getManualRecordList} from '../reducers/ManualRecordReducer'
import {getTransitLineList} from '../reducers/TransitLineReducer'
import {getCorrectionList} from '../reducers/CorrectionReducer'
import {getComplaintList} from '../reducers/ComplaintReducer'
import {getStoreSettlementList} from '../reducers/StoreSettlementReducer'
import {getStoreList} from '../reducers/StoreReducer'
import {getReviewList} from '../reducers/ReviewReducer'
import {getGeneralUserList,getGeneralUserDetail} from '../reducers/GeneralUserReducer'
import {getOrganizationList,getOrganizationDetail,getProgressData} from '../reducers/OrganizationReducer'
import {getAdminUserList,getAdminUserDetail} from '../reducers/AdminUserReducer'
import {getNoticeList} from '../reducers/NoticeReducer'
import {getStatisticByClassifyList,getStatisticByCityList,getStatisticByOrganizationList,getStatisticByRangeDateList,getStatisticSettlementDate,getStatisticByTotalList} from '../reducers/StatisticReducer'
import {getOperationMonitor,getOrganizationMonitor} from '../reducers/SystemMonitorReducer'
/*end*/

import {reducer as reduxFormReducer} from 'redux-form'

const rootReducer = combineReducers({
    login,
    changeTopMenu,
    changeLeftMenu,
    changeSearch1Type,
    getSysManagerCSRList,
    createSysManagerCSR,
    detailSysManagerCSR,
    getSysManagerSOList,
    soSave,
    soDetail,
    groupList,
    groupDetail,
    groupSave,
    getSysManagerCSEList,
    cseSave,
    cseDetail,
    getSysManagerGWList,
    gwSave,
    gwDetail,
    blacklistDetail,
    getSysManagerSubappList,
    subappSave,
    subappDetail,
    getSysManagerDedicatedList,
    dedicatedDetail,
    dedicatedSave,
    commonRouterList,
    commonRouterDetail,
    visitControlList,
    blacklistList,
    permissionSave,
    getSysManagerPermissionList,
    serverResourceList,
    getAdminList,
    adminSave,
    adminDetail,
    getAlarmHistoryList,
    sedDetail,
    sedSave,
    getSysManagerSEDList,
    thresholdDetail,
    thresholdSave,
    getSysManagerThresholdList,
    commonReducer,
    getJobHistoryList,
    getDeviceTypeList,
    deviceTypeSave,
    deviceTypeDetail,
    getSysManagerCSEGroupList,
    cseGroupSave,
    cseGroupDetail,
    getSysManagerServiceGroupList,
    commonRouterSave,
    serviceGroupDetail,
    serviceGroupSave,
    getCSEOfGroupList,
    getMutipleConditoinList,
    getDetailSession,
    getTerminalPositionList,
    terminalPositionSave,
    terminalPositionDetail,
    getStreamingTemplateList,
    getStreamingTemplateDetail,
    getAppByConsulDetail,
    getAppByConsulList,
    getCityList,
    getCityOfOrganizationList,
    getClassConfList,
    getManualRecordList,
    getTransitLineList,
    getCorrectionList,
    getComplaintList,
    getStoreSettlementList,
    getStoreList,
    getClassConfDetail,
    getReviewList,
    getGeneralUserList,
    getOrganizationList,
    getAdminUserList,
    getAdminUserDetail,
    getNoticeList,
    getStatisticByClassifyList,
    getStatisticByCityList,
    getStatisticByOrganizationList,
    getStatisticByRangeDateList,
    getStatisticSettlementDate,
    getOrganizationDetail,
    getProgressData,
    getOperationMonitor,
    getOrganizationMonitor,
    getGeneralUserDetail,
    getStatisticByTotalList,
    form: reduxFormReducer,
    routing: routerReducer
})

export default rootReducer