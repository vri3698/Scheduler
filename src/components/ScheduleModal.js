import React from "react";
import "../index.css";

const ScheduleModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Schedule Appointment</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Appointment Details</h3>
            <div className="modal-info">
              <p><strong>PRO#:</strong> {appointment.proNumber}</p>
              <p><strong>Customer:</strong> {appointment.customerName} ({appointment.customerId})</p>
              <p><strong>Address:</strong> {appointment.customerAddress}</p>
              <p><strong>IB ETA:</strong> {appointment.ibEta}</p>
              <p><strong>Delivery Window:</strong> 10:00 - 17:00</p>
              <p><strong>Tender Date:</strong> {appointment.tenderDate}</p>
              <p><strong>PO#:</strong> 124334309</p>
              <p><strong>Pickup Date:</strong> MM/DD</p>
              <p><strong>Due Date:</strong> {appointment.dueDate}</p>
            </div>
          </div>

          <div className="modal-section">
            <h3>Suggested Appointment Window</h3>
            <input type="text" value={appointment.suggestedApt} readOnly />
          </div>

          <div className="modal-section">
            <h3>Notes</h3>
            <textarea placeholder="Enter any notes here..."></textarea>
          </div>

          <div className="modal-section">
            <h3>Select Appointment Mode</h3>
            <div className="modal-actions">
              <button className="action-button">Call Customer</button>
              <button className="action-button">Send SMS</button>
              <button className="action-button">Send Email</button>
              <button className="action-button">Customer Portal</button>
            </div>
          </div>

          <div className="modal-footer">
            <p><strong>Contact:</strong> (555) 555-1234</p>
            <button className="start-call">Start Call</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;