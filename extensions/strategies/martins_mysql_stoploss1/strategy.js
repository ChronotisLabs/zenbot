var z = require('zero-fill')
  , n = require('numbro')
  , mysql = require('mysql');
var con;  

module.exports = function container (get, set, clear) {
  return {
    name: 'martins_mysql_stoploss1',
    description: 'Buy when things are looking up, sell on profit or loss compared to peak',

    getOptions: function () {
      this.option('period', 'period length', String, '30m')
       this.option('min_periods', 'min. number of history periods', Number, 24)
      this.option('loss_pct', 'How much can we lose' , Number, .8)
      this.option('profit_pct', 'When to sell' , Number, 2)
      this.option('buy_trigger_pct', 'When to buy' , Number, 0.2)
      this.option('buy_trigger_length', 'Period to compare to' , Number, 0.5)

      con = mysql.createConnection({
        host: "localhost",
        user: "tombola",
        password: "Q6l8aH3dLpeVuFLq",
        database: "tombola"
      })

      con.connect(function(err) {
        if (err)
        {
          console.log("can't connect!");
          process.exit(1);
        }
      }
      )

    },

    //
    // called every internal trading interval
    //
    calculate: function (s,trade) {

      con.query("CALL tombola.kraken_log_trade("+trade.time+",'"+s.product_id+"',"+trade.price+","+trade.size+")")
     s.strategy.onPeriod.call(s.ctx,s, function () {
                
                }
            )
    },

    onPeriod: function (s, cb) {
      //console.log(s.strategy_state+ " "+ s.strategy_sell_price+" "+s.strategy_stoploss_price+" "+s.period_sell);

      if (typeof s.strategy_state === 'undefined')
      {
        s.strategy_state = 'looking'
      }

      if (s.lookback.length < s.options.min_periods) {
        s.signal=null
        return cb()
      } 

      if (typeof s.strategy_peak === 'undefined' || s.period.close >s.strategy_peak )
      {
        s.strategy_peak = s.period.close;
        s.strategy_stoploss_price = s.period.close  *(1-s.options.loss_pct/100)

      }

      if (s.strategy_state == 'holding' )
      {

          if (s.period.close > s.strategy_sell_price)
          {
             s.strategy_state = 'looking'
             s.signal = 'sell'
             return cb()
          }


          if (s.period.close < s.strategy_stoploss_price)
          {
             s.strategy_state = 'looking'
             s.signal = 'sell'
             return cb()
          }

      }
      if (s.strategy_state == 'looking')
      {

        if (s.period.close > s.period.low * (1+s.options.buy_trigger_pct/100 ))
        {
            s.signal = 'buy'
            s.strategy_peak = s.period.close;
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