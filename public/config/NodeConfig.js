/**
 * Created by Administrator on 2016/8/30.
 */

var node_service = ''

var page_size = 50

var timeout_time = 5

var cs_login = node_service + '/auth/login'

var csr_list = node_service + '/csr/list'

var csr_status_update = node_service + '/csr/updateCsrStatus'

var csr_save = node_service + '/csr/save'

var csr_id_check = node_service + '/csr/csrIdCheck'

var csr_delete = node_service + '/csr/delete'

var csr_save_byConsul = node_service + '/csr/saveByConsul'

var csr_detail = node_service + '/csr/detail'

var so_list = node_service + '/area/list'

var so_save = node_service + '/area/save'

var so_id_check = node_service + '/area/areaIdCheck'

var so_detail = node_service + '/area/detail'

var so_delete = node_service + '/area/delete'

var group_list = node_service + '/group/list'

var group_save = node_service + '/group/save'

var group_groupIdCheck = node_service + '/group/groupIdCheck'

var group_detail = node_service + '/group/detail'

var group_delete = node_service + '/group/delete'

var group_area_app = node_service + '/group/areaAndApp'

// var cse_list = node_service + '/cse/list'
var cse_list = node_service + '/cse/discoveryCSE'

var cse_save = node_service + '/cse/save'

var cse_cseIdCheck = node_service + '/cse/cseIdCheck'

var cse_detail = node_service + '/cse/detail'

var cse_delete = node_service + '/cse/delete'

var area_list = node_service + '/admin/areaList'

var cse_status_update = node_service + '/css/updateCssStatus'

var gw_list = node_service + '/csr/discoveryCSR'

var csm_monitor_list = node_service + '/csm/discoveryCSM'

var gw_save = node_service + '/gw/save'

var gw_gwIdCheck = node_service + '/gw/gwIdCheck'

var gw_detail = node_service + '/gw/detail'

var gw_delete = node_service + '/gw/delete'

var gw_status_update = node_service + '/gw/updateGWStatus'

var subapp_list = node_service + '/subApp/list'

var subapp_save = node_service + '/subApp/save'

var subapp_subappIdCheck = node_service + '/subApp/subAppIdCheck'

var subapp_detail = node_service + '/subApp/detail'

var subapp_delete = node_service + '/subApp/delete'

var app_list = node_service + '/subApp/appIdList'

var ccu_status = node_service + '/monitoring/ccuStatus'

var css_server_used = node_service + '/monitoring/serverStatus'

var active_user_of_so = node_service + '/monitoring/activeUserOfSo'

var server_use_of_app = node_service + '/monitoring/serverUseOfApp'

var dedicated_list = node_service + '/dedicated/list'

var dedicated_save = node_service + '/dedicated/save'

var dedicated_dedicatedIdCheck = node_service + '/dedicated/dedicatedIdCheck'

var dedicated_detail = node_service + '/dedicated/detail'

var dedicated_delete = node_service + '/dedicated/delete'

var dedicated_area_subinfo = node_service + '/dedicated/subinfo'

var permission_list = node_service + '/permission/info'

var permission_save = node_service + '/permission/save'

var server_resource_list = node_service + '/monitoringResource/list'

var admin_list = node_service + '/admin/list'

var admin_save = node_service + '/admin/save'

var admin_adminIdCheck = node_service + '/admin/adminIdCheck'

var admin_detail = node_service + '/admin/detail'

var admin_delete = node_service + '/admin/delete'

var alarm_history_list = node_service + '/alarmHistory/list'

var sed_list = node_service + '/sed/list'

var sed_save = node_service + '/sed/save'

var sed_sedIdCheck = node_service + '/sed/sedIdCheck'

var sed_detail = node_service + '/sed/detail'

var sed_delete = node_service + '/sed/delete'

var threshold_list = node_service + '/threshold/list'

var threshold_save = node_service + '/threshold/save'

var threshold_thresholdIdCheck = node_service + '/threshold/thresholdIdCheck'

var threshold_detail = node_service + '/threshold/detail'

var threshold_delete = node_service + '/threshold/delete'

var job_history_list = node_service + '/jobHistory/list'

var device_type_list = node_service + '/serviceModel/list'

var device_type_save = node_service + '/serviceModel/save'

var device_type_delete = node_service + '/serviceModel/delete'

var device_type_name_check = node_service + '/serviceModel/deviceNameCheck'

var device_type_type_check = node_service + '/serviceModel/deviceTypeCheck'

var device_type_detail = node_service + '/serviceModel/detail'

var cse_group_list = node_service + '/cseGroup/list'

var cse_group_save = node_service + '/cseGroup/save'

var cse_group_detail = node_service + '/cseGroup/detail'

var cse_group_delete = node_service + '/cseGroup/delete'

var service_group_list = node_service + '/serviceGroup/list'

var service_group_save = node_service + '/serviceGroup/save'

var service_group_detail = node_service + '/serviceGroup/detail'

var service_group_delete = node_service + '/serviceGroup/delete'

var service_groupIdCheck = node_service + '/serviceGroup/serviceGroupIdCheck'

var routing_rule_list = node_service + '/routingRule/list'

var common_router_save = node_service + '/routingRule/save'

var common_router_delete = node_service + '/routingRule/delete'

var common_router_detail = node_service + '/routingRule/detail'

var real_time_session = node_service + '/cseSession/list'

var real_time_session_detail = node_service + '/cseSession/detail'

var real_time_session_delete = node_service + '/cseSession/delete'

var visit_control_list = node_service + '/whitelist/list'

var visit_control_save = node_service + '/whitelist/save'

var visit_control_check = node_service + '/whitelist/whiteListDupCheck'

var visit_control_delete = node_service + '/whitelist/delete'

var terminal_position_list = node_service + '/stbSgid/list'

var terminal_position_delete = node_service + '/stbSgid/delete'

var terminal_position_save = node_service + '/stbSgid/save'

var terminal_position_detail = node_service + '/stbSgid/detail'

var routingBlock_list = node_service + '/routingBlock/list'

var routingBlock_save = node_service + '/routingBlock/save'

var routingBlock_check = node_service + '/routingBlock/blackListDupCheck'

var routingBlock_delete = node_service + '/routingBlock/delete'

var routingBlock_detail = node_service + '/routingBlock/detail'

var streamingTempate_save=node_service + '/streamingTemplate/save'

var streamingTempate_list=node_service + '/streamingTemplate/list'

var streamingTempate_delete=node_service + '/streamingTemplate/delete'

var streamingTempate_detail=node_service + '/streamingTemplate/detail'

var appByConsul_save=node_service + '/appByConsul/save'

var appByConsul_list=node_service + '/appByConsul/list'

var appByConsul_detail=node_service + '/appByConsul/detail'

var appByConsul_delete=node_service + '/appByConsul/delete'

var make_app_snapshot=node_service + '/jabriel/makeAppSnapshot'
