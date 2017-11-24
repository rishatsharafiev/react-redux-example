// TODO: would be amazing if we could replace an army of those inputs with some kind of a Wrapper and maybe probably with async loader

import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import App from './components/App.jsx';

const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="apps" />
        <Route path="apps">
            <IndexRoute component={AppsPage} />
            <Route path="upload" component={ApkUploadPage} />
            <Route path=":organizationId/:id" component={AppPage}>
                <IndexRoute component={SingleAppPage} />
                <Route path="appearance" component={GraphicMaterials} />
                <Route path="content" component={ContentForSales} />
                <Route path="reviews" component={AppReviews} />
            </Route>
        </Route>

        {/*<IndexRoute component={AppsPage} />*/}
        {/*<Route path="organizations/:organizationId/app/:id" component={AppPage}>*/}
            {/*<IndexRoute component={SingleAppPage} />*/}
            {/*<Route path="game_feedback" component={AppReviews} />*/}
            {/*<Route path="main_app_info" component={SingleAppPage} />*/}
            {/*<Route path="game_achievement" component={Achievement} />*/}
            {/*<Route path="game_sales_content" component={ContentForSales} />*/}
            {/*<Route path="game_graphic_materials" component={GraphicMaterials} />*/}
        {/*</Route>*/}

        <Route path="financial_reports" component={ReportsPage}>
            <IndexRoute component={FinancialReports} />
            {/*<Route path="statistic" components={Statistic} />*/}
            {/*<Route path="reports" components={Reports} />*/}
            {/*<Route path="financial_reports" components={FinancialReports} />*/}
        </Route>
        <Route path="advertisement" component={AdvertisementInfoPage} />
        <Route path="server_verification" component={ServerVerificationPage} />
        <Route path="settings" component={SettingsPage}>
            <IndexRedirect to="company_profile" />
            <Route path="company_profile" component={OrganizationProfile} />
            <Route path="access_permissions" component={AccessPermissions} />
            <Route path="developer_profile" component={DeveloperProfile} />
            <Route path="bank_account_settings" component={BankAccountSettings} />
            <Route path="payout_settings" component={PayoutSettings} />
            <Route path="charity_settings" component={CharitySettings} />
        </Route>
        <Route path="analytics" component={AnalyticsPage} />
        <Route path="help_center" component={HelpCenterPage}>
            <IndexRedirect to='own_questions' />
            <Route path="own_questions">
                <IndexRoute component={Questions} />
                <Route path=":ticketId" component={QuestionMessages} />
            </Route>
            <Route path="help_info" >
                <IndexRedirect to='faq' />
                <Route path="faq">
                    <IndexRoute components={{ accordion: HelpInfo, article: ContentPageInfo }} />
                    {/*<Route path=":faqItemId" components={{ accordion: HelpInfo, article: ContentPageInfo }} />*/}
                </Route>
                <Route path=":pageId" components={{ accordion: HelpInfo, article: ContentPageInfo }} />
            </Route>
            {/*<Route path="help_info/documents/terms" components={{ accordion: HelpInfo, article: ContentPageInfo }} />*/}
            {/*<Route path="help_info/documents/privacy" components={{ accordion: HelpInfo, article: ContentPageInfo }} />*/}
            {/*<Route path="help_info/documents/agency" components={{ accordion: HelpInfo, article: ContentPageInfo }} />*/}
        </Route>
        {/*<Route path="manuals" component={Manuals} />*/}
    </Route>
);

export default {routes};
