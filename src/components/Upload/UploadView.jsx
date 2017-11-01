import React from 'react';

import Section from '../Section';
import Upload from './Upload';
import './Upload.css';

class UploadView extends React.Component {

  render() {
    return (
      <Section title="Uploads">
        <Upload />
      </Section>
    );
  }
}

export default UploadView;