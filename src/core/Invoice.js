import React, { useContext ,useState , useEffect} from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { Col, Divider, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import authContext from "../context/authContext";
import moment from "moment";
import Cart from "./Cart";

const Invoice = ({removeCartItem, getCartItem, getItem, totalCartFunc, totalItem}) => {
    const {user} = useContext(authContext)
    const date = new Date()
    const tomorrow  = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div style={{ padding: 20 }}>
      <Row>
        <Col>
          <Divider>Invoice</Divider>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col span={8}>
          <h3>{user.name}</h3>
          <div>#944/945, 4th Cross, 9th Main,</div>
          <div>Vijaya Bank Layout,</div>
          <div>Bannerghatta Road,</div>
          <div>Bangalore - 560076</div>
        </Col>
        <Col span={8} offset={8}>
          <table>
            <tr>
              <th>Invoice # :</th>
              <td>1</td>
            </tr>
            <tr>
              <th>Invoice Date :</th>
              <td>{moment(date).format('DD-MM-YYYY')}</td>
            </tr>
            <tr>
              <th>Due Date :</th>
              <td>{moment(tomorrow).format('DD-MM-YYYY')}</td>
            </tr>
          </table>
        </Col>
      </Row>

      <Row style={{ marginTop: 48 }}>
        <div>Bill To: <strong>Strides Shasun Ltd</strong></div>
        <div>Bannerghatt Road,</div>
        <div>Bangalore - 560076</div>
      </Row>


      <Row style={{ marginTop: 48 }}>
        <Table dataSource={[{
            id: 1,
            name: 'Accommodation (Single Occupancy)',
            description: 'Accommodation',
            price: 1599,
            quantity: 1
        }]}
        pagination={false}
        >
          <Table.Column title="Items" dataIndex='name' />
          <Table.Column title="Description" dataIndex='description' />
          <Table.Column title="Quantity" dataIndex='quantity' />
          <Table.Column title="Price" dataIndex='price' />
          <Table.Column title="Line Total" />
        </Table>
      </Row>

      <Row style={{ marginTop: 48 }}>
        <Col span={8} offset={16}>
          <table>
            <tr>
              <th>Gross Total :</th>
              <td>Rs. 1599</td>
            </tr>
            <tr>
              <th>IGST @6% :</th>
              <td>Rs. 95.94</td>
            </tr>
            <tr>
              <th>CGST @6% :</th>
              <td>Rs. 95.94</td>
            </tr>
            <tr>
              <th>Nett Total :</th>
              <td>Rs. 1790.88</td>
            </tr>
          </table>
        </Col>
      </Row>
    </div>

  );
}
export default Invoice;

