import React from 'react';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                mode: (this.state.mode + 1) % 4
            })
        }, 2000)
    }

    render() {
        return (
            <React.Fragment>{
        this.state.mode == 0 ?
        <div>
            <div>DOM1</div>
            <div>DOM2</div>
        </div>
        : this.state.mode == 1 ?
        <div>
            <div>DOM1</div>
            <div>DOM2</div>
        </div>
        : this.state.mode == 2 ?
        <span>
            <div>DOM1</div>
            <div>DOM2</div>
        </span>
        :
        <span somethingDores={Math.random()}>
            <div>DOM1</div>
            <div>DOM2</div>
        </span>
        }
        </React.Fragment>
        )
    }

}

export default Page;