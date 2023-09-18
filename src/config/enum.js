const api_uri = "https://api.sasohan.net";

exports.enum_api_uri = {
    api_uri: `${api_uri}`,

    m_list: `${api_uri}/v1/main/manager`,
    blog_list: `${api_uri}/v1/main/blog`,
    ytb_list: `${api_uri}/v1/main/youtube`,
    review_list: `${api_uri}/v1/main/review-list`,
    review_cont: `${api_uri}/v1/main/review-content/:list_no`,
    user_count: `${api_uri}/v1/main/user-count`,
    policy_cont: `${api_uri}/v1/site/policy/:policy_type`,
    site_info: `${api_uri}/v1/site/site-info`,

    //앱----------------------------------------
    //회원가입
    m_realname_okurl: `https://jja-gg.com/member/okurl_app.asp`,
    m_realname: `${api_uri}/v1/app/user/realname/:tradeid`,
    m_id_check: `${api_uri}/v1/app/user/check-id/:m_id`,
    m_nick_check: `${api_uri}/v1/app/user/check-nic`,
    m_address: `${api_uri}/v1/select-list/address`,
    m_address2: `${api_uri}/v1/select-list/address/:parent_local_code`,
    m_select_list: `${api_uri}/v1/select-list`,
    m_img_add: `${api_uri}/v1/app/user/user-profile-add`,
}