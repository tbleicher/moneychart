import React from "react";
import PropTypes from "prop-types";

import StringTag from "./StringTag";

const TagsCell = props => {
  const { tags, tagColorMap, ...rest } = props;

  const stringTags = tags.map((t, idx) => {
    const color = tagColorMap.get(t) || "#99cc00";

    return <StringTag label={t} key={t + idx} color={color} />;
  });

  return <div {...rest}>{stringTags}</div>;
};

TagsCell.defaultProps = {
  tags: [],
  onClick: () => {},
  tagColorMap: new Map()
};

TagsCell.propTypes = {
  tags: PropTypes.array.isRequired,
  tagColorMap: PropTypes.object,
  onClick: PropTypes.func
};

export default TagsCell;
