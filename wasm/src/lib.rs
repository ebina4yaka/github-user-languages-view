mod client;
mod models;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;

#[wasm_bindgen(js_name = getUserLanguages)]
pub async fn get_user_languages(
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
    let response = client::get_response(get_url()).await?;
    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(response.json()?).await?;
    (json.into_serde() as Result<Vec<models::LanguagePercentage>, serde_json::error::Error>)
        .map(|languages| JsValue::from_serde(&languages).unwrap())
        .map_err(|e| JsValue::from_str(&format!("{}", e)))
}
