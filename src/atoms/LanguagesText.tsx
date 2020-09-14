import React from 'react'
import { makeStyles } from '@material-ui/core'
import { LanguagePercentage } from '../models'

type Props = {
  userLanguages: LanguagePercentage[]
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  card: {
    margin: 5,
  },
})

export default function GithubLanguagesPercentage(
  props: Props
): React.ReactElement {
  const { userLanguages } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {userLanguages.map((data: LanguagePercentage) => {
        return (
          <div key={data.name} className={classes.card}>
            {`${data.name} ${data.percentage}%`}
          </div>
        )
      })}
    </div>
  )
}
