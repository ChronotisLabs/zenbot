module.exports = {
  _ns: 'zenbot',

  'strategies.martins_stoploss_c': require('./strategy'),
  'strategies.list[]': '#strategies.martins_stoploss_c'
}