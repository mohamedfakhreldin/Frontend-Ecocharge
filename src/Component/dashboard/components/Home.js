import React, { useEffect, useState } from "react";
import strings from "../../../lang/lang";
import "./dashboard-style.css"
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from "@coreui/react";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from "@coreui/icons";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        "https://backend-ecocharge-v9vw.onrender.com/api/users/auth/dashboard"
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    data && (
      <>
        <CRow>
          <h3 className="mt-4">{strings.dashboard.Total}</h3>
          <CCol sm={6} lg={4}>
            <CWidgetStatsA
              className="mb-4"
              color=" red"
              style={{
                width: "100%",
                minHeight: "163px",

                background:
                  "linear-gradient(167deg, rgb(35 87 137) 41%, rgb(25 186 207) 98%)",
                // " linear-gradient(167deg, rgba(150, 25, 22, 1) 49%, rgba(244, 115, 110, 1) 98%)",
              }}
              value={data.usersCount}
              title={strings.dashboard.User}
            />
          </CCol>
          <CCol sm={6} lg={4}>
            <CWidgetStatsA
              className="mb-4"
              color="green"
              style={{
                minHeight: "163px",
                width: "100%",
                background:
                  // " linear-gradient(167deg, rgba(6, 100, 35, 1) 41%, rgba(25, 207, 26, 1) 98%)",
                  "linear-gradient(167deg, rgb(45 142 103) 49%, rgb(102 202 154) 98%)",
              }}
              value={data.stationCount}
              title={strings.dashboard.Stations}
            />
          </CCol>
          <CCol sm={6} lg={4}>
            <CWidgetStatsA
              className="mb-4"
              color="blue violet"
              style={{
                minHeight: "163px",
                width: "100%",
                background:
                  "linear-gradient(167deg, rgb(211, 167, 11) 49%, rgb(217, 217, 120) 98%)",
                // "linear-gradient(167deg, rgba(59, 41, 128, 1) 49%, rgba(155, 89, 182, 1) 98%)",
              }}
              value={data.ratingCount}
              title={strings.dashboard.Rating}
            />
          </CCol>
        </CRow>
        <CCard className="mb-4 mt-4 bg-white w-100 ">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  {strings.dashboard.NewUsers}
                </h4>
                <div className="small text-medium-emphasis">
                  {strings.dashboard.Last7Days}
                </div>
              </CCol>
            </CRow>
            <CChartBar
              style={{ maxHeight: "300px" }}
              data={{
                labels: data.users.dates,

                datasets: [
                  {
                    label: "Users",

                    backgroundColor:
                      // " rgba(244, 115, 110, 1)",

                      "#0e66be",

                    data: data.users.count,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4 mt-4 bg-white w-100 ">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  {strings.dashboard.NewStations}
                </h4>
                <div className="small text-medium-emphasis">
                  {strings.dashboard.Last7Days}
                </div>
              </CCol>
            </CRow>

            <CChartBar
              style={{ maxHeight: "300px" }}
              data={{
                labels: data.stations.dates,

                datasets: [
                  {
                    label: "Stations",

                    backgroundColor: " rgb(45 142 103)",

                    data: data.stations.count,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4 mt-4 bg-white w-100 ">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  {strings.dashboard.NewRatings}
                </h4>
                <div className="small text-medium-emphasis">
                  {strings.dashboard.Last7Days}
                </div>
              </CCol>
            </CRow>
            <CChartBar
              style={{ maxHeight: "300px" }}
              data={{
                labels: data.ratings.dates,

                datasets: [
                  {
                    label: "Ratings",

                    backgroundColor: "#f1c927 ",

                    data: data.ratings.count,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </>
    )
  );
}
