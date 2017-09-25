module.exports = {
  _ns: 'zenbot',

  'strategies.martins_stoploss': require('./strategy'),
  'strategies.list[]': '#strategies.martins_stoploss'
}