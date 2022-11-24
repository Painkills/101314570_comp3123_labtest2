import axios from 'axios'
import React, { Component } from 'react'
import key from './key'
import GameDetails from './GameDetails'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import userEvent from '@testing-library/user-event'

export default class Games extends Component {
    constructor(props){
        super(props)
        this.state = {
            games: [],
            fromDate: "2018-10-10",
            toDate: "2020-10-10"
        }
    }

    // Set constants to be used for get calls
    BASE_URL = 'https://api.rawg.io/api/games?'
    KEY_URL = "&key=" + key
    

    componentDidMount = () => {
        this.getGames()
        console.log(this.state)
    }

    getGames = async () => {
        // make call to API and log errors
        try {
            const res = await axios.get(this.BASE_URL + 'dates=' + this.state.fromDate + "," + this.state.toDate  + '&ordering=-released' +  this.KEY_URL)
            console.log(res.data.results)
            this.setState({
                ...this.state,
                games : res.data.results
            })
        } catch (error) {
            console.log(error)
        }
    }

    getResultsByDate = (event) => {
        event.preventDefault()
        this.getGames()
    }

    onNewDateSet = (event) => {
        this.setState({
            ...this.state,
            [event.target.id] : [event.target.value] 
        })
    }

    render() {
        return (
        // Hold all rendering in a styled div
        <div style={{ backgroundColor: "steelblue", padding:'20px'}}>
            <h1 style={{textAlign:'center'}}>Game List by Release Date</h1>
            {/* Let users pick dates to filter games by through form */}
            <Form method="POST" onSubmit={(event) => this.getResultsByDate(event)}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='fromDate'>From:</Form.Label>
                    <Form.Control 
                        id='fromDate' 
                        type='date' 
                        value= {this.state.fromDate}
                        onChange = {(event) => this.onNewDateSet(event)}>
                    </Form.Control>
                    <Form.Label htmlFor='toDate'>To:</Form.Label>
                    <Form.Control 
                        id='toDate' 
                        type='date' 
                        value={this.state.toDate}
                        onChange = {(event) => this.onNewDateSet(event)}>
                    </Form.Control>
                    <Form.Control id='submit' type='submit' value='submit'></Form.Control>
                </Form.Group>
            </Form>
            
            {/* Create Flexbox in which Cards containing Game Details will be shown */}
            <div style={{ display:'flex', flexFlow: 'row wrap', justifyContent:'space-around'}}>
            {
                // Cycle through all games in state and create cards with info for each
                this.state.games.map(game => (
                    <GameDetails key= {game.id} game={ game }/>
                ))
            }
            </div>
        </div>
        )
    }
}
