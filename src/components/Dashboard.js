import React,  { useState, useMemo, useEffect } from "react";
import "../index.css";
import ScheduleModal from "./ScheduleModal";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedCustomers, setExpandedCustomers] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const toggleCustomer = (id) => {
    setExpandedCustomers(prev => ({
      ...prev,
      [id]: !prev[id] // Toggle specific customer manually
    }));
  };

  const toggleFilter = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      // Collapse all when switching back to "All"
      setExpandedCustomers({});
    }
  };

  const openScheduleModal = (appointment, customer) => {
    setSelectedAppointment({
      ...appointment,
      customerName: customer.name,
      customerId: customer.id,
      customerAddress: customer.address
    });
  };

  const closeScheduleModal = () => {
    setSelectedAppointment(null);
  };
  

  const customers = [
    {
      name: "ACTION FOOD SALES",
      id: "#6565677",
      address: "4545 Lowery St, Warsaw, NC 343456",
      appointments: [
        { proNumber: "565445555643", status: "Awaiting Response", statusClass: "status-awaiting", suggestedApt: "02/12 10:00 - 02/12 12:00", ibEta: "02/12 09:30", dueDate: "02/14", tenderDate: "02/13 08:00" },
        { proNumber: "565445555667", status: "Not Set", statusClass: "status-not-set", suggestedApt: "02/13 14:00 - 02/13 16:00", ibEta: "02/13 12:45", dueDate: "02/15", tenderDate: "02/14 09:00" },
        { proNumber: "565445555655", status: "Confirmed", statusClass: "status-confirmed", suggestedApt: "02/14 08:00 - 02/14 10:00", confirmationNumber: "987654", ibEta: "02/14 07:30", dueDate: "02/16", tenderDate: "02/15 06:00" },
        { proNumber: "565445555699", status: "Requested but not set", statusClass: "status-requested", suggestedApt: "02/15 11:00 - 02/15 13:00", ibEta: "02/15 10:15", dueDate: "02/17", tenderDate: "02/16 07:30" }
      ]
    },
    {
      name: "GLOBAL FOODS",
      id: "#7891234",
      address: "6789 Main St, Houston, TX 77001",
      appointments: [
        { proNumber: "789456123", status: "Awaiting Response", statusClass: "status-awaiting", suggestedApt: "02/12 15:00 - 02/12 17:00", ibEta: "02/12 14:30", dueDate: "02/14", tenderDate: "02/13 10:00" },
        { proNumber: "789456125", status: "Not Set", statusClass: "status-not-set", suggestedApt: "02/13 10:00 - 02/13 12:00", ibEta: "02/13 09:30", dueDate: "02/15", tenderDate: "02/14 07:00" },
        { proNumber: "789456128", status: "Confirmed", statusClass: "status-confirmed", suggestedApt: "02/14 12:00 - 02/14 14:00", confirmationNumber: "456789", ibEta: "02/14 11:30", dueDate: "02/16", tenderDate: "02/15 08:00" },
      ]
    },
    {
      name: "WHOLESALE SUPPLIERS",
      id: "#4527821",
      address: "321 Commerce Blvd, Miami, FL 33101",
      appointments: [
        { proNumber: "321654987", status: "Awaiting Response", statusClass: "status-awaiting", suggestedApt: "02/12 09:00 - 02/12 11:00", ibEta: "02/12 08:30", dueDate: "02/14", tenderDate: "02/13 07:00" },
        { proNumber: "321654999", status: "Not Set", statusClass: "status-not-set", suggestedApt: "02/13 16:00 - 02/13 18:00", ibEta: "02/13 15:30", dueDate: "02/15", tenderDate: "02/14 11:00" },
        { proNumber: "321654000", status: "Confirmed", statusClass: "status-confirmed", suggestedApt: "02/14 07:00 - 02/14 09:00", confirmationNumber: "654321", ibEta: "02/14 06:30", dueDate: "02/16", tenderDate: "02/15 05:00" },
      ]
    }
  ];
 
  const metrics = useMemo(() => {
    const counts = customers.reduce((acc, customer) => {
      customer.appointments.forEach(apt => {
        acc.total++;
        if (apt.status === "Confirmed") acc.confirmed++;
        if (apt.status === "Awaiting Response") acc.awaiting++;
        if (apt.status === "Not Set") acc.notSet++;
        if (apt.status === "Requested but not set") acc.requested++;
      });
      return acc;
    }, { total: 0, confirmed: 0, awaiting: 0, notSet: 0, requested: 0 });

    return [
      { title: "All", value: counts.total, filter: "All" },
      { title: "Confirmed", value: counts.confirmed, filter: "Confirmed" },
      { title: "Awaiting", value: counts.awaiting, filter: "Awaiting Response" },
      { title: "Not Set", value: counts.notSet, filter: "Not Set" },
      { title: "Requested", value: counts.requested, filter: "Requested but not set" }
    ];
  }, [customers]);

  // Filter customers based on the selected filter
  const filteredCustomers = useMemo(() => {
    return customers
      .map(customer => ({
        ...customer,
        appointments: customer.appointments.filter(apt => selectedFilter === "All" || apt.status === selectedFilter)
      }))
      .filter(customer => customer.appointments.length > 0);
  }, [customers, selectedFilter]);

  // When switching **from** "All" to a filtered view, auto-expand relevant customers
  useEffect(() => {
    if (selectedFilter !== "All") {
      const newExpanded = {};
      filteredCustomers.forEach(customer => {
        newExpanded[customer.id] = true;
      });
      setExpandedCustomers(newExpanded);
    }
  }, [selectedFilter, filteredCustomers]);


  return (
    <div className="dashboard-container">
      <h1>Main Dashboard</h1>
     <div className="filter-tabs">
        {metrics.map((metric, index) => (
          <button
            key={index}
            className={`filter-tab ${selectedFilter === metric.filter ? "active" : ""}`}
            onClick={() => toggleFilter(metric.filter)}
          >
            {metric.title} ({metric.value})
          </button>
        ))}
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by customer / pro / APT status" 
          className="search-bar" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="appointment-table-container">
      {filteredCustomers.map((customer) => (
          <div key={customer.id} className="customer-section">
            <div className="customer-header" onClick={() => toggleCustomer(customer.id)}>
              <h3>{customer.name} ({customer.id})</h3>
              <p>{customer.address}</p>
            </div>
            <button 
              className="bulk-schedule-button" 
              onClick={() => alert(`Bulk scheduling all appointments for ${customer.name}`)}
            >
              Bulk Schedule All
            </button>
            {expandedCustomers[customer.id] && (
              <table className="appointment-table">
                <thead>
                  <tr>
                   <th>Action</th>
                    <th>Pro#</th>
                    <th>Suggested APT</th>
                    <th>Status</th>
                    <th>Confirmation #</th>
                    <th>IB ETA</th>
                    <th>Due Date</th>
                    <th>Tender Date</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.appointments.map((apt, index) => (
                    <tr key={index}>
                      <td>
                        {apt.status === "Confirmed" ? (
                          <button className="reschedule-button" onClick={() => openScheduleModal(apt, customer)}>Reschedule</button>
                        ) : (
                          <button className="schedule-button" onClick={() => openScheduleModal(apt, customer)}>Schedule</button>
                        )}
                      </td>
                 <td>{apt.proNumber}</td>
                      <td>{apt.suggestedApt}</td>
                      <td className={`status ${apt.statusClass}`}>{apt.status}</td>
                      <td>{apt.confirmationNumber || "-"}</td>
                      <td>{apt.ibEta}</td>
                      <td>{apt.dueDate}</td>
                      <td>{apt.tenderDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
      {selectedAppointment && (
        <div className="modal-overlay" onClick={closeScheduleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ScheduleModal appointment={selectedAppointment} onClose={closeScheduleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;