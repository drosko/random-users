import React, {Component, Fragment} from 'react';
import axios from 'axios';

import UserCard from './UserCard';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            page: 1,
            seed: null,
            isLoading: false,
            isLoadingPage: false
        };

        this.getCSV = this.getCSV.bind(this);
    }

    async componentDidMount() {
        this.setState({isLoadingPage: true});

        try {
            const resp = await axios.get('https://randomuser.me/api/?results=10');
            this.setState({
                users: resp.data.results,
                seed: resp.data.info.seed,
                isLoadingPage: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    async fetchMoreUsers(page) {
        let _page = page || 1;

        this.setState({isLoading: true})

        try {
            const resp = await axios.get(`https://randomuser.me/api/?results=10&page=${_page}&seed=${this.state.seed}`);
            this.setState({
                users: resp.data.results,
                seed: resp.data.info.seed,
                page,
                isLoading: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    nextPage = () => {
        this.fetchMoreUsers(this.state.page + 1);
    }

    prevPage = () => {
        this.fetchMoreUsers(this.state.page - 1);
    }

    async getCSV() {
        let downloadUrl = `https://randomuser.me/api/?page=${this.state.page}&results=10&format=csv&seed=${this.state.seed}`;;

        try {
            const resp = await axios.get(downloadUrl);
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `UserList.csv`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.isLoadingPage &&
                    <div className="lds-ring-wrap">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                }
                {!this.state.isLoadingPage &&
                    <Fragment>
                        <div className="columns">
                            <div className="column">
                                <h1 className="title">Random User Directory</h1>
                            </div>
                        </div>
                        <div className="columns is-multiline is-desktop">
                            {this.state.users.map((user, i) => (
                                <UserCard user={user} key={i + user.id.value} />
                            ))}
                        </div>
                        <div className="flex-center spaced">
                            Page {this.state.page}
                        </div>
                        <nav className="pagination is-medium flex-center" role="navigation" aria-label="pagination">
                            {this.state.page > 1 && <a className={`button pagination-previous ${this.state.isLoading && 'is-loading'}`} onClick={this.prevPage}>Previous</a> }
                            <a className={`button pagination-next ${this.state.isLoading && 'is-loading'}`} onClick={this.nextPage}>Next page</a>
                        </nav>
                        <div className="flex-center spaced">
                            <button className="button is-primary" onClick={this.getCSV}>Download CSV of Current Page</button>
                        </div>
                    </Fragment>
                }
            </Fragment>
        )
    }
}

export default UserList;