import React from "react";
import Layout from "../../Components/Layout";
import "./Dashboard.css";
import { BiUser } from "react-icons/bi";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";


const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container p-5">
        <div className="row">
          <div className="col-md-3 card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="card-title">USERS</div>
                </div>
                <div className="col-md-6 text-end">
                  <span className="percantage">33%</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <h4 className="count">400</h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-8">
                  <div className="bottom-title">See all users</div>
                </div>
                <div className="col-md-4 text-end">
                  <div className="icon">
                    <BiUser />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 text-left">
                  <div className="card-title">PRODUCTS</div>
                </div>
                <div className="col-md-6 text-end">
                  <span className="percantage">0%</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <h4 className="count">100</h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-8">
                  <div className="bottom-title">View all products</div>
                </div>
                <div className="col-md-4 text-end">
                  <div className="icon">
                    <TbTriangleSquareCircle />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 text-left">
                  <div className="card-title">ORDERS</div>
                </div>
                <div className="col-md-6 text-end">
                  <span className="percantage">10%</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <h4 className="count">800</h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-8">
                  <div className="bottom-title">View all orders</div>
                </div>
                <div className="col-md-4 text-end">
                  <div className="icon">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 text-left">
                  <div className="card-title">EARNINGS</div>
                </div>
                <div className="col-md-6 text-end">
                  <span className="percantage">55%</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <h4 className="count">5600</h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-8">
                  <div className="bottom-title">View net earning</div>
                </div>
                <div className="col-md-4 text-end">
                  <div className="icon">
                    <AiOutlineDollarCircle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 card">
            <div className="card-body">Left</div>
          </div>
          <div className="col-md-8 card">
            <div className="crad-body">Right</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
