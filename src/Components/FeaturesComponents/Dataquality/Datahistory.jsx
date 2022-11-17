import React, { useState, useEffect } from "react";
import { Table } from "antd";

import { Text } from "@nextui-org/react";

export const Datahistory = () => {
    useEffect(() => {
        fetchItems();
      }, []);
    const [items, setItems] = useState([]);
    const [state, setstate] = useState([]);
    const [loading, setloading] = useState(true);
    const fetchItems = async () => {
    const data = await fetch("http://127.0.0.1:5000/api/dqhistory");
    console.log(data);
    const items = await data.json();
    console.log(items.data);
    setItems(items.data);
    setloading(false);
    setstate(
        items.data.map((row) => ({
         
          file_name: row.file_name,
          file_size: row.size,
          rows_length: row.dataset_shape[0],
          column_length: row.dataset_shape[1],
          file_duplicate: row.df_duplicate_value,
          date_time: row.current_time,
        }))
      );
      console.log("im inside axios");
      console.log(state);
  };
  const columns = [
    {
      title: "File name",
      dataIndex: "file_name",
      width: 150,
    },
    {
      title: "File size(MB)",
      dataIndex: "file_size",
      width: 150,
    },
    {
      title: "No. of rows",
      dataIndex: "rows_length",
      width: 150,
    },
    {
      title: "No. of columns",
      dataIndex: "column_length",
      width: 150,
    },
    {
      title: "No. of dulpicates",
      dataIndex: "file_duplicate",
      width: 150,
    },
    {  
      title: "Date and Time",
      dataIndex: "date_time",
      width: 150,
    },
  ];
  return (
    <div>
    <div className="eda-head">
      <Text
        h1
        size={40}
        className="dq-head"
        css={{
          textGradient: "45deg, $blue600 -10%, $black 80%",
        }}
        weight="bold"
      >
        EDA analysis History
      </Text>
    </div>
    {loading ? (
      "Loading"
    ) : (
      <Table
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
      )}
      
    </div>
  )
}
