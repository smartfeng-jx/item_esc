import React, { Component } from 'react';
import Bufen from './Bufen.js';

export default class S3 extends Component {
    render() {
        return (
            <div>
                <Bufen ref="viewbufen" info="外观" />
                <Bufen ref="innerbufen" info="内饰" />
                <Bufen ref="enginebufen" info="结构和发动机" />
                <Bufen ref="morebufen" info="更多细节" />
            </div>
        )
    }
}
