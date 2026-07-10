import React, { useState } from "react";

function Brokerage() {
  const [activeTab, setActiveTab] = useState("equity");

  const getTabClass = (tab) => {
    return activeTab === tab
      ? "nav-link text-muted border-0 border-bottom border-primary border-3"
      : "nav-link text-primary border-0";
  };

  return (
    <div className="container mt-5">
      {/* Tabs */}
      <ul className="nav mb-4 fs-3">
        <li className="nav-item">
          <button
            className={getTabClass("equity")}
            onClick={() => setActiveTab("equity")}
          >
            Equity
          </button>
        </li>

        <li className="nav-item fs-3">
          <button
            className={getTabClass("currency")}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </li>

        <li className="nav-item fs-3">
          <button
            className={getTabClass("commodity")}
            onClick={() => setActiveTab("commodity")}
          >
            Commodity
          </button>
        </li>
      </ul>

      {/* Content */}
      {activeTab === "equity" && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th></th>
                <th className="text-muted">Equity Delivery</th>
                <th className="text-muted">Equity Intraday</th>
                <th className="text-muted">F&amp;O - Futures</th>
                <th className="text-muted">F&amp;O - Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-muted">Brokerage</th>
                <td className="text-muted">Zero Brokerage</td>
                <td className="text-muted">0.03% or ₹20/executed order whichever is lower</td>
                <td className="text-muted">0.03% or ₹20/executed order whichever is lower</td>
                <td className="text-muted">Flat ₹20 per executed order</td>
              </tr>

              <tr>
                <th className="text-muted">
                  <br />
                  <br />
                  STT / CTT
                </th>
                <td className="text-muted">
                  <br />
                  <br />
                  0.1% on buy &amp; sell
                </td>
                <td className="text-muted">
                  <br />
                  <br />
                  0.025% on the sell side
                </td>
                <td className="text-muted">
                  <br />
                  <br />
                  0.02% on the sell side
                </td>
                <td className="text-muted">
                  0.125% of the intrinsic value on <br />
                  options that are bought and exercised
                  <br />
                  0.1% on sell side (on premium)
                </td>
              </tr>

              <tr>
                <th className="text-muted">Transaction Charges</th>
                <td className="text-muted">
                  NSE: 0.00307% <br />
                  BSE: 0.00375%
                </td>
                <td className="text-muted">
                  NSE: 0.00307% <br />
                  BSE: 0.00375%
                </td>
                <td className="text-muted">
                  NSE: 0.00183% <br />
                  BSE: 0
                </td>
                <td className="text-muted">
                  NSE: 0.03553% (on premium) <br />
                  BSE: 0.0325% (on premium)
                </td>
              </tr>

              <tr>
                <th className="text-muted">GST</th>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
              </tr>

              <tr>
                <th className="text-muted">SEBI Charges</th>
                <td className="text-muted">₹10 / crore</td>
                <td className="text-muted">₹10 / crore</td>
                <td className="text-muted">₹10 / crore</td>
                <td className="text-muted">₹10 / crore</td>
              </tr>

              <tr>
                <th className="text-muted">Stamp charges</th>
                <td className="text-muted">0.015% or ₹1500 / crore on buy side</td>
                <td className="text-muted">0.003% or ₹300 / crore on buy side</td>
                <td className="text-muted">0.002% or ₹200 / crore on buy side</td>
                <td className="text-muted"> 0.003% or ₹300 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "currency" && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th></th>
                <th className="text-muted">Currency futures</th>
                <th className="text-muted">Currency options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-muted">Brokerage</th>
                <td className="text-muted">0.03% or ₹ 20/executed order whichever is lower</td>
                <td className="text-muted">₹ 20/executed order</td>
              </tr>

              <tr>
                <th className="text-muted">STT / CTT</th>
                <td className="text-muted">No STT</td>
                <td className="text-muted">No STT</td>
              </tr>

              <tr>
                <th className="text-muted">Transaction Charges</th>
                <td>
                  NSE: 0.00035% <br />
                  BSE: 0.00045%
                </td>
                <td className="text-muted">
                  NSE: 0.0311% <br />
                  BSE: 0.001%
                </td>
              </tr>

              <tr>
                <th className="text-muted">GST</th>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
              </tr>

              <tr>
                <th className="text-muted">SEBI Charges</th>
                <td className="text-muted">₹10 / crore</td>
                <td className="text-muted">₹10 / crore</td>
              </tr>

              <tr>
                <th className="text-muted">Stamp charges</th>
                <td className="text-muted">0.0001% or ₹10 / crore on buy side</td>
                <td className="text-muted">0.0001% or ₹10 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "commodity" && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th></th>
                <th className="text-muted">Commodity futures</th>
                <th className="text-muted">Commodity options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-muted">Brokerage</th>
                <td className="text-muted">0.03% or Rs. 20/executed order whichever is lower</td>
                <td className="text-muted">₹ 20/executed order</td>
              </tr>

              <tr>
                <th className="text-muted">STT / CTT</th>
                <td className="text-muted">0.01% on sell side (Non-Agri)</td>
                <td className="text-muted">0.05% on sell side</td>
              </tr>

              <tr>
                <th className="text-muted">Transaction Charges</th>
                <td>
                  MCX: 0.0021% <br />
                  NSE: 0.0001%
                </td>
                <td className="text-muted">
                  MCX: 0.0418% <br />
                  NSE: 0.001%
                </td>
              </tr>

              <tr>
                <th className="text-muted">GST</th>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
              </tr>

              <tr>
                <th className="text-muted">SEBI Charges</th>
                <td className="text-muted">
                  Agri: <br />
                  ₹1 / crore <br />
                  Non-agri: <br />
                  ₹10 / crore
                </td>
                <td className="text-muted">
                  <br />
                  <br />
                  ₹10 / crore
                </td>
              </tr>

              <tr>
                <th className="text-muted">Stamp charges</th>
                <td className="text-muted">0.002% or ₹200 / crore on buy side</td>
                <td className="text-muted">0.003% or ₹300 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Calculator Link */}
      <div className="text-center my- fs-5">
        <p>
          <a href="#" className="text-primary text-decoration-none">
            Calculate your costs upfront
          </a>{" "}
          using our brokerage calculator
        </p>
      </div>

      {/* Charges for account opening */}
      <div className="mt-5">
        <h4 className="mb-4">Charges for account opening</h4>

        <div className="table-responsive">
          <table className="table border">
            <thead className="table-light">
              <tr>
                <th className="text-muted">Type of account</th>
                <th className="text-muted">Charges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted">Online account</td>
                <td className="text-muted">
                  <span className="badge bg-success">FREE</span>
                </td>
              </tr>

              <tr>
                <td className="text-muted">Offline account</td>
                <td className="text-muted">
                  <span className="badge bg-success">FREE</span>
                </td>
              </tr>

              <tr>
                <td className="text-muted">NRI account (offline only)</td>
                <td className="text-muted">₹ 500</td>
              </tr>

              <tr>
                <td className="text-muted">
                  Partnership, LLP, HUF, or Corporate accounts (offline only)
                </td>
                <td
                  className="text-muted"
                  style={{ marginRight: "5rem" }}
                >
                  ₹ 500
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Demat AMC Section */}
      <div className="mt-5">
        <h4 className="mb-4">Demat AMC (Annual Maintenance Charge)</h4>

        <div className="table-responsive">
          <table className="table border">
            <thead className="table-light">
              <tr>
                <th className="text-muted">Value of holdings</th>
                <th className="text-muted">AMC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted">Up to ₹4 lakh</td>
                <td className="text-muted">
                  <span className="badge bg-success">FREE*</span>
                </td>
              </tr>

              <tr>
                <td className="text-muted">₹4 lakh - ₹10 lakh</td>
                <td className="text-muted">
                  ₹100 per year, charged quarterly*
                </td>
              </tr>

              <tr>
                <td className="text-muted">Above ₹10 lakh</td>
                <td className="text-muted">
                  ₹300 per year, charged quarterly
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted small mt-3">
          * Lower AMC is applicable only if the account qualifies as a Basic
          Services Demat Account (BSDA). BSDA account holders cannot hold more
          than one demat account. To learn more about BSDA,{" "}
          <a href="#" className="text-primary text-decoration-none">
            click here
          </a>
          .
        </p>
      </div>

      {/* Optional Values and Services */}
      <div className="mt-5">
        <h4 className="mb-4">Charges for optional value added services</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th className="text-muted">Service</th>
                <th className="text-muted">Billing Frquency</th>
                <th className="text-muted">Charges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-muted">Tickertape</th>
                <td className="text-muted">Monthly / Annual</td>
                <td className="text-muted">Free: 0 | Pro: 249/2399</td>
              </tr>

              <tr>
                <th className="text-muted">Smallcase</th>
                <td className="text-muted">Per transaction</td>
                <td className="text-muted">Buy & Invest More: 100 | SIP: 10</td>
              </tr>

              <tr>
                <th className="text-muted">Kite Connect</th>
                <td className="text-muted">Monthly</td>
                <td className="text-muted">Connect: 500 | Personal: Free</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

          {/* Charge Explained */}
      <div className="mt-5">
        <h4 className="mb-4">Charges explained</h4>
        <div className="container mt-3">
          <div className="row text-muted">
            <div className="col-6 ">
              <h6 className="mb-4 fs-5">Security/Commodities transaction tax</h6>
              <p className="mt-4">Tax by the government when transacting on the exchange. Charged as above on both buy and sell sides when trading equity delivery. Charged on selling side when trading intraday or on F&O.</p>
              <p className="mt-4">When trading at Zerodha, STT/CTT can be lot more than the brokerage we charge. Important to keep a tab.</p>
              <h6>Transaction/Turnover Charges</h6>
              <p>Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.</p>
              <p>BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)</p>
              <p>BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.</p>
              <p>BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.</p>
              <p>BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.</p>
              <h6>Call & trade</h6>
              <p>Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.</p>
              <h6>Stamp charges</h6>
              <p>Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.</p>
              <h6>NRI brokerage charges</h6>
              <ul>
                <li>For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&O (whichever is lower).</li>
                <li>For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
                <li>₹500 + GST as yearly account maintenance charges (AMC) charges.</li>
              </ul>
              <h6>Account with debit balance</h6>
              <p>If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</p>
              <h6>Charges for Investor's Protection Fund Trust (IPFT) by NSE</h6>
              <ul>
                <li>Equity and Futures - ₹0.01 per crore + GST of the traded value.</li>
                <li>Options - ₹0.01 per crore + GST traded value (premium value).</li>
                <li>Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.</li>
              </ul>
              <h6>Margin Trading Facility (MTF)</h6>
              <ul>
                <li>MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.</li>
                <li>MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.</li>
                <li>MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.</li>
              </ul>
            </div>
            <div className="col-6">
              <h6 className="mb-4 fs-5">GST</h6>
              <p>Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)</p>
              <h5>SEBI Charges</h5>
              <p>Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.</p>
              <h6>DP (Depository participant) charges</h6>
              <p>₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.</p>
              <p>Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.</p>
              <p>Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.</p>
              <h6>Pledging charges</h6>
              <p>₹30 + GST per pledge request per ISIN.</p>
              <h6>AMC (Account maintenance charges)</h6>
              <p>For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, 
                <a href="" className="text-primary text-decoration-none">
                  Click here
                </a>
              </p>
              <p>For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, 
                <a href="" className="text-primary text-decoration-none">
                  Click here
                </a>
              </p>
              <h6>Corporate action order charges</h6>
              <p>₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.</p>
              <h6>Off-market transfer charges</h6>
              <p>₹25 per transaction.</p>
              <h6>Physical CMR request</h6>
              <p>First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.</p>
              <h6>Payment gateway charges</h6>
              <p>₹9 + GST (Not levied on transfers done via UPI)</p>
              <h6>Delayed Payment Charges</h6>
              <p>Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account. 
                <a href="" className="text-primary text-decoration-none">
                  Learn more.
                </a>
              </p>
              <h6>Trading using 3-in-1 account with block functionality</h6>
              <ul>
                <li>Delivery & MTF Brokerage: 0.5% per executed order.</li>
                <li>Intraday Brokerage: 0.05% per executed order.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-5 text-muted">
        <h6>Disclaimer</h6>
        <p>For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.</p>
      </div>
    </div>
  );
}

export default Brokerage;
