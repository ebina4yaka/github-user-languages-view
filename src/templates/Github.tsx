import React from 'react'
import { makeStyles } from '@material-ui/core'
import GithubUser from '../organisms/GitHubUser'
import GithubLanguagesPercentage from '../organisms/GithubLangagesPercentage'

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
        <GithubLanguagesPercentage />
      </div>
    </>
  )
}
