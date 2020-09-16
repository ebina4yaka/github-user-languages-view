import React from 'react'
import { makeStyles } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import GithubUser from '../organisms/GitHubUser'
import GithubLanguagesPercentage from '../organisms/GithubLangagesPercentage'
import Footer from '../organisms/Footer'

const useStyles = makeStyles({
  repos: {
    marginBottom: '1em',
  },
  link: {
    textAlign: 'center',
    fontSize: '1.1em',
    marginBottom: '0.5em',
  },
})

export default function Index(): React.ReactElement {
  const classes = useStyles()
  return (
    <>
      <div>
        <GithubUser />
      </div>
      <div className={classes.repos}>
        <GithubLanguagesPercentage />
      </div>
      <div className={classes.link}>
        <Link href="https://github.com/ebina4yaka/github-user-languages-view">
          View Source
        </Link>
      </div>
      <Footer />
    </>
  )
}
