const conf = {
    app_name: 'Cryptogp',
    app_url: process.env.app_url,
    realtime_wallet: process.env.realtime_wallet || 60000,
    auth: true,
    api: process.env.api,
    sportApiTest: process.env.sportApiTest,
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    base_url: process.env.base_url,
    recaptcha_key: process.env.recaptcha_key,
    support_email: process.env.support_email,
    faq_request_bonus_url: process.env.faq_request_bonus_url,
    games: process.env.games,
    //localize
    default_language:process.env.default_language,
    languages:process.env.languages,
    //Google Authenticator
    ga_url_android: process.env.ga_url_android,
    ga_url_app_store: process.env.ga_url_app_store,
    ga_url_window_phone: process.env.ga_url_window_phone,
    ga_url_desktop: process.env.ga_url_desktop,
    //social
    social: process.env.social,
    //quick_links
    quick_links: process.env.quick_links,
    //tips
    socket_url:  process.env.socket_url
}

export default conf