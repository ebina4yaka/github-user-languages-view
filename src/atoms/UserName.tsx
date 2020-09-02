import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  name: string
}

const useStyles = makeStyles({
  root: {
    fontSize: '2em',
  },
})

export default function UserName(props: Props): React.ReactElement {
  const { name } = props
  const classes = useStyles()

  return <div className={classes.root}>{name}</div>
}
