use chrono::DateTime;
use load_dotenv::load_dotenv;
use serde::{Deserialize, Serialize};
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

#[derive(Debug, Serialize, Deserialize)]
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

fn partition_repositories(repos_info: &mut Vec<GithubRepository>, l: isize, h: isize) -> isize {
    let mut i = l - 1; // Index of the smaller element
    for j in l..h {
        if DateTime::parse_from_rfc3339(&repos_info[h as usize].updated_at).unwrap()
            <= DateTime::parse_from_rfc3339(&repos_info[j as usize].updated_at).unwrap()
        {
            i = i + 1;
            repos_info.swap(i as usize, j as usize);
        }
    }
    repos_info.swap((i + 1) as usize, h as usize);
    i + 1
}

fn quick_sort_partition_repositories(
    repos_info: &mut Vec<GithubRepository>,
    start: isize,
    end: isize,
) {
    if start < end && end - start >= 1 {
        let pivot = partition_repositories(repos_info, start as isize, end as isize);
        quick_sort_partition_repositories(repos_info, start, pivot - 1);
        quick_sort_partition_repositories(repos_info, pivot + 1, end);
    }
}

fn sort_repositories(repos_info: &mut Vec<GithubRepository>) {
    let start = 0;
    let end = repos_info.len() - 1;
    quick_sort_partition_repositories(repos_info, start, end as isize);
}

fn exclude_repositories_that_do_not_have_a_language(
    repos_info: Vec<GithubRepository>,
) -> Vec<GithubRepository> {
    let mut filtered_repos: Vec<GithubRepository> = repos_info
        .into_iter()
        .filter(|repo| repo.language != None)
        .collect::<Vec<GithubRepository>>();

    sort_repositories(&mut filtered_repos);
    return filtered_repos;
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
