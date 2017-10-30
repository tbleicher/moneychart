import React from 'react';
import PropTypes from 'prop-types';

import Tag from './TagDnD';

import './TagsList.css';

class TagsList extends React.Component {
  render() {
    const tags = this.props.tags
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((t, idx) => {
        return (
          <li key={idx}>
            <Tag data={t} key={t.id} onClick={this.props.onClick} />
            {this.props.stats[t.id] ? (
              <span className="tagstats">this.props.stats[t.id]</span>
            ) : null}
          </li>
        );
      });

    return (
      <div className="tagslist">
        <div className="columntitle">{this.props.title}</div>
        <ul>{tags}</ul>
      </div>
    );
  }
}

TagsList.propTypes = {
  tags: PropTypes.array,
  stats: PropTypes.object,
  title: PropTypes.string,
  onClick: PropTypes.func
};

TagsList.defaultProps = {
  tags: [],
  stats: {},
  title: 'Categories',
  onClick: () => {}
};

export default TagsList;
