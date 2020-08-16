import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import {Link, withRouter} from "react-router-dom";
import Api from "../common/api-communication";

function PaginationComponent({
  currentPage,
  totalPages,
  history,
  location
}) {
  const { replace } = history;
  const { search, pathname } = location;

  const pageQuery = Api.getPageParam(search);


  useEffect(() => {
    if (isNaN(parseInt(pageQuery))) {
      const urlSearchParams = new URLSearchParams(search);
      urlSearchParams.set("page", 1);
      replace({
        pathname: pathname,
        search: "?" + urlSearchParams.toString(),
      });
    }
  }, [
    replace,
    pathname,
    search,
    pageQuery
  ]);

  return (
    <Pagination
      page={pageQuery}
      count={totalPages}
      renderItem={(item) => {
        let newSearch = new URLSearchParams(search);
        newSearch.set("page", item.page);
        return (
          <PaginationItem
            component={Link}
            to={
              pathname + "?" + newSearch.toString()
            }
            {...item}
          />
        );
      }}
    />
  );
}

PaginationComponent.propTypes = {
  totalPages: PropTypes.number
};

export default withRouter(PaginationComponent);
