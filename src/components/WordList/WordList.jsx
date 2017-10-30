import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './WordList.css';


/* returns Map object with word as key and count as value */
function getWordCounts(words) {
  return words.reduce((m,w) => {
    const count = m.get(w) || 0;
    m.set(w, count + 1);
    return m;
  }, new Map());
}

// eslint-disable-next-line
function getWordList(words) {
  const wordCounts = getWordCounts(words);
  const unique = Array.from(wordCounts.keys());

  unique.sort();
  return unique.map(w => <li key={w}>{w} ({wordCounts.get(w)})</li>); 
}

/* break up string in [before, match, after] parts */
function markupMatch(s, pattern) {
  const idx = s.indexOf(pattern);
  const before = s.slice(0,idx);
  const match = s.slice(idx,idx+pattern.length);
  const after = s.slice(idx+pattern.length);
  return [before, match, after];
}

/* return strings matching the search pattern */
function getMatches(pattern, strings) {
  return strings
    .filter(s => s.indexOf(pattern) >= 0)
    .map(s => markupMatch(s, pattern));
}


class WordList extends React.Component {

  render() {
    const { transactions, patterns } = this.props;
    const lines = transactions
      .filter(t => t.description !== '')
      .map(t => t.description);
    const matches = [].concat(...patterns
      .filter(s => s !== '')
      .map(p => getMatches(p, lines)));
    const list = matches
      .map((s,idx) => <li key={idx}>{s[0]}<span className="highlight">{s[1]}</span>{s[2]}</li>);
    
    return (
      <div id="wordlist">
        <div className="columntitle">{this.props.title}</div>
        <ul className="wordlist"> 
          {matches.length ? list : <li><span className="light">no matches found</span></li>}
        </ul>
      </div>
    );
  }
}

WordList.propTypes = {
  title: PropTypes.string,
  patterns: PropTypes.array.isRequired,
}

WordList.defaultProps = {
  title: 'Wordlist',
  patterns: ['FOSTERS', 'AMAZON'],
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions,
  }
}


export default connect(mapStateToProps, {})(WordList);