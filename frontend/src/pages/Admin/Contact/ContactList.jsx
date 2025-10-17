import React, { useEffect, useState, useMemo } from "react";
import { HiArrowDownTray } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:8000/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );
  }, [contacts, search]);

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Date", "Name", "Email", "Phone", "Subject", "Message"];
    const tableRows = [];

    filteredContacts.forEach((contact, index) => {
      const contactData = [
        index + 1, // Serial number
        new Date(contact.createdAt).toLocaleDateString("en-IN"),
        contact.name,
        contact.email,
        contact.phone,
        contact.subject,
        contact.message,
      ];
      tableRows.push(contactData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [253, 230, 138] },
    });

    doc.text("Contact List", 14, 15);
    doc.save("contacts.pdf");
  };

  return (
    <section className=" h-full">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-2 lg:p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Contacts</h1>
        <p className="text-gray-500 mb-6">Welcome back, Admin</p>

        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full md:w-1/2">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full bg-transparent outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
                      onClick={exportPDF}
                      className="px-5 py-3 flex justify-between border border-gray-300 rounded-lg gap-2 text-gray-700 hover:bg-gray-100"
                    >
                      <HiArrowDownTray size={20}/> Export
                    </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-orange-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((c, index) => (
                  <tr
                    key={c.id}
                    className="border-t border-gray-200 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(c.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                    <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{c.subject}</td>
                    <td className="px-4 py-3 text-gray-600">{c.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                    No contact data found.
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

export default ContactList;
