var z = require('zero-fill')
  , n = require('numbro')

module.exports = function container (get, set, clear) {
  return {
    name: 'random',
    description: 'Buy and sell in a random fashion.',

    getOptions: function () {
      this.option('period', 'period length', String, '1m')
      this.option('buy_probability', '0 - 1 chance of a buy' , Number, 0.5)
      this.option('sell_probability', '0 - 1 chance of a sell' , Number, 0.5)
    },

    calculate: function (s) {
     
    },

    onPeriod: function (s, cb) {

      var want_to_buy = 0;
      var want_to_sell = 0;
      //console.log('onPeriod ')
      //if (s.balance.currency > 0 ) {
        if (Math.random()>s.options.buy_probability) {
            want_to_buy = 1
        }
      //}
      //if (s.balance.asset > 0 ) {
        if (Math.random()>s.options.sell_probability) {
            want_to_sell= 1
        }
      //}
      if (want_to_buy ==1 && want_to_sell ==1)
      {
          if (Math.random()>0.5)
          {
            want_to_sell = 0;
          }
          else
          {
            want_to_buy = 0;
          }
      }
      if (want_to_buy == 1)
      {
        //s.trend = 'up'
        //  console.log('buy')
        s.signal = 'buy'
      }
      else if (want_to_sell == 1)
      {
        //s.trend = 'down'
        //  console.log('sell')
        s.signal = 'sell'
      }
      else
      {
        s.signal = null;
      }
      
      cb()
    },

    onReport: function (s) {
      var cols = []
     
      return cols
    }
  }
}