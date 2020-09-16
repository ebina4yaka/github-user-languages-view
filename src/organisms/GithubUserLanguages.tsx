import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import UserLanguagesChart from '../molecules/UserLanguagesChart'
import LanguagesList from '../molecules/LanguagesList'
import { UserLanguage } from '../models'

type Props = {
  userName: string
  hideLanguages: string
}

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

export default function GithubUserLanguages(props: Props): React.ReactElement {
  const { userName, hideLanguages } = props
  const classes = useStyles()
  const wasm = import('../../wasm/pkg/github_user_languages_view')
  const [userLanguages, setUserLanguages] = useState(Array<UserLanguage>())
  useEffect(() => {
    wasm.then((mod) => {
      mod
        .getUserLanguages(userName, hideLanguages)
        .then((data: UserLanguage[]) => {
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
