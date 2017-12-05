import React from 'react';

import Section from '../Section';
import Upload from './Upload';
import './Upload.css';

class UploadView extends React.Component {

  render() {
    return (
      <Section title="Uploads">
        <div className="help">
          <p>This is the place where you could add new transactions to your account
            if you had an account at my bank. So far the parser is hardcoded.</p> 
          <p>Eventually the parser will be linked to the account and so different
            input formats can be supported.</p>
        </div>
        <Upload />
      </Section>
    );
  }
}

export default UploadView;