import React, { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginBottom: '1em',
  },
})

export default function Copyright(): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://github.com/ebina4yaka/">
          ebina4yaka
        </MuiLink>{' '}
        {`${new Date().getFullYear()}.`}
      </Typography>
    </div>
  )
}
