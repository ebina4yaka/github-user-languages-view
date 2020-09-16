import React from 'react'
import { makeStyles } from '@material-ui/core'
import { UserLanguage } from '../models'

type Props = {
  language: UserLanguage
}

const useStyles = makeStyles({
  root: {
    fontSize: '1em',
    marginBottom: 4,
  },
  dot: {
    height: '1em',
    width: '1em',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '0.4em',
  },
})

export default function Language(props: Props): React.ReactElement {
  const { language } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <span
        className={classes.dot}
        style={{ backgroundColor: language.color }}
      />
      {`${language.name} ${language.percentage}%`}
    </div>
  )
}
