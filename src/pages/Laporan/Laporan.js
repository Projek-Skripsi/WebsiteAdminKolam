import React from 'react'
import { useParams } from 'react-router-dom'

export default function Laporan () {
  const { periode } = useParams()
  const periodeAwal = periode.slice(0, 8)
  const periodeAkhir = periode.slice(9)

  return (
    <div>{periodeAwal} {periodeAkhir}</div>
  )
}
