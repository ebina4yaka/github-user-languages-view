import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Copyright from '../atoms/Copyright'

const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },
})

export default function Footer(): ReactElement {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <Copyright />
    </footer>
  )
}
