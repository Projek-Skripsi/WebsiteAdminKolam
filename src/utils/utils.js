const CONFIQ = {
  authAdmin: 'AUTH_ADMIN'
}

const currencyFormat = (num) => {
  return 'Rp' + Number(num).toLocaleString('id-ID')
}

export { CONFIQ, currencyFormat }
