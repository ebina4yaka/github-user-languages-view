import React, { useEffect, useState } from 'react'
import TopPageAvatar from '../atoms/TopPageAvatar'

type GithubUser = {
  avatar_url: string
  name: string
  html_url: string
}

function initGithubUser(): GithubUser {
  return {
    avatar_url: '',
    name: '',
    html_url: '',
  }
}

export default function ViewGithubUser(): React.ReactElement {
  const wasm = import('../../wasm/pkg/wasm_nextjs_test')
  const [githubUser, setGithubUser] = useState<GithubUser>(initGithubUser())
  useEffect(() => {
    wasm.then((mod) => {
      mod.getGithubUser('ebina4yaka').then((data: GithubUser) => {
        setGithubUser(data)
      })
    })
  }, [])
  return (
    <>
      <TopPageAvatar avatarUrl={githubUser.avatar_url} name={githubUser.name} />
    </>
  )
}
