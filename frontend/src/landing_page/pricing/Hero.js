import React from 'react'

function Hero(){
    return (
        <div className="container">
            <div className="row p-5 mt-5 text-center" >
                <h1>Charges</h1>
                <h3 className="text-muted mt-3 fs-5">List of all charges and taxes</h3>
            </div>
            <div className="row p-5 mt-2 text-center">
                <div className="col-4 p-5">
                    <img src="media/images/pricingEquity.svg" />
                    <h2 className="text-muted">Free equity delivery</h2>
                    <p className="text-muted">
                        All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.
                    </p>
                </div>
                <div className="col-4 p-5">
                    <img src="media/images/intradayTrades.svg" />
                    <h2 className="text-muted">Intraday and F&O trades</h2>
                    <p className="text-muted">
                        Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.
                    </p>
                </div>
                <div className="col-4 p-5">
                    <img src="media/images/pricingEquity.svg" />
                    <h2 className="text-muted">Free direct MF</h2>
                    <p className="text-muted">
                        All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;