
import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';


const Index = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = () => {
    setLoading(true);

    return ordinaDecrescente(setMovies, setLoading)
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <Heading />
        <div className="p-4">
          <Menutendina setMovies={setMovies} setLoading={setLoading} />
        </div>
      </div>
      <BottoniSelezioneFilm setMovies={setMovies} setLoading={setLoading} />
      <MovieList loading={loading}>
        {movies.map((item, key) => (
          <MovieItem key={key} {...item} />
        ))}
      </MovieList>
    </Layout>
  );
};

const ordinaCrescente = (setMovies, setLoading) => {
  setLoading(true);
  fetch('http://localhost/api/movies/crescente')
    .then(response => response.json())
    .then(data => {
      setMovies(data.movies);
      setLoading(false);
    });
}

const ordinaDecrescente = (setMovies, setLoading) => {
  setLoading(true)
  fetch('http://localhost/api/movies/decrescente')
    .then(response => response.json())
    .then(data => {
      setMovies(data.movies);
      setLoading(false);
    });
}

const OrdinaRating = (setMovies, setLoading) => {
  setLoading(true)
  fetch('http://localhost/api/movies/rating')
    .then(response => response.json())
    .then(data => {
      setMovies(data.movies);
      setLoading(false);
    });
}

const filtra = (setMovies, setLoading, genere) => {
  setLoading(true)
  fetch(`http://localhost/api/movies/filter?filtro=${genere}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.movies, ' roba');
      setMovies(data.movies);
      setLoading(false);
    });
}

const Menutendina = props => {
  const { setMovies, setLoading } = props;
  return (
    <div className='w-100'>
      <Dropdown label="Ordina per:" dismissOnClick={false}>
        <Dropdown.Item onClick={() => { ordinaCrescente(setMovies, setLoading) }}>
          Crescente
        </Dropdown.Item>
        <Dropdown.Item onClick={() => { ordinaDecrescente(setMovies, setLoading) }}>
          Decrescente
        </Dropdown.Item>
        <Dropdown.Item onClick={() => { OrdinaRating(setMovies, setLoading) }}>
          I più votati
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

const Layout = props => {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-gray-900 to-violet-950 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {props.children}
      </div>
    </section>

  );
};


const Heading = props => {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-5">
      <Link>
        <h1 className="mb-4 text-4xl tracking-tight font-extrabold dark:text-white">
          La nostra collezione film
        </h1>
      </Link>
      <p className="font-light text-gray-100 sm:text-xl dark:text-gray-400">
        Esplora tutti i film nel catalogo!
      </p>
    </div>
  );
};

const BottoniSelezioneFilm = props => {
  const { setMovies, setLoading } = props;
  return (
    <div className='my-5'>
      <Button.Group outline={true}>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Comedy') }}>
          Genere Commedia
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Action') }}>
          Genere Azione
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Adventure') }}>
          Genere Avventura
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Fantasy') }}>
          Genere Fantasy
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Romance') }}>
          Genere Romance
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Drama') }}>
          Genere Drammatico
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'History') }}>
          Genere Storia
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Crime') }}>
          Genere Crime
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Horror') }}>
          Genere Horror
        </Button>
        <Button gradientMonochrome="info" onClick={() => { filtra(setMovies, setLoading, 'Mystery') }}>
          Genere Mystery
        </Button>
      </Button.Group>
    </div>
  )
}

const MovieList = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
      {props.children}
    </div>
  );
};

const MovieItem = props => {
  return (
    <div className="flex flex-col w-full h-full rounded-xl shadow-md lg:max-w-sm transform transition duration-500 hover:scale-110">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80 rounded-xl"
          src={props.image}
          alt={props.title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {props.year || props.rating
            ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
              <span>{props.year}</span>

              {props.rating
                ? <Rating>
                  <Rating.Star />
                  <span className="ml-0.5">
                    {props.rating}
                  </span>
                </Rating>
                : null
              }
            </div>
            : null
          }

          <h3 className="text-orange-500 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-white text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 50)}...
          </p>
        </div>

        {props.wikipedia_url
          ? <Button
            color="light"
            size="xs"
            className="w-full"
            onClick={() => window.open(props.wikipedia_url, '_blank')}
          >
            More
          </Button>
          : null
        }
      </div>
    </div>
  );
};


export default Index;