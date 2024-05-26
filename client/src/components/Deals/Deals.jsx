import React from "react";
import "./Deals.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Button, Typography } from "antd";

const Deals = () => {
  return (
    <AppLayout>
      <div className="deals dis-fcsb">
        <div
          style={{
            background:
              "url(https://res.cloudinary.com/dslrkvmwn/image/upload/v1709707110/images/umoxry5lqtg8nqivn6e7.jpg)",
            backgroundRepeat: "no-repeat",
          }}
          className="deals-content"
        >
          <Typography>
            <Typography.Title level={4}>Low Price</Typography.Title>
            <div className="deal-heading">
              <Typography.Title className="inline-block" level={1}>
                High
              </Typography.Title>
              <Typography.Title className="inline-block" level={1}>
                Coziness
              </Typography.Title>
            </div>
            <Typography.Title level={5}>UPTO 50% OFF</Typography.Title>
            <Button className="dis-fcc">Explore Items</Button>{" "}
          </Typography>
        </div>
        <div
          style={{
            background:
              "url(https://res.cloudinary.com/dslrkvmwn/image/upload/v1709707196/images/udklegcadqzsakrmeeh1.jpg)",
            backgroundRepeat: "no-repeat",
          }}
          className="deals-content"
        >
          <Typography>
            <Typography.Title level={4}>Beyoung Presents</Typography.Title>
            <div className="deal-heading">
              <Typography.Title className="inline-block" level={1}>
                Breezy{" "}
              </Typography.Title>
              <Typography.Title className="inline-block" level={1}>
                Summer
              </Typography.Title>
            </div>
            <Typography.Title level={5}>UPTO 50% OFF</Typography.Title>
            <Button className="dis-fcc">Explore Items</Button>
          </Typography>
        </div>
      </div>
    </AppLayout>
  );
};

export default Deals;
