import React, { Component } from 'react';
import { Page } from "../Page";
import { PillarBox } from '../../components/PillarBox';

class RoadmapPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page skipAuth>
                <PillarBox>
                    <p style={{ marginTop: 240 }}>Raodmap page</p>
                </PillarBox>
            </Page>
        )
    }
}

export default RoadmapPage;