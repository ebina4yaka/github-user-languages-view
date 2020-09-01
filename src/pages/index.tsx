import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'

export default function Index(): React.ReactElement {
  const wasm = import('../../wasm/pkg/wasm_nextjs_test')
  useEffect(() => {
    wasm.then((mod) => {
      mod.greet()
    })
  }, [])
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        wasm-nextjs-test
      </Typography>
    </>
  )
}
