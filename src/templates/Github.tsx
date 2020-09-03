import React from 'react'
import GithubUser from '../organisms/GitHubUser'
import GithubRepos from '../organisms/GithubRepos'

export default function Github(): React.ReactElement {
  return (
    <>
      <GithubUser />
      <GithubRepos />
    </>
  )
}
