import React from 'react'

function Hero(){
    return (
        <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "20vh",
        borderTop: "1px solid #ddd",
      }}
    >
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1
            style={{
              marginLeft: "30px",
              fontSize: "38px",
              fontWeight: "600",
              color: "#424242",
            }}
          >
            Support Portal
          </h1>

          <button
            className="btn btn-primary"
            style={{
              marginRight: "48px",
              padding: "5px 8px",
              fontSize: "18px",
              fontWeight: "500",
              borderRadius: "4px",
            }}
          >
            My tickets
          </button>
        </div>

        {/* Search Box */}
        <div
          className="d-flex align-items-center bg-white"
          style={{
            marginBottom: "20px",
            marginLeft: "30px",
            marginRight: "48px",
            height: "60px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "0 5px",
          }}
        >
          <i
            className="bi bi-search"
            style={{
              fontSize: "16px",
              marginLeft: "20px",
              color: "#666",
            }}
          ></i>

          <input
            type="text"
            placeholder="Eg: How do I open my account, How do I activate F&O..."
            className="form-control border-0 shadow-none"
            style={{
              fontSize: "18px",
              marginLeft: "5px",
              color: "#666",
            }}
          />
        </div>
      </div>
    </div>
    );
}

export default Hero;