/**
 * Created by Administrator on 2016/8/3.
 */
import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import LoginContainer from './containers/Login'
import Developing from './containers/Developing'
import CitySettingContainer from './containers/CitySettingContainer'
import CitySettingRegisterContainer from './containers/CitySettingRegisterContainer'
import configureStore from './store/configureStore'
import RubbishClassListContainer from './containers/rubbishClass/RubbishClassListContainer';
import RubbishClassRegisterContainer from './containers/rubbishClass/RubbishClassRegisterContainer';
import RubbishClassUpdateContainer from './containers/rubbishClass/RubbishClassUpdateContainer';
import TransitLineListContainer from './containers/transitLine/TransitLineListContainer';
import TransitLineRegisterContainer from './containers/transitLine/TransitLineRegisterContainer';
import ManualRecordListContainer from './containers/manualRecord/ManualRecordListContainer';
import ManualRecordRegisterContainer from './containers/manualRecord/ManualRecordRegisterContainer';
import AdminUserListContainer from './containers/adminUserInfo/AdminUserListContainer';
import AdminUserRegisterContainer from './containers/adminUserInfo/AdminUserRegisterContainer';
import AdminUserUpdateContainer from './containers/adminUserInfo/AdminUserUpdateContainer';
import ReviewListContainer from './containers/review/ReviewListContainer';
import ComplaintContainer from './containers/complaint/ComplaintContainer';
import UserListContainer from './containers/userManage/UserListContainer';
import UserRegisterContainer from './containers/userManage/UserRegisterContainer';
import CorrectionListContainer from './containers/correction/CorrectionListContainer';
import StoreListContainer from './containers/store/StoreListContainer';
import StoreSettlementListContainer from './containers/storeSettlement/StoreSettlementListContainer';
import NoticeListContainer from './containers/notice/NoticeListContainer';
import NoticeRegisterContainer from './containers/notice/NoticeRegisterContainer';
import StatisticListContainer from './containers/statistic/StatisticListContainer';
import OrganizationListContainer from './containers/organization/OrganizationListContainer';
import OrganizationRegisterContainer from './containers/organization/OrganizationRegisterContainer';
import OrganizationUpdateContainer from './containers/organization/OrganizationUpdateContainer';

let store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="/Developing" component={Developing}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/DataManage/CitySetting" component={CitySettingContainer}/>
                <Route path="/DataManage/CitySetting/Register" component={CitySettingRegisterContainer}/>
                <Route path="/DataManage/RubbishClass" component={RubbishClassListContainer}/>
                <Route path="/DataManage/RubbishClass/Register" component={RubbishClassRegisterContainer}/>
                <Route path="/DataManage/RubbishClass/Update/:id" component={RubbishClassUpdateContainer}/>
                <Route path="/DataManage/TransitLine" component={TransitLineListContainer}/>
                <Route path="/DataManage/TransitLine/Register" component={TransitLineRegisterContainer}/>
                <Route path="/DataManage/ManualRecord" component={ManualRecordListContainer}/>
                <Route path="/DataManage/ManualRecord/Register" component={ManualRecordRegisterContainer}/>
                <Route path="/CustomerService/AdminUserManage" component={AdminUserListContainer}/>
                <Route path="/CustomerService/AdminUserManage/Register" component={AdminUserRegisterContainer}/>
                <Route path="/CustomerService/AdminUserManage/Update/:id" component={AdminUserUpdateContainer}/>
                <Route path="/CustomerService/ReviewManage" component={ReviewListContainer}/>
                <Route path="/CustomerService/ComplaintManage" component={ComplaintContainer}/>
                <Route path="/CustomerService/UserManage" component={UserListContainer}/>
                <Route path="/CustomerService/UserManage/Register" component={UserRegisterContainer}/>
                <Route path="/DataManage/CorrectionManage" component={CorrectionListContainer}/>
                <Route path="/CustomerService/StoreManage" component={StoreListContainer}/>
                <Route path="/CustomerService/StoreSettlementManage" component={StoreSettlementListContainer}/>
                <Route path="/SystemNotice/NoticeManage" component={NoticeListContainer}/>
                <Route path="/SystemNotice/NoticeManage/Register" component={NoticeRegisterContainer}/>
                <Route path="/Statistic/RubbishPutIn" component={StatisticListContainer}/>
                <Route path="/CustomerService/OrganizationManage" component={OrganizationListContainer}/>
                <Route path="/CustomerService/OrganizationManage/Register" component={OrganizationRegisterContainer}/>
                <Route path="/CustomerService/OrganizationManage/Update/:id" component={OrganizationUpdateContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('wrap')
)



