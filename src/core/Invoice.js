import React, { useContext, useState, useEffect } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { Col, Divider, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import authContext from "../context/authContext";
import moment from "moment";
import Cart from "./Cart";

const Invoice = ({ removeCartItem, totalItem }) => {
  const { user, getCartItem, getItem, totalCartFunc } = useContext(authContext)
  const [items, setItems] = useState()
  const date = new Date()
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    getCartItem()
    totalCartFunc()
    setItems(getItem)
  }, [])

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
{/* 
      <Row style={{ marginTop: 48 }}>
        <div>Bill To: <strong>Strides Shasun Ltd</strong></div>
        <div>Bannerghatt Road,</div>
        <div>Bangalore - 560076</div>
      </Row> */}


      {/* <Row style={{ marginTop: 48 }}>
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
      </Row> */}

      <Row style={{ marginTop: 48 , paddingRight : '1160px'}} >
        <Col span={8} offset={16}>
          <table class="table table-shopping select">
            <thead class='select'>
              <tr>
                <th class="text-center"></th>
                <th class="text-right">Product</th>
                <th class="text-right">Description</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Amount</th>
                <th class="text-right">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { console.log(getItem,"items")}
              {getItem.map((value, key) => (
                <tr>
                  <td class="td-name">{value.name}</td>
                  <td class="td-number text-right">{value.description}</td>
                  <td class="td-number">{value.quantity}</td>
                  <td class="td-number">{value.price}</td>
                  <td class="td-number">RS. {value.quantity * value.price}</td>
                  <td class="td-number">
                  </td>
                </tr>
              ))}

              <tr>
                <td colspan="3"></td>
                <td class="td-total">
                  Total Price
                </td>
                <td colspan="1" class="td-price">
                  <td class="td-number">RS. {getItem.reduce((total, item) => total + (item.price * item.quantity), 0)}</td>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>

  );
}
export default Invoice;

