module.exports = {
  _ns: 'zenbot',

  'strategies.martins_mysql_stoploss1': require('./strategy'),
  'strategies.list[]': '#strategies.martins_mysql_stoploss1'
}
