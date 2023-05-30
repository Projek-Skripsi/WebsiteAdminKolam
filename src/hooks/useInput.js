import { useState } from 'react'

export default function useInput (defaultValue) {
  const [value, setValue] = useState(defaultValue)
  const handlerValueChange = (event) => setValue(event.target.value)

  return [value, handlerValueChange]
}
