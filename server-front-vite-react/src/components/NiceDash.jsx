import { useEffect } from 'react';
import ApexCharts from 'apexcharts';


function NiceDash() {
    document.addEventListener("DOMContentLoaded", () => {
        new ApexCharts(document.querySelector("#reportsChart"), {
          series: [{
            name: 'Sales',
            data: [31, 40, 28, 51, 42, 82, 56],
          }, {
            name: 'Revenue',
            data: [11, 32, 45, 32, 34, 52, 41]
          }, {
            name: 'Customers',
            data: [15, 11, 32, 18, 9, 24, 11]
          }],
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: false
            },
          },
          markers: {
            size: 4
          },
          colors: ['#4154f1', '#2eca6a', '#ff771d'],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.4,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          }
        }).render();
      });
    
      return (
        <>
          {/* Sales Card */}
          <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
    
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
    
              <div className="card-body">
                <h5 className="card-title">Sales <span>| Today</span></h5>
    
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart"></i>
                  </div>
                  <div className="ps-3">
                    <h6>145</h6>
                    <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Sales Card */}
    
          {/* Revenue Card */}
          <div className="col-xxl-4 col-md-6">
            <div className="card info-card revenue-card">
    
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
    
              <div className="card-body">
                <h5 className="card-title">Revenue <span>| This Month</span></h5>
    
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <div className="ps-3">
                    <h6>$3,264</h6>
                    <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                  </div>
                </div>
              </div>
    
            </div>
          </div>
          {/* End Revenue Card */}
    
          {/* Customers Card */}
          <div className="col-xxl-4 col-xl-12">
            <div className="card info-card customers-card">
    
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
    
              <div className="card-body">
                <h5 className="card-title">Customers <span>| This Year</span></h5>
    
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="ps-3">
                    <h6>1244</h6>
                    <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Customers Card */}
    
          {/* Reports */}
          <div className="col-12">
            <div className="card">
    
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
    
              <div className="card-body">
                <h5 className="card-title">Reports <span>/Today</span></h5>
    
                {/* Line Chart */}
                <div id="reportsChart"></div>
                {/* End Line Chart */}
    
              </div>
    
            </div>
          </div>
          {/* End Reports */}
    
          {/* Recent Sales */}
          <div className="col-12">
            <div className="card recent-sales overflow-auto">
    
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
    
              <div className="card-body">
                <h5 className="card-title">Recent Sales <span>| Today</span></h5>
    
                <table className="table table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><a href="#">#2457</a></th>
                      <td>Brandon Jacob</td>
                      <td><a href="#" className="text-primary">At praesentium minu</a></td>
                      <td>$64</td>
                      <td><span className="badge bg-success">Approved</span></td>
                    </tr>
                    <tr>
                      <th scope="row"><a href="#">#2147</a></th>
                      <td>Bridie Kessler</td>
                      <td><a href="#" className="text-primary">Blanditiis dolor omnis similique</a></td>
                      <td>$47</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <th scope="row"><a href="#">#2049</a></th>
                      <td>Ashleigh Langosh</td>
                      <td><a href="#" className="text-primary">At recusandae consectetur</a></td>
                      <td>$147</td>
                      <td><span className="badge bg-success">Approved</span></td>
                    </tr>
                    <tr>
                      <th scope="row"><a href="#">#2644</a></th>
                      <td>Angus Grady</td>
                      <td><a href="#" className="text-primar">Ut voluptatem id earum et</a></td>
                      <td>$67</td>
                      <td><span className="badge bg-danger">Rejected</span></td>
                    </tr>
                    <tr>
                      <th scope="row"><a href="#">#2644</a></th>
                      <td>Raheem Lehner</td>
                      <td><a href="#" className="text-primary">Sunt similique distinctio</a></td>
                      <td>$165</td>
                      <td><span className="badge bg-success">Approved</span></td>
                    </tr>
                  </tbody>
                </table>
    
              </div>
    
            </div>
          </div>
          {/* End Recent Sales */}
        </>
      );
    }

export default NiceDash;
