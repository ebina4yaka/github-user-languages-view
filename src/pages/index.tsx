import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function Index(): React.ReactElement {
  const wasm = import('wasm-react-tutorial')
  wasm.then((mod) => {
    mod.greet()
  })
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        wasm-react-test
      </Typography>
    </>
  )
}
