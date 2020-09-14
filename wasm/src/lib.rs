mod github;
mod models;
mod user_languages;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;

#[wasm_bindgen(js_name = getGithubUser)]
pub async fn get_github_user(user_name: String) -> Result<JsValue, JsValue> {
    let url = format!("https://api.github.com/users/{}", user_name);
    let response = github::get_response(url).await?;
    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(response.json()?).await?;
    (json.into_serde() as Result<models::GithubUser, serde_json::error::Error>)
        .map(|user_info| JsValue::from_serde(&user_info).unwrap())
        .map_err(|e| JsValue::from_str(&format!("{}", e)))
}

#[wasm_bindgen(js_name = getGithubUserLangagesPercentage)]
pub async fn get_github_user_langage_percentage(
    user_name: String,
    hide_languages: String,
) -> Result<JsValue, JsValue> {
    let get_url = || -> String {
        if hide_languages == *"" {
            return format!(
                "https://github-user-languages-api.herokuapp.com/user/{}",
                user_name
            );
        }
        return format!(
            "https://github-user-languages-api.herokuapp.com/user/{}?hide={}",
            user_name, hide_languages
        );
    };
    let response = user_languages::get_response(get_url()).await?;
    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(response.json()?).await?;
    (json.into_serde() as Result<Vec<models::LanguagePercentage>, serde_json::error::Error>)
        .map(|languages| JsValue::from_serde(&languages).unwrap())
        .map_err(|e| JsValue::from_str(&format!("{}", e)))
}
