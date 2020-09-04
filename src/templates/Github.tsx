import React from 'react'
import { makeStyles } from '@material-ui/core'
import GithubUser from '../organisms/GitHubUser'
import GithubLanguagePercentages from '../organisms/GithubLangagePercentages'
import GithubRepos from '../organisms/GithubRepos'

const useStyles = makeStyles({
  repos: {
    marginTop: 20,
  },
})

export default function Github(): React.ReactElement {
  const classes = useStyles()
  return (
    <>
      <div>
        <GithubUser />
      </div>
      <div className={classes.repos}>
        <GithubLanguagePercentages />
      </div>
      <div className={classes.repos}>
        <GithubRepos />
      </div>
    </>
  )
}
