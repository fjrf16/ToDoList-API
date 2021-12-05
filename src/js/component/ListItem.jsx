import React from "react";
import PropTypes from "prop-types";

import "../../styles/ListItem.scss";

const ListItem = props => {
	return (
		<>  {/*Definition of a element in the list*/}
			<li className="d-flex justify-content-between" key={props.ix}>
				{props.valueR}
				<button
					onClick={() => {
						props.removeHandler();
					}}>
					<i className="fas fa-times"></i>
				</button>
			</li>
		</>
	);
};
ListItem.propTypes = {
	ix: PropTypes.num,
	valueR: PropTypes.string,
	removeHandler: PropTypes.func
};

export default ListItem;
