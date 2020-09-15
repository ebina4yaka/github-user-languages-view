import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import UserLanguagesChart from '../molecules/UserLanguagesChart'
import LanguagesList from '../molecules/LanguagesList'
import { LanguagePercentage } from '../models'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
})

export default function GithubLanguagesPercentage(): React.ReactElement {
  const classes = useStyles()
  const wasm = import('../../wasm/pkg/view_github_profile')
  const [userLanguages, setUserLanguages] = useState(
    Array<LanguagePercentage>()
  )
  useEffect(() => {
    wasm.then((mod) => {
      mod
        .getGithubUserLangagesPercentage('ebina4yaka', 'css,html,dockerfile')
        .then((data: LanguagePercentage[]) => {
          setUserLanguages(data)
        })
    })
  }, [])
  return (
    <div className={classes.root}>
      <UserLanguagesChart userLanguages={userLanguages} />
      <LanguagesList userLanguages={userLanguages} />
    </div>
  )
}
