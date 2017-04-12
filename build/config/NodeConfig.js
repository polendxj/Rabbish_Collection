/**
 * Created by Administrator on 2016/8/30.
 */

var node_service = '';

var page_size = 50;

var timeout_time = 5;

var thresholdValue = 100;

var imgBaseUrl = "http://dev.xysy.tech";

var city_list = node_service + "/rsapp/city";
var city_register = node_service + "/rsapp/city/register";
var cityOfOrganization_list = node_service + "/rsapp/cityOfOrganization";
var organization_list = node_service + "/rsapp/organization";
var organization_register = node_service + "/rsapp/organization/register";
var country_register = node_service + "/rsapp/country/register";
var country_delete = node_service + "/rsapp/country/delete";
var city_delete = node_service + "/rsapp/city/delete";
var organization_delete = node_service + "/rsapp/organization/delete";
var organization_detail = node_service + "/rsapp/organization/detail";
var organization_update = node_service + "/rsapp/organization/update";
var classConf_list = node_service + "/rsapp/classConf";
var classConf_register = node_service + "/rsapp/classConf/register";
var classConf_update = node_service + "/rsapp/classConf/update";
var classConf_delete = node_service + "/rsapp/classConf/delete";
var classConf_detail = node_service + "/rsapp/classConf/detail";
var manualRecord_list = node_service + "/rsapp/manualRecord";
var manualRecord_register = node_service + "/rsapp/manualRecord/register";
var transitLine_list = node_service + "/rsapp/transitLine";
var transitLine_register = node_service + "/rsapp/transitLine/register";
var reset_password = node_service + "/rsapp/password/reset";
var user_login = node_service + "/rsapp/user/login";
var adminUser_list = node_service + "/rsapp/adminUser";
var adminUser_register = node_service + "/rsapp/adminUser/register";
var adminUser_delete = node_service + "/rsapp/adminUser/delete";
var adminUser_detail = node_service + "/rsapp/adminUser/detail";
var adminUser_update = node_service + "/rsapp/adminUser/update";
var modify_password = node_service + "/rsapp/password";
var get_authcode = node_service + "/rsapp/authcode/admin";
var generalUser_list = node_service + "/rsapp/generalUser";
var generalUser_detail = node_service + "/rsapp/generalUser/detail";
var generalUser_register = node_service + "/rsapp/generalUser/register";
var generalUser_delete = node_service + "/rsapp/generalUser/delete";
var generalUser_userStatus = node_service + "/rsapp/user/lock";
var review_list = node_service + "/rsapp/review";
var review_delete = node_service + "/rsapp/review/delete";
var reply_delete = node_service + "/rsapp/reply/delete";
var reply_register = node_service + "/rsapp/reply/register";
var complaint_list = node_service + "/rsapp/complaint";
var complaint_update = node_service + "/rsapp/complaint/update";
var correction_list = node_service + "/rsapp/correction";
var correction_items = node_service + "/rsapp/configureItem/correctionItems";
var store_list = node_service + "/rsapp/store";
var store_approve = node_service + "/rsapp/store/approved";
var storeSettlement_list = node_service + "/rsapp/storeSettlement";
var storeSettlement_register = node_service + "/rsapp/storeSettlement/register";
var notice_list = node_service + "/rsapp/notice";
var notice_detail = node_service + "/rsapp/notice/detail";
var notice_register = node_service + "/rsapp/notice/register";
var notice_delete = node_service + "/rsapp/notice/delete";
var statisticByClassify_list = node_service + "/rsapp/statistic/classifying/class";
var statisticByDetail_list = node_service + "/rsapp/statistic/detail";
var statisticByCity_list = node_service + "/rsapp/statistic/classifying/city";
var statisticByOrganization_list = node_service + "/rsapp/statistic/classifying/organization";
var statisticByRangeDate_list = node_service + "/rsapp/statistic/total";
var statistic_settlement = node_service + "/rsapp/statistic/settlement";
var qrcode_generate = node_service + "/rsapp/qrcode/generate";
var qrcode_export = node_service + "http://dev.xysy.tech/rsapp/qrcode/export";
var qrcode_export_download = node_service + "http://dev.xysy.tech/rsapp/qrcode/export/download";
var qrcode_generate_download = node_service + "http://dev.xysy.tech/rsapp/qrcode/generate/download";
var bind_qrcode = node_service + "/rsapp/user/qrcode";
var operation_monitor = node_service + "/rsapp/operationData";
var operation_organization_total = node_service + "/rsapp/organization/total";
var versionControl_list = node_service + "/rsapp/latestVersion";


