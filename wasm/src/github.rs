use std::env;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};

fn set_request(url: String) -> Result<web_sys::Request, web_sys::Request> {
    let token = env::var("token").expect("token is not defined");
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
    Ok(request)
}

pub async fn get_response(url: String) -> Result<web_sys::Response, web_sys::Request> {
    let request = set_request(url)?;
    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;
    // `resp_value` is a `Response` object.
    assert!(resp_value.is_instance_of::<Response>());
    let response: Response = resp_value.dyn_into().unwrap();
    Ok(response)
}
