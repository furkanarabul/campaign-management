import React from "react";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsArrowReturnLeft,
} from "react-icons/bs";
import "./Table.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";

const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Table = ({
  campaigns,
  editCampaign,
  deleteCampaign,
  toggleSortOrder,
  sortCampaignsByName,
  sortCampaignsByType,
  sortCampaignsByStartDate,
  sortCampaignsByEndDate,
  sortCampaignsByStatus,
  nameSortOrder,
  typeSortOrder,
  startDateSortOrder,
  endDateSortOrder,
  statusSortOrder,
}) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>
              <span>Name</span>
              <span
                className="sort-icon"
                onClick={() => {
                  toggleSortOrder("name");
                  sortCampaignsByName();
                }}
              >
                {nameSortOrder === "asc" ? <RiSortAsc /> : <RiSortDesc />}
              </span>
            </th>
            <th className="expand">
              Type
              <span
                className="sort-icon"
                onClick={() => {
                  toggleSortOrder("type");
                  sortCampaignsByType();
                }}
              >
                {typeSortOrder === "asc" ? <RiSortAsc /> : <RiSortDesc />}
              </span>
            </th>
            <th>
              Start Date
              <span
                className="sort-icon"
                onClick={() => {
                  toggleSortOrder("startDate");
                  sortCampaignsByStartDate();
                }}
              >
                {startDateSortOrder === "asc" ? <RiSortAsc /> : <RiSortDesc />}
              </span>
            </th>
            <th>
              End Date
              <span
                className="sort-icon"
                onClick={() => {
                  toggleSortOrder("endDate");
                  sortCampaignsByEndDate();
                }}
              >
                {endDateSortOrder === "asc" ? <RiSortAsc /> : <RiSortDesc />}
              </span>
            </th>
            <th>
              Status
              <span
                className="sort-icon"
                onClick={() => {
                  toggleSortOrder("status");
                  sortCampaignsByStatus();
                }}
              >
                {statusSortOrder === "asc" ? <RiSortAsc /> : <RiSortDesc />}
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <Tooltip id="delete-campaign" />
          <Tooltip id="reactivate-campaign" />
          <Tooltip id="edit-campaign" />
          {campaigns.map((campaign, idx) => {
            const statusText =
              campaign.status.charAt(0).toUpperCase() +
              campaign.status.slice(1);
            const typeText =
              campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1);
            const deleteIcon =
              campaign.status === "active" ? (
                <BsFillTrashFill
                  data-tooltip-id="delete-campaign"
                  data-tooltip-content="Delete Campaign"
                  data-tooltip-place="top"
                  className="delete-btn"
                  onClick={() => deleteCampaign(idx)}
                />
              ) : (
                <BsArrowReturnLeft
                  data-tooltip-id="reactivate-campaign"
                  data-tooltip-content="Reactivate Campaign"
                  data-tooltip-place="top"
                  className="reactivate-btn"
                  onClick={() => deleteCampaign(idx)}
                />
              );
            return (
              <tr key={idx}>
                <td className={`expand campaign-${campaign.status}`}>
                  {campaign.name}
                </td>
                <td>
                  <span className={`label label-${campaign.type}`}>
                    {typeText}
                  </span>
                </td>
                <td className={`campaign-${campaign.status}`}>
                  {formatDate(campaign.startTime)}
                </td>
                <td className={`campaign-${campaign.status}`}>
                  {formatDate(campaign.endTime)}
                </td>
                <td>
                  <span className={`label label-${campaign.status}`}>
                    {statusText}
                  </span>
                </td>
                <td>
                  <span className="actions">
                    {deleteIcon}
                    <BsFillPencilFill
                      data-tooltip-id="edit-campaign"
                      data-tooltip-content="Edit Campaign"
                      data-tooltip-place="top"
                      onClick={() => editCampaign(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {campaigns.length === 0 && (
        <div className="no-campaign">
          No campaigns found. Start by adding a new campaign!
        </div>
      )}
    </div>
  );
};

export default Table;
