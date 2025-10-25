import React, { useEffect, useState, useMemo } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { HiArrowDownTray } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:8000/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      Swal.fire("Error", "Failed to load services data.", "error");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [services, search]);

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Title", "Description"];
    const tableRows = [];

    filteredServices.forEach((item, index) => {
      const row = [index + 1, item.title, item.description];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [253, 230, 138] },
    });

    doc.text("Services List", 14, 15);
    doc.save("services.pdf");
  };

  // Delete service
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8000/services/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete service");
        Swal.fire("Deleted!", "Service has been deleted.", "success");
        fetchServices();
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", err.message || "Failed to delete service.", "error");
      }
    }
  };

  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Services</h1>
        <p className="text-gray-500 mb-6">Welcome back, Admin</p>

        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full sm:w-1/2">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full bg-transparent outline-none text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={exportPDF}
              className="px-5 py-3 flex justify-center sm:justify-between border border-gray-300 rounded-lg gap-2 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
            >
              <HiArrowDownTray className="text-lg" /> Export PDF
            </button>

            <button
              onClick={() => navigate("/admin/services/add-service")}
              className="px-5 py-3 flex justify-center sm:justify-between items-center gap-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 w-full sm:w-auto"
            >
              <GoPlus /> Add Service
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-orange-100 text-gray-700 uppercase text-xs sm:text-sm font-semibold">
              <tr>
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((s, index) => (
                  <tr
                    key={s.id}
                    className="border-t border-gray-200 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{s.title}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{s.description}</td>

                    <td className="px-4 py-3">
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow-sm"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>

                    <td className="px-4 py-3 flex gap-3 flex-wrap">
                      
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-500 hover:text-red-700 flex gap-2 cursor-pointer"
                      >
                        <FiTrash2 size={20}/> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
