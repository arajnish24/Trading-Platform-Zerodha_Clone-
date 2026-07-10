import React, { useState } from "react";

function Section({ title, icon, children }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className="card mb-3">
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{
          cursor: "pointer",
          backgroundColor: hover ? "#f8f9fa" : "white",
          transition: "0.2s",
        }}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="d-flex align-items-center gap-3">
          <i
            className={`bi ${icon}`}
            style={{ fontSize: "20px", color: "#0d6efd" }}
          ></i>
          <strong>{title}</strong>
        </div>

        <span style={{ fontSize: "14px" }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && <div className="card-body">{children}</div>}
    </div>
  );
}

function CreateTicket() {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-7 mt-3 ml-30">
          <Section title="Account Opening" icon="bi bi-plus-circle">
            {/* Subtopics list & Hover Effect */}
            <ul className="text-primary" style={{ lineHeight : "2.5", lineWidth : "full" }}>
              {[
                "Resident individual",
                "Minor",
                "Non Resident Indian (NRI)",
                "Company, Partnership, HUF and LLP",
                "Glossary",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-decoration-none text-primary"
                    onMouseEnter={(e) => e.target.classList.add("text-muted")}
                    onMouseLeave={(e) =>
                      e.target.classList.remove("text-muted")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Your Zerodha Account" icon="bi bi-plus-circle">
            <ul className="text-primary" style={{ lineHeight : "2.5" }}>
              {[
                "Your Profile",
                "Account Modification",
                "Client Master Report (CMR) and Depository Participant (DP) details",
                "Nomination",
                "Transfer and conversion of securities",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-decoration-none text-primary"
                    onMouseEnter={(e) => e.target.classList.add("text-muted")}
                    onMouseLeave={(e) =>
                      e.target.classList.remove("text-muted")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Kite" icon="bi bi-plus-circle">
            <ul className="text-primary" style={{ lineHeight : "2.5" }}>
              {[
                "IPO",
                "Trading FAQs",
                "Margin Trading Facility (MTF) and Margins",
                "Charts and Orders",
                "Alerts and Nudges",
                "General",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-decoration-none text-primary"
                    onMouseEnter={(e) => e.target.classList.add("text-muted")}
                    onMouseLeave={(e) =>
                      e.target.classList.remove("text-muted")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Funds" icon="bi bi-plus-circle">
            <ul className="text-primary" style={{ lineHeight : "2.5" }}>
              {[
                "Add money",
                "Withdraw money",
                "Add bank account",
                "eMandates",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-decoration-none text-primary"
                    onMouseEnter={(e) => e.target.classList.add("text-muted")}
                    onMouseLeave={(e) =>
                      e.target.classList.remove("text-muted")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Console" icon="bi bi-plus-circle">
            <ul className="text-primary" style={{ lineHeight : "2.5" }}>
              {[
                "Portfolio",
                "Corporate actions",
                "Funds statement",
                "Reports",
                "Profile",
                "Segments",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-decoration-none text-primary"
                    onMouseEnter={(e) => e.target.classList.add("text-muted")}
                    onMouseLeave={(e) =>
                      e.target.classList.remove("text-muted")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Coin" icon="bi bi-plus-circle">
            <ul className="text-primary" style={{ lineHeight : "2.5" }}>
              {[
                "Mutual Funds",
                "National Pension System (NPS)",
                "Fixed Deposits (FDs)",
                "Features on Coin",
                "Payments and Orders",
                "General",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-decoration-none text-primary"
                    onMouseEnter={(e) => e.target.classList.add("text-muted")}
                    onMouseLeave={(e) =>
                      e.target.classList.remove("text-muted")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Right Sidebar */}
        <div className="col-md-4 mt-3 ml-30" >
          <div
            className="p-1 mb-3"
            style={{ background: "#f5ebdd", borderLeft: "4px solid orange" }}
          >
            <ul className="text-primary hover-muted" style={{ lineHeight : "2"}}>
              <li>
                <a href="#" className="text-primary fs-5" style={{ fontSize : "17px"}}>
                  Current Buybacks - May 2026
                </a>
              </li>
              <li>
                <a href="#" className="text-primary fs-5" style={{ fontSize : "17px"}}>
                  Surveillance measure on scrips - May 2026
                </a>
              </li>
            </ul>
          </div>

          <div className="card mb-5">
            <div className="card-header">
              <strong>Quick links</strong>
            </div>
            <div className="list-group list-group-flush text-primary">
              <div className="list-group-item" style={{ lineHeight : "2.5" }}>
                <a href="#" className="text-primary text-decoration-none">
                    1. Track account opening
                </a>
            </div>
              <div className="list-group-item" style={{ lineHeight : "2.5" }}>
                <a href="#" className="text-primary text-decoration-none">
                    2. Track segment activation
                </a>
            </div>
              <div className="list-group-item" style={{ lineHeight : "2.5" }}>
                <a href="#" className="text-primary text-decoration-none">
                    3. Intraday margins
                </a>
              </div>
              <div className="list-group-item" style={{ lineHeight : "2.5" }}>
                <a href="#" className="text-primary text-decoration-none">
                    4. Kite user manual
                </a>
              </div>
              <div className="list-group-item" style={{ lineHeight : "2.5" }}>
                <a href="#" className="text-primary text-decoration-none">
                    5. Learn how to create a ticket
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
