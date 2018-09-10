import React from 'react';

const context = React.createContext();

const { Provider, Consumer: UserConsumer } = context;

class UserProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            user: null,
            getAuthToken: function() {
                if (this.user == null) return null;
                else return this.user.token;
            }
        }
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component Did Update", prevProps, prevState, snapshot);
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        )
    }

}

function withUser(Component) {
    return (props) => (
        <UserConsumer>
            {
                user => <Component user={user} {...props}/>
            }
        </UserConsumer>
    )
}

export {
    UserProvider,
    UserConsumer,
    withUser
}