use chrono::DateTime;
use load_dotenv::load_dotenv;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::env;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};

#[derive(Debug, Serialize, Deserialize)]
pub struct GithubUser {
    pub avatar_url: String,
    pub name: String,
    pub html_url: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GithubRepository {
    pub id: u64,
    pub name: String,
    pub full_name: String,
    pub private: bool,
    pub html_url: String,
    pub url: String,
    pub updated_at: String,
    pub language: Option<String>,
    pub description: Option<String>,
}

#[derive(Debug, PartialOrd, Ord, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub struct LanguagePercentage {
    pub language: String,
    pub percentage: i32,
}

fn set_request(url: String) -> Result<web_sys::Request, web_sys::Request> {
    load_dotenv!();
    let token = env!("token");
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);
    let request = Request::new_with_str_and_init(&url, &opts)?;
    request
        .headers()
        .set("Accept", "application/vnd.github.v3+json")?;
    request
        .headers()
        .set("Authorization", &format!("bearer {}", token))?;
    return Ok(request);
}

async fn get_response(url: String) -> Result<web_sys::Response, web_sys::Request> {
    let request = set_request(url)?;
    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;
    // `resp_value` is a `Response` object.
    assert!(resp_value.is_instance_of::<Response>());
    let response: Response = resp_value.dyn_into().unwrap();
    return Ok(response);
}

fn exclude_repositories_that_do_not_have_a_language(
    repos_info: Vec<GithubRepository>,
) -> Vec<GithubRepository> {
    let mut filtered_repos: Vec<GithubRepository> = repos_info
        .into_iter()
        .filter(|repo| repo.language != None)
        .collect::<Vec<GithubRepository>>();

    filtered_repos.sort_by(|a, b| {
        DateTime::parse_from_rfc3339(&b.updated_at)
            .unwrap()
            .cmp(&DateTime::parse_from_rfc3339(&a.updated_at).unwrap())
    });
    return filtered_repos;
}

fn count_repositories_by_language(repos_info: Vec<GithubRepository>, language: &String) -> f64 {
    let filtered_repos = repos_info
        .into_iter()
        .filter(|repo| repo.language.as_ref().unwrap() == language)
        .collect::<Vec<GithubRepository>>();

    return filtered_repos.len() as f64;
}

fn calculation_percentage(target: f64, size: f64) -> i32 {
    return (target / size * 100.0).round() as i32;
}

fn calculation_langage_percentage(repos_info: Vec<GithubRepository>) -> Vec<LanguagePercentage> {
    let mut language_percentages: HashSet<LanguagePercentage> = HashSet::new();
    let filtered_repos = &exclude_repositories_that_do_not_have_a_language(repos_info);
    let repos_len = filtered_repos.len() as f64;
    for repo in filtered_repos {
        let repo_copy = repo.clone();
        let language = repo_copy.language.unwrap();
        let percentage = calculation_percentage(
            count_repositories_by_language(filtered_repos.to_vec(), &language),
            repos_len,
        );
        let language = LanguagePercentage {
            language: language,
            percentage: percentage,
        };
        language_percentages.insert(language);
    }
    let mut language_percentages_vec: Vec<LanguagePercentage> =
        language_percentages.into_iter().collect();
    language_percentages_vec.sort_by(|a, b| b.percentage.cmp(&a.percentage));
    return language_percentages_vec;
}

#[wasm_bindgen(js_name = getGithubUser)]
pub async fn get_github_user(user_name: String) -> Result<JsValue, JsValue> {
    let url = format!("https://api.github.com/users/{}", user_name);
    let response = get_response(url).await?;
    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(response.json()?).await?;
    (json.into_serde() as Result<GithubUser, serde_json::error::Error>)
        .map(|user_info| JsValue::from_serde(&user_info).unwrap())
        .map_err(|e| JsValue::from_str(&format!("{}", e)))
}

#[wasm_bindgen(js_name = getGithubUserRepos)]
pub async fn get_github_user_repos(user_name: String) -> Result<JsValue, JsValue> {
    let url = format!("https://api.github.com/users/{}/repos", user_name);
    let response = get_response(url).await?;
    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(response.json()?).await?;
    (json.into_serde() as Result<Vec<GithubRepository>, serde_json::error::Error>)
        .map(|repos_info| {
            JsValue::from_serde(&exclude_repositories_that_do_not_have_a_language(
                repos_info,
            ))
            .unwrap()
        })
        .map_err(|e| JsValue::from_str(&format!("{}", e)))
}

#[wasm_bindgen(js_name = getGithubUserLangagePercentages)]
pub async fn get_github_user_langage_percentages(user_name: String) -> Result<JsValue, JsValue> {
    let url = format!("https://api.github.com/users/{}/repos", user_name);
    let response = get_response(url).await?;
    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(response.json()?).await?;
    (json.into_serde() as Result<Vec<GithubRepository>, serde_json::error::Error>)
        .map(|repos_info| JsValue::from_serde(&calculation_langage_percentage(repos_info)).unwrap())
        .map_err(|e| JsValue::from_str(&format!("{}", e)))
}
