import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BreadcrumbItem = ({ children, ...props }) => {
  return (
    <Breadcrumb.Item {...props} linkAs={Link}>
      {children}
    </Breadcrumb.Item>
  );
};
