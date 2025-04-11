import React, { useState } from "react";

const Modal = ({ user, onClose, onUpdate, isNew }) => {
  // Initialize formData with the user prop or a default object
  const [formData, setFormData] = useState(
    user || {
      avatar: "",
      name: "",
      company: "",
      odervalue: "",
      orderdate: "",
      status: "",
    }
  );

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes for the avatar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Create a temporary URL for the file
      setFormData((prev) => ({
        ...prev,
        avatar: fileUrl,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.company || !formData.odervalue) {
      alert("Please fill in required fields: Name, Company, Order Value");
      return;
    }

    onUpdate(formData);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        borderRadius: "12px",
        padding: "32px",
        zIndex: 999,
        width: "500px",
        overflowY: "auto",
        maxHeight: "85vh",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#1877f2",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "24px",
        }}
      >
        {isNew ? "Add New User" : "Update User"}
      </h2>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "6px",
          }}
        >
          Avatar:
        </label>
        {formData.avatar && (
          <img
            src={formData.avatar}
            alt="Avatar Preview"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "8px",
              objectFit: "cover",
              marginBottom: "8px",
            }}
          />
        )}
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#555",
            cursor: "pointer",
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "6px",
          }}
        >
          User Name:
        </label>
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#333",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1877f2")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "6px",
          }}
        >
          Company:
        </label>
        <input
          name="company"
          value={formData.company || ""}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#333",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1877f2")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "6px",
          }}
        >
          Order Value:
        </label>
        <input
          name="odervalue"
          value={formData.odervalue || ""}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#333",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1877f2")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "6px",
          }}
        >
          Order Date:
        </label>
        <input
          name="orderdate"
          value={formData.orderdate || ""}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#333",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1877f2")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "6px",
          }}
        >
          Status:
        </label>
        <input
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#333",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1877f2")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "24px",
        }}
      >
        <button
          style={{
            background: "#f44336",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onClick={onClose}
          onMouseEnter={(e) => (e.target.style.background = "#d32f2f")}
          onMouseLeave={(e) => (e.target.style.background = "#f44336")}
        >
          Close
        </button>
        <button
          style={{
            background: "#4CAF50",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onClick={handleSubmit}
          onMouseEnter={(e) => (e.target.style.background = "#388e3c")}
          onMouseLeave={(e) => (e.target.style.background = "#4CAF50")}
        >
          {isNew ? "Add User" : "Update User"}
        </button>
      </div>
    </div>
  );
};

export default Modal;