import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table } from "antd";
import { Loading, Text } from "@nextui-org/react";
import { Sidenav } from "../../sidenav/Sidenav";
export const MBhistory = () => {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetchItems();
  }, []);

  const [item, setItem] = useState([]);
  const fetchItems = async () => {
    const data = await fetch("http://127.0.0.1:5000/api/mbresult");
    console.log(data);
    const items = await data.json();
    console.log(items.data);
    setItem(items.data);
    setloading(false);
      console.log(data)
    console.log(item)
    // const items = await data.json();

    setstate(
            items.data.map((row) => ({
              Age: row.age,
              Gender: row.gender,
              Children: row.children,
              Smoker: row.smoker,
              BMI: row.bmi,
              Region: row.region,
              Result: row.result.replace(/[\[\]']+/g,''),
            }))
          );
  };

  const columns = [
    {
      title: "Age",
      dataIndex: "Age",
      width: 120,
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      width: 120,
    },
    {
      title: "Children",
      dataIndex: "Children",
      width: 120,
    },
    {
      title: "Smoker",
      dataIndex: "Smoker",
      width: 120,
    },
    {
      title: "BMI",
      dataIndex: "BMI",
      width: 120,
    },
    {
      title: "Region",
      dataIndex: "Region",
      width: 120,
    },
    {
      title: "Result",
      dataIndex: "Result",
      width: 120,
    },
  ];

  return (
    <div>
      {loading ? (
        <>
          <Loading color="primary" textColor="primary">
            Loading..!
          </Loading>
        </>
      ) : (
        <div className="modelbuilder__parent">
          <Sidenav />
          <div className="MB_form__cont histable__cont">
            <div className="MB_form_cont__child">
              <Text
                h1
                size={40}
                className=" hist_head"
                css={{
                  textGradient: "45deg, $blue600 -20%, $black 80%",
                }}
                weight="bold"
              >
                Software Dev salary prediction result
              </Text>
              <div className="histtable___cont_child">
                <Table
                  className="hist_table"
                  size="small"
                  columns={columns}
                  dataSource={state}
                  /*  pagination={{ pageSize: 50 }} */
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "30"],
                  }}
                  scroll={{ y: 510 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
