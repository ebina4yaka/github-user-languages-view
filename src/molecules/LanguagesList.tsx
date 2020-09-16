import React from 'react'
import { makeStyles } from '@material-ui/core'
import Language from '../atoms/Language'
import { LanguagePercentage } from '../models'

type Props = {
  userLanguages: LanguagePercentage[]
}

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'left',
    alignContent: 'center',
  },
})

export default function GithubLanguagesPercentage(
  props: Props
): React.ReactElement {
  const { userLanguages } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {userLanguages.map((language: LanguagePercentage) => {
        return <Language language={language} />
      })}
    </div>
  )
}
