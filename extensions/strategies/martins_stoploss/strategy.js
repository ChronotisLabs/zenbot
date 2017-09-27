var z = require('zero-fill')
  , n = require('numbro')

module.exports = function container (get, set, clear) {
  return {
    name: 'martins_stoploss',
    description: 'Buy when things are looking up, sell on profit or loss',

    getOptions: function () {
      this.option('period', 'period length', String, '30m')
       this.option('min_periods', 'min. number of history periods', Number, 24)
      this.option('loss_pct', 'How much can we lose' , Number, 1)
      this.option('profit_pct', 'When to sell' , Number, 5)
      this.option('buy_trigger_pct', 'When to buy' , Number, 0.5)
      this.option('buy_trigger_length', 'Period to compare to' , Number, 0.5)
    },

    //
    // called every internal trading interval
    //
    calculate: function (s) {
     if (s.lookback.length >= s.options.min_periods) {

     } 
    },

    onPeriod: function (s, cb) {


      if (typeof s.strategy_state === 'undefined')
      {
        s.strategy_state = 'looking'
      }

      if (s.lookback.length < s.options.min_periods) {
        s.signal=null
        return cb()
      } 

      if (s.strategy_state == 'holding' )
      {

          if (s.period.close > s.strategy_sell_price)
          {
             s.signal = 'sell'
             return cb()
          }


          if (s.period.close < s.strategy_stoploss_price)
          {
             s.signal = 'sell'
             return cb()
          }

      }
      if (s.strategy_state == 'looking')
      {

        if (s.period.close > s.period.open * (1+s.options.buy_trigger_pct/100 ))
        {
            s.signal = 'buy'
            s.strategy_sell_price = s.period.close  * (1+s.options.profit_pct/100 )
            s.strategy_stoploss_price = s.period.close  *(1-s.options.loss_pct/100)
            s.strategy_state = "holding";
        }
      }
     
     
      
      cb()
    },

    onReport: function (s) {
      var cols = []
     
      return cols
    }
  }
}