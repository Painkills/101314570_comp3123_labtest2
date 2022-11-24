import React from 'react'
import { Button, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GameDetails({game}) {
    return (
        <Card style={{width:'32%', marginBottom:'1rem', marginRight:'5px'}}>
            <Card.Img variant="top" src={ game.background_image } />
            <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text><strong>ESRB Rating:</strong> { (game.esrb_rating === null) ? "No Rating" : game.esrb_rating.name }</Card.Text>
                <Card.Text><strong>Metacritic Score:</strong> { game.metacritic }</Card.Text>
                <Card.Text><strong>Overall Rating:</strong> { game.rating } ({game.ratings_count} ratings)</Card.Text>
                <Card.Text><strong>Release Date:</strong> { game.released } </Card.Text>
                <Card.Text><strong>Genres:</strong>                
                    {
                        game.genres.map(genre => (
                            <div key={genre.id}>{genre.name}</div>
                        ))
                    }
                </Card.Text>
            </Card.Body>
        </Card>
      );
}
