import React, { Component } from 'react';
import base64 from 'base-64';
import { Page } from "../Page";
import { PillarBox } from '../../components/PillarBox';
import { API } from '../../endpoints';

class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        }

        const verification = base64
            .decode(this.props.match.params.verification)
            .split(':');

            console.log(verification);
        API.VERIFY_EMAIL({ email: verification[0], hash: verification[1] })
            .then(res => {
                console.log(res);
                this.setState({ success: res.success });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { success } = this.state;
        return (
            <Page>
                <PillarBox>
                    <p style={{ marginTop: 240 }}>
                        {
                            success ? (
                                'Successfully subscribed'
                            ) : (
                                'Something went wrong when verifying your subscription request'
                            )
                        }
                    </p>
                </PillarBox>
            </Page>
        )
    }
}

export default ContactPage;