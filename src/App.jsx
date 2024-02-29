import { useState, useEffect } from "react";
import Table from "./components/Table";
import FilterArea from "./components/FilterArea";
import Modal from "./components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import React from "react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    return storedCampaigns;
  });
  const [campaignToEdit, setCampaignToEdit] = useState(null);
  useEffect(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    setCampaigns(storedCampaigns);
  }, []);
  useEffect(() => {
    localStorage.setItem("campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  // Filter state and handler functions
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleClearFilters = () => {
    setNameFilter("");
    setTypeFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
    setStatusFilter("");
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    return (
      campaign.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      campaign.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
      campaign.startTime.includes(startDateFilter) &&
      campaign.endTime.includes(endDateFilter) &&
      campaign.status.toLowerCase().includes(statusFilter.toLowerCase())
    );
  });

  const handleStartDateFilterChange = (date) => {
    setStartDateFilter(date ? date.toISOString() : "");
  };
  const handleEndDateFilterChange = (date) => {
    setEndDateFilter(date ? date.toISOString() : "");
  };

  // Sort state and handler functions

  const [nameSortOrder, setNameSortOrder] = useState("asc");
  const [typeSortOrder, setTypeSortOrder] = useState("asc");
  const [startDateSortOrder, setStartDateSortOrder] = useState("asc");
  const [endDateSortOrder, setEndDateSortOrder] = useState("asc");
  const [statusSortOrder, setStatusSortOrder] = useState("asc");
  const toggleSortOrder = (column) => {
    switch (column) {
      case "name":
        setNameSortOrder((prevSortOrder) =>
          prevSortOrder === "asc" ? "desc" : "asc"
        );
        break;
      case "type":
        setTypeSortOrder((prevSortOrder) =>
          prevSortOrder === "asc" ? "desc" : "asc"
        );
        break;
      case "startDate":
        setStartDateSortOrder((prevSortOrder) =>
          prevSortOrder === "asc" ? "desc" : "asc"
        );
        break;
      case "endDate":
        setEndDateSortOrder((prevSortOrder) =>
          prevSortOrder === "asc" ? "desc" : "asc"
        );
        break;
      case "status":
        setStatusSortOrder((prevSortOrder) =>
          prevSortOrder === "asc" ? "desc" : "asc"
        );
        break;
      default:
        break;
    }
  };

  const sortCampaignsByName = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      const comparison = a.name
        .toLowerCase()
        .localeCompare(b.name.toLowerCase());
      return nameSortOrder === "asc" ? comparison : -comparison;
    });
    setCampaigns(sortedCampaigns);
  };

  const sortCampaignsByStartDate = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      const comparison = dateA - dateB;
      return startDateSortOrder === "asc" ? comparison : -comparison;
    });
    setCampaigns(sortedCampaigns);
  };
  const sortCampaignsByEndDate = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      const comparison = new Date(a.endTime) - new Date(b.endTime);
      return endDateSortOrder === "asc" ? comparison : -comparison;
    });
    setCampaigns(sortedCampaigns);
  };
  const sortCampaignsByType = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      const comparison = a.type
        .toLowerCase()
        .localeCompare(b.type.toLowerCase());
      return typeSortOrder === "asc" ? comparison : -comparison;
    });
    setCampaigns(sortedCampaigns);
  };
  const sortCampaignsByStatus = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      const comparison = a.status.localeCompare(b.status);
      return statusSortOrder === "asc" ? comparison : -comparison;
    });
    setCampaigns(sortedCampaigns);
  };

  const handleNotify = (message = {}) => {
    toast.info(message, {
      autoClose: 2500,
    });
  };
  const handleSubmit = (newCampaign) => {
    if (campaignToEdit === null) {
      setCampaigns([...campaigns, newCampaign]);
    } else {
      setCampaigns(
        campaigns.map((currRow, idx) => {
          if (idx !== campaignToEdit) return currRow;
          return newCampaign;
        })
      );
    }
  };

  const handleEditCampaign = (idx) => {
    setCampaignToEdit(idx);
    setModalOpen(true);
  };

  const handleDeleteCampaign = (idx) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign, i) =>
        i === idx
          ? {
              ...campaign,
              status: campaign.status === "active" ? "deleted" : "active",
            }
          : campaign
      )
    );

    if (campaigns[idx].status === "active") {
      handleNotify("Campaign removed!");
    } else {
      handleNotify("Campaign reactivated!");
    }
  };

  return (
    <div className="App">
      <FilterArea
        nameFilter={nameFilter}
        typeFilter={typeFilter}
        startDateFilter={startDateFilter}
        endDateFilter={endDateFilter}
        statusFilter={statusFilter}
        onNameFilterChange={(e) => setNameFilter(e.target.value)}
        onTypeFilterChange={(e) => setTypeFilter(e.target.value)}
        onStartDateFilterChange={handleStartDateFilterChange}
        onEndDateFilterChange={handleEndDateFilterChange}
        onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
        onClearFilters={handleClearFilters}
      />
      <Table
        campaigns={filteredCampaigns}
        editCampaign={handleEditCampaign}
        deleteCampaign={handleDeleteCampaign}
        toggleSortOrder={toggleSortOrder}
        sortCampaignsByName={sortCampaignsByName}
        sortCampaignsByStartDate={sortCampaignsByStartDate}
        sortCampaignsByEndDate={sortCampaignsByEndDate}
        sortCampaignsByType={sortCampaignsByType}
        sortCampaignsByStatus={sortCampaignsByStatus}
        nameSortOrder={nameSortOrder}
        typeSortOrder={typeSortOrder}
        startDateSortOrder={startDateSortOrder}
        endDateSortOrder={endDateSortOrder}
        statusSortOrder={statusSortOrder}
      />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setCampaignToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={campaignToEdit !== null && campaigns[campaignToEdit]}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
