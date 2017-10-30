import React from 'react';

import Upload from './Upload';
import './Upload.css';

class UploadView extends React.Component {

  render() {
    return (
      <div>
        <section className="views">
          <h2>Upload Transactions</h2>
          <Upload />
        </section>
      </div>
    );
  }
}

export default UploadView;